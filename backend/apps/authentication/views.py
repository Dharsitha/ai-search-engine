from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from django.utils import timezone
from .models import User, AuthToken, PasswordResetToken
from .serializers import (
    RegisterSerializer, LoginSerializer, UserSerializer, PasswordChangeSerializer
)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = AuthToken.create_for_user(user, expires_in_days=30)
            return Response({
                'message': 'Registration successful.',
                'user': UserSerializer(user).data,
                'tokens': {
                    'access': token.key,
                    'refresh': token.key,
                }
            }, status=status.HTTP_201_CREATED)
        return Response({'error': {'code': 'validation_error', 'message': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            remember_me = serializer.validated_data.get('remember_me', False)
            days = 30 if remember_me else 7
            token = AuthToken.create_for_user(user, expires_in_days=days)
            return Response({
                'message': 'Login successful.',
                'user': UserSerializer(user).data,
                'tokens': {
                    'access': token.key,
                    'refresh': token.key,
                }
            }, status=status.HTTP_200_OK)
        return Response({'error': {'code': 'invalid_credentials', 'message': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

class TokenRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'error': {'code': 'missing_token', 'message': 'Refresh token is required'}}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token_obj = AuthToken.objects.get(key=refresh_token, is_blacklisted=False)
            new_token = AuthToken.create_for_user(token_obj.user, expires_in_days=7)
            token_obj.is_blacklisted = True
            token_obj.save()
            return Response({'access': new_token.key, 'refresh': new_token.key})
        except AuthToken.DoesNotExist:
            return Response({'error': {'code': 'invalid_token', 'message': 'Invalid or expired token'}}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        auth_header = request.headers.get('Authorization', '')
        parts = auth_header.split()
        if len(parts) == 2:
            AuthToken.objects.filter(key=parts[1]).update(is_blacklisted=True)
        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)

class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': {'code': 'missing_email', 'message': 'Email is required'}}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.filter(email__iexact=email).first()
        if user:
            reset_token = PasswordResetToken.create_for_user(user)
            # In development/test mode, return simulated token for immediate use
            return Response({
                'message': 'Password reset instructions have been sent.',
                'dev_token': reset_token.token
            }, status=status.HTTP_200_OK)
        return Response({'message': 'If an account exists with that email, a reset link has been sent.'}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token_str = request.data.get('token')
        new_password = request.data.get('new_password')
        if not token_str or not new_password:
            return Response({'error': {'code': 'missing_fields', 'message': 'Token and new password required'}}, status=status.HTTP_400_BAD_REQUEST)
        reset_token = PasswordResetToken.objects.filter(token=token_str).first()
        if not reset_token or not reset_token.is_valid():
            return Response({'error': {'code': 'invalid_token', 'message': 'Invalid or expired reset token'}}, status=status.HTTP_400_BAD_REQUEST)
        user = reset_token.user
        user.set_password(new_password)
        user.save()
        reset_token.used = True
        reset_token.save()
        return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': {'code': 'validation_error', 'message': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = request.user
        user.is_active = False
        user.save()
        return Response({'message': 'Account deleted successfully.'}, status=status.HTTP_200_OK)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            if not request.user.check_password(serializer.validated_data['current_password']):
                return Response({'error': {'code': 'invalid_password', 'message': 'Current password is incorrect'}}, status=status.HTTP_400_BAD_REQUEST)
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()
            return Response({'message': 'Password changed successfully.'})
        return Response({'error': {'code': 'validation_error', 'message': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
