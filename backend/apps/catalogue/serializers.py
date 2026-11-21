from rest_framework import serializers
from .models import Category, Genre, Item

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'slug']

class CategorySerializer(serializers.ModelSerializer):
    item_count = serializers.IntegerField(source='items.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'description', 'item_count']

class ItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    genres = GenreSerializer(many=True, read_only=True)
    genre_ids = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(), many=True, source='genres', write_only=True, required=False
    )
    is_liked = serializers.SerializerMethodField()
    user_rating = serializers.SerializerMethodField()
    match_score = serializers.SerializerMethodField()
    explanation = serializers.SerializerMethodField()
    rag_verified = serializers.SerializerMethodField()
    is_exact_match = serializers.SerializerMethodField()
    is_web_grounded = serializers.SerializerMethodField()
    recommendation_id = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = [
            'id', 'title', 'category', 'category_id', 'genres', 'genre_ids',
            'description', 'tagline', 'poster_url', 'trailer_url',
            'release_year', 'creator', 'avg_rating', 'popularity',
            'is_liked', 'user_rating', 'match_score', 'explanation', 'rag_verified',
            'is_exact_match', 'is_web_grounded', 'recommendation_id', 'created_at'
        ]

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Check pre-fetched liked_set or query
            return obj.likes.filter(user=request.user).exists()
        return False

    def get_user_rating(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            rating = obj.ratings.filter(user=request.user).first()
            return rating.score if rating else None
        return None

    def get_match_score(self, obj):
        return getattr(obj, 'match_score', None)

    def get_explanation(self, obj):
        return getattr(obj, 'explanation', None)

    def get_rag_verified(self, obj):
        return getattr(obj, 'rag_verified', False)

    def get_is_exact_match(self, obj):
        return getattr(obj, 'is_exact_match', False)

    def get_is_web_grounded(self, obj):
        return getattr(obj, 'is_web_grounded', False)

    def get_recommendation_id(self, obj):
        return getattr(obj, 'recommendation_id', None)
