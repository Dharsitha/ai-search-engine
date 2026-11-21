from django.db import models
from apps.authentication.models import User
from apps.catalogue.models import Item

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'item')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} liked {self.item.title}"

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ratings')
    score = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'item')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} rated {self.item.title} ({self.score}★)"

class Activity(models.Model):
    ACTIVITY_TYPES = (
        ('view', 'Viewed Item'),
        ('trailer', 'Watched Trailer'),
        ('like', 'Liked Item'),
        ('rate', 'Rated Item'),
        ('search', 'Searched'),
        ('recommended', 'Recommended'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='activities', null=True, blank=True)
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    meta = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Activities'
        ordering = ['-created_at']

    def __str__(self):
        item_title = self.item.title if self.item else 'N/A'
        return f"{self.user.username} - {self.activity_type} - {item_title}"
