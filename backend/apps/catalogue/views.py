from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
from .models import Item, Category, Genre
from .serializers import ItemSerializer, CategorySerializer, GenreSerializer
from apps.activity.models import Like, Rating, Activity
from apps.recommendations.engine import compute_similar_items

class ItemListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.query_params.get('q', '').strip()
        category_param = request.query_params.get('category', '').strip()
        genre_param = request.query_params.get('genre', '').strip()
        sort_by = request.query_params.get('sort', 'popularity')
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('limit', 12))

        queryset = Item.objects.select_related('category').prefetch_related('genres').all()

        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(tagline__icontains=query) |
                Q(category__name__icontains=query) |
                Q(genres__name__icontains=query)
            ).distinct()

            # Record search activity if user is authenticated
            if request.user.is_authenticated and query:
                Activity.objects.create(
                    user=request.user,
                    activity_type='search',
                    meta={'query': query}
                )

        if category_param and category_param.lower() not in ['all', '']:
            c_low = category_param.lower().strip()
            if c_low in ['movies', 'movie']:
                queryset = queryset.filter(Q(category__name__icontains='Movie') | Q(genres__name__icontains='Movie'))
            elif c_low in ['series', 'serie', 'tv']:
                queryset = queryset.filter(Q(category__name__icontains='Serie') | Q(genres__name__icontains='Series'))
            elif c_low in ['documentaries', 'documentary', 'doc', 'docs']:
                queryset = queryset.filter(Q(category__name__icontains='Doc') | Q(genres__name__icontains='Doc'))
            else:
                queryset = queryset.filter(
                    Q(category__name__icontains=category_param) | Q(category__slug__icontains=category_param)
                )

        if genre_param:
            queryset = queryset.filter(
                Q(genres__name__iexact=genre_param) | Q(genres__slug__iexact=genre_param)
            )

        # Sorting options: relevance, popularity, newest, rating
        if sort_by == 'newest':
            queryset = queryset.order_by('-release_year', '-created_at')
        elif sort_by == 'rating':
            queryset = queryset.order_by('-avg_rating')
        elif sort_by == 'title':
            queryset = queryset.order_by('title')
        else:
            queryset = queryset.order_by('-popularity')

        total = queryset.count()
        start = (page - 1) * page_size
        end = start + page_size
        items = queryset[start:end]

        serializer = ItemSerializer(items, many=True, context={'request': request})
        return Response({
            'count': total,
            'page': page,
            'page_size': page_size,
            'total_pages': (total + page_size - 1) // page_size if page_size > 0 else 1,
            'results': serializer.data
        })

class ItemDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            item = Item.objects.select_related('category').prefetch_related('genres').get(pk=pk)
        except Item.DoesNotExist:
            return Response({'error': {'code': 'not_found', 'message': 'Item not found'}}, status=status.HTTP_404_NOT_FOUND)

        if request.user.is_authenticated:
            # Log view activity
            Activity.objects.create(
                user=request.user,
                item=item,
                activity_type='view'
            )

        serializer = ItemSerializer(item, context={'request': request})
        return Response(serializer.data)

class ItemSimilarView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({'error': {'code': 'not_found', 'message': 'Item not found'}}, status=status.HTTP_404_NOT_FOUND)

        similar_items = compute_similar_items(item, limit=6)
        serializer = ItemSerializer(similar_items, many=True, context={'request': request})
        return Response(serializer.data)

class ItemLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({'error': {'code': 'not_found', 'message': 'Item not found'}}, status=status.HTTP_404_NOT_FOUND)

        like_obj, created = Like.objects.get_or_create(user=request.user, item=item)
        if created:
            # Award points (+5) per FR-6.5
            request.user.points += 5
            request.user.save()
            Activity.objects.create(user=request.user, item=item, activity_type='like')

        return Response({
            'liked': True,
            'points': request.user.points,
            'message': f"Added '{item.title}' to your favorites."
        })

    def delete(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({'error': {'code': 'not_found', 'message': 'Item not found'}}, status=status.HTTP_404_NOT_FOUND)

        Like.objects.filter(user=request.user, item=item).delete()
        return Response({
            'liked': False,
            'points': request.user.points,
            'message': f"Removed '{item.title}' from favorites."
        })

class ItemRateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({'error': {'code': 'not_found', 'message': 'Item not found'}}, status=status.HTTP_404_NOT_FOUND)

        score = request.data.get('score')
        if score is None or not (1 <= float(score) <= 5):
            return Response({'error': {'code': 'invalid_score', 'message': 'Score must be between 1 and 5'}}, status=status.HTTP_400_BAD_REQUEST)

        rating_obj, created = Rating.objects.update_or_create(
            user=request.user, item=item,
            defaults={'score': float(score)}
        )
        if created:
            # Award points (+2) per FR-6.5
            request.user.points += 2
            request.user.save()

        Activity.objects.create(
            user=request.user, item=item,
            activity_type='rate', meta={'score': float(score)}
        )

        return Response({
            'message': f"Rated '{item.title}' {score} stars.",
            'score': float(score),
            'points': request.user.points
        })

class CategoriesListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Category.objects.all()
        genres = Genre.objects.all()
        return Response({
            'categories': CategorySerializer(categories, many=True).data,
            'genres': GenreSerializer(genres, many=True).data
        })
