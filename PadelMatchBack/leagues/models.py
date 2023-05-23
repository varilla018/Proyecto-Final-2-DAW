from django.db import models

from django.db import models
from users.models import Users

class League(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    codeLeague = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    users = models.ManyToManyField(Users, related_name='leagues')
    creator = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='created_leagues')

