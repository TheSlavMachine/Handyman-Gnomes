import os 
import django 

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "handyman_orm.settings")
django.setup()

from core.models import Service

from flask import Flask, request, jsonify
from flask_cors import CORS
import utils.workiz as workiz_utils

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/api/schedule', methods=['POST'])
def schedule_service():
    data = request.json
    response = workiz_utils.HandleScheduleRequest(data)

    if response.get("success"):
        return jsonify({"message": "Job scheduled successfully"}), 201
    else:
        return jsonify({"error": "Scheduling failed"}), 400
    
@app.route("/services", methods=["GET"])
def get_services():
    services = list(Service.objects.all().values())
    return jsonify(services)

if __name__ == '__main__':
    app.run(debug=True)