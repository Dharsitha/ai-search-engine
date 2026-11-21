from django.urls import path
from .views import (
    ItemListView, ItemDetailView, ItemSimilarView,
    ItemLikeView, ItemRateView, CategoriesListView
)

urlpatterns = [
    path('', ItemListView.as_view(), name='item-list'),
    path('taxonomy/', CategoriesListView.as_view(), name='taxonomy-list'),
    path('<int:pk>/', ItemDetailView.as_view(), name='item-detail'),
    path('<int:pk>/similar/', ItemSimilarView.as_view(), name='item-similar'),
    path('<int:pk>/like/', ItemLikeView.as_view(), name='item-like'),
    path('<int:pk>/rate/', ItemRateView.as_view(), name='item-rate'),
]
