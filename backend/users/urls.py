from django.urls import path

from . import views

app_name = "users"
urlpatterns = [
    path('token/', views.UserTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', views.UserTokenRefreshView.as_view(), name="token_refresh"),
    path('register/', views.UserRegisterView.as_view(), name="register"),
]

