import logging
import os
import resend
import html
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.environ.get("RESEND_API_KEY")

logger = logging.getLogger(__name__)

HANDYMAN_EMAIL = os.environ.get("HANDYMAN_EMAIL", "handyman@example.com")

def send_handyman_email(payload):
    try:
        appliances_list = payload.get('appliances', [])
        appliances_str = ", ".join(html.escape(a) for a in appliances_list)

        subject = f"New Job Request: {payload['ticket_id']}"
        html_content = f"""
        <h1>New Job Request</h1>
        <table border="1" cellpadding="5">
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td>Ticket ID</td><td>{html.escape(payload['ticket_id'])}</td></tr>
            <tr><td>Appliances</td><td>{appliances_str}</td></tr>
            <tr><td>Problem</td><td>{html.escape(payload['problem'])}</td></tr>
            <tr><td>Problem Other</td><td>{html.escape(payload.get('problem_other', ''))}</td></tr>
            <tr><td>Name</td><td>{html.escape(payload['name'])}</td></tr>
            <tr><td>Phone</td><td>{html.escape(payload['phone'])}</td></tr>
            <tr><td>Address</td><td>{html.escape(payload['address'])}</td></tr>
            <tr><td>Time Window</td><td>{html.escape(payload['time_window'])}</td></tr>
            <tr><td>Serial Number</td><td>{html.escape(payload.get('serial_number', ''))}</td></tr>
            <tr><td>Description</td><td>{html.escape(payload.get('description', ''))}</td></tr>
            <tr><td>Notes</td><td>{html.escape(payload.get('notes', ''))}</td></tr>
        </table>
        """

        resend.Emails.send({
            "from": "Handyman Gnomes <onboarding@resend.dev>",
            "to": [HANDYMAN_EMAIL],
            "subject": subject,
            "html": html_content,
            "reply_to": [payload['email']],
        })
    except Exception as e:
        logger.error(f"Failed to send handyman email: {e}")
        raise

def send_customer_confirmation(payload):
    try:
        subject = f"Your Handyman Job Ticket: {payload['ticket_id']}"
        html_content = f"""
        <p>Hello, {html.escape(payload['name'])}!</p>
        <p>Thank you for submitting your service request!</p>
        <p>Your ticket ID is <strong>{html.escape(payload['ticket_id'])}</strong>.</p>
        <p>We will contact you soon to confirm your appointment.</p>
        <p>— Handyman Name</p>
        """

        resend.Emails.send({
            "from": "Handyman Gnomes <onboarding@resend.dev>",
            "to": [payload['email']],
            "subject": subject,
            "html": html_content,
            "reply_to": [payload['email']],
        })
    except Exception as e:
        logger.error(f"Failed to send customer email: {e}")
        raise