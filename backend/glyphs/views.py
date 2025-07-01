from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import submods.Glyph.glyph as gyza
from PIL import Image
from .models import Glyph
from .serializers import CreateGlyphSerializer, GlyphSerializer

class CreateGlyph(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    queryset =  Glyph.objects.all()
    serializer_class = CreateGlyphSerializer

class ReadGlyph(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, uuid):
        key = request.data.get("key")
        if not key:
            return Response({"error":"Key missing from request body"}, status=400)
        try:
            glyph = Glyph.objects.get(pk=uuid)
        except Glyph.DoesNotExist:
            return Response({
                "status":"failure",
                "error": "Glyph not found."
            }, status=404)

        try:
            image = Image.open(glyph.image)
            print("Reading glyph with key:", key)
            print("Glyph image path:", glyph.image.path)
            plaintext = gyza.read(image, key)
        except Exception as e:
            if "Padding is incorrect" in str(e):
                return Response({
                    "detail": "Incorrect key. Unable to decrypt the glyph."
                }, status=400)
            return Response({
                "status": "failure",
                "error": f"Error reading glyph: {str(e)}"
            }, status=400)
        return Response({"plaintext": f"{plaintext}"})

# List a particular Author's Glyphs
class  ListAuthorGlyphs(generics.ListAPIView):
    serializer_class = GlyphSerializer
    def get_queryset(self):
        user_id = self.kwargs.get("id")
        return Glyph.objects.filter(author__id=user_id)

# List all Glyphs for explore page
class ListExploreGlyphs(generics.ListAPIView):
    serializer_class = GlyphSerializer
    def get_queryset(self):
        return Glyph.objects.all()

# Retrieve a single Glyph
class RetrieveGlyph(generics.RetrieveAPIView):
    serializer_class = GlyphSerializer
    queryset = Glyph.objects.all()  # Let DRF handle lookup
    lookup_field = 'id'