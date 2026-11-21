from django.urls import path
from .views import (
    RegisterView, LoginView, TokenRefreshView, LogoutView,
    PasswordResetRequestView, PasswordResetConfirmView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth-register'),
    path('login/', LoginView.as_view(), name='auth-login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    path('logout/', LogoutView.as_view(), name='auth-logout'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='auth-password-reset'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='auth-password-reset-confirm'),
]
