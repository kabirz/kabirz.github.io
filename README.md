# Linux 内核深度解析

基于 **Linux 7.0.12** 源码的系统性技术文档集，涵盖内核核心、文件系统、设备驱动、网络等多个子系统。

## 📊 文档统计

- **27 篇**深度解析文档
- **120+** 个章节
- **10000+** 行代码分析

## 📂 文档列表

### 内核核心

| 文档 | 主题 |
|------|------|
| [MMU 实现详解](linux-mmu.html) | 五级页表、缺页处理、TLB 管理 |
| [内存管理](linux-mm.html) | 伙伴系统、SLUB、VMA、回收、OOM |
| [调度器](linux-scheduler.html) | CFS/EEVDF、RT、Deadline、sched_ext |
| [原子操作](linux-atomic.html) | Atomic / Refcount / Memory Barrier |
| [自旋锁](linux-spinlock.html) | Spinlock / Rwlock / Seqlock |
| [CAS vs Spinlock](linux-cas-vs-spinlock.html) | 如何选择同步原语 |
| [互斥锁](linux-mutex.html) | Mutex — 可睡眠排他锁 |
| [信号量](linux-semaphore.html) | Semaphore / Rwsem |
| [读写锁](linux-rwlock.html) | Rwlock / Rwsem |
| [RCU](linux-rcu.html) | Tree RCU、SRCU、宽限期 |
| [cgroup](linux-cgroup.html) | v1/v2、控制器、BPF 集成 |

### 文件系统

| 文档 | 主题 |
|------|------|
| [procfs](linux-procfs.html) | seq_file、/proc/[pid]、/proc/sys |
| [VFS](linux-vfs.html) | 四大对象、DCache、路径查找 |

### 设备与驱动

| 文档 | 主题 |
|------|------|
| [设备模型](linux-devmodel.html) | bus/device/driver、Probe |
| [pinctrl](linux-pinctrl.html) | 引脚复用、设备树集成 |
| [GPIO](linux-gpio.html) | gpio_chip、gpiolib |
| [I2C](linux-i2c.html) | i2c_adapter、SMBus |
| [SPI](linux-spi.html) | spi_device、SPI-MEM |
| [串口](linux-serial.html) | uart_ops、控制台、earlycon |
| [MMC](linux-mmc.html) | SD/eMMC/SDIO |
| [LED](linux-led.html) | led_classdev、触发器 |
| [PWM](linux-pwm.html) | pwm_chip、pwm_ops |
| [时钟](linux-clk.html) | clk_ops、PLL、门控 |
| [DMA](linux-dma.html) | SWIOTLB、IOMMU |

### 网络

| 文档 | 主题 |
|------|------|
| [网络子系统](linux-network.html) | sk_buff、TCP/IP、XDP、NAPI |

### 硬件与平台

| 文档 | 主题 |
|------|------|
| [设备树](linux-devtree.html) | DTB 格式、语法、Overlay |
| [ARM 内存管理](linux-arm-mm.html) | 页表、MTE/PAN/GCS |

## 🚀 快速开始

1. 打开 `index.html` 浏览导航页
2. 点击文档卡片或左侧栏进入具体文档
3. 使用搜索栏查找关键词
4. 点击右上角按钮切换亮/暗主题

## 🎨 主题

- **亮色主题**（默认）：浅灰背景，白色卡片
- **暗色主题**（Dracula）：暗色背景，Dracula 配色
- 点击右上角 ☀️/🌙 按钮切换，自动保存偏好

## 📁 文件结构

```
docs/
├── index.html           # 导航页（左侧栏 + 搜索）
├── common.css           # 公共样式（220+ 行）
├── common.js            # 公共脚本（侧边栏、主题切换）
├── linux-*.html         # 27 篇深度解析文档
├── AGENTS.md            # 文档生成规范
└── README.md            # 本文件
```

## 📖 技术栈

- **HTML5** — 语义化标签
- **CSS3** — CSS 变量、Flexbox/Grid、`@media` 响应式
- **JavaScript** — ES6+、IntersectionObserver、localStorage
- **无依赖** — 纯原生实现，无需构建工具

## 📝 许可

基于 Linux 7.0.12 内核源码分析，文档仅供学习参考。
