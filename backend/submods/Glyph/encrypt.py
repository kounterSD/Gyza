from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

TOTAL_CIPHERTEXT_LENGTH = 37440 # including the IV, should be divisible by 48
CIPHERTEXT_LENGTH = TOTAL_CIPHERTEXT_LENGTH - 16 # without the IV

# AES(plaintext, key, iv) ;MODE_CBC --> returns IV + ciphertext; len = 37440
def aes_encryption(plaintext: str, key: bytes) -> bytes:
    assert len(key) ==32

    data = plaintext.encode('utf-8')
    if len(data) > CIPHERTEXT_LENGTH:
        raise ValueError("Plaintext too long to fit in fixed ciphertext size")

    padded_data = pad(data, 16)

    if len(padded_data) < CIPHERTEXT_LENGTH:
        padded_data += b'\x00' * (CIPHERTEXT_LENGTH - len(padded_data))

    iv = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ciphertext = cipher.encrypt(padded_data)
    return iv + ciphertext

#Decryption ct-->pt :)
def aes_decryption(encrypted_data: bytes, key: bytes) -> str:
    #Extract IV
    iv = encrypted_data[:16]
    ciphertext = encrypted_data[16:]

    #Decrypt
    cipher=AES.new(key, AES.MODE_CBC, iv)
    padded_data=cipher.decrypt(ciphertext)

    #unpad properly
    unpadded=padded_data.rstrip(b'\x00')
    return unpad(unpadded, 16).decode('utf-8')