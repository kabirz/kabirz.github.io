#!/usr/bin/env python3
"""Generate demo charts using NumPy + Matplotlib for python-numpy-charts.html"""
import os, numpy as np, matplotlib, matplotlib.font_manager as fm
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import cm

# Chinese font setup
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
    plt.savefig(os.path.join(OUT, name), dpi=DPI, bbox_inches='tight')
    plt.close()

def _line():
    x = np.linspace(0, 4*np.pi, 400)
    plt.figure(figsize=(7, 3.5))
    plt.plot(x, np.sin(x), label='sin(x)')
    plt.plot(x, np.cos(x), label='cos(x)')
    plt.plot(x, np.sin(x)*np.exp(-x/8), '--', label='sin(x)·e⁻ˣ⁸', alpha=0.7)
    plt.title('三角函数与衰减曲线')
    plt.xlabel('x'); plt.ylabel('y'); plt.legend(); plt.grid(alpha=0.3)
    save('chart-line.png')

def _bar():
    np.random.seed(42)
    cats = ['A', 'B', 'C', 'D', 'E', 'F']
    vals = np.random.randint(20, 100, 6)
    errs = np.random.uniform(2, 6, 6)
    plt.figure(figsize=(6, 4))
    plt.bar(cats, vals, yerr=errs, capsize=4, color=plt.cm.viridis(np.linspace(0.2, 0.9, 6)))
    plt.title('柱状图（带误差条）')
    plt.ylabel('数值'); plt.grid(axis='y', alpha=0.3)
    save('chart-bar.png')

def _scatter():
    np.random.seed(1)
    n = 120
    x = np.random.randn(n)
    y = 0.5*x + 0.3*np.random.randn(n)
    sizes = np.random.uniform(20, 200, n)
    colors = np.arctan2(y, x)
    plt.figure(figsize=(6, 5))
    sc = plt.scatter(x, y, s=sizes, c=colors, cmap='coolwarm', alpha=0.7, edgecolors='k', linewidth=0.3)
    plt.colorbar(sc, label='相位')
    m, b = np.polyfit(x, y, 1)
    plt.plot(x, m*x+b, 'r--', lw=1.5, label=f'回归线 (y={m:.2f}x+{b:.2f})')
    plt.title('散点图（大小/颜色编码 + 回归线）')
    plt.xlabel('x'); plt.ylabel('y'); plt.legend(); plt.grid(alpha=0.3)
    save('chart-scatter.png')

def _hist():
    np.random.seed(42)
    d1 = np.random.normal(0, 1, 2000)
    d2 = np.random.normal(2, 1.2, 1500)
    d3 = np.random.exponential(1.5, 1200)
    plt.figure(figsize=(7, 4))
    plt.hist(d1, bins=50, alpha=0.5, label='N(0,1) 2000', density=True)
    plt.hist(d2, bins=50, alpha=0.5, label='N(2,1.2) 1500', density=True)
    plt.hist(d3, bins=50, alpha=0.5, label='Exp(1.5) 1200', density=True)
    plt.title('直方图（多种分布叠加）')
    plt.xlabel('值'); plt.ylabel('密度'); plt.legend(); plt.grid(alpha=0.3)
    save('chart-hist.png')

def _pie():
    sizes = [35, 25, 20, 12, 8]
    labels = ['Python', 'JavaScript', 'Rust', 'Go', '其他']
    explode = (0.05, 0.05, 0.1, 0.05, 0.05)
    colors = ['#3776AB', '#F7DF1E', '#CE422B', '#00ADD8', '#999']
    plt.figure(figsize=(5, 5))
    wedges, texts, autotexts = plt.pie(
        sizes, labels=labels, autopct='%1.0f%%', explode=explode,
        colors=colors, startangle=90, shadow=False,
        textprops={'fontsize': 12})
    for t in autotexts: t.set_color('white'); t.set_fontweight('bold')
    plt.title('饼图（编程语言占比）')
    save('chart-pie.png')

def _box():
    np.random.seed(7)
    data = [np.random.normal(0, s, 80) for s in [0.5, 1, 1.5, 2, 2.5]]
    plt.figure(figsize=(6, 4))
    bp = plt.boxplot(data, tick_labels=['σ=0.5', 'σ=1', 'σ=1.5', 'σ=2', 'σ=2.5'],
                     patch_artist=True, showmeans=True)
    for patch, c in zip(bp['boxes'], plt.cm.Blues(np.linspace(0.3, 0.9, 5))):
        patch.set_facecolor(c)
    plt.title('箱线图（不同标准差正态分布）')
    plt.ylabel('数值'); plt.grid(axis='y', alpha=0.3)
    save('chart-box.png')

def _heatmap():
    np.random.seed(3)
    n = 8
    data = np.random.randn(n, n)
    labels = [f'特征{i}' for i in range(n)]
    plt.figure(figsize=(6, 5.5))
    im = plt.imshow(data, cmap='RdBu_r', aspect='equal', vmin=-2.5, vmax=2.5)
    plt.colorbar(im, label='相关系数', shrink=0.8)
    plt.xticks(range(n), labels, rotation=45, ha='right')
    plt.yticks(range(n), labels)
    for i in range(n):
        for j in range(n):
            plt.text(j, i, f'{data[i,j]:.2f}', ha='center', va='center',
                     fontsize=8, color='white' if abs(data[i,j])>1.5 else 'black')
    plt.title('热力图（特征相关性矩阵）')
    save('chart-heatmap.png')

def _contour():
    x = np.linspace(-3, 3, 100)
    y = np.linspace(-3, 3, 100)
    X, Y = np.meshgrid(x, y)
    Z = np.sin(X)*np.cos(Y) + 0.3*np.sin(2*X)*np.cos(2*Y)
    plt.figure(figsize=(6, 5))
    cf = plt.contourf(X, Y, Z, levels=20, cmap='viridis')
    plt.colorbar(cf, label='Z')
    cs = plt.contour(X, Y, Z, levels=10, colors='white', linewidths=0.5)
    plt.clabel(cs, inline=True, fontsize=8, fmt='%.1f')
    plt.title('等高线图')
    plt.xlabel('x'); plt.ylabel('y')
    save('chart-contour.png')

def _surface3d():
    x = np.linspace(-3, 3, 60)
    y = np.linspace(-3, 3, 60)
    X, Y = np.meshgrid(x, y)
    Z = 3*(1-X/3)**2*np.exp(-X**2-(Y+1)**2) - 10*(X/5 - X**3 - Y**5)*np.exp(-X**2-Y**2) - 1/3*np.exp(-(X+1)**2-Y**2)
    fig = plt.figure(figsize=(7, 5))
    ax = fig.add_subplot(111, projection='3d')
    surf = ax.plot_surface(X, Y, Z, cmap=cm.coolwarm, linewidth=0, antialiased=True, alpha=0.9)
    fig.colorbar(surf, ax=ax, shrink=0.6, label='Z')
    ax.set_title('3D 曲面图（驼峰函数）')
    ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
    save('chart-surface3d.png')

def _subplots():
    np.random.seed(5)
    x = np.linspace(0, 2*np.pi, 200)
    fig, axes = plt.subplots(2, 3, figsize=(10, 6))
    ax = axes.flat
    ax[0].plot(x, np.sin(x)); ax[0].set_title('sin(x)'); ax[0].grid(alpha=0.3)
    ax[1].bar(['A','B','C','D'], np.random.randint(10,50,4)); ax[1].set_title('柱状图')
    ax[2].scatter(np.random.randn(50), np.random.randn(50), alpha=0.6)
    ax[2].set_title('散点图')
    ax[3].hist(np.random.randn(500), bins=25, density=True); ax[3].set_title('直方图')
    ax[4].pie([30,25,20,15,10], labels=['A','B','C','D','E'], autopct='')
    ax[4].set_title('饼图')
    ax[5].boxplot([np.random.randn(40) for _ in range(3)], tick_labels=['X','Y','Z'])
    ax[5].set_title('箱线图')
    plt.tight_layout()
    save('chart-subplots.png')

def _area():
    np.random.seed(6)
    x = np.arange(12)
    y1 = 10 + np.random.uniform(0, 5, 12).cumsum()
    y2 = y1 + np.random.uniform(0, 3, 12).cumsum()
    y3 = y2 + np.random.uniform(0, 2, 12).cumsum()
    plt.figure(figsize=(7, 4))
    plt.stackplot(x, y1, y2, y3, labels=['收入', '支出', '结余'], alpha=0.7,
                  colors=['#2ecc71', '#e74c3c', '#3498db'])
    plt.title('堆叠面积图（月度财务数据）')
    plt.xlabel('月份'); plt.ylabel('金额'); plt.legend(loc='upper left'); plt.grid(alpha=0.3)
    save('chart-area.png')

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for name, fn in sorted(globals().items()):
        if name.startswith('_') and callable(fn):
            print(f'Generating {name[1:]}.png...')
            fn()
    print('Done!')
