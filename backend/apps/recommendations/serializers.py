from rest_framework import serializers
from .models import UserPreference, Recommendation, RecommendationFeedback
from apps.catalogue.serializers import ItemSerializer, CategorySerializer

class UserPreferenceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = UserPreference
        fields = ['id', 'category', 'category_name', 'category_slug', 'genre', 'weight', 'updated_at']

class RecommendationSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)

    class Meta:
        model = Recommendation
        fields = ['id', 'item', 'score', 'reason', 'model_version', 'generated_at']

class RecommendationFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendationFeedback
        fields = ['id', 'recommendation', 'is_positive', 'notes', 'created_at']
