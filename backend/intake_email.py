import logging
import os
import resend
import html
import json
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.environ.get("RESEND_API_KEY")

logger = logging.getLogger(__name__)
base_url = os.environ['PUBLIC_APP_URL']

TIME_SLOTS_FILE = "info_jsons/time_slots.json"

with open(TIME_SLOTS_FILE, "r") as f:
    TIME_SLOTS = json.load(f)

def send_handyman_email(payload):
    try:
        ticket = html.escape(payload['ticket_id'])
        reachout_url_base = f"{base_url}/api/appointment-action?ticket_id={ticket}&action=reachout&time="

        time_window = payload.get('time_window', 'Morning') 
        available_slots = TIME_SLOTS.get(time_window, [])

        appliances_list = payload.get('appliances', [])
        appliances_str = ", ".join(html.escape(a) for a in appliances_list)

        time_slots_html = ""
        for slot in available_slots:
            url = f"{reachout_url_base}{html.escape(slot)}"
            time_slots_html += f"<tr><td><a href='{url}'>{html.escape(slot)}</a></td></tr>"

        reachout_option_url = f"{base_url}/api/appointment-action?ticket_id={ticket}&action=reachout&time=contact_client"
        time_slots_html += f"<tr><td><a href='{reachout_option_url}'>Will reach out to client</a></td></tr>"

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
        <h1>Time Slots</h1>
        <table border="1" cellpadding="5">
            {time_slots_html}
        </table>
        """

        resend.Emails.send({
            "from": "Handyman Gnomes <onboarding@resend.dev>",
            "to": [payload['email']],
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

def send_customer_appointment_time(payload):
    try:
        ticket = html.escape(payload['ticket_id'])
        handyman_selected_time = html.escape(payload.get('selected_time', 'TBD'))

        html_content = f"""
        <p>Hello, {html.escape(payload['name'])}!</p>
        <p>Thank you for submitting your service request.</p>
        <p>Your ticket ID is <strong>{ticket}</strong>.</p>
        <p>The handyman has selected your appointment time:</p>
        <p><strong>{handyman_selected_time}</strong></p>
        <p>We will contact you soon if any updates are needed.</p>
        <p>— Handyman Team</p>
        """

        resend.Emails.send({
            "from": "Handyman Gnomes <onboarding@resend.dev>",
            "to": [payload['email']],
            "subject": f"Confirmed Appointment for Ticket {ticket}",
            "html": html_content,
            "reply_to": [payload['email']],
        })
    except Exception as e:
        logger.error(f"Failed to send customer appointment email: {e}")
        raise