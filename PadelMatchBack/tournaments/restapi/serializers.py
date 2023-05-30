from rest_framework import serializers
from tournaments.models import Tournament
from leagues.models import League

from rest_framework import serializers
from tournaments.models import Tournament
from leagues.models import League

class TournamentSerializer(serializers.ModelSerializer):
    leagues = serializers.SlugRelatedField(
        slug_field='name',
        queryset=League.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Tournament
        fields = ['id', 'name', 'location', 'start_time', 'end_time', 'leagues']

