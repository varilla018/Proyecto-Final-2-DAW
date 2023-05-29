from rest_framework import serializers
from leagues.models import League

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ['id', 'name', 'codeLeague', 'password', 'creator']

