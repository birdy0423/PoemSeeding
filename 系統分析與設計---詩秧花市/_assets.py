# -*- coding: utf-8 -*-
import os
import requests
from PIL import Image, ImageDraw, ImageFont

ASSET_DIR = os.path.join('public', 'assets')
os.makedirs(ASSET_DIR, exist_ok=True)

def download_image(url, filename):
    path = os.path.join(ASSET_DIR, filename)
    resp = requests.get(url, timeout=40)
    resp.raise_for_status()
    with open(path, 'wb') as f:
        f.write(resp.content)
    print(f'Downloaded {filename}')

def generate_logo(filename):
    size = 600
    base = Image.new('RGBA', (size, size), (0, 0, 0, 0))

    noise = Image.effect_noise((size, size), 18).convert('L')
    noise = noise.point(lambda p: 200 + int(p * 0.18))
    paper = Image.new('RGBA', (size, size), (250, 248, 243, 255))
    paper.putalpha(noise)
    base = Image.alpha_composite(base, paper)

    mask = Image.new('L', (size, size), 0)
    draw_mask = ImageDraw.Draw(mask)
    radius = int(size * 0.46)
    center = size // 2
    draw_mask.ellipse((center - radius, center - radius, center + radius, center + radius), fill=255)

    circle = Image.new('RGBA', (size, size), (255, 254, 252, 255))
    circle.putalpha(mask)
    base = Image.alpha_composite(Image.new('RGBA', (size, size), (0, 0, 0, 0)), circle)

    draw = ImageDraw.Draw(base)
    font = None
    for candidate in [
        r'C:\\Windows\\Fonts\\kaiu.ttf',
        r'C:\\Windows\\Fonts\\DFKai-SB.ttf',
        r'C:\\Windows\\Fonts\\msjh.ttc',
        r'C:\\Windows\\Fonts\\MSYH.ttc',
        r'C:\\Windows\\Fonts\\mingliu.ttc',
    ]:
        if os.path.exists(candidate):
            try:
                font = ImageFont.truetype(candidate, 180)
                break
            except Exception:
                continue
    if font is None:
        font = ImageFont.load_default()

    text_color = (32, 32, 32, 255)
    chars = ['詩', '秧']
    y = center - 150
    for ch in chars:
        w, h = draw.textsize(ch, font=font)
        draw.text((center - w / 2, y), ch, fill=text_color, font=font)
        y += h + 25

    path = os.path.join(ASSET_DIR, filename)
    base.save(path, format='PNG')
    print(f'Generated {filename}')

download_image(
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
    'hero-2.jpg',
)
generate_logo('logo.png')
