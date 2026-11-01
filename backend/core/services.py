import logging
import time

from django.db import IntegrityError, OperationalError, connections, transaction
from django.db.models import F

from core import models
from intake_email import send_customer_confirmation, send_handyman_email

logger = logging.getLogger(__name__)
SQLITE_LOCK_RETRY_LIMIT = 10
SQLITE_LOCK_RETRY_DELAY_SECONDS = 0.1


class SlotFullError(Exception):
    pass


def _normalize_appliance_names(data):
    raw_names = data.get("appliances") or (
        [data.get("appliance")] if data.get("appliance") else []
    )
    seen = set()
    normalized = []

    for raw_name in raw_names:
        name = (raw_name or "").strip()
        if not name or name in seen:
            continue
        seen.add(name)
        normalized.append(name)

    return normalized


def _send_intake_emails(payload):
    try:
        send_handyman_email(payload)
        send_customer_confirmation(payload)
    except Exception:
        logger.exception("Failed to send intake emails for ticket %s", payload.get("ticket_id"))


def _is_retryable_sqlite_lock(exc):
    message = str(exc).lower()
    return (
        connections["default"].vendor == "sqlite"
        and (
            "database is locked" in message
            or "database table is locked" in message
        )
    )


def _create_intake_log_once(*, data, ticket_id, appointment_date, slot, appliance_names):
    with transaction.atomic():
        reserved = models.AppointmentSlot.objects.filter(
            appointment_date=appointment_date,
            time_window=slot,
            booked_count__lt=F("capacity"),
        ).update(booked_count=F("booked_count") + 1)

        if reserved == 0:
            try:
                with transaction.atomic():
                    models.AppointmentSlot.objects.create(
                        appointment_date=appointment_date,
                        time_window=slot,
                        capacity=models.DEFAULT_SLOT_CAPACITY,
                        booked_count=1,
                    )
                reserved = 1
            except IntegrityError:
                reserved = models.AppointmentSlot.objects.filter(
                    appointment_date=appointment_date,
                    time_window=slot,
                    booked_count__lt=F("capacity"),
                ).update(booked_count=F("booked_count") + 1)

        if reserved == 0:
            raise SlotFullError(f"{slot} slots are full for {appointment_date}")

        appliance_objs = []
        for name in appliance_names:
            appliance, _ = models.Appliance.objects.get_or_create(name=name)
            appliance_objs.append(appliance)

        intake_log = models.IntakeLog.objects.create(
            ticket_id=ticket_id,
            brand=data.get("brand") or "Unknown",
            under_warranty=(data.get("isUnderWarranty") == "yes"),
            problem=data.get("problem"),
            problem_other=data.get("problem_other", ""),
            name=data.get("name"),
            phone=data.get("phone"),
            address=data.get("address"),
            email=data.get("email"),
            time_window=slot,
            appointment_date=appointment_date,
            serial_number=data.get("serialNumber") or data.get("serial_number", ""),
            description=data.get("description", ""),
            notes=data.get("notes", ""),
            status="NEW",
        )

        if appliance_objs:
            intake_log.appliances.set(appliance_objs)

        email_payload = {
            **data,
            "appliances": appliance_names,
            "ticket_id": ticket_id,
            "appointmentDateString": str(appointment_date),
            "timeWindow": slot,
            "time_window": slot,
        }
        transaction.on_commit(
            lambda payload=email_payload: _send_intake_emails(payload)
        )

    return intake_log


def create_intake_log(*, data, ticket_id, appointment_date, slot):
    appliance_names = _normalize_appliance_names(data)

    for attempt in range(SQLITE_LOCK_RETRY_LIMIT + 1):
        try:
            return _create_intake_log_once(
                data=data,
                ticket_id=ticket_id,
                appointment_date=appointment_date,
                slot=slot,
                appliance_names=appliance_names,
            )
        except OperationalError as exc:
            if attempt >= SQLITE_LOCK_RETRY_LIMIT or not _is_retryable_sqlite_lock(exc):
                raise
            time.sleep(min(SQLITE_LOCK_RETRY_DELAY_SECONDS * (attempt + 1), 0.75))
