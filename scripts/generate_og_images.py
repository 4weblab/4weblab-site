"""Genera le immagini Open Graph WebP del sito partendo da un unico visual template."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\kiwib\.codex\generated_images\01a0f3ff-3ab6-7de1-a789-e36397053c16\exec-b21995c9-32e8-41bb-910a-e6e1a36a7d04.png")
OUT = ROOT / "public" / "images" / "og"
PAGES = {
    "home": "Perizia e creazione\nsiti web",
    "perizia-sito-web": "Analisi tecnica\nsiti web",
    "sito-web-per-negozio": "Siti web\nper negozi",
    "sito-web-per-professionisti": "Siti web per\nprofessionisti",
    "sito-web-aziendale": "Siti web\naziendali",
    "pubblicita-su-google": "Gestione\nGoogle Ads",
    "pubblicita-su-chatgpt": "ChatGPT Ads\ncon criterio",
    "realizzazioni": "Portfolio siti web\ne concept",
    "rb-snc-edilizia": "Caso studio\nR.B. s.n.c.",
    "zone-servite": "Siti web a Padova\ne provincia",
    "realizzazione-siti-web-padova": "Siti web\na Padova",
    "realizzazione-siti-web-legnaro": "Siti web\na Legnaro",
    "realizzazione-siti-web-piove-di-sacco": "Siti web a\nPiove di Sacco",
    "realizzazione-siti-web-ponte-san-nicolo": "Siti web a\nPonte San Nicolò",
    "realizzazione-siti-web-albignasego": "Siti web ad\nAlbignasego",
    "realizzazione-siti-web-vigonza": "Siti web\na Vigonza",
    "realizzazione-siti-web-abano-terme": "Siti web ad\nAbano Terme",
    "realizzazione-siti-web-cittadella": "Siti web\na Cittadella",
}

def font(size: int, bold: bool = False):
    name = "C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf"
    return ImageFont.truetype(name, size)

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    base = Image.open(SOURCE).convert("RGB").resize((1200, 630), Image.Resampling.LANCZOS)
    for slug, title in PAGES.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rounded_rectangle((74, 64, 286, 112), radius=5, fill=(215, 245, 74))
        draw.text((91, 75), "4", font=font(31, True), fill=(16, 26, 45))
        draw.text((124, 78), "WEB LAB", font=ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 19), fill=(16, 26, 45))
        draw.text((75, 180), "4 WEB LAB  /  PADOVA", font=ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 14), fill=(188, 207, 233))
        draw.multiline_text((74, 220), title, font=font(65, True), fill=(245, 244, 239), spacing=4)
        draw.rectangle((76, 415, 280, 421), fill=(215, 245, 74))
        draw.text((75, 455), "4WEBLAB.IT", font=ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 14), fill=(188, 207, 233))
        image.save(OUT / f"{slug}.webp", "WEBP", quality=88, method=6)

if __name__ == "__main__":
    main()


