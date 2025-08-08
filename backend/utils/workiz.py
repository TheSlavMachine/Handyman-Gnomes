from typing import Dict
import uuid

REQUIRED_FIELDS = ["name", "phone", "address", "datetime", "description"]

def create_workiz_job(payload: Dict) -> str:
    return str(uuid.uuid4())

def HandleScheduleRequest(data : Dict) -> Dict:
    missing = [field for field in REQUIRED_FIELDS if not data.get(field)]
    if missing:
        return {
            "success": False,
            "error": f"Missing required fields: {', '.join(missing)}"
        }
    
    try:
        workiz_job_id = create_workiz_job({
            "name": data["name"],
            "phone": data["phone"],
            "address": data["address"],
            "datetime": data["datetime"],
            "description": data["description"],
        })

        if workiz_job_id:
            return {"success": True}
        else:
            return {
                "success": False,
                "error": "Workiz job creation failed"
            }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }