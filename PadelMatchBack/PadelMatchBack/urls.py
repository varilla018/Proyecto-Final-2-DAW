from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.restapi.urls')),
    path('', include('leagues.restapi.urls')),

]
