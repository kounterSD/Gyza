# Gyza

## Contents
1. [Introduction](#introduction)
2. [Implementation](#implementation)
3. [Use Case](#usecase)

## Introduction
Welcome to Gyza - A visual diary for encrypted thoughts — post your words as art, and let others unlock them with a key.

It's a creative social platform where users post encrypted thoughts that are transformed into generative art (Glyphs) — the message remains private, but the emotion is public. With the right key, anyone can decrypt and reveal the original message behind the art.

## Implementation
This outlines the Tech Stack used and an Architectural overview of the Web Application.

### Tech Stack
1. Frontend    React + p5.js	
2. Backend     Django
3. Database    MySQL


### Architecture
Gyza will use a 3-tier-architecture:
1. Presentation Layer:
    1. User dashboard - create Glyphs, view profiles.
    2. Input Notes --> Encrypted on CLient-Side --> Ciphertext send to server.
2. Logic Layer:
    1. Creation of Glyphs(Deterministic generative art) from ciphertext.
    2. Handle Authentication, API Requests.
    3. Glyph Solver logic --> Ciphertext from a Glyph.
3. Database
    1. Glyph Storage
    2. User database
## UseCase
Gyza enables private communication in public space — like posting a secret diary page as a painting, and only those with the key can read the words behind the brushstrokes.

This section outlines the look and feel of the web application, specifically, the UI/UX elements.

### UI/UX

#### Public Feed

1. Trending Glyph Posts
2. Search Bar

#### Profile Pages

1. Glyph Posts
2. Comments, Interactions
3. User Profile - pfp, followers

#### Glyph Creation Page

1. Input Text Field - Notes
2. Encryption Key Input Field

### User Story

As a user, I want to write a personal or emotional message, encrypt it with a secret key, and share it as a piece of generative art on a public feed — so that others can admire the art, and only those I trust can decrypt and read what I actually wrote.


