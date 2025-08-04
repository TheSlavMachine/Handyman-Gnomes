from django.db import models

# Create your models here.
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