test_payload = {
    "ticket_id": "TEST-123",
    "appliances": "Dishwasher\\LG\\Washing Machine\\DG",
    "problem": "Leaking water",
    "name": "Xander Morris",
    "phone": "123-456-7890",
    "address": "123 Test Lane",
    "time_window": "Afternoon",
    "email": "delivered@resend.dev",
    "serial_number": "SN123456",
    "description": "These machines don't work!",
    "notes": "I love you!"
}

from intake_email import send_handyman_email, send_customer_confirmation

send_handyman_email(test_payload)
send_customer_confirmation(test_payload)