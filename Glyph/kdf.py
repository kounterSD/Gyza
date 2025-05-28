from hashlib import sha256
from Crypto.Protocol.KDF import HKDF
from Crypto.Hash import SHA512

# Generate aes_key, seed - HKDF
def key_gen(secret):
    secret_hash = sha256(secret.encode()).digest()
    salt=secret_hash[:16]
    aes_key, seed = HKDF(secret_hash, 32, salt, SHA512, 2)
    return aes_key, seed