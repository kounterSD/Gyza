from django.db import models
import uuid
from users.models import CustomUser

class Glyph(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False
    )
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.TextField(max_length=100)
    image = models.ImageField(upload_to='glyph_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title