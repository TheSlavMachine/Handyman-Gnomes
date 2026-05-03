# backend/core/models.py

from django.db import models

TIME_WINDOW_CHOICES = [
    ("Morning", "Morning"),
    ("Afternoon", "Afternoon"),
]

DEFAULT_SLOT_CAPACITY = 5


# 1. We re-introduce this model to hold our list of appliances.
class Appliance(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name


class IntakeLog(models.Model):
    TWIN_CHOICES = TIME_WINDOW_CHOICES

    ticket_id = models.CharField(max_length=36, unique=True, db_index=True)

    appliances = models.ManyToManyField(Appliance, related_name="intake_logs")
    
    brand = models.CharField(max_length=120)
    under_warranty = models.BooleanField(default=False)
    
    problem = models.CharField(max_length=64)
    problem_other = models.CharField(max_length=120, blank=True)
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=32)
    address = models.CharField(max_length=255)
    time_window = models.CharField(max_length=16, choices=TWIN_CHOICES)
    appointment_date = models.DateField()
    serial_number = models.CharField(max_length=64, blank=True)
    description = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=16, default="NEW")
    created_at = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]


class AppointmentSlot(models.Model):
    appointment_date = models.DateField()
    time_window = models.CharField(max_length=16, choices=TIME_WINDOW_CHOICES)
    capacity = models.PositiveSmallIntegerField(default=DEFAULT_SLOT_CAPACITY)
    booked_count = models.PositiveSmallIntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["appointment_date", "time_window"],
                name="unique_appointment_slot",
            ),
        ]

    def __str__(self):
        return (
            f"{self.appointment_date} {self.time_window} "
            f"({self.booked_count}/{self.capacity})"
        )
