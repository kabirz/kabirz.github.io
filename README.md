# Linux 内核深度解析

基于 **Linux 7.0.12** 源码的系统性技术文档集，涵盖内核核心、文件系统、设备驱动、网络等多个子系统。

## 📊 文档统计

- **217 篇**深度解析文档
- **8 大领域**：Linux 内核 / Linux 网络 / Docker 容器 / Rust / AI 视觉 / Go / Python / Windows
- **基于 Linux 7.0.12** 内核源码

## 📂 文档分布

| 领域 | 数量 | 说明 |
|------|------|------|
| 🐧 [Linux 内核](linux-mmu.html) | 115 篇 | 内核核心、文件系统、进程、设备驱动、安全、IPC、跟踪调试、硬件平台 |
| 🌐 [Linux 网络](linux-network.html) | 26 篇 | TCP/IP、XDP、Netfilter、网桥、VXLAN 等 |
| 🐳 Docker / 容器 | 12 篇 | 命名空间、cgroups、OCI、runc、containerd、BuildKit、网络、存储等 |
| 🦀 Rust | 13 篇 | 所有权、trait、unsafe、async、Tokio、Web/GUI/Embedded 框架 |
| 👁️ AI 视觉 | 15 篇 | OpenCV、YOLO、PyTorch、TensorFlow、ONNX 计算机视觉 |
| 🔷 Go 语言 | 12 篇 | goroutine、GMP 调度、GC、反射、net/http、Module、CGo |
| 🐍 Python | 15 篇 | asyncio、FastAPI、Pydantic、SQLAlchemy、测试、性能、NumPy 可视化、torchvision 测试图形 |
| 🪟 Windows | 9 篇 | Win32、MFC、ATL/WTL、COM、UWP、WinUI3、MAUI、WPF、WebView2 |

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
├── index.html            # 导航页（左侧栏 + 搜索，数据驱动渲染）
├── common.css            # 公共样式（主题、侧边栏、所有组件）
├── common.js             # 公共脚本（主题切换、侧边栏生成、滚动高亮、代码高亮）
├── AGENTS.md             # 文档生成规范
├── README.md             # 本文件
├── linux-*.html          # 141 篇 Linux 相关（115 内核 + 26 网络）
├── docker-*.html         # 12 篇 Docker / 容器技术解析
├── rust-*.html           # 13 篇 Rust 语言深度解析
├── vision-*.html         # 15 篇 AI 视觉技术解析
├── go-*.html             # 12 篇 Go 语言深度解析
├── python-*.html         # 15 篇 Python 深度解析
└── windows-*.html        # 9 篇 Windows 平台技术解析
```

## 📖 技术栈

- **HTML5** — 语义化标签
- **CSS3** — CSS 变量、Flexbox/Grid、`@media` 响应式
- **JavaScript** — ES6+、IntersectionObserver、localStorage、Prism.js
- **无依赖** — 纯原生实现，无需构建工具

## 📝 许可

基于 Linux 7.0.12 内核源码分析，文档仅供学习参考。
