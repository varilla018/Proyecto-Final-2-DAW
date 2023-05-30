from django.shortcuts import get_object_or_404
from rest_framework import status, views
from rest_framework.response import Response
from tournaments.models import Tournament
from .serializers import TournamentSerializer
from players.models import Player
from django.db.models import Q
import random

class TournamentView(views.APIView):

    def get(self, request, pk, format=None):
        tournament = get_object_or_404(Tournament, pk=pk)
        serializer = TournamentSerializer(tournament)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TournamentSerializer(data=request.data)
        if serializer.is_valid():
            tournament = serializer.save()
            
            # Obtén los 16 mejores jugadores
            top_players = Player.objects.order_by('-ranking')[:16]

            # Excluye a los mejores jugadores del queryset para seleccionar jugadores aleatorios
            other_players = Player.objects.exclude(pk__in=top_players.values_list('pk', flat=True))

            # Selecciona jugadores aleatorios
            random_players = random.sample(list(other_players), 16)

            # Combina las listas
            all_players = list(top_players) + random_players

            # Mezcla los jugadores y divídelos en pares
            random.shuffle(all_players)
            player_pairs = [all_players[i:i + 2] for i in range(0, len(all_players), 2)]
            
            # Haz lo que necesites hacer con los pares de jugadores aquí
            # Estos serán tus partidos para el torneo

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
