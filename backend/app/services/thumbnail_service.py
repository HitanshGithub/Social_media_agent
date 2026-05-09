from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


AMBER = (245, 158, 11)


def build_thumbnail(frame_path: str, output_path: str, title_text: str) -> str:
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    base = Image.open(frame_path).convert('RGB').resize((1280, 720))

    overlay = Image.new('RGBA', base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for i in range(360):
        alpha = int((i / 360) * 160)
        draw.rectangle([(0, 720 - i), (1280, 720 - i + 1)], fill=(0, 0, 0, alpha))

    composed = Image.alpha_composite(base.convert('RGBA'), overlay)
    d2 = ImageDraw.Draw(composed)
    font = ImageFont.load_default()
    d2.text((42, 580), title_text[:90], fill=AMBER, font=font)

    composed.convert('RGB').save(output_path, quality=95)
    return output_path
