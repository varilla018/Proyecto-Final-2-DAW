from django.urls import path
from . import views

urlpatterns = [
    # Tus otras rutas aquí
    path('register/', views.register_user, name='register_user'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('users/me/', views.UserView.as_view(), name='user'),
]
