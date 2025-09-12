import os 
import django 
import json
import uuid
import requests
import re # 1. Import the regular expression module

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "handyman_orm.settings")
django.setup()

from django.utils import timezone
from intake_email import send_handyman_email, send_customer_confirmation

from flask import Flask, request, jsonify
from flask_cors import CORS
from core import models

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APPLIANCES_FILE = os.path.join(BASE_DIR, "info_jsons", "appliances.json")

with open(APPLIANCES_FILE, "r") as f:
    APPLIANCES = json.load(f)

@app.route('/api/intake', methods=['POST'])
def intake_request():
    data = request.json
    
    # --- 2. ADDED BACKEND VALIDATION (THE SECURITY GATE) ---
    # Define our validation rules using regular expressions
    zip_pattern = re.compile(r'^\d{5}$')
    phone_pattern = re.compile(r'^\(\d{3}\) \d{3}-\d{4}$') # Matches (123) 456-7890
    name_pattern = re.compile(r"^[a-zA-Z\s'-]+$")

    # Check each piece of data against the rules
    if not zip_pattern.match(data.get('zipCode', '')):
        return jsonify({"error": "Invalid ZIP code format"}), 400
    if not name_pattern.match(data.get('name', '')):
        return jsonify({"error": "Name contains invalid characters"}), 400
    if not phone_pattern.match(data.get('phone', '')):
        return jsonify({"error": "Invalid phone number format"}), 400
    if len(data.get('notes', '')) > 500:
        return jsonify({"error": "Notes cannot exceed 500 characters"}), 400
    # --- END OF VALIDATION ---

    # Check for slot availability (your original logic, still good)
    appointment_date = data.get("appointmentDateString") # Use the formatted string
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
        # --- 3. UPDATED DATABASE LOGIC TO MATCH NEW MODELS.PY ---
        
        # Step A: Find or create the Appliance objects based on the names sent from the frontend.
        # The frontend sends a list of names, e.g., ["Dryer", "Washer"]
        appliance_names = data.get('appliances', [])
        appliance_objs = []
        for name in appliance_names:
            appliance, created = models.Appliance.objects.get_or_create(name=name)
            appliance_objs.append(appliance)

        # Step B: Create the main IntakeLog object with all the simple fields.
        # Note we are NOT including 'appliances' here yet.
        intake_log = models.IntakeLog.objects.create(
            ticket_id=ticket_id,
            brand=data.get('brand'),
            under_warranty=data.get('isUnderWarranty') == 'yes',
            problem=data.get('problem'),
            name=data.get('name'),
            phone=data.get('phone'),
            address=data.get('address'),
            time_window=slot,
            appointment_date=appointment_date,
            serial_number=data.get('serialNumber', ''),
            notes=data.get('notes', ''),
            status="NEW",
        )

        # Step C: Now that the intake_log exists, associate the appliance objects with it.
        # This is the correct way to handle a ManyToManyField.
        if appliance_objs:
            intake_log.appliances.set(appliance_objs)

        # Your original email logic is still perfect.
        email_payload = {**data, "ticket_id": ticket_id}
        # send_handyman_email(email_payload)
        # send_customer_confirmation(email_payload)

        return jsonify({"message": "Job scheduled successfully", "ticket_id": ticket_id}), 201
    except Exception as e:
        print(f"Intake submission failed: {e}")
        return jsonify({"error": "Internal server error"}), 500

# --- NO CHANGES TO THE ROUTES BELOW THIS LINE ---
    
@app.route("/api/appliances", methods=["GET"])
def get_appliances():
    appliances_no_problems = [
        {k: v for k, v in appliance.items() if k != "problems"}
        for appliance in APPLIANCES
    ]
    return jsonify(appliances_no_problems)

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

# --- 2. ADDED THIS NEW ROUTE ---
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
# --- END OF NEW ROUTE ---

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True, use_reloader=False)
