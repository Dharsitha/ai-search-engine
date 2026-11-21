from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Like, Activity
from .serializers import LikeSerializer, ActivitySerializer
from apps.catalogue.models import Item

class LikedListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        likes = Like.objects.filter(user=request.user).select_related('item', 'item__category').prefetch_related('item__genres')
        serializer = LikeSerializer(likes, many=True, context={'request': request})
        return Response({
            'count': likes.count(),
            'results': serializer.data
        })

class ActivityListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        activity_filter = request.query_params.get('type')
        limit = int(request.query_params.get('limit', 50))
        activities = Activity.objects.filter(user=request.user).select_related('item')

        if activity_filter:
            activities = activities.filter(activity_type=activity_filter)

        activities = activities[:limit]
        serializer = ActivitySerializer(activities, many=True)
        return Response({
            'count': activities.count(),
            'results': serializer.data
        })

    def delete(self, request):
        Activity.objects.filter(user=request.user).delete()
        return Response({'message': 'Activity history cleared successfully.'})

class ActivityLogTrailerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        item_id = request.data.get('item_id')
        item = None
        if item_id:
            try:
                item = Item.objects.get(pk=item_id)
            except Item.DoesNotExist:
                pass

        Activity.objects.create(
            user=request.user,
            item=item,
            activity_type='trailer',
            meta={'title': item.title if item else 'Unknown'}
        )
        return Response({'status': 'logged', 'message': 'Trailer view recorded.'})
