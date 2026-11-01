from concurrent.futures import ThreadPoolExecutor
from datetime import date
from threading import Barrier
from unittest.mock import patch

from django.db import close_old_connections
from django.test import TransactionTestCase

from core.models import AppointmentSlot, IntakeLog
from core.services import SlotFullError, create_intake_log


class IntakeBookingRaceConditionTests(TransactionTestCase):
    def build_payload(self, index):
        return {
            "appliances": ["Dishwasher"],
            "brand": "LG",
            "isUnderWarranty": "yes",
            "problem": "Leaking water",
            "name": f"Customer {index}",
            "phone": "5551234567",
            "address": "123 Example Street, Phoenix, AZ 85001",
            "email": f"customer{index}@example.com",
            "serialNumber": f"SN-{index}",
            "description": "Water is leaking from the base.",
            "notes": "Please call before arriving.",
        }

    def test_sixth_booking_for_same_slot_is_rejected(self):
        booking_date = date(2026, 5, 10)

        with patch("core.services.send_handyman_email"), patch(
            "core.services.send_customer_confirmation"
        ):
            for index in range(5):
                create_intake_log(
                    data=self.build_payload(index),
                    ticket_id=f"ticket-{index}",
                    appointment_date=booking_date,
                    slot="Morning",
                )

            with self.assertRaises(SlotFullError):
                create_intake_log(
                    data=self.build_payload(99),
                    ticket_id="ticket-99",
                    appointment_date=booking_date,
                    slot="Morning",
                )

        slot = AppointmentSlot.objects.get(
            appointment_date=booking_date,
            time_window="Morning",
        )
        self.assertEqual(slot.booked_count, 5)
        self.assertEqual(IntakeLog.objects.count(), 5)

    def test_concurrent_bookings_do_not_overbook(self):
        booking_date = date(2026, 5, 11)
        barrier = Barrier(8)

        def attempt_booking(index):
            close_old_connections()
            barrier.wait()
            try:
                create_intake_log(
                    data=self.build_payload(index),
                    ticket_id=f"parallel-ticket-{index}",
                    appointment_date=booking_date,
                    slot="Afternoon",
                )
                return "booked"
            except SlotFullError:
                return "full"
            finally:
                close_old_connections()

        with patch("core.services.send_handyman_email"), patch(
            "core.services.send_customer_confirmation"
        ):
            with ThreadPoolExecutor(max_workers=8) as executor:
                results = list(executor.map(attempt_booking, range(8)))

        self.assertEqual(results.count("booked"), 5)
        self.assertEqual(results.count("full"), 3)
        self.assertEqual(
            AppointmentSlot.objects.filter(
                appointment_date=booking_date,
                time_window="Afternoon",
            ).count(),
            1,
        )

        slot = AppointmentSlot.objects.get(
            appointment_date=booking_date,
            time_window="Afternoon",
        )
        self.assertEqual(slot.booked_count, 5)
        self.assertEqual(
            IntakeLog.objects.filter(
                appointment_date=booking_date,
                time_window="Afternoon",
            ).count(),
            5,
        )
