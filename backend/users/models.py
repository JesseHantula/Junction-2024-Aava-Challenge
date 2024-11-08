from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# Create your models here.

class ExtendUser(AbstractUser):

    username = models.CharField(max_length=150, unique=True, default=uuid.uuid4)
    email = models.EmailField(blank=False, unique=True, max_length=255, verbose_name='email')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['email']
 