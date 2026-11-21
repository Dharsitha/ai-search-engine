from rest_framework import authentication
from rest_framework import exceptions
from .models import AuthToken, User

class CustomTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return None

        token_key = parts[1]
        try:
            token_obj = AuthToken.objects.select_related('user').get(key=token_key)
            if not token_obj.is_valid():
                raise exceptions.AuthenticationFailed('Token has expired or was revoked')
            if not token_obj.user.is_active:
                raise exceptions.AuthenticationFailed('User account is inactive or disabled')
            return (token_obj.user, token_obj)
        except AuthToken.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token')
