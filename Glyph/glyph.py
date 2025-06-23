from PIL import Image
from . import encrypt, pixelmap, kdf

TOTAL_CIPHERTEXT_LENGTH = 37440 # including the IV, should be divisible by 48
CIPHERTEXT_LENGTH = TOTAL_CIPHERTEXT_LENGTH - 16 # without the IV

def create(plaintext: str, key: str, img: Image):
    keys = kdf.key_gen(key)
    pixels = img.load()
    width, height = img.size
    print("Image size:", width, height)
    pixel_count = TOTAL_CIPHERTEXT_LENGTH // 3
    pixel_arr = pixelmap.get_pixels(width, height, keys[1], pixel_count)
    ct = encrypt.aes_encryption(plaintext, keys[0])
    pixelmap.encode_image(ct, pixels, pixel_arr)
    print(f"Pixels encoded: {pixel_count}")
    return img

def read(glyph: Image, key: str):
    keys = kdf.key_gen(key)

    pixels = glyph.load()

    pixel_count = TOTAL_CIPHERTEXT_LENGTH // 3
    pixel_arr = pixelmap.get_pixels(glyph.width, glyph.height, keys[1], pixel_count)

    ct = pixelmap.decode_image(pixels, pixel_arr)
    return encrypt.aes_decryption(ct, keys[0])

