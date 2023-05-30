from django.urls import path
from . import views

urlpatterns = [
    path('tournaments/', views.TournamentView.as_view()),
    path('tournaments/<int:pk>/', views.TournamentView.as_view()),
    path('tournaments/<int:pk>/matches/', views.TournamentMatchesView.as_view()),
    path('tournaments/<int:pk>/final/', views.TournamentFinalView.as_view(), name='tournament-final'),
]
