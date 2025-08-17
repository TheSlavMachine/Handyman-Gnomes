test_payload = {
    "ticket_id": "TEST-123",
    "appliance": "Dishwasher",
    "problem": "Leaking water",
    "name": "Xander Morris",
    "phone": "123-456-7890",
    "address": "123 Test Lane",
    "time_window": "Afternoon",
    "email": "delivered@resend.dev"
}

from intake_email import send_handyman_email, send_customer_confirmation

send_handyman_email(test_payload)
send_customer_confirmation(test_payload)