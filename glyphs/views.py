from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Glyph
from .serializers import CreateGlyphSerializer

class CreateGlyph(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    queryset =  Glyph.objects.all()
    serializer_class = CreateGlyphSerializer




