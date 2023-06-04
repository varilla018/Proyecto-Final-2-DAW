import jwt
from django.http import JsonResponse
from django.conf import settings
from users.models import Users  # Reemplaza esto con el import correcto para tu modelo de Usuario personalizado

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        authorization_header = request.headers.get('Authorization')

        unauthenticated_routes = [
            '/login',
            '/register'
            # Agrega cualquier otra ruta que no deba requerir autenticación
        ]

        if any(route in request.path for route in unauthenticated_routes):
            return self.get_response(request)

        if not authorization_header:
            return JsonResponse({'error': 'No se proporcionó el token de autorización'}, status=401)

        try:
            token = authorization_header.split(' ')[1]
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            request.user = Users.objects.get(id=decoded_token['user_id'])

            # Asegúrate de tener un campo 'is_admin' en tu modelo de usuario.
            if request.user.id == 18:  # Reemplaza 18 con el id del usuario que debe ser administrador
                request.user.is_admin = True
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Token inválido'}, status=401)
        except Users.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=401)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=401)

        response = self.get_response(request)

        return response
