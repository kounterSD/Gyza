from django.urls import path
from . import views

urlpatterns =[
    path('create/', views.CreateGlyph.as_view(), name='CreateGlyph')
]