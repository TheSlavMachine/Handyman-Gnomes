import os 
import django 
import json
import uuid
import requests
import re # 1. Import the regular expression module
from datetime import date as _date


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "handyman_orm.settings")
django.setup()

from flask import Flask, request, jsonify
from flask_cors import CORS
from core import models
from core.services import SlotFullError, create_intake_log
from intake_email import (
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
    data = request.json or {}
    
    phone_pattern = re.compile(r'^[0-9\s()+-]+$') 
    name_pattern = re.compile(r"^[a-zA-Z\s'-]+$")
    # Validate fields using compiled patterns and additional constraints (make brand/zip optional)
    if not name_pattern.match((data.get('name') or '').strip()):
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
    if not data.get('problem'):
        return jsonify({"error": "Problem is a required field"}), 400
    if len(data.get('notes', '')) > 500:
        return jsonify({"error": "Notes cannot exceed 500 characters"}), 400

    # Support both camelCase and snake_case from clients
    appointment_date = data.get("appointmentDateString") or data.get("appointment_date")
    slot = data.get("timeWindow") or data.get("time_window")

    # Normalize/validate appointment_date
    if isinstance(appointment_date, str) and appointment_date:
        try:
            appointment_date = _date.fromisoformat(appointment_date)
        except ValueError:
            return jsonify({"error": "Invalid appointment_date format (use YYYY-MM-DD)"}), 400
    if not appointment_date:
        return jsonify({"error": "appointment_date is required"}), 400

    # Coerce slot to allowed choices
    allowed_slots = [choice[0] for choice in models.IntakeLog.TWIN_CHOICES]
    if not slot or slot not in allowed_slots:
        slot = allowed_slots[0]
    
    ticket_id = uuid.uuid4().hex

    try:
        create_intake_log(
            data=data,
            ticket_id=ticket_id,
            appointment_date=appointment_date,
            slot=slot,
        )

        return jsonify({"message": "Job scheduled successfully", "ticket_id": ticket_id}), 201
    except SlotFullError as exc:
        return jsonify({"error": str(exc)}), 400
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

        # Pull the intake record for this ticket
        log = models.IntakeLog.objects.filter(ticket_id=ticket_id).first()
        if not log:
            return jsonify({"error": "Unknown ticket_id"}), 404

        payload = {
            "ticket_id": ticket_id,
            "name": log.name,
            "email": log.email,
            "selected_time": selected_time,
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
