from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

app_name = "users"
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),

    path('register/', views.UserRegisterView.as_view(), name="register"),
    path('profile/', views.UserProfileView.as_view(), name="user_profile")
]

