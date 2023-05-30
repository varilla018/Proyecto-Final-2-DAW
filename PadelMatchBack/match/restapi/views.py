from django.shortcuts import get_object_or_404
from rest_framework import status, views, generics
from rest_framework.response import Response
from match.models import Match
from .serializers import MatchSerializer

class MatchView(views.APIView):

    def get(self, request, pk, format=None):
        match = get_object_or_404(Match, pk=pk)
        serializer = MatchSerializer(match)
        return Response(serializer.data)

class MatchDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer