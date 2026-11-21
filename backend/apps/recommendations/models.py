from django.db import models
from apps.authentication.models import User
from apps.catalogue.models import Category, Genre, Item

class UserPreference(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='preferences')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='user_preferences')
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True, related_name='user_preferences')
    weight = models.FloatField(default=1.0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'category', 'genre')

    def __str__(self):
        return f"{self.user.username} - {self.category.name} ({self.weight})"

class Recommendation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recommendations')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='recommendation_entries')
    score = models.FloatField(default=0.0)  # 0 to 100 percentage
    reason = models.CharField(max_length=255, blank=True, default='')
    model_version = models.CharField(max_length=50, default='v1.0-hybrid')
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-score', '-generated_at']

    def __str__(self):
        return f"Rec: {self.user.username} -> {self.item.title} ({self.score:.1f}%)"

class RecommendationFeedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rec_feedbacks')
    recommendation = models.ForeignKey(Recommendation, on_delete=models.CASCADE, null=True, blank=True, related_name='feedbacks')
    is_positive = models.BooleanField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        verdict = 'Thumbs Up' if self.is_positive else 'Thumbs Down'
        return f"{self.user.username}: {verdict}"
