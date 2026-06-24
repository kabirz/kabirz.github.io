#!/usr/bin/env python3
"""Generate test pattern images inspired by Linux kernel vivid driver"""
import os, numpy as np, matplotlib, matplotlib.font_manager as fm
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import colors, patches

for f in fm.findSystemFonts():
    if 'NotoSansCJK' in f or 'NotoSerifCJK' in f or 'wqy' in f or 'WenQuanYi' in f:
        plt.rcParams['font.family'] = fm.FontProperties(fname=f).get_name()
        break
else:
    plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['axes.unicode_minus'] = False

OUT = os.path.join(os.path.dirname(__file__), 'images')
DPI = 120

def save(name):
    plt.savefig(os.path.join(OUT, name), dpi=DPI, bbox_inches='tight', pad_inches=0.1)
    plt.close()

def _color_bars():
    """Standard 75% color bars — vivid's TPG_COLOR_BARS"""
    colors_list = [
        ('White',  (255,255,255)), ('Yellow', (255,255,0)),
        ('Cyan',   (0, 255, 255)), ('Green',  (0, 255, 0)),
        ('Magenta',(255,0,255)),   ('Red',    (255,0,0)),
        ('Blue',   (0, 0, 255)),   ('Black',  (0,0,0)),
    ]
    fig, ax = plt.subplots(figsize=(8, 3))
    w = 1.0 / len(colors_list)
    for i, (name, (r,g,b)) in enumerate(colors_list):
        ax.add_patch(patches.Rectangle((i*w, 0), w, 1, color=np.array([r,g,b])/255))
        ax.text(i*w + w/2, 0.5, name, ha='center', va='center',
                fontsize=10, fontweight='bold',
                color='white' if sum([r,g,b])<384 else 'black')
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    ax.set_title('标准 75% 彩条 (Color Bars)', fontsize=13, pad=10)
    save('pattern-color-bars.png')

def _checkerboard():
    """Checkerboard pattern — vivid's TPG_CHECKERBOARD"""
    n = 8
    img = np.zeros((n, n, 3))
    img[::2, 1::2] = 1
    img[1::2, ::2] = 1
    # scale up
    img = np.kron(img, np.ones((32, 32, 1)))
    fig, ax = plt.subplots(figsize=(4, 4))
    ax.imshow(img, interpolation='nearest', cmap='gray')
    ax.axis('off'); ax.set_title('棋盘格 (Checkerboard)', fontsize=13, pad=10)
    save('pattern-checkerboard.png')

def _gradient():
    """Horizontal + vertical color gradients"""
    fig, axes = plt.subplots(1, 3, figsize=(9, 3))
    titles = ['灰度渐变', 'RGB 渐变 1', 'RGB 渐变 2']
    data = [
        np.tile(np.linspace(0, 1, 256), (100, 1)),
        np.tile(np.linspace(0, 1, 256), (100, 1)),
        np.tile(np.linspace(0, 1, 256), (100, 1)),
    ]
    for i, ax in enumerate(axes):
        if i == 0:
            ax.imshow(data[i], cmap='gray', aspect='auto')
        elif i == 1:
            g = np.zeros((100, 256, 3))
            g[:, :, 0] = np.linspace(0, 1, 256)  # R
            g[:, :, 1] = np.linspace(1, 0, 256)  # G
            g[:, :, 2] = np.linspace(0, 1, 256)[::-1]  # B
            ax.imshow(g, aspect='auto')
        else:
            g = np.zeros((100, 256, 3))
            g[:, :, 0] = np.linspace(0, 1, 256)
            g[:, :, 1] = np.linspace(0, 1, 256)
            g[:, :, 2] = 0.5
            ax.imshow(g, aspect='auto')
        ax.axis('off'); ax.set_title(titles[i], fontsize=11)
    fig.suptitle('颜色渐变 (Gradient)', fontsize=13, y=1.05)
    plt.tight_layout()
    save('pattern-gradient.png')

def _zone_plate():
    """Zone plate — frequency sweep, vivid's TPG_ZONE_PLATE"""
    n = 512
    x = np.linspace(-1, 1, n)
    y = np.linspace(-1, 1, n)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt(X**2 + Y**2)
    zone = 0.5 + 0.5 * np.cos(40 * np.pi * R**2)
    fig, ax = plt.subplots(figsize=(4.5, 4.5))
    ax.imshow(zone, cmap='gray', extent=[-1, 1, -1, 1])
    ax.axis('off'); ax.set_title('光栅波带片 (Zone Plate)', fontsize=13, pad=10)
    save('pattern-zone-plate.png')

def _concentric():
    """Concentric circles — bullseye pattern"""
    n = 512
    x = np.linspace(-1, 1, n)
    y = np.linspace(-1, 1, n)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt(X**2 + Y**2)
    circles = np.sin(30 * np.pi * R) > 0
    fig, ax = plt.subplots(figsize=(4.5, 4.5))
    ax.imshow(circles, cmap='gray', extent=[-1, 1, -1, 1])
    circle = plt.Circle((0,0), 1, fill=False, edgecolor='#ccc', linewidth=0.5)
    ax.add_patch(circle)
    ax.axis('off'); ax.set_title('同心圆 (Concentric Circles)', fontsize=13, pad=10)
    save('pattern-concentric.png')

def _resolution_wedge():
    """Resolution wedge — converging lines for resolution testing"""
    n = 512
    img = np.ones((n, n))
    cx, cy = n//2, n//2
    for k in range(36):
        angle = k * np.pi / 18
        for r in range(1, n//2, 2):
            x1 = int(cx + r*np.cos(angle))
            y1 = int(cy + r*np.sin(angle))
            x2 = int(cx + (r+1)*np.cos(angle))
            y2 = int(cy + (r+1)*np.sin(angle))
            if 0 <= x1 < n and 0 <= y1 < n:
                img[y1, x1] = 0
    fig, ax = plt.subplots(figsize=(4.5, 4.5))
    ax.imshow(img, cmap='gray', extent=[-1, 1, -1, 1])
    ax.axis('off'); ax.set_title('分辨率楔形 (Resolution Wedge)', fontsize=13, pad=10)
    save('pattern-res-wedge.png')

def _noise():
    """Random static noise — vivid's TPG_NOISE"""
    np.random.seed(42)
    noise = np.random.rand(256, 256)
    fig, axes = plt.subplots(1, 3, figsize=(9, 3))
    titles = ['均匀噪声', '高斯噪声', '椒盐噪声']
    gauss = np.random.randn(256, 256)
    gauss = (gauss - gauss.min()) / (gauss.max() - gauss.min())
    sp = np.random.rand(256, 256)
    sp = np.where(sp < 0.05, 0, np.where(sp > 0.95, 1, 0.5))
    for i, (img, title) in enumerate(zip([noise, gauss, sp], titles)):
        axes[i].imshow(img, cmap='gray', aspect='auto')
        axes[i].axis('off'); axes[i].set_title(title, fontsize=11)
    fig.suptitle('静态噪声 (Noise Patterns)', fontsize=13, y=1.05)
    plt.tight_layout()
    save('pattern-noise.png')

def _color_wheel():
    """HSL color wheel — full hue spectrum"""
    n = 512
    x = np.linspace(-1, 1, n)
    y = np.linspace(-1, 1, n)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt(X**2 + Y**2)
    H = (np.arctan2(Y, X) / (2*np.pi) + 0.5) % 1.0
    S = np.minimum(R * 1.5, 1.0)
    V = np.ones_like(H)
    # HSV to RGB
    h, s, v = H, S, V
    hi = (h * 6).astype(int) % 6
    f = (h * 6) - hi
    p = v * (1 - s)
    q = v * (1 - s * f)
    t = v * (1 - s * (1 - f))
    rgb = np.zeros((n, n, 3))
    for i, (r1, r2, r3) in enumerate([(v,t,p),(q,v,p),(p,v,t),(p,q,v),(t,p,v),(v,p,q)]):
        mask = hi == i
        rgb[mask, 0] = r1[mask]; rgb[mask, 1] = r2[mask]; rgb[mask, 2] = r3[mask]
    rgb[R > 0.9] = 0.5  # gray center
    fig, ax = plt.subplots(figsize=(4.5, 4.5))
    ax.imshow(rgb, extent=[-1, 1, -1, 1])
    ax.axis('off'); ax.set_title('HSL 色轮 (Color Wheel)', fontsize=13, pad=10)
    save('pattern-color-wheel.png')

def _bars_ramp():
    """Grayscale ramp bars — step wedges from black to white"""
    n = 16
    bars = np.tile(np.linspace(0, 1, n), (100, 1))
    fig, axes = plt.subplots(2, 1, figsize=(8, 4), gridspec_kw={'height_ratios': [3, 1]})
    axes[0].imshow(bars, cmap='gray', aspect='auto', interpolation='nearest')
    axes[0].axis('off'); axes[0].set_title('灰阶渐变条 (Grayscale Ramp)', fontsize=13)
    # smooth version
    smooth = np.tile(np.linspace(0, 1, 512), (50, 1))
    axes[1].imshow(smooth, cmap='gray', aspect='auto')
    axes[1].axis('off'); axes[1].set_title('平滑渐变', fontsize=11)
    plt.tight_layout()
    save('pattern-ramp.png')

def _test_card():
    """Composite test card with multiple test elements"""
    fig, ax = plt.subplots(figsize=(6, 5))
    ax.set_xlim(0, 12); ax.set_ylim(0, 10); ax.set_aspect('equal')
    ax.axis('off')
    # Background
    ax.add_patch(patches.Rectangle((0,0), 12, 10, facecolor='#222'))
    # Color bars at top
    cbar_colors = ['#fff','#ff0','#0ff','#0f0','#f0f','#f00','#00f','#000']
    for i, c in enumerate(cbar_colors):
        ax.add_patch(patches.Rectangle((i*1.5, 8.5), 1.5, 1.5, facecolor=c))
    # Converging lines
    for i in range(13):
        ax.plot([i, 6], [8, 3], 'w-', lw=1, alpha=0.5)
    # Grayscale bars
    for i in range(10):
        v = i/9
        ax.add_patch(patches.Rectangle((i*1.2+0.1, 3), 1.1, 1.5, facecolor=[v,v,v]))
    # Concentric circles
    for r in range(1, 6):
        ax.add_patch(plt.Circle((10, 1.5), r*0.25, fill=False, edgecolor='w', lw=1))
    # Grid
    for i in range(13):
        ax.axvline(i, 0, 0.2, color='w', lw=0.5, alpha=0.4)
    for i in range(11):
        ax.axhline(i, 0, 0.08, color='w', lw=0.5, alpha=0.4)
    # Text
    ax.text(6, 9.5, 'TEST CARD', ha='center', va='top', fontsize=16,
            fontweight='bold', color='white', family='monospace')
    ax.text(6, 0.3, 'Composite Test Pattern', ha='center', fontsize=9, color='#aaa')
    ax.set_title('综合测试卡 (Test Card)', fontsize=13)
    save('pattern-test-card.png')

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for name, fn in sorted(globals().items()):
        if name.startswith('_') and callable(fn) and fn.__module__ == __name__:
            label = name[1:].replace('_', '-')
            print(f'Generating {label}.png...')
            fn()
    print('Done!')
