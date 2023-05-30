from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Player(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    ranking = models.IntegerField()
    tournament_points = models.IntegerField(default=0) # Nuevo campo para puntos de torneo
    points = models.IntegerField()
    winrate = models.FloatField()
    price = models.FloatField()
    users = models.ManyToManyField('users.Users', related_name='players')

    def __str__(self):
        return self.name

