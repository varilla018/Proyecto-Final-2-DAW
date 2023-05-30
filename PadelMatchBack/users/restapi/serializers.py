from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from users.models import Users
from django.core.validators import EmailValidator


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
        validators=[EmailValidator(message='Ingrese un correo electrónico válido')]
    )
    password = serializers.CharField(required=True)


from rest_framework_simplejwt.tokens import RefreshToken

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = Users
        fields = ('first_name', 'email', 'password')
        extra_kwargs = {
            'first_name': {'required': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        user = Users.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            password=validated_data['password']
        )
        refresh = RefreshToken.for_user(user)
        return {
            'user': self.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['first_name', 'email', 'userPoints']  # Incluye todos los campos que quieres devolver
