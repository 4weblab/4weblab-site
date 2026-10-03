"""Converte le catture JPEG delle demo in anteprime WebP per il Portfolio."""
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "images" / "portfolio" / "captures"
TARGET = ROOT / "public" / "images" / "portfolio" / "screenshots"


def main() -> None:
    TARGET.mkdir(parents=True, exist_ok=True)
    for source in SOURCE.glob("*-view.jpg"):
        image = Image.open(source).convert("RGB")
        target = TARGET / f"{source.stem.removesuffix('-view')}.webp"
        image.save(target, "WEBP", quality=86, method=6)


if __name__ == "__main__":
    main()
