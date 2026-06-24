#!/usr/bin/env python3
"""Reproduce Linux vivid TPG patterns faithfully using NumPy.
Based on kernel drivers/media/common/v4l2-tpg/v4l2-tpg-colors.c"""
import os, numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import patches

OUT = os.path.join(os.path.dirname(__file__), 'images', 'vivid')
DPI = 100

# Exact sRGB colors from the kernel tpg_colors table
C75_YELLOW   = np.array([191, 191,   0], dtype=np.uint8)
C75_CYAN     = np.array([  0, 191, 191], dtype=np.uint8)
C75_GREEN    = np.array([  0, 191,   0], dtype=np.uint8)
C75_MAGENTA  = np.array([191,   0, 191], dtype=np.uint8)
C75_RED      = np.array([191,   0,   0], dtype=np.uint8)
C75_BLUE     = np.array([  0,   0, 191], dtype=np.uint8)
C100_WHITE   = np.array([255, 255, 255], dtype=np.uint8)
C100_YELLOW  = np.array([255, 255,   0], dtype=np.uint8)
C100_CYAN    = np.array([  0, 255, 255], dtype=np.uint8)
C100_GREEN   = np.array([  0, 255,   0], dtype=np.uint8)
C100_MAGENTA = np.array([255,   0, 255], dtype=np.uint8)
C100_RED     = np.array([255,   0,   0], dtype=np.uint8)
C100_BLUE    = np.array([  0,   0, 255], dtype=np.uint8)
C100_BLACK   = np.array([  0,   0,   0], dtype=np.uint8)
CSC_WHITE    = np.array([191, 191, 191], dtype=np.uint8)
CSC_YELLOW   = np.array([191, 191,  50], dtype=np.uint8)
CSC_CYAN     = np.array([ 50, 191, 191], dtype=np.uint8)
CSC_GREEN    = np.array([ 50, 191,  50], dtype=np.uint8)
CSC_MAGENTA  = np.array([191,  50, 191], dtype=np.uint8)
CSC_RED      = np.array([191,  50,  50], dtype=np.uint8)
CSC_BLUE     = np.array([ 50,  50, 191], dtype=np.uint8)
CSC_BLACK    = np.array([ 50,  50,  50], dtype=np.uint8)

def save(name, fig=None):
    os.makedirs(OUT, exist_ok=True)
    (fig or plt).savefig(os.path.join(OUT, name), dpi=DPI,
                         bbox_inches='tight', pad_inches=0.1)
    plt.close(fig or plt.gcf())

def make_bar_img(colors, h=120, w=None):
    """Create a horizontal color bar image from a list of RGB tuples."""
    n = len(colors)
    w = w or n * 60
    img = np.zeros((h, w, 3), dtype=np.uint8)
    seg_w = w // n
    for i, c in enumerate(colors):
        img[:, i*seg_w:(i+1)*seg_w] = c
    return img

# ── 1. 75% Colorbar ──
def pat_75_colorbar():
    c = [C100_WHITE, C75_YELLOW, C75_CYAN, C75_GREEN,
         C75_MAGENTA, C75_RED, C75_BLUE, C100_BLACK]
    img = make_bar_img(c)
    fig, ax = plt.subplots(figsize=(7, 1.8))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title('75% Colorbar', fontsize=12, pad=8)
    save('75-colorbar.png', fig)

# ── 2. 100% Colorbar ──
def pat_100_colorbar():
    c = [C100_WHITE, C100_YELLOW, C100_CYAN, C100_GREEN,
         C100_MAGENTA, C100_RED, C100_BLUE, C100_BLACK]
    img = make_bar_img(c)
    fig, ax = plt.subplots(figsize=(7, 1.8))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title('100% Colorbar', fontsize=12, pad=8)
    save('100-colorbar.png', fig)

# ── 3. CSC Colorbar ──
def pat_csc_colorbar():
    c = [CSC_WHITE, CSC_YELLOW, CSC_CYAN, CSC_GREEN,
         CSC_MAGENTA, CSC_RED, CSC_BLUE, CSC_BLACK]
    img = make_bar_img(c)
    fig, ax = plt.subplots(figsize=(7, 1.8))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title('CSC Colorbar', fontsize=12, pad=8)
    save('csc-colorbar.png', fig)

# ── 4. Horizontal 100% Colorbar ──
def pat_100_hcolorbar():
    c = [C100_WHITE, C100_YELLOW, C100_CYAN, C100_GREEN,
         C100_MAGENTA, C100_RED, C100_BLUE, C100_BLACK]
    h = len(c) * 30
    w = 200
    img = np.zeros((h, w, 3), dtype=np.uint8)
    seg_h = h // len(c)
    for i, col in enumerate(c):
        img[i*seg_h:(i+1)*seg_h, :] = col
    fig, ax = plt.subplots(figsize=(2.5, 3.5))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title('Horizontal\n100% Colorbar', fontsize=11, pad=8)
    save('100-hcolorbar.png', fig)

# ── 5. 100% Color Squares ──
def pat_100_colorsquares():
    colors = [C100_WHITE, C100_YELLOW, C100_CYAN, C100_GREEN,
              C100_MAGENTA, C100_RED, C100_BLUE, C100_BLACK]
    n = len(colors)
    rows, cols = 2, 4
    h, w = 240, 480
    img = np.zeros((h, w, 3), dtype=np.uint8)
    cell_h, cell_w = h // rows, w // cols
    for i, c in enumerate(colors):
        r, c2 = i // cols, i % cols
        img[r*cell_h:(r+1)*cell_h, c2*cell_w:(c2+1)*cell_w] = c
    fig, ax = plt.subplots(figsize=(4, 2.5))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title('100% Color Squares', fontsize=12, pad=8)
    save('100-colorsquares.png', fig)

# ── 6-10. Solid colors ──
def _solid(name, color, label):
    img = np.full((120, 200, 3), color, dtype=np.uint8)
    fig, ax = plt.subplots(figsize=(2.5, 1.8))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title(f'100% {label}', fontsize=12, pad=8)
    save(f'solid-{name}.png', fig)

def pat_solid_black():   _solid('black',  C100_BLACK, 'Black')
def pat_solid_white():   _solid('white',  C100_WHITE, 'White')
def pat_solid_red():     _solid('red',    C100_RED, 'Red')
def pat_solid_green():   _solid('green',  C100_GREEN, 'Green')
def pat_solid_blue():    _solid('blue',   C100_BLUE, 'Blue')

# ── 11. 16x16 Checkers ──
def pat_checkers_16x16():
    n = 16
    cell = 8
    h = w = n * cell
    img = np.zeros((h, w, 3), dtype=np.uint8)
    for r in range(n):
        for c in range(n):
            val = 255 if (r + c) % 2 == 0 else 0
            img[r*cell:(r+1)*cell, c*cell:(c+1)*cell] = val
    fig, ax = plt.subplots(figsize=(3, 3))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title('16×16 Checkers', fontsize=12, pad=8)
    save('checkers-16x16.png', fig)

# ── 12. 2x2 Checkers ──
def pat_checkers_2x2():
    cell = 32
    img = np.zeros((cell*2, cell*2, 3), dtype=np.uint8)
    img[:cell, :cell] = 255; img[:cell, cell:] = 0
    img[cell:, :cell] = 0;   img[cell:, cell:] = 255
    fig, ax = plt.subplots(figsize=(2, 2))
    ax.imshow(img, aspect='auto', interpolation='nearest')
    ax.axis('off'); ax.set_title('2×2 Checkers', fontsize=12, pad=8)
    save('checkers-2x2.png', fig)

# ── 13. 1x1 Checkers ──
def pat_checkers_1x1():
    img = np.zeros((16, 16, 3), dtype=np.uint8)
    img[::2, 1::2] = 255
    img[1::2, ::2] = 255
    fig, ax = plt.subplots(figsize=(2, 2))
    ax.imshow(img, aspect='auto', interpolation='nearest')
    ax.axis('off'); ax.set_title('1×1 Checkers', fontsize=12, pad=8)
    save('checkers-1x1.png', fig)

# ── 14. 2x2 Red/Green Checkers ──
def pat_color_checkers_2x2():
    cell = 32
    img = np.zeros((cell*2, cell*2, 3), dtype=np.uint8)
    img[:cell, :cell] = C100_RED;   img[:cell, cell:] = C100_GREEN
    img[cell:, :cell] = C100_GREEN; img[cell:, cell:] = C100_RED
    fig, ax = plt.subplots(figsize=(2, 2))
    ax.imshow(img, aspect='auto', interpolation='nearest')
    ax.axis('off'); ax.set_title('2×2 Red/Green Checkers', fontsize=12, pad=8)
    save('color-checkers-2x2.png', fig)

# ── 15. 1x1 Red/Green Checkers ──
def pat_color_checkers_1x1():
    n = 16
    img = np.zeros((n, n, 3), dtype=np.uint8)
    img[::2, 1::2] = C100_RED
    img[1::2, ::2] = C100_RED
    img[::2, ::2] = C100_GREEN
    img[1::2, 1::2] = C100_GREEN
    fig, ax = plt.subplots(figsize=(2, 2))
    ax.imshow(img, aspect='auto', interpolation='nearest')
    ax.axis('off'); ax.set_title('1×1 Red/Green Checkers', fontsize=12, pad=8)
    save('color-checkers-1x1.png', fig)

# ── 16. Alternating Hor Lines ──
def pat_alt_hlines():
    h, w = 160, 200
    img = np.zeros((h, w, 3), dtype=np.uint8)
    img[::2, :] = 255
    fig, ax = plt.subplots(figsize=(2.5, 2.5))
    ax.imshow(img, aspect='auto', interpolation='nearest')
    ax.axis('off'); ax.set_title('Alternating\nHor Lines', fontsize=12, pad=8)
    save('alt-hlines.png', fig)

# ── 17. Alternating Vert Lines ──
def pat_alt_vlines():
    h, w = 200, 160
    img = np.zeros((h, w, 3), dtype=np.uint8)
    img[:, ::2] = 255
    fig, ax = plt.subplots(figsize=(2.5, 2.5))
    ax.imshow(img, aspect='auto', interpolation='nearest')
    ax.axis('off'); ax.set_title('Alternating\nVert Lines', fontsize=12, pad=8)
    save('alt-vlines.png', fig)

# ── 18-20. Cross patterns ──
def _cross(width, label, name):
    h = w = 200
    img = np.ones((h, w, 3), dtype=np.uint8) * 255
    mid = h // 2
    r = width // 2
    img[mid-r:mid+r+1, :] = C100_BLACK
    img[:, mid-r:mid+r+1] = C100_BLACK
    fig, ax = plt.subplots(figsize=(2.5, 2.5))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title(label, fontsize=12, pad=8)
    save(f'cross-{name}.png', fig)

def pat_cross_1():   _cross(1, '1 Pixel Cross', '1')
def pat_cross_2():   _cross(2, '2 Pixels Cross', '2')
def pat_cross_10():  _cross(10, '10 Pixels Cross', '10')

# ── 21. Gray Ramp ──
def pat_gray_ramp():
    ramp = np.tile(np.arange(256, dtype=np.uint8), (100, 1))
    img = np.stack([ramp]*3, axis=-1)
    fig, ax = plt.subplots(figsize=(6, 1.5))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title('Gray Ramp (0-255)', fontsize=12, pad=8)
    save('gray-ramp.png', fig)

# ── 22. Noise ──
def pat_noise():
    np.random.seed(42)
    img = np.random.randint(0, 256, (200, 200, 3), dtype=np.uint8)
    fig, ax = plt.subplots(figsize=(3, 3))
    ax.imshow(img, aspect='auto')
    ax.axis('off'); ax.set_title('Noise', fontsize=12, pad=8)
    save('noise.png', fig)

PATTERNS = [
    ('75% Colorbar', pat_75_colorbar),
    ('100% Colorbar', pat_100_colorbar),
    ('CSC Colorbar', pat_csc_colorbar),
    ('Horizontal 100% Colorbar', pat_100_hcolorbar),
    ('100% Color Squares', pat_100_colorsquares),
    ('100% Black', pat_solid_black),
    ('100% White', pat_solid_white),
    ('100% Red', pat_solid_red),
    ('100% Green', pat_solid_green),
    ('100% Blue', pat_solid_blue),
    ('16×16 Checkers', pat_checkers_16x16),
    ('2×2 Checkers', pat_checkers_2x2),
    ('1×1 Checkers', pat_checkers_1x1),
    ('2×2 Red/Green Checkers', pat_color_checkers_2x2),
    ('1×1 Red/Green Checkers', pat_color_checkers_1x1),
    ('Alternating Hor Lines', pat_alt_hlines),
    ('Alternating Vert Lines', pat_alt_vlines),
    ('One Pixel Cross', pat_cross_1),
    ('Two Pixels Cross', pat_cross_2),
    ('Ten Pixels Cross', pat_cross_10),
    ('Gray Ramp', pat_gray_ramp),
    ('Noise', pat_noise),
]

if __name__ == '__main__':
    for name, fn in PATTERNS:
        print(f'  {name}...')
        fn()
    print('Done! {n} patterns generated in {OUT}')
