import os 
import django 
import json
import uuid
import requests
import re # 1. Import the regular expression module


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "handyman_orm.settings")
django.setup()

from django.utils import timezone

from flask import Flask, request, jsonify
from flask_cors import CORS
from core import models
from intake_email import (
    send_handyman_email,
    send_customer_confirmation,
    send_customer_appointment_time,
)

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APPLIANCES_FILE = os.path.join(BASE_DIR, "info_jsons", "appliances.json")

with open(APPLIANCES_FILE, "r") as f:
    APPLIANCES = json.load(f)

@app.route('/api/intake', methods=['POST'])
def intake_request():
    data = request.json
    
    zip_pattern = re.compile(r'^\d{5}$')
    phone_pattern = re.compile(r'^[0-9\s()+-]+$') 
    name_pattern = re.compile(r"^[a-zA-Z\s'-]+$")
    # Validate fields using compiled patterns and additional constraints
    if not zip_pattern.match(data.get('zipCode', '')):
        return jsonify({"error": "Invalid ZIP code"}), 400
    if not name_pattern.match(data.get('name', '')):
        return jsonify({"error": "Invalid name"}), 400
    phone_raw = data.get('phone', '')
    # Require valid phone characters and at least 7 digits
    if not phone_pattern.match(phone_raw) or len(re.sub(r"\D", "", phone_raw)) < 7:
        return jsonify({"error": "Invalid phone number"}), 400
    email = data.get('email', '')
    if not email or '@' not in email:
        return jsonify({"error": "A valid email is required"}), 400
    if len(data.get('address', '')) < 10:
        return jsonify({"error": "Address is too short"}), 400
    if not data.get('brand'):
        return jsonify({"error": "Brand is a required field"}), 400
    if not data.get('problem'):
        return jsonify({"error": "Problem is a required field"}), 400
    if len(data.get('notes', '')) > 500:
        return jsonify({"error": "Notes cannot exceed 500 characters"}), 400

    appointment_date = data.get("appointmentDateString") 
    slot = data.get("timeWindow")
    if appointment_date and slot:
        existing_count = models.IntakeLog.objects.filter(
            appointment_date=appointment_date,
            time_window=slot
        ).count()
        if slot in ["Morning", "Afternoon"] and existing_count >= 5:
            return jsonify({"error": f"{slot} slots are full for {appointment_date}"}), 400
    
    ticket_id = uuid.uuid4().hex

    

    try:

        appliance_names = data.get('appliances', [])
        appliance_objs = []
        for name in appliance_names:
            appliance, _ = models.Appliance.objects.get_or_create(name=name)
            appliance_objs.append(appliance)

        intake_log = models.IntakeLog.objects.create(
            ticket_id=ticket_id,
            brand=data.get('brand'),
            under_warranty=data.get('isUnderWarranty') == 'yes',
            problem=data.get('problem'),
            name=data.get('name'),
            phone=data.get('phone'),
            address=data.get('address'),
            email=data.get('email'),
            time_window=slot,
            appointment_date=appointment_date,
            serial_number=data.get('serialNumber', ''),
            notes=data.get('notes', ''),
            status="NEW",
        )

        if appliance_objs:
            intake_log.appliances.set(appliance_objs)

        email_payload = {**data, "ticket_id": ticket_id}
        send_handyman_email(email_payload)
        send_customer_confirmation(email_payload)

        return jsonify({"message": "Job scheduled successfully", "ticket_id": ticket_id}), 201
    except Exception as e:
        print(f"Intake submission failed: {e}")
        return jsonify({"error": "Internal server error"}), 500

    
@app.route("/api/appliances", methods=["GET"])
def get_appliances():
    return jsonify(APPLIANCES)

@app.route("/api/problems", methods=["GET"])
def get_appliance_problems():
    appliance_name = request.args.get("appliance")

    if not appliance_name:
        return jsonify({"error": "Missing 'appliance' query parameter"}), 400

    for appliance in APPLIANCES:
        if appliance["name"].lower() == appliance_name.lower():
            problems_with_other = appliance["problems"] + [{"name": "Other"}]
            return jsonify(problems_with_other)

    return jsonify({"error": "Appliance not found"}), 404

@app.route("/api/time-windows", methods=["GET"])
def get_time_windows():
    time_windows = [choice[0] for choice in models.IntakeLog.TWIN_CHOICES]

    return jsonify(time_windows)

@app.route('/api/appointment-action', methods=['GET'])
def appointment_action():
    try:
        ticket_id = request.args.get('ticket_id')
        action = request.args.get('action')
        selected_time = request.args.get('time') 

        if not ticket_id or not action or not selected_time:
            return jsonify({"error": "Missing ticket_id, action, or time"}), 400

        payload = {
            "ticket_id": ticket_id,
            "name": "Customer Name",        
            "email": "customer@example.com",  
            "selected_time": selected_time
        }

        send_customer_appointment_time(payload)

        return f"Time '{selected_time}' recorded for ticket {ticket_id}. Customer notified."
    except Exception as e:
        print(f"Appointment action request failed: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/reverse-geocode', methods=['GET'])
def reverse_geocode():
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if not lat or not lon:
        return jsonify({"error": "Missing latitude or longitude"}), 400

    osm_url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}"
    
    try:
        headers = {'User-Agent': 'HandymanScheduler/1.0'}
        response = requests.get(osm_url, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch from OpenStreetMap: {e}")
        return jsonify({"error": "Failed to fetch address data"}), 502

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True, use_reloader=False)
