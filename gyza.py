import argparse
from Glyph import glyph
from PIL import Image

def create_glyph(args):
    img = Image.open(args.image_file)
    if args.plaintext:
        plaintext = args.plaintext
    elif args.plaintext_file:
        with open(args.plaintext_file, "r") as f:
            plaintext = f.read()
    else:
        raise ValueError("Either -p/--plaintext or --plaintext-file must be provided.")
    glyph_img = glyph.create(plaintext, args.secret, img)
    glyph_img.show()
    glyph_img.save(args.output or "glyph.png", "PNG")
    print("Glyph created and saved as glyph.png")

def read_glyph(args):
    img = Image.open(args.filepath)
    decoded_text = glyph.read(img, args.secret)
    print("Decoded text:", decoded_text)

def main():
    parser = argparse.ArgumentParser(description="Gyza")
    subparsers = parser.add_subparsers(dest="command", required=True, help="Subcommands")

    # Create subcommand
    create_parser = subparsers.add_parser("create", help="Create a glyph from plaintext")

    group = create_parser.add_mutually_exclusive_group(required=True)
    group.add_argument('-p', '--plaintext', help='Plaintext message to encode')
    group.add_argument('--plaintext-file', help='Path to a file containing the plaintext')

    create_parser.add_argument("-i", "--image-file", required=True, help="Enter filepath of image")
    create_parser.add_argument("-s", "--secret", required=True, help="Enter secret")
    create_parser.add_argument("-o", "--output", help="Enter output filepath; use .png")
    create_parser.set_defaults(func=create_glyph)

    # Read subcommand
    read_parser = subparsers.add_parser("read", help="Read a glyph using secret")
    read_parser.add_argument("-i", "--filepath", required=True, help="Enter glyph image filepath")
    read_parser.add_argument("-s", "--secret", required=True, help="Enter secret/password")
    read_parser.set_defaults(func=read_glyph)

    # Parse and run
    args = parser.parse_args()
    args.func(args)

if __name__ == "__main__":
    main()
