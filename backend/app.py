import os 
import django 
import json
import uuid

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "handyman_orm.settings")
django.setup()

from django.utils import timezone
from intake_email import send_handyman_email, send_customer_confirmation, send_customer_appointment_time

from flask import Flask, request, jsonify
from flask_cors import CORS
from core import models

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# I will create the README.md file later after more discussion with Erofey and Neil.

APPLIANCES_FILE = "info_jsons/appliances.json"

with open(APPLIANCES_FILE, "r") as f:
    APPLIANCES = json.load(f)

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

@app.route('/api/intake', methods=['POST'])
def intake_request():
    data = request.json
    required_fields = ["appliances", "problem", "name", "phone", "address", "time_window", "appointment_date"]
    missing_fields = [f for f in required_fields if not data.get(f)]

    if missing_fields: 
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
    
    appliances_list = data.get("appliances")
    if not isinstance(appliances_list, list):
        return jsonify({"error": "appliances must be a list"}), 400
    
    appointment_date = data["appointment_date"]
    slot = data["time_window"]

    existing_count = models.IntakeLog.objects.filter(
        appointment_date=appointment_date,
        time_window=slot
    ).count()

    if slot in ["Morning", "Afternoon"] and existing_count >= 5:
        return jsonify({"error": f"{slot} slots are full for {appointment_date}"}), 400
    
    ticket_id = str(uuid.uuid4())

    try:
        models.IntakeLog.objects.create(
            ticket_id=ticket_id,
            appliance=appliances_list,
            problem=data["problem"],
            problem_other=data.get("problem_other", ""),
            name=data["name"],
            phone=data["phone"],
            address=data["address"],
            time_window=data["time_window"],
            serial_number=data.get("serial_number", ""),
            description=data.get("description", ""),
            notes=data.get("notes", ""),
            status="NEW",
            created_at=timezone.now()
        )

        send_handyman_email(data)
        send_customer_confirmation(data)

        return jsonify({"message": "Job scheduled successfully", "ticket_id": ticket_id}), 201
    except Exception as e:
        print(f"Intake submission failed: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
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

if __name__ == '__main__':
    app.run(debug=True)