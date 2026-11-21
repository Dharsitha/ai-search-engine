from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer

class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(user=request.user)
        unread_count = notifications.filter(is_read=False).count()
        serializer = NotificationSerializer(notifications[:20], many=True)
        return Response({
            'unread_count': unread_count,
            'results': serializer.data
        })

    def post(self, request):
        # Mark all as read
        Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
        return Response({'message': 'All notifications marked as read.'})

class NotificationMarkReadView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            notif = Notification.objects.get(pk=pk, user=request.user)
            notif.is_read = True
            notif.save()
            return Response({'status': 'marked_read', 'id': notif.id})
        except Notification.DoesNotExist:
            return Response({'error': {'code': 'not_found', 'message': 'Notification not found'}}, status=status.HTTP_404_NOT_FOUND)
