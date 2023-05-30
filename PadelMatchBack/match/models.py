from django.db import models
from players.models import Player
from tournaments.models import Tournament

class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    pair1 = models.ManyToManyField(Player, related_name="matches_as_pair1")
    pair2 = models.ManyToManyField(Player, related_name="matches_as_pair2")
    winner = models.ManyToManyField(Player, related_name="won_matches")
    start_time = models.DateTimeField()
    set1_score = models.CharField(max_length=5) # String en formato "6-4"
    set2_score = models.CharField(max_length=5)
    set3_score = models.CharField(max_length=5, null=True, blank=True)  # El set 3 podría no existir
