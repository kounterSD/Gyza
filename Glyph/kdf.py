from hashlib import sha256
from Crypto.Protocol.KDF import HKDF
from Crypto.Hash import SHA512

# Generate aes_key, seed - HKDF
def key_gen(secret):
    secret_bytes = sha256(secret.encode()).digest()
    salt=secret_bytes[:16]
    aes_key, seed = HKDF(secret_bytes, 32, salt, SHA512, 2)
    return aes_key, seed