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
    serial_number = models.CharField(max_length=64, blank=True)
    description = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=16, default="NEW")  # NEW / CONTACTED / CLOSED
    created_at = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

# I kept this here just in case.
'''
from django.db import models
from django.utils.text import slugify
from django.utils import timezone

class Service(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField()
    price = models.DecimalField(max_digits = 8, decimal_places = 2)

class TeamMember(models.Model):
    name = models.CharField(max_length = 100)
    role = models.CharField(max_length = 100)
    photo_url = models.URLField()

class BlogPost(models.Model):
    title = models.CharField(max_length = 200)
    slug = models.SlugField(unique = True, blank = True)
    content = models.TextField()
    created_at = models.DateTimeField(default = timezone.now)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
'''