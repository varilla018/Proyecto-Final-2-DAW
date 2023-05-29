from django.urls import path, include
from rest_framework.routers import DefaultRouter
from players.restapi.views import PlayerViewSet

router = DefaultRouter()
router.register(r'players', PlayerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('players/user_players/', PlayerViewSet.as_view({'get': 'user_players'}), name='user_players'),
    path('players/random_players/', PlayerViewSet.as_view({'get': 'random_players'}), name='random_players'),
    path('players/buy_player/', PlayerViewSet.as_view({'post': 'buy_player'}), name='buy_player'),
    path('players/sell_player/', PlayerViewSet.as_view({'post': 'sell_player'}), name='sell_player'),
    path('players/user_cash/', PlayerViewSet.as_view({'get': 'user_cash'}), name='user_cash'),

]
