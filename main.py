import argparse
from Glyph import glyph
from PIL import Image

def create_glyph_command(args):
    img = Image.open(args.image_file)
    plaintext=args.plaintext
    with open(args.plaintext_file, "r") as f:
        plaintext = f.read()
    glyph_img = glyph.create(plaintext, args.secret, img)
    glyph_img.show()
    glyph_img.save("glyph.png")
    print("Glyph created and saved as glyph.png")

def read_glyph_command(args):
    img = Image.open(args.filepath)
    decoded_text = glyph.read(img, args.secret)
    print("Decoded text:", decoded_text)

def main():
    parser = argparse.ArgumentParser(description="Gyza")
    subparsers = parser.add_subparsers(dest="command", required=True, help="Subcommands")

    # Create subcommand
    create_parser = subparsers.add_parser("create", help="Create a glyph from plaintext")
    create_parser.add_argument("-p", "--plaintext", required=False, help="Enter plaintext string")
    create_parser.add_argument("-pf", "--plaintext-file", required=True, help="Enter filepath of plaintext")
    create_parser.add_argument("-f", "--image-file", required=True, help="Enter filepath of image")
    create_parser.add_argument("-s", "--secret", required=True, help="Enter secret")
    create_parser.set_defaults(func=create_glyph_command)

    # Read subcommand
    read_parser = subparsers.add_parser("read", help="Read a glyph using secret")
    read_parser.add_argument("-f", "--filepath", required=True, help="Enter glyph image filepath")
    read_parser.add_argument("-s", "--secret", required=True, help="Enter secret/password")
    read_parser.set_defaults(func=read_glyph_command)

    # Parse and run
    args = parser.parse_args()
    args.func(args)

if __name__ == "__main__":
    main()
