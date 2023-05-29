from django.urls import path, include
from rest_framework.routers import DefaultRouter
from leagues.restapi.views import LeagueViewSet

router = DefaultRouter()
router.register(r'leagues', LeagueViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('leagues/user_leagues/', LeagueViewSet.as_view({'get': 'user_leagues'}), name='user_leagues'),
    path('leagues/leave/', LeagueViewSet.as_view({'post': 'leave'}), name='leave_league'),
    path('leagues/delete/', LeagueViewSet.as_view({'delete': 'delete'}), name='delete_league'),

]

