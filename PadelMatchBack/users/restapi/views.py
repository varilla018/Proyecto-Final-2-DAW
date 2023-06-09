from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RegisterUserSerializer, LoginSerializer, UserSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from users.models import Users  # Asegúrate de que el import sea correcto
from players.models import Player  # Asegúrate de que el import sea correcto
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes

import random

def assign_players_to_new_user(user):
    # Obtén todos los jugadores
    all_players = Player.objects.all()

    # Divide los jugadores en dos grupos, uno para los 30 primeros y otro para el resto
    top_30_players = all_players.filter(ranking__lte=30)
    other_players = all_players.filter(ranking__gt=30)

    # Selecciona un jugador al azar de los 30 primeros
    top_player = random.choice(top_30_players)

    # Selecciona 4 jugadores al azar del resto
    other_players = random.sample(list(other_players), 4)

    # Asigna los jugadores al usuario
    user.players.add(top_player)
    for player in other_players:
        user.players.add(player)

@api_view(['POST'])
def register_user(request):
    serializer = RegisterUserSerializer(data=request.data)
    if serializer.is_valid():
        response_data = serializer.save()
        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(email=email, password=password)

        if not user:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_404_NOT_FOUND)

        # Asigna jugadores si el usuario está iniciando sesión por primera vez
        if not user.players.exists():
            assign_players_to_new_user(user)
            update_user_points(user)  # Actualiza los puntos del usuario después de asignar jugadores

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    user = request.user
    if user is not None:
        user_id = user.id
        return Response({'user_id': user_id})
    else:
        return Response({'error': 'Usuario no autenticado'}, status=status.HTTP_401_UNAUTHORIZED)

def update_user_points(user):
    # Calcula la suma total de puntos de los jugadores del usuario
    total_points = sum(player.points for player in user.players.all())

    # Actualiza el campo userPoints del usuario
    user.userPoints = total_points
    user.save()

class UserView(generics.RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        # Retorna el usuario asociado con la solicitud
        return self.request.user

