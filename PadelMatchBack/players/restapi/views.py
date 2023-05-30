from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from users.restapi.views import update_user_points
from players.models import Player
from players.restapi.serializers import PlayerSerializer
from users.models import Users
from django.utils import timezone
from datetime import timedelta
from django.db import transaction
from django.db.models import F

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    @action(detail=False, methods=['get'])
    def user_players(self, request):
        user_id = request.headers.get('User-Id')  # Obtener el user_id de las cabeceras HTTP
        if not user_id:
            return Response({"detail": "User-Id header is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        user_players = Player.objects.filter(users__id=user_id)  # Obtener todos los jugadores del usuario
        serializer = self.get_serializer(user_players, many=True)  # Serializar todos los jugadores

        return Response(serializer.data)  # Devolver los jugadores serializados

    @action(detail=False, methods=['get'])
    def random_players(self, request):
            last_updated = timezone.now() - timedelta(days=1)

            if not hasattr(self, 'random_players_last_updated') or self.random_players_last_updated < last_updated:
                self.random_players_last_updated = timezone.now()
                self.random_players_cache = list(Player.objects.order_by('?')[:6])

            serializer = self.get_serializer(self.random_players_cache, many=True)

            return Response(serializer.data)
    @action(detail=False, methods=['post'])
    def buy_player(self, request):
        user_id = request.headers.get('User-Id')  # Obtener el user_id de las cabeceras HTTP
        player_id = request.data.get('player_id')

        try:
            user = Users.objects.get(id=user_id)
            player = Player.objects.get(id=player_id)
        except (Users.DoesNotExist, Player.DoesNotExist):
            return Response({"detail": "User or Player not found."}, status=status.HTTP_404_NOT_FOUND)

        if user.cash < player.price:
            return Response({"detail": "Not enough cash."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            user.players.add(player)
            user.cash = F('cash') - player.price  # Restar el precio del jugador al cash del usuario
            user.save()

            update_user_points(user)  # Actualizar los puntos del usuario después de comprar el jugador


        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def sell_player(self, request):
        user_id = request.headers.get('User-Id')  # Obtener el user_id de las cabeceras HTTP
        player_id = request.data.get('player_id')

        try:
            user = Users.objects.get(id=user_id)
            player = Player.objects.get(id=player_id)
        except (Users.DoesNotExist, Player.DoesNotExist):
            return Response({"detail": "User or Player not found."}, status=status.HTTP_404_NOT_FOUND)

        if player not in user.players.all():
            return Response({"detail": "User does not own this player."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            user.players.remove(player)
            user.cash = F('cash') + player.price  # Añadir el precio del jugador al cash del usuario
            user.save()

            update_user_points(user)  # Actualizar los puntos del usuario después de vender el jugador


        return Response(status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['get'])
    def user_cash(self, request):
        user_id = request.headers.get('User-Id')  # Obtener el user_id de las cabeceras HTTP
        if not user_id:
            return Response({"detail": "User-Id header is required."}, status=status.HTTP_400_BAD_REQUEST)
    
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"cash": user.cash})  # Devolver el cash del usuario
