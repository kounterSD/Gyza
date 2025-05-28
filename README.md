# Gyza 

## Contents
1. [Introduction](#introduction)
2. [Implementation](#implementation)
3. [Example](#Example)

## Introduction
Gyza is a Python-based console app that lets you encrypt text and hide it inside images by encoding it into randomly seeded pixel values. Given the correct secret key, it can also extract and decrypt the hidden message back into readable text.

## Implementation 
The flowchart below covers the logic of encryption and image encoder.
<img width="570" alt="Screenshot 2025-05-28 at 3 22 45 PM" src="https://github.com/user-attachments/assets/e8e9d940-864d-4942-ad6e-e263b10cfcbc" />

## Example

You can find the files in `/example`.

Glyph Creation(To hide data in an image):

`python3 gyza.py create --plaintext-file ./example/plaintext -i ./example/image.jpg -s EmNEm -o ./example/glyph.png`

Read Glyph(To read data from a glyph):

`python3 gyza.py read -i ./example/glyph.png -s EmNEm`

Output:

```
Total pixels: 589824
Decoded text: Hi my name is slim shady
<hidden>
 Secret:supersecret

<hidden>

```




