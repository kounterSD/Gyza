from PIL import Image
import io

from rest_framework import serializers
from .models import Glyph
from django.core.files.base import ContentFile
import submods.Glyph.glyph as gyza

# Serializer to handle GlyphCreate()
class CreateGlyphSerializer(serializers.ModelSerializer):
    plaintext = serializers.CharField(write_only=True, max_length=112272)
    key = serializers.CharField(write_only=True)
    class Meta:
        model = Glyph
        fields = ["id", "title", "image", "key", "plaintext"]
    def create(self, validated_data):
        original_image_raw = validated_data.pop('image')
        #converting to PIL.Image.Image instance to use in the gyza.create() method.
        original_image = Image.open(original_image_raw)

        #creating the encrypted glyph using the submodule gyza
        glyph_img = gyza.create(validated_data["plaintext"], validated_data["key"], original_image)

        #popping the temporary fields
        validated_data.pop("plaintext")
        validated_data.pop("key")

        #Creating a buffer to store image bytes
        buffer = io.BytesIO()
        # Save the PIL image to this buffer in the desired format
        glyph_img.save(buffer, format="PNG")
        # Move the buffer's cursor to the beginning
        buffer.seek(0)
        #django readable ContentFile format.
        content_file = ContentFile(buffer.read(), name=".png")

        request = self.context.get("request")
        author = request.user if request else None

        #Save the glyph in the database
        glyph = Glyph.objects.create(author=author, image=content_file, **validated_data)
        return glyph




