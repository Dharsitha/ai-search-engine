from rest_framework import serializers
from django.utils import timezone
from .models import Like, Rating, Activity
from apps.catalogue.serializers import ItemSerializer

class LikeSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)

    class Meta:
        model = Like
        fields = ['id', 'item', 'created_at']

class RatingSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'item', 'score', 'created_at']

class ActivitySerializer(serializers.ModelSerializer):
    item_title = serializers.CharField(source='item.title', read_only=True, default='')
    item_poster = serializers.CharField(source='item.poster_url', read_only=True, default='')
    item_id = serializers.IntegerField(source='item.id', read_only=True, default=None)
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = [
            'id', 'activity_type', 'item_id', 'item_title',
            'item_poster', 'meta', 'created_at', 'time_ago'
        ]

    def get_time_ago(self, obj):
        now = timezone.now()
        diff = now - obj.created_at
        seconds = diff.total_seconds()
        if seconds < 60:
            return 'Just now'
        elif seconds < 3600:
            minutes = int(seconds // 60)
            return f"{minutes}m ago"
        elif seconds < 86400:
            hours = int(seconds // 3600)
            return f"{hours}h ago"
        else:
            days = int(seconds // 86400)
            return f"{days}d ago"
