from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.restapi.urls')),
    path('', include('leagues.restapi.urls')),
    path('', include('players.restapi.urls')),
    path('', include('tournaments.restapi.urls')),  # Agrega esta línea
    path('', include('match.restapi.urls')),  # Agrega esta línea
]

