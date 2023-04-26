from django.urls import path
from . import views

urlpatterns = [
    # Tus otras rutas aquí
    path('register/', views.register_user, name='register_user'),
]
