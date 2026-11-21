from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('django-admin/', admin.site.urls),
    
    # Core API v1 Endpoints (SRS Section 7)
    path('api/v1/auth/', include('apps.authentication.urls')),
    path('api/v1/users/', include('apps.authentication.user_urls')),
    path('api/v1/preferences/', include('apps.recommendations.pref_urls')),
    path('api/v1/recommendations/', include('apps.recommendations.rec_urls')),
    path('api/v1/items/', include('apps.catalogue.urls')),
    path('api/v1/liked/', include('apps.activity.liked_urls')),
    path('api/v1/activity/', include('apps.activity.activity_urls')),
    path('api/v1/dashboard/', include('apps.recommendations.dashboard_urls')),
    path('api/v1/notifications/', include('apps.notifications.urls')),
    path('api/v1/admin/', include('apps.admin_panel.urls')),
    
    # Catch-all route to serve the React SPA for client-side routing
    re_path(r'^(?!api/|static/|django-admin/).*$', TemplateView.as_view(template_name='index.html'), name='spa'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
