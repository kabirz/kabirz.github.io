# AGENTS.md — ~/docs/ HTML 文档生成规范

## 文档集合

当前共 **27 篇**深度解析文档 + 1 个导航页 + 2 个公共资源文件，基于 Linux 7.0.12 内核源码。

### 文件结构

```
~/docs/
├── index.html           # 导航页（左侧栏 + 搜索，数据驱动渲染）
├── common.css           # 公共样式（主题、侧边栏、所有组件）
├── common.js            # 公共脚本（主题切换、侧边栏、滚动高亮）
├── linux-*.html         # 27 篇深度解析文档
└── AGENTS.md            # 本文档
```

### 已覆盖主题

| # | 文件名 | 主题 | 分类 |
|---|--------|------|------|
| 1 | linux-mmu.html | MMU（页表、缺页、TLB） | 内核核心 |
| 2 | linux-mm.html | 内存管理（伙伴系统、SLUB、VMA、回收、OOM） | 内核核心 |
| 3 | linux-scheduler.html | 调度器（CFS/EEVDF、RT、Deadline、sched_ext） | 内核核心 |
| 4 | linux-atomic.html | 原子操作（atomic、refcount、内存屏障） | 内核核心 |
| 5 | linux-spinlock.html | 自旋锁（Spinlock / Rwlock / Seqlock） | 内核核心 |
| 6 | linux-cas-vs-spinlock.html | CAS 与自旋锁区别 | 内核核心 |
| 7 | linux-mutex.html | 互斥锁（Mutex） | 内核核心 |
| 8 | linux-semaphore.html | 信号量（Semaphore / Rwsem） | 内核核心 |
| 9 | linux-rwlock.html | 读写锁（Rwlock / Rwsem） | 内核核心 |
| 10 | linux-rcu.html | RCU（Tree RCU、SRCU、宽限期） | 内核核心 |
| 11 | linux-cgroup.html | cgroup（v1/v2、控制器、BPF） | 内核核心 |
| 12 | linux-procfs.html | procfs（seq_file、/proc/[pid]） | 文件系统 |
| 13 | linux-vfs.html | VFS（四大对象、DCache、路径查找） | 文件系统 |
| 14 | linux-devmodel.html | 设备模型（bus/device/driver） | 设备与驱动 |
| 15 | linux-pinctrl.html | pinctrl（引脚复用、设备树） | 设备与驱动 |
| 16 | linux-gpio.html | GPIO（gpio_chip、gpiolib） | 设备与驱动 |
| 17 | linux-i2c.html | I2C（i2c_adapter、SMBus） | 设备与驱动 |
| 18 | linux-spi.html | SPI（spi_device、SPI-MEM） | 设备与驱动 |
| 19 | linux-serial.html | 串口（uart_ops、控制台） | 设备与驱动 |
| 20 | linux-mmc.html | MMC（SD/eMMC/SDIO） | 设备与驱动 |
| 21 | linux-led.html | LED 子系统（触发器） | 设备与驱动 |
| 22 | linux-pwm.html | PWM（pwm_chip、pwm_ops） | 设备与驱动 |
| 23 | linux-clk.html | 时钟子系统（clk_ops、PLL） | 设备与驱动 |
| 24 | linux-dma.html | DMA（SWIOTLB、IOMMU） | 设备与驱动 |
| 25 | linux-devtree.html | 设备树（DTB、语法、Overlay） | 硬件与平台 |
| 26 | linux-arm-mm.html | ARM 内存管理（页表、MTE） | 硬件与平台 |
| 27 | linux-network.html | 网络子系统（sk_buff、TCP/IP、XDP） | 网络 |

---

## 公共文件

### common.css

提供所有文档共享的 CSS：
- 亮色/暗色（Dracula）主题变量（`[data-theme="dark"]` 选择器）
- 文档侧边栏（桌面端固定 260px，移动端折叠滑出）
- 侧边栏折叠按钮、展开按钮、拖拽调整宽度
- Hero / 导航 / 卡片 / 代码块 / 表格 / 流程图 / 提示框 / 文件树等组件
- `:has(.doc-sidebar)` 自动为有侧边栏的页面添加左侧边距

### common.js

提供所有文档共享的 JS：
- **主题切换**：localStorage 持久化 + 系统偏好检测，右上角按钮
- **文档侧边栏**：自动生成左侧导航栏（仅在有 `.hero` 的文档页面）
  - 桌面端固定 260px，标题栏 `‹` 折叠按钮
  - 折叠后左侧 `›` 展开按钮
  - 右侧边缘拖拽调整宽度（180-500px）
  - 移动端隐藏，底部 `☰` 按钮滑出
- **滚动高亮**：导航页 TOC 滚动高亮
- **文档列表**：`DOCS` 数组定义所有文档（侧边栏用）

---

## HTML 模板规范

### 文件头

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Linux 内核 {主题} 深度解析</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg ...>K</svg>">
<link rel="stylesheet" href="common.css">
</head>
<body>
<button class="theme-toggle" id="theme-toggle" title="切换主题"></button>
<!-- <div class="hero"> ... </div>  ← 有此元素则自动生成侧边栏 -->
<!-- <nav class="toc"> ... </nav> -->
<!-- <div class="container"> ... </div> -->
<script src="common.js"></script>
</body>
</html>
```

### ⚠️ file-tree 规则

```html
<div class="file-tree"><pre style="background:none;border:none;padding:0;margin:0;white-space:pre;">
├── <span class="file">xxx.c</span>    <span class="cmt">说明</span>
└── <span class="file">zzz.c</span>    <span class="cmt">说明</span>
  </pre></div>
```

### ⚠️ 阅读建议规则

阅读建议中每个文件引用必须换行（用 `<br>`），且「阅读建议」标题单独一行：

```html
<div class="callout">
  <strong>阅读建议:</strong><br>
  <code>file1.c</code> 说明。<br>
  <code>file2.c</code> 说明。<br>
  <code>file3.c</code> 说明。
</div>
```

---

## 导航页规范

导航页 `index.html` 使用数据驱动渲染 + 左侧栏布局：

### 数据结构

```javascript
const DOCS = [
  { t:"标题", f:"文件.html", d:"描述", i:"blue",
    tags:["标签"], top:"linux", topLabel:"Linux 内核",
    cat:"core", catLabel:"内核核心"
  }
];
```

### 新增文档步骤

1. 创建 `~/docs/{topic}.html`（使用模板）
2. 在 `index.html` 的 `DOCS` 数组中添加条目
3. 在 `common.js` 的 `DOCS` 数组中添加条目（侧边栏用）
4. 更新统计数字（`total-count` 等）
5. 如需新领域，在 `ICON_MAP` 中添加 emoji 和颜色

### 领域定义

```javascript
const ICON_MAP = {
  linux: { emoji: "🐧", color: "#0969da" },
  zephyr: { emoji: "⚡", color: "#1769aa" },
  docker: { emoji: "🐳", color: "#2496ed" },
  ai: { emoji: "🤖", color: "#ff6b6b" },
  embedded: { emoji: "🔧", color: "#bc4c00" },
  other: { emoji: "📦", color: "#656d76" }
};
```

---

## 主题系统

- 亮色主题（默认）：浅灰背景
- 暗色主题（Dracula）：暗色背景，Dracula 配色
- 切换按钮：固定右上角
- 状态存储：`localStorage`
- 自动检测系统偏好

---

## 待扩展主题

| 领域 | 状态 |
|------|------|
| Linux 内核 | ✅ 27 篇 |
| 文件系统 | 待扩展（ext4、XFS、btrfs） |
| 网络 | 待扩展（Netfilter、Socket） |
| 设备驱动 | 待扩展（USB、PCIe） |
| Zephyr | 待扩展 |
| Docker | 待扩展 |
| AI | 待扩展 |
