import re
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, PasswordResetToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'full_name', 'avatar',
            'bio', 'role', 'is_verified', 'points',
            'personalization_enabled', 'theme_preference', 'date_joined'
        ]
        read_only_fields = ['id', 'role', 'points', 'date_joined']

class RegisterSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=False)

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    def validate(self, data):
        if data.get('confirm_password') and data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        full_name = validated_data.get('full_name', '')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=full_name,
            points=120  # initial welcome points
        )
        return user

class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    remember_me = serializers.BooleanField(required=False, default=False)

    def validate(self, data):
        identifier = data.get('username_or_email')
        password = data.get('password')

        user = None
        if '@' in identifier:
            try:
                user_obj = User.objects.get(email__iexact=identifier)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None
        else:
            user = authenticate(username=identifier, password=password)

        if not user:
            raise serializers.ValidationError("Invalid credentials. Please verify your username/email and password.")
        if not user.is_active:
            raise serializers.ValidationError("Account is inactive or disabled.")

        data['user'] = user
        return data

class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value
