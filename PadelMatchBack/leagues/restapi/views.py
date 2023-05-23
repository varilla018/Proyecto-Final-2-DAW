from rest_framework import viewsets
from leagues.models import League
from leagues.restapi.serializers import LeagueSerializer

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
