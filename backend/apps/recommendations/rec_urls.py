from django.urls import path
from .views import (
    RecommendationsView, SurpriseMeView, RecommendationFeedbackView,
    RecommendationsRAGView
)

urlpatterns = [
    path('', RecommendationsView.as_view(), name='recommendations-list'),
    path('rag/', RecommendationsRAGView.as_view(), name='recommendations-rag'),
    path('surprise/', SurpriseMeView.as_view(), name='recommendations-surprise'),
    path('feedback/', RecommendationFeedbackView.as_view(), name='recommendations-general-feedback'),
    path('<int:pk>/feedback/', RecommendationFeedbackView.as_view(), name='recommendations-feedback'),
]
