from rest_framework import generics
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, TokenObtainPairSerializer
from .models import CustomUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

#Register User using drf generic view
class UserRegisterView(generics.CreateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class = RegisterSerializer

#User Login View - access token + refresh token http-only cookie
class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        refresh = response.data.get("refresh")
        #Set http-only cookie
        response.set_cookie(
            key="refresh_token",
            value=refresh,
            httponly=True,
            path="/"
        )

        del response.data["refresh"]

        return response

#Refresh token endpoint
class UserTokenRefreshView(APIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token is None:
            return Response({"detail":"refresh_token is missing"}, status=400)
        try:
            refresh = RefreshToken(refresh_token)
            access = refresh.access_token
            return Response({
                "access":f"{access}"
            })
        except Exception as e:
            return Response({"detail": "Invalid refresh token"}, status=401)

class UserProfileView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        return Response({"message" : f"Congratulations you are logged in, {request.user.username} "})