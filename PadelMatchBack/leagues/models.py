from django.db import models
from django.db import models
from users.models import Users
from django.db import models
from users.models import Users
import uuid

class League(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    codeLeague = models.CharField(max_length=100, unique=True, editable=False)
    password = models.CharField(max_length=255, blank=True, null=True)
    users = models.ManyToManyField(Users, related_name='leagues')
    creator = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='created_leagues')

    def save(self, *args, **kwargs):
        if not self.codeLeague:
            self.codeLeague = str(uuid.uuid4())[:8]  # genera un código de liga único
        super().save(*args, **kwargs)


