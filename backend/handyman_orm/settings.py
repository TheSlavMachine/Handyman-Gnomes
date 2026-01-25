INSTALLED_APPS = [
    'core',
    'django.contrib.contenttypes',
    'django.contrib.auth',  # required for migrations
]

import os
from pathlib import Path
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent

DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_TYPE = os.getenv("DJANGO_DB", "sqlite")

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.parse(DATABASE_URL, conn_max_age=600)
    }
elif DATABASE_TYPE == "postgres":
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