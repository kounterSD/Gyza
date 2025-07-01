from django.urls import path
from . import views

urlpatterns =[
    path('create/', views.CreateGlyph.as_view(), name='CreateGlyph'),
    path('<uuid>/read/', views.ReadGlyph.as_view(), name='ReadGlyph'),
    path('user/<int:id>/', views.ListAuthorGlyphs.as_view(), name='ListAuthorGlyphs'),
    path('explore/', views.ListExploreGlyphs.as_view(), name='ListExplorePage'),
    path('<uuid:id>/', views.RetrieveGlyph.as_view(), name='RetrieveGlyhp')
]