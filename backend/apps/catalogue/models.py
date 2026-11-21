from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, blank=True, default='Film')
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Item(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
    genres = models.ManyToManyField(Genre, related_name='items', blank=True)
    description = models.TextField()
    tagline = models.CharField(max_length=255, blank=True)
    poster_url = models.TextField()
    trailer_url = models.TextField(blank=True, default='')  # Can be full YouTube URL or Video ID
    release_year = models.IntegerField(default=2024)
    creator = models.CharField(max_length=255, blank=True, default='MindRec Studio')
    avg_rating = models.FloatField(default=8.5)
    popularity = models.FloatField(default=80.0)
    embedding = models.JSONField(default=list, blank=True)  # vector representation
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-popularity', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.category.name})"
