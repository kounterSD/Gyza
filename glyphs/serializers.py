from PIL import Image
import io

from rest_framework import serializers
from .models import Glyph
from django.core.files.base import ContentFile
from submods.Glyph.glyph import create

class CreateGlyphSerializer(serializers.ModelSerializer):
    plaintext = serializers.CharField(write_only=True, max_length=112272)
    key = serializers.CharField(write_only=True)
    class Meta:
        model = Glyph
        fields = ["id", "title", "image", "key", "plaintext"]
    def create(self, validated_data):
        original_image_raw = validated_data.pop('image')
        original_image_bytes = original_image_raw.read()
        original_image = Image.open(io.BytesIO(original_image_bytes))

        #creating the encrypted glyph using the submodule gyza
        glyph_img = create(validated_data["plaintext"], validated_data["key"], original_image)
        #Creating a buffer to store image bytes
        buffer = io.BytesIO()
        # Save the PIL image to this buffer in the desired format
        glyph_img.save(buffer, format="PNG")
        # Move the buffer's cursor to the beginning
        buffer.seek(0)
        #django readable ContentFile format.
        content_file = ContentFile(buffer.read(), name=".png")
        validated_data.pop("plaintext")
        validated_data.pop("key")

        request = self.context.get("request")
        author = request.user if request else None

        #Save the glyph in the database
        glyph = Glyph.objects.create(author=author, image=content_file, **validated_data)
        return glyph




