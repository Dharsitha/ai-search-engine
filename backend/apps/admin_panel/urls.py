from django.urls import path
from .views import (
    AdminItemsView, AdminItemDetailView, AdminCategoriesView,
    AdminUsersView, AdminUserActionView, AdminAnalyticsView,
    AdminModelRetrainView
)

urlpatterns = [
    path('items/', AdminItemsView.as_view(), name='admin-items'),
    path('items/<int:pk>/', AdminItemDetailView.as_view(), name='admin-item-detail'),
    path('categories/', AdminCategoriesView.as_view(), name='admin-categories'),
    path('users/', AdminUsersView.as_view(), name='admin-users'),
    path('users/<int:pk>/', AdminUserActionView.as_view(), name='admin-user-action'),
    path('analytics/', AdminAnalyticsView.as_view(), name='admin-analytics'),
    path('model/retrain/', AdminModelRetrainView.as_view(), name='admin-model-retrain'),
]
