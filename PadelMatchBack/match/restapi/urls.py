from django.urls import path
from . import views

urlpatterns = [
    path('match/', views.MatchView.as_view()),
    path('match/<int:pk>/', views.MatchDetail.as_view()),
]
