import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from datetime import timedelta

class User(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, blank=True)
    avatar = models.TextField(blank=True, default='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80')
    bio = models.TextField(blank=True, default='Tech and film explorer on MindRec 🚀')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    is_verified = models.BooleanField(default=True)
    points = models.IntegerField(default=120)  # Matches 120 points on Figure 1
    personalization_enabled = models.BooleanField(default=True)
    theme_preference = models.CharField(max_length=10, default='dark')

    def __str__(self):
        return f"{self.username} ({self.full_name or self.email})"

class AuthToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tokens')
    key = models.CharField(max_length=128, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_blacklisted = models.BooleanField(default=False)

    @classmethod
    def create_for_user(cls, user, expires_in_days=7):
        token_str = uuid.uuid4().hex + uuid.uuid4().hex
        expires_at = timezone.now() + timedelta(days=expires_in_days)
        return cls.objects.create(user=user, key=token_str, expires_at=expires_at)

    def is_valid(self):
        return not self.is_blacklisted and timezone.now() < self.expires_at

class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reset_tokens')
    token = models.CharField(max_length=128, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)

    @classmethod
    def create_for_user(cls, user):
        token_str = uuid.uuid4().hex
        expires = timezone.now() + timedelta(minutes=30)
        return cls.objects.create(user=user, token=token_str, expires_at=expires)

    def is_valid(self):
        return not self.used and timezone.now() < self.expires_at
