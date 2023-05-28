from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from users.restapi.serializers import UserSerializer
from leagues.models import League
from leagues.restapi.serializers import LeagueSerializer
from users.models import Users
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

    def create(self, request, *args, **kwargs):
        creator_id = request.headers.get('User-Id')  # Obtener el user_id de las cabeceras HTTP
        if not creator_id:
            return Response({"detail": "User-Id header is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Comprobar si el usuario es creador y aún pertenece a 2 ligas
        created_and_joined_leagues_count = League.objects.filter(creator__id=creator_id, users__id=creator_id).count()
        if created_and_joined_leagues_count >= 2:
            return Response({"detail": "A user cannot be the creator and still be in more than 2 leagues."}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()  # Crear una copia del data del request
        data['creator'] = creator_id  # Agregar el user_id al data

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # Obtener la instancia de la liga creada y añadir al creador a la lista de usuarios.
        league = League.objects.get(id=serializer.data['id'])
        league.users.add(creator_id)
        league.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['post'])
    def join(self, request):
        codeLeague = request.data.get('codeLeague')
        user_id = request.headers.get('User-Id')
        if not codeLeague or not user_id:
            return Response({"detail": "Both User-Id header and codeLeague are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Comprobar si el usuario ya pertenece a 5 ligas
        joined_leagues_count = League.objects.filter(users__id=user_id).count()
        if joined_leagues_count >= 5:
            return Response({"detail": "A user cannot belong to more than 5 leagues."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            league = League.objects.get(codeLeague=codeLeague)
        except League.DoesNotExist:
            return Response({"detail": "No league found with this code."}, status=status.HTTP_404_NOT_FOUND)

        league.users.add(user)
        league.save()

        # Update user's leagues list after adding a league
        user_leagues = League.objects.filter(users__id=user_id)
        serializer = self.get_serializer(user_leagues, many=True)

        return Response(serializer.data)  # Return updated leagues

    @action(detail=False, methods=['get'])
    def user_leagues(self, request):
        user_id = request.headers.get('User-Id')  # Obtener el user_id de las cabeceras HTTP
        if not user_id:
            return Response({"detail": "User-Id header is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        user_leagues = League.objects.filter(users__id=user_id)  # Obtener todas las ligas a las que pertenece el usuario
        serializer = self.get_serializer(user_leagues, many=True)  # Serializar todas las ligas

        return Response(serializer.data)  # Devolver las ligas serializadas

    @action(detail=False, methods=['post'])
    def leave(self, request):
        league_id = request.data.get('leagueId')
        user_id = request.headers.get('User-Id')
        if not league_id or not user_id:
            return Response({"detail": "Both User-Id header and leagueId are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            league = League.objects.get(id=league_id)
        except League.DoesNotExist:
            return Response({"detail": "No league found with this id."}, status=status.HTTP_404_NOT_FOUND)

        if user not in league.users.all():
            return Response({"detail": "User is not part of this league."}, status=status.HTTP_400_BAD_REQUEST)

        league.users.remove(user)
        league.save()

        # Update user's leagues list after removing a league
        user_leagues = League.objects.filter(users__id=user_id)
        serializer = self.get_serializer(user_leagues, many=True)

        return Response(serializer.data)  # Return updated leagues

    @action(detail=False, methods=['delete'])
    def delete(self, request):
        league_id = request.data.get('leagueId')
        user_id = request.headers.get('User-Id')
        if not league_id or not user_id:
            return Response({"detail": "Both User-Id header and leagueId are required."}, status=status.HTTP_400_BAD_REQUEST)
    
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            league = League.objects.get(id=league_id)
        except League.DoesNotExist:
            return Response({"detail": "No league found with this id."}, status=status.HTTP_404_NOT_FOUND)
    
        if league.creator.id != user.id:
            return Response({"detail": "You are not the creator of this league."}, status=status.HTTP_403_FORBIDDEN)

        league.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    

    @action(detail=True, methods=['get'])
    def get_league_users(self, request, pk=None):  # nota el 'self' y el cambio de 'id' a 'pk'
        league = get_object_or_404(League, pk=pk)
        users = league.users.all()  # o lo que sea apropiado para obtener los usuarios de la liga
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    
