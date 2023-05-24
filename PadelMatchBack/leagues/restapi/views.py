from rest_framework import viewsets, status
from rest_framework.response import Response
from leagues.models import League
from leagues.restapi.serializers import LeagueSerializer

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

    def create(self, request, *args, **kwargs):
        creator_id = request.headers.get('User-Id')  # Obtener el user_id de las cabeceras HTTP
        if not creator_id:
            return Response({"detail": "User-Id header is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data.copy()  # Crear una copia del data del request
        data['creator'] = creator_id  # Agregar el user_id al data

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
