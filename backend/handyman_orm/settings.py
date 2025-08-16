INSTALLED_APPS = [
    'core',
    'django.contrib.contenttypes',
    'django.contrib.auth',  # required for migrations
]

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

DATABASE_TYPE = os.getenv("DJANGO_DB", "sqlite")

if DATABASE_TYPE == "postgres":
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv("POSTGRES_DB"),
            'USER': os.getenv("POSTGRES_USER"),
            'PASSWORD': os.getenv("POSTGRES_PASSWORD"),
            'HOST': os.getenv("POSTGRES_HOST", "localhost"),
            'PORT': os.getenv("POSTGRES_PORT", "5432"),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / "db.sqlite3",
        }
    }