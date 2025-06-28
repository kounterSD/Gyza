from django.urls import path
from . import views

urlpatterns =[
    path('create/', views.CreateGlyph.as_view(), name='CreateGlyph'),
    path('<uuid>/read/', views.ReadGlyph.as_view(), name='ReadGlyph'),
    path('<int:id>/', views.ListGlyph.as_view(), name='ListGlyph')
]