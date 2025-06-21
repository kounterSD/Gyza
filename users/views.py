from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer
from .models import CustomUser

#Register User using drf generic view
class UserRegisterView(generics.CreateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class = RegisterSerializer

class UserProfileView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        return Response({"message" : f"Congratulations you are logged in, {request.user.username} "})