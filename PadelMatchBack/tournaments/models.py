from django.db import models
from users.models import Users
from leagues.models import League

class Tournament(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()  # Nuevo campo para la fecha de finalización
    players = models.ManyToManyField('players.Player', related_name='tournaments')
    leagues = models.ManyToManyField(League, related_name='tournaments')  # Relación con el modelo League

    def __str__(self):
        return self.name
