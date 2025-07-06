import re
from symbol import continue_stmt

from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "password", "confirmPassword"]
        extra_kwargs={'password':{'write_only' : True}}
    def create(self, validated_data):
        validated_data.pop("confirmPassword")
        user = CustomUser.objects.create_user(**validated_data)
        return user

    def validate(self, data):
        if data["password"] != data["confirmPassword"]:
            raise ValidationError("Passwords do not match")
        return data

    def validate_password(self, value):
        # Should have at least one number.
        # Should have at least one uppercase and one lowercase character.
        # Should have at least one special symbol.
        # Should be between 6 to 20 characters long.
        reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"

        pat = re.compile(reg)
        mat=re.search(pat, value)

        if not mat:
            raise ValidationError("Choose a stronger password")
        return value

class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom claims
        user = self.user
        data.update({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })

        return data


