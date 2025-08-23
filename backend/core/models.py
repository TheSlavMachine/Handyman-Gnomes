from django.db import models

class IntakeLog(models.Model):
    TWIN_CHOICES = [
        ("Morning", "Morning"),
        ("Afternoon", "Afternoon"),
        ("Evening", "Evening"),
        ("Flexible", "Flexible"),
    ]

    ticket_id = models.CharField(max_length=16, unique=True, db_index=True)
    appliance = models.CharField(max_length=64)
    problem = models.CharField(max_length=64)
    problem_other = models.CharField(max_length=120, blank=True)
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=32)
    address = models.CharField(max_length=255)
    time_window = models.CharField(max_length=16, choices=TWIN_CHOICES)
    appointment_date = models.DateField()
    serial_number = models.CharField(max_length=64, blank=True)
    description = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=16, default="NEW")  # NEW / CONTACTED / CLOSED
    created_at = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]