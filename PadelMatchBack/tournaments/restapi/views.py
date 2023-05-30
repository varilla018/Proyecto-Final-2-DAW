from django.shortcuts import get_object_or_404
from rest_framework import status, views
from rest_framework.response import Response
from match.restapi.serializers import MatchSerializer
from tournaments.models import Tournament
from .serializers import TournamentSerializer
from players.models import Player
import random
from match.models import Match  
from django.utils import timezone
from datetime import timedelta
import itertools

class TournamentView(views.APIView):

    POINTS = {
        'octavos': 20,
        'cuartos': 40,
        'semifinal': 60,
        'final': 80,
    }

    def get(self, request, pk, format=None):
        tournament = get_object_or_404(Tournament, pk=pk)
        serializer = TournamentSerializer(tournament)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TournamentSerializer(data=request.data)
        if serializer.is_valid():
            self.tournament = serializer.save()  # Guarda el torneo en self
            tournament = serializer.save()

            # Preparación de jugadores y emparejamiento
            all_players, player_pairs = self.prepare_and_pair_players()

            # Simulación de torneo y asignación de puntos
            self.simulate_tournament(player_pairs)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def prepare_and_pair_players(self):
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
        player_pairs = [(all_players[i], all_players[i + 1]) for i in range(0, len(all_players), 2)]

        return all_players, player_pairs

    def simulate_tournament(self, player_pairs):
        round = 'octavos'
        while len(player_pairs) > 1:
            winners = []
            for pair in player_pairs:
                winning_pair = self.simulate_match(*pair)
                winners.append(winning_pair)
                # Asigna puntos a los ganadores dependiendo de la ronda
                for player in winning_pair:
                    player.points += self.POINTS[round]
                    player.save()

            player_pairs = [(winners[i], winners[i + 1]) for i in range(0, len(winners), 2)]
            if round == 'octavos':
                round = 'cuartos'
            elif round == 'cuartos':
                round = 'semifinal'
            elif round == 'semifinal':
                round = 'final'

    def simulate_match(self, pair1, pair2):
        # Simula la puntuación de cada set
        sets = []
        for _ in range(3):
            score1 = random.randint(0, 6)
            score2 = random.randint(0, 6)

            # Si los puntajes son 6-6, juega un tie-break
            if score1 == 6 and score2 == 6:
                tie_break_score1 = random.randint(0, 7)
                tie_break_score2 = random.randint(0, 7)

                # Si el tie-break está empatado a 6-6, juega hasta una diferencia de 2
                while abs(tie_break_score1 - tie_break_score2) < 2:
                    tie_break_score1 += 1
                    tie_break_score2 += 1

                score1 = f"{score1}({tie_break_score1})"
                score2 = f"{score2}({tie_break_score2})"
            sets.append((score1, score2))

        # Decide el ganador basándose en el winrate de la pareja
        total_winrate_pair1 = pair1[0].winrate + pair1[1].winrate
        total_winrate_pair2 = pair2[0].winrate + pair2[1].winrate
        total_winrate = total_winrate_pair1 + total_winrate_pair2

        random_number = random.random() * total_winrate

        if random_number < total_winrate_pair1:
            winners = pair1
        elif random_number >= total_winrate_pair1:
            winners = pair2

        # Crea el partido
        match = Match()
        match.set1_score = f"{sets[0][0]}-{sets[0][1]}"
        match.set2_score = f"{sets[1][0]}-{sets[1][1]}"
        if sets[2] is not None:
            match.set3_score = f"{sets[2][0]}-{sets[2][1]}"

        # Define la hora de inicio y final del partido
        match.start_time = timezone.now()
        match.end_time = match.start_time + timedelta(hours=2)

        # Asigna el torneo y guarda el partido
        match.tournament = self.tournament
        match.save()  # Primera llamada a save() para crear un ID en la base de datos

        # Configura las relaciones muchos-a-muchos
        match.pair1.set(pair1)
        match.pair2.set(pair2)
        match.winner.set(winners)

        match.save()  # Segunda llamada a save() para guardar las relaciones muchos-a-muchos

        return winners


class TournamentMatchesView(views.APIView):  # Nueva vista
    def get(self, request, pk, format=None):
        matches = Match.objects.filter(tournament__pk=pk)
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)


class TournamentFinalView(views.APIView):
    def get(self, request, pk, format=None):
        tournament = get_object_or_404(Tournament, pk=pk)
        final_match = tournament.match_set.order_by('-end_time').first()
        if final_match is None:
            return Response({"detail": "No matches found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MatchSerializer(final_match)
        return Response(serializer.data)
