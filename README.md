# Gyza 

## Contents
1. [Introduction](#introduction)
2. [Implementation](#implementation)
3. [Usage](#Usage)

## Introduction
Gyza is a Python Package that lets you encrypt text and hide it inside images by encoding it into randomly seeded pixel values. Given the correct secret key, it can also extract and decrypt the hidden message back into readable text.

## Implementation 
The flowchart below covers the logic of encryption and image encoder.
<img width="570" alt="Screenshot 2025-05-28 at 3 22 45 PM" src="https://github.com/user-attachments/assets/e8e9d940-864d-4942-ad6e-e263b10cfcbc" />

## Usage

```
import Glyph.glyph as gyza
from PIL import Image

image = Image.open(<path_to_image>)
plaintext = "Information I want to hide in the image. This can 112272 bytes/ASCII chars long......"
key="$upers3cr3tPassK3y"

# To create a glyph.
glyph = gyza.create(plaintext, key, image)
glyph.show()

#To read a Glyph.
print(gyza.read(image, key))

```




