import os 
import django 

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "handyman_orm.settings")
django.setup()

import core.models as CoreModels

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# I will create the README.md file later after more discussion with Erofey and Neil.

@app.route('/api/schedule', methods=['POST'])
def schedule_service():
    '''
    data = request.json
    # Will add the logic to schedule a service job here.

    if response.get("success"):
        return jsonify({"message": "Job scheduled successfully"}), 201
    else:
        return jsonify({"error": "Scheduling failed"}), 400
    '''
    
@app.route("/services", methods=["GET"])
def get_services():
    services = list(CoreModels.Service.objects.all().values())
    return jsonify(services)

@app.route("/team", methods=["GET"])
def get_team():
    team = list(CoreModels.TeamMember.objects.all().values())
    return jsonify(team)

# I didn't add the blog post endpoint since Erofey mentioned that it's not needed for now.

if __name__ == '__main__':
    app.run(debug=True)