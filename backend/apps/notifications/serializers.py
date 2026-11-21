from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'is_read', 'action_url', 'created_at', 'time_ago']

    def get_time_ago(self, obj):
        from django.utils import timezone
        diff = timezone.now() - obj.created_at
        sec = diff.total_seconds()
        if sec < 60:
            return 'Just now'
        elif sec < 3600:
            return f"{int(sec // 60)}m ago"
        elif sec < 86400:
            return f"{int(sec // 3600)}h ago"
        return f"{int(sec // 86400)}d ago"
