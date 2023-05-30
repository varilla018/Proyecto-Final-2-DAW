from rest_framework import serializers
from match.models import Match

class MatchSerializer(serializers.ModelSerializer):
    pair1 = serializers.StringRelatedField(many=True)
    pair2 = serializers.StringRelatedField(many=True)
    winner = serializers.StringRelatedField(many=True)

    class Meta:
        model = Match
        fields = ['id', 'tournament', 'pair1', 'pair2', 'winner', 'set1_score', 'set2_score', 'set3_score']
