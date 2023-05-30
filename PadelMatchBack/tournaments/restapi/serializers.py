from rest_framework import serializers
from tournaments.models import Tournament
from leagues.models import League

class TournamentSerializer(serializers.ModelSerializer):
    league = serializers.SlugRelatedField(
        slug_field='name',
        queryset=League.objects.all()
    )

    class Meta:
        model = Tournament
        fields = ['id', 'name', 'location', 'start_date', 'end_date', 'league']
