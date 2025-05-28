import random

from numpy.f2py.auxfuncs import throw_error


# Deterministic seeded random pixel selection
def get_pixels(width, height, seed, pixel_num):
    rng = random.Random(seed)
    total_pixels = width * height
    if total_pixels < 12480:
        throw_error ("The image size must be greater than 112*112")
    print("Total pixels:", total_pixels)
    indices = rng.sample(range(total_pixels), pixel_num)
    pixel_arr=[(idx % width, idx //width) for idx in indices]
    return pixel_arr
# encoding the ciphertext into an image
def encode_image(ct: bytes, pixels , pixel_arr: list):
    i = 0
    for x, y in pixel_arr:
        pixels[x, y] = (ct[i], ct[i + 1], ct[i + 2])
        i += 3

def decode_image(pixels, pixel_arr: list):
    ct = bytearray()
    for x, y in pixel_arr:
        ct.extend(pixels[x, y])
    return ct