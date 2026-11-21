from django.urls import path
from .views import ActivityListView, ActivityLogTrailerView

urlpatterns = [
    path('', ActivityListView.as_view(), name='activity-list'),
    path('trailer/', ActivityLogTrailerView.as_view(), name='activity-trailer'),
]
