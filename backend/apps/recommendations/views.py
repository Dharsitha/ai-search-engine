from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone
from .models import UserPreference, Recommendation, RecommendationFeedback
from .serializers import UserPreferenceSerializer, RecommendationSerializer
from .engine import compute_user_recommendations, get_surprise_item
from apps.catalogue.models import Category, Genre, Item
from apps.catalogue.serializers import ItemSerializer
from apps.activity.models import Like, Activity
from apps.activity.serializers import ActivitySerializer

class UserPreferencesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        prefs = UserPreference.objects.filter(user=request.user).select_related('category', 'genre')
        serializer = UserPreferenceSerializer(prefs, many=True)
        selected_category_names = list(prefs.values_list('category__name', flat=True).distinct())
        return Response({
            'preferences': serializer.data,
            'selected_categories': selected_category_names
        })

    def put(self, request):
        # Format: {'categories': ['Movies & Series', 'Technology'], 'genres': ['Sci-Fi', 'Adventure']}
        categories_input = request.data.get('categories', [])
        genre_ids_input = request.data.get('genres', [])

        # Reset or update preferences
        UserPreference.objects.filter(user=request.user).delete()

        # Save selected categories
        created_prefs = []
        for cat_item in categories_input:
            category_obj = None
            if isinstance(cat_item, int) or (isinstance(cat_item, str) and cat_item.isdigit()):
                category_obj = Category.objects.filter(id=int(cat_item)).first()
            elif isinstance(cat_item, str):
                category_obj = Category.objects.filter(name__iexact=cat_item).first() or Category.objects.filter(slug__iexact=cat_item).first()

            if category_obj:
                p = UserPreference.objects.create(user=request.user, category=category_obj, weight=1.0)
                created_prefs.append(p)

        # Trigger immediate recomputation
        updated_recs = compute_user_recommendations(request.user, limit=8)
        recs_serializer = ItemSerializer(updated_recs, many=True, context={'request': request})

        return Response({
            'message': 'Preferences updated successfully. Recommendations recalculated.',
            'selected_categories': [p.category.name for p in created_prefs],
            'recommendations': recs_serializer.data
        })

class RecommendationsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        category_filter = request.query_params.get('category', '').strip()
        limit = int(request.query_params.get('limit', 100))

        # Check authenticated or guest user
        user = request.user
        items = compute_user_recommendations(user, category_filter=category_filter, limit=limit)
        serializer = ItemSerializer(items, many=True, context={'request': request})

        return Response({
            'count': len(items),
            'category_filter': category_filter or 'All',
            'results': serializer.data
        })

from .rag import generate_rag_recommendations

class RecommendationsRAGView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.query_params.get('q', '').strip()
        category = request.query_params.get('category', '').strip()
        limit = int(request.query_params.get('limit', 100))

        rag_output = generate_rag_recommendations(
            user=request.user,
            query=query,
            category_name=category,
            limit=limit
        )

        serializer = ItemSerializer(rag_output['results'], many=True, context={'request': request})
        exact_match_data = None
        if rag_output.get('exact_match'):
            exact_match_data = ItemSerializer(rag_output['exact_match'], context={'request': request}).data

        return Response({
            'query': rag_output.get('query', query),
            'category': rag_output.get('category', category or 'All'),
            'rag_mode': rag_output.get('rag_mode', 'RAG'),
            'ai_insights': rag_output.get('ai_insights', ''),
            'total_retrieved': rag_output.get('total_retrieved', len(rag_output['results'])),
            'is_internet_grounded': rag_output.get('is_internet_grounded', False),
            'exact_match': exact_match_data,
            'results': serializer.data
        })

    def post(self, request):
        query = request.data.get('query', '').strip()
        category = request.data.get('category', '').strip()
        limit = int(request.data.get('limit', 100))

        rag_output = generate_rag_recommendations(
            user=request.user,
            query=query,
            category_name=category,
            limit=limit
        )

        serializer = ItemSerializer(rag_output['results'], many=True, context={'request': request})
        exact_match_data = None
        if rag_output.get('exact_match'):
            exact_match_data = ItemSerializer(rag_output['exact_match'], context={'request': request}).data

        return Response({
            'query': rag_output.get('query', query),
            'category': rag_output.get('category', category or 'All'),
            'rag_mode': rag_output.get('rag_mode', 'RAG'),
            'ai_insights': rag_output.get('ai_insights', ''),
            'total_retrieved': rag_output.get('total_retrieved', len(rag_output['results'])),
            'is_internet_grounded': rag_output.get('is_internet_grounded', False),
            'exact_match': exact_match_data,
            'results': serializer.data
        })

class SurpriseMeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        surprise_item = get_surprise_item(request.user)
        if not surprise_item:
            return Response({'error': {'code': 'no_items', 'message': 'No surprise items available.'}}, status=status.HTTP_404_NOT_FOUND)

        if request.user.is_authenticated:
            Activity.objects.create(
                user=request.user,
                item=surprise_item,
                activity_type='recommended',
                meta={'surprise': True}
            )

        serializer = ItemSerializer(surprise_item, context={'request': request})
        return Response({
            'item': serializer.data,
            'message': "Here is your surprise AI recommendation! ✨"
        })

class RecommendationFeedbackView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk=None):
        is_positive = request.data.get('is_positive')
        if is_positive is None:
            return Response({'error': {'code': 'missing_field', 'message': 'is_positive (boolean) is required'}}, status=status.HTTP_400_BAD_REQUEST)

        rec = None
        if pk:
            rec = Recommendation.objects.filter(id=pk, user=request.user).first()

        fb = RecommendationFeedback.objects.create(
            user=request.user,
            recommendation=rec,
            is_positive=bool(is_positive),
            notes=request.data.get('notes', '')
        )

        # Trigger fast re-rank
        recs = compute_user_recommendations(request.user, limit=8)
        recs_data = ItemSerializer(recs, many=True, context={'request': request}).data

        return Response({
            'message': 'Thank you! Your feedback helps our AI personalize future recommendations.',
            'is_positive': bool(is_positive),
            'updated_recommendations': recs_data
        })

class DashboardSummaryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if not request.user.is_authenticated:
            # Fallback guest preview with Dharsitha values from Figure 1
            sample_recent = Activity.objects.filter(item__isnull=False).select_related('item')[:3]
            sample_recent_data = ActivitySerializer(sample_recent, many=True).data if sample_recent.exists() else [
                {'item_title': 'Interstellar', 'item_poster': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&auto=format&fit=crop&q=80', 'activity_type': 'recommended', 'time_ago': '2h ago'},
                {'item_title': 'K-Dramas', 'item_poster': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=120&auto=format&fit=crop&q=80', 'activity_type': 'viewed', 'time_ago': '1d ago'},
                {'item_title': 'Anime Picks', 'item_poster': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=120&auto=format&fit=crop&q=80', 'activity_type': 'recommended', 'time_ago': '2d ago'},
            ]
            return Response({
                'user': {
                    'username': 'dharsitha',
                    'full_name': 'Dharsitha',
                    'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                    'greeting': 'Hello, Dharsitha! 👋',
                    'subtitle': 'Keep exploring your interests!'
                },
                'points': 120,
                'liked_count': 8,
                'history_count': 12,
                'recent_activity': sample_recent_data
            })

        user = request.user
        liked_count = Like.objects.filter(user=user).count()
        history_count = Activity.objects.filter(user=user).count()
        recent_activities = Activity.objects.filter(user=user).select_related('item')[:4]
        recent_data = ActivitySerializer(recent_activities, many=True).data

        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'full_name': user.full_name or user.username.capitalize(),
                'avatar': user.avatar,
                'greeting': f"Hello, {user.full_name or user.username.capitalize()}! 👋",
                'subtitle': 'Keep exploring your interests!'
            },
            'points': user.points,
            'liked_count': liked_count,
            'history_count': history_count,
            'recent_activity': recent_data
        })
