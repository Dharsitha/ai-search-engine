from django.urls import path
from .views import UserProfileView, ChangePasswordView

urlpatterns = [
    path('me/', UserProfileView.as_view(), name='user-me'),
    path('me/change-password/', ChangePasswordView.as_view(), name='user-change-password'),
]
