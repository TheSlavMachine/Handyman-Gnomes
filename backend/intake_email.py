import logging
import os
from resend import Resend

resend_api_key = os.environ.get("RESEND_API_KEY")
resend_client = Resend(api_key=resend_api_key)

logger = logging.getLogger(__name__)

def send_handyman_email(payload):
    try:
        subject = f"New Job Request: {payload['ticket_id']}"
        html_content = f"""
        <h1>New Job Request</h1>
        <table border="1" cellpadding="5">
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td>Ticket ID</td><td>{payload['ticket_id']}</td></tr>
            <tr><td>Appliance</td><td>{payload['appliance']}</td></tr>
            <tr><td>Problem</td><td>{payload['problem']}</td></tr>
            <tr><td>Problem Other</td><td>{payload.get('problem_other', '')}</td></tr>
            <tr><td>Name</td><td>{payload['name']}</td></tr>
            <tr><td>Phone</td><td>{payload['phone']}</td></tr>
            <tr><td>Address</td><td>{payload['address']}</td></tr>
            <tr><td>Time Window</td><td>{payload['time_window']}</td></tr>
            <tr><td>Serial Number</td><td>{payload.get('serial_number', '')}</td></tr>
            <tr><td>Description</td><td>{payload.get('description', '')}</td></tr>
            <tr><td>Notes</td><td>{payload.get('notes', '')}</td></tr>
        </table>
        """

        resend_client.emails.send(
            from_email="no-reply@handyman.com",
            to=["handyman@example.com"],
            subject=subject,
            html=html_content
        )
    except Exception as e:
        logger.error(f"Failed to send handyman email: {e}")
        raise

def send_customer_confirmation(payload):
    try:
        subject = f"Your Handyman Job Ticket: {payload['ticket_id']}"
        html_content = f"""
        <p>Hello, {payload['name']}!,</p>
        <p>Thank you for submitting your service request!</p>
        <p>Your ticket ID is <strong>{payload['ticket_id']}</strong>.</p>
        <p>We will contact you soon to confirm your appointment.</p>
        <p>— Handyman Name</p>
        """

        resend_client.emails.send(
            from_email="no-reply@handyman.com",
            to=[payload['email']], 
            subject=subject,
            html=html_content
        )
    except Exception as e:
        logger.error(f"Failed to send customer email: {e}")
        raise