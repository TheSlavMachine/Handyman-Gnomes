from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.workiz import create_workiz_job

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/api/schedule', methods=['POST'])
def schedule_service():
    data = request.json
    response = create_workiz_job(data)
    if response.get("success"):
        return jsonify({"message": "Job scheduled successfully"}), 201
    else:
        return jsonify({"error": "Scheduling failed"}), 400

if __name__ == '__main__':
    app.run(debug=True)