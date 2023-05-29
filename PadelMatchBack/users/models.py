from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, password=None):
        if not email:
            raise ValueError("Email is required")
        if not first_name:
            raise ValueError("First name is required")
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class Users(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    cash = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Nuevo campo 'cash'

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    