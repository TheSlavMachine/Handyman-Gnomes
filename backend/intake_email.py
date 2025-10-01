import logging
import os
import resend
import html
import json
from dotenv import load_dotenv
from urllib.parse import quote_plus
from datetime import datetime

load_dotenv()
resend.api_key = os.environ.get("RESEND_API_KEY")

logger = logging.getLogger(__name__)

HANDYMAN_EMAIL = os.environ.get("HANDYMAN_EMAIL", "xamorris@proton.me")
base_url = os.getenv("PUBLIC_APP_URL", "http://127.0.0.1:5000")

TIME_SLOTS_FILE = "info_jsons/time_slots.json"

with open(TIME_SLOTS_FILE, "r") as f:
    TIME_SLOTS = json.load(f)

def send_handyman_email(payload):
    try:
        ticket = html.escape(payload.get('ticket_id', ''))
        email = payload.get('email')
        if not email:
            logger.error("No reply_to email provided for handyman email.")
            return
        reachout_url_base = f"{base_url}/api/appointment-action?ticket_id={ticket}&action=reachout&time="
        time_window = payload.get('time_window', 'Morning') 
        available_slots = TIME_SLOTS.get(time_window, [])

        time_slots_html = ""
        for slot in available_slots:
            url = f"{reachout_url_base}{html.escape(slot)}"
            time_slots_html += f"<tr><td><a href='{url}'>{html.escape(slot)}</a></td></tr>"

        reachout_option_url = f"{base_url}/api/appointment-action?ticket_id={ticket}&action=reachout&time=contact_client"
        time_slots_html += f"<tr><td><a href='{reachout_option_url}'>Will reach out to the client</a></td></tr>"

        address = payload.get('address', '')
        maps_dest = quote_plus(address)
        google_maps_url = f"https://www.google.com/maps/search/?api=1&query={maps_dest}"
        maps_link = f"<a href='{html.escape(google_maps_url)}'>{html.escape(address)}</a>"

        # Handle 'appliances' as an array
        appliances_list = payload.get('appliances', [])
        appliances_str = ", ".join(appliances_list)

        warranty_str = "Yes" if payload.get('isUnderWarranty') == 'yes' else "No"

        # Format date as DD-MM-YYYY for display
        raw_date = payload.get('appointmentDateString', '')
        date_display = raw_date
        try:
            if raw_date:
                parsed = datetime.fromisoformat(str(raw_date))
                date_display = parsed.strftime('%d-%m-%Y')
        except Exception:
            pass

        subject = f"New Job Request: {ticket}"
        html_content = f"""
        <h1>New Job Request</h1>
        <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td>Ticket ID</td><td>{ticket}</td></tr>
            <tr><td>Name</td><td>{html.escape(payload.get('name', ''))}</td></tr>
            <tr><td>Phone</td><td><a href="tel:{html.escape(payload.get('phone', ''))}">{html.escape(payload.get('phone', ''))}</a></td></tr>
            <tr><td>Email</td><td>{html.escape(email)}</td></tr>
            <tr><td>Address</td><td>{maps_link}</td></tr>
            <tr><td>Date</td><td>{html.escape(date_display)}</td></tr>
            <tr><td>Time Window</td><td>{html.escape(payload.get('timeWindow', ''))}</td></tr>
            <tr style="background-color: #f2f2f2;"><th colspan="2">Service Details</th></tr>
            <tr><td>Appliance(s)</td><td>{html.escape(appliances_str)}</td></tr>
            <tr><td>Brand</td><td>{html.escape(payload.get('brand', ''))}</td></tr>
            <tr><td>Problem</td><td>{html.escape(payload.get('problem', ''))}</td></tr>
            <tr><td>Under Warranty?</td><td>{warranty_str}</td></tr>
            <tr><td>Serial Number</td><td>{html.escape(payload.get('serialNumber', ''))}</td></tr>
            <tr><td>Notes</td><td>{html.escape(payload.get('notes', ''))}</td></tr>
        </table>
        <h1>Time Slot Actions</h1>
        <table border="1" cellpadding="5">
            {time_slots_html}
        </table>
        """

        resend.Emails.send({
            "from": "Handyman Gnomes <onboarding@resend.dev>",
            "to": [HANDYMAN_EMAIL],
            "subject": subject,
            "html": html_content,
            # --- FIX 3: 'reply_to' must be a string, not a list with a typo ---
            "reply_to": email,
        })
    except Exception as e:
        logger.error(f"Failed to send handyman email: {e}")

def send_customer_confirmation(payload):
    try:
        email = payload.get('email')
        if not email: return
        
        name = payload.get('name', 'Customer')
        ticket_id = payload.get('ticket_id', 'N/A')
        
        subject = f"Your Handyman Job Ticket: {ticket_id}"
        html_content = f"""
        <p>Hello, {html.escape(name)}!</p>
        <p>Thank you for submitting your service request!</p>
        <p>Your ticket ID is <strong>{html.escape(ticket_id)}</strong>.</p>
        <p>We will contact you soon to confirm your appointment details.</p>
        <p>— Sun State Appliance Repair Team</p>
        """

        FROM_EMAIL = os.getenv("RESEND_FROM", "Sun State Appliance Repair <sunstate@sunstatear.com>")

        resend.Emails.send({
            "from": FROM_EMAIL,
            "to": [email],
            "subject": subject,
            "html": html_content,
        })
    except Exception as e:
        logger.error(f"Failed to send customer email: {e}")
def send_customer_appointment_time(payload):
    try:
        email = payload.get('email')
        if not email:
            return

        ticket = html.escape(payload.get('ticket_id', 'N/A'))
        name = payload.get('name', 'Customer')
        handyman_selected_time = html.escape(payload.get('selected_time', 'TBD'))

        html_content = f"""
        <p>Hello, {html.escape(name)}!</p>
        <p>A time has been confirmed for your service request.</p>
        <p>Your ticket ID is <strong>{ticket}</strong>.</p>
        <p>Your confirmed appointment time is:</p>
        <p><strong>{handyman_selected_time}</strong></p>
        <p>— Sun State Appliance Repair Team</p>
        """

        FROM_EMAIL = os.getenv("RESEND_FROM", "Sun State Appliance Repair <sunstate@sunstatear.com>")

        resend.Emails.send({
            "from": FROM_EMAIL,
            "to": [email],
            "subject": f"Confirmed Appointment for Ticket {ticket}",
            "html": html_content,
        })
    except Exception as e:
        logger.error(f"Failed to send customer appointment email: {e}")
