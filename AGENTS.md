# AGENTS.md — ~/docs/ HTML 文档生成规范

## 文档集合

当前共 **256 篇**深度解析文档 + 1 个导航页 + 3 个公共资源文件（common.css / common.js / mermaid.min.js）。

### 文件结构

```
~/docs/
├── index.html            # 导航页（左侧栏 + 搜索，数据驱动渲染）
├── common.css            # 公共样式（主题、侧边栏、所有组件）
├── common.js             # 公共脚本（主题切换、侧边栏生成、滚动高亮、代码高亮）
├── mermaid.min.js        # Mermaid 图表渲染库（本地，3.3MB）
├── AGENTS.md             # 本文档
├── linux-*.html          # 141 篇 Linux 相关（115 内核 + 26 网络）
├── zephyr-*.html         # 41 篇 Zephyr RTOS 深度解析
├── docker-*.html         # 12 篇 Docker / 容器技术解析
├── rust-*.html           # 13 篇 Rust 语言深度解析
├── vision-*.html         # 15 篇 AI 视觉技术解析
├── go-*.html             # 12 篇 Go 语言深度解析
├── python-*.html         # 15 篇 Python 深度解析
└── windows-*.html        # 9 篇 Windows 平台技术解析
```

### 文档分布

| 领域 | 文件数 | 分类 | 说明 |
|------|--------|------|------|
| Linux 内核 | 115 | 内核核心 / 文件系统 / 设备驱动 / 硬件平台 | 基于 Linux 7.0.12 内核源码 |
| Linux 网络 | 26 | 网络 | TCP/IP、XDP、Netfilter、桥接、VXLAN 等 |
| Docker / 容器 | 12 | 容器技术 | namespaces, cgroups, OCI, runc, containerd, buildkit 等 |
| Rust | 13 | 系统编程 | 所有权、trait、unsafe、async、tokio、web/gui/embedded 框架 |
| Windows | 9 | 平台开发 | Win32, MFC, ATL/WTL, COM, UWP, WinUI3, MAUI, WPF, WebView2 |
| AI 视觉 | 15 | 计算机视觉 | OpenCV, YOLO, PyTorch, TensorFlow, ONNX |
| Go 语言 | 12 | 系统编程 | goroutine、GMP 调度、GC、反射、net/http、Module、CGo、泛型 |
| Python | 15 | 语言生态 | 异步、FastAPI、Pydantic、SQLAlchemy、测试、性能、NumPy 可视化、torchvision 测试图形 |
| Zephyr RTOS | 41 | 嵌入式 | 内核、调度、内存、同步、IPC、定时器、中断、设备模型、驱动、PM、网络、蓝牙、构建、调试、安全、zbus、SMP、文件系统、工作队列、USB、LLEXT、mcumgr、Modem、DFU、传感、CAN、LoRaWAN、Modbus、RTIO、POSIX、输入、统计、Settings、随机数、Retention、看门狗、网络管理、Shell、MCUboot |

### 已覆盖主题（Linux 内核）

#### 内核核心（35 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-atomic.html | 原子操作（atomic、refcount、内存屏障） |
| 2 | linux-buddy.html | 伙伴系统（Buddy） |
| 3 | linux-cas-vs-spinlock.html | CAS 与自旋锁区别 |
| 4 | linux-cgroup.html | cgroup（v1/v2、控制器、BPF） |
| 5 | linux-cleanup.html | 清理机制（__cleanup__） |
| 6 | linux-compaction.html | 内存压缩（Compaction） |
| 7 | linux-completion.html | Completion（完成量、同步等待） |
| 8 | linux-cpufreq.html | cpufreq 频率调节 |
| 9 | linux-cpuidle.html | cpuidle 空闲管理 |
| 10 | linux-ebpf.html | eBPF / BPF 可编程内核 |
| 11 | linux-futex.html | futex 快速用户态互斥 |
| 12 | linux-hugepages.html | 大页（HugeTLB / THP） |
| 13 | linux-io-uring.html | io_uring 异步 I/O |
| 14 | linux-iommu.html | IOMMU / SMMU |
| 15 | linux-irq.html | genirq（irq_desc/chip/domain） |
| 16 | linux-kasan.html | KASAN 内存错误检测 |
| 17 | linux-kaslr.html | KASLR 地址随机化 |
| 18 | linux-kref.html | kref 引用计数 |
| 19 | linux-ksm.html | KSM 内核同页合并 |
| 20 | linux-kthread.html | kthread 内核线程 |
| 21 | linux-lkmm.html | Linux 内核内存模型 |
| 22 | linux-locking-overview.html | 锁机制概览 |
| 23 | linux-memory-hotplug.html | 内存热插拔 |
| 24 | linux-mm-overview.html | 内存管理概览 |
| 25 | linux-mm.html | 内存管理（伙伴/SLUB/VMA/回收/OOM） |
| 26 | linux-mmap.html | mmap 内存映射 |
| 27 | linux-mmu.html | MMU（页表、缺页、TLB） |
| 28 | linux-mutex.html | 互斥锁（Mutex） |
| 29 | linux-notifier.html | notifier 通知链 |
| 30 | linux-numa.html | NUMA 非一致内存访问 |
| 31 | linux-overcommit.html | 内存过载（Overcommit） |
| 32 | linux-page-cache.html | 页缓存（Page Cache） |
| 33 | linux-page-reclaim.html | 页回收（Reclaim） |
| 34 | linux-pagefault.html | 缺页异常（Page Fault） |
| 35 | linux-perf-events.html | perf_events 性能事件 |
| 36 | linux-perf.html | perf 性能分析（perf） |
| 37 | linux-rcu.html | RCU（Tree RCU、SRCU、宽限期） |
| 38 | linux-rwlock.html | 读写锁（Rwlock / Rwsem） |
| 39 | linux-sched-ext.html | sched_ext 可扩展调度 |
| 40 | linux-scheduler.html | 调度器（CFS/EEVDF/RT/Deadline/sched_ext） |
| 41 | linux-semaphore.html | 信号量（Semaphore / Rwsem） |
| 42 | linux-softirq.html | softirq / tasklet / 软中断 |
| 43 | linux-spinlock.html | 自旋锁（Spinlock / Rwlock / Seqlock） |
| 44 | linux-static-keys.html | static_key / static_call |
| 45 | linux-swap.html | 交换空间（Swap） |
| 46 | linux-taint.html | Tainted 内核污染标记 |
| 47 | linux-timers.html | 定时器（timer_list / hrtimer / timer wheel） |
| 48 | linux-tmpfs.html | tmpfs 临时文件系统 |
| 49 | linux-tracepoints.html | tracepoints 静态跟踪点 |
| 50 | linux-tracing-overview.html | 跟踪/性能分析概览 |
| 51 | linux-waitqueue.html | waitqueue 等待队列 |
| 52 | linux-watchdog.html | watchdog 看门狗 |
| 53 | linux-workqueue.html | workqueue 工作队列 |
| 54 | linux-wq-bh.html | workqueue BH 底半部 |
| 55 | linux-writeback.html | 回写机制（Writeback） |
| 56 | linux-xarray.html | XArray 数据结构 |

#### 同步与并发（9 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-atomic.html | 原子操作 |
| 2 | linux-cas-vs-spinlock.html | CAS 与自旋锁 |
| 3 | linux-completion.html | completion |
| 4 | linux-futex.html | futex |
| 5 | linux-lkmm.html | 内核内存模型 |
| 6 | linux-locking-overview.html | 锁机制总览 |
| 7 | linux-mutex.html | mutex |
| 8 | linux-rcu.html | RCU |
| 9 | linux-rwlock.html | rwlock / rwsem |
| 10 | linux-semaphore.html | semaphore |
| 11 | linux-spinlock.html | spinlock |

#### 文件系统（20 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-debugfs.html | debugfs |
| 2 | linux-ext4.html | ext4 文件系统 |
| 3 | linux-fanotify.html | fanotify 文件事件监控 |
| 4 | linux-fifo.html | FIFO 命名管道 |
| 5 | linux-inotify.html | inotify 文件事件监控 |
| 6 | linux-page-cache.html | 页缓存 |
| 7 | linux-pipe.html | pipe 管道 |
| 8 | linux-procfs.html | procfs（seq_file、/proc/[pid]） |
| 9 | linux-seq_file.html | seq_file 顺序文件接口 |
| 10 | linux-splice.html | splice 零拷贝 |
| 11 | linux-sysfs.html | sysfs 虚拟文件系统 |
| 12 | linux-tmpfs.html | tmpfs |
| 13 | linux-vfs.html | VFS（四大对象、DCache、路径查找） |
| 14 | linux-writeback.html | 回写机制 |

#### 进程与信号（9 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-coredump.html | 核心转储（coredump） |
| 2 | linux-fork-exec.html | fork/exec 进程创建 |
| 3 | linux-kthread.html | kthread |
| 4 | linux-namespace.html | 内核命名空间 |
| 5 | linux-ptrace.html | ptrace 进程跟踪 |
| 6 | linux-process-groups.html | 进程组 / session |
| 7 | linux-seccomp.html | seccomp 安全计算 |
| 8 | linux-signal.html | 信号（signal） |

#### 设备与驱动（28 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-clk.html | 时钟子系统（clk_ops、PLL） |
| 2 | linux-debugging.html | 驱动调试 |
| 3 | linux-debugging-overview.html | 调试技术概览 |
| 4 | linux-devmodel.html | 设备模型（bus/device/driver） |
| 5 | linux-dma.html | DMA（SWIOTLB、IOMMU） |
| 6 | linux-gpio.html | GPIO（gpio_chip、gpiolib） |
| 7 | linux-i2c.html | I2C（i2c_adapter、SMBus） |
| 8 | linux-kernel-modules.html | 内核模块 |
| 9 | linux-led.html | LED 子系统（触发器） |
| 10 | linux-livepatch.html | livepatch 热补丁 |
| 11 | linux-mmc.html | MMC（SD/eMMC/SDIO） |
| 12 | linux-pci.html | PCI/PCIe 子系统 |
| 13 | linux-pinctrl.html | pinctrl（引脚复用、设备树） |
| 14 | linux-pm.html | 电源管理（suspend/resume、runtime PM） |
| 15 | linux-pwm.html | PWM（pwm_chip、pwm_ops） |
| 16 | linux-random.html | 随机数（RNG） |
| 17 | linux-ras.html | RAS 可靠性/可用性/可服务性 |
| 18 | linux-serial.html | 串口（uart_ops、控制台） |
| 19 | linux-spi.html | SPI（spi_device、SPI-MEM） |
| 20 | linux-suspend.html | 挂起/休眠 |
| 21 | linux-thermal.html | thermal 热管理 |
| 22 | linux-tty.html | TTY 子系统 |
| 23 | linux-v4l2.html | V4L2 视频采集框架（videobuf2、子设备、MC） |
| 24 | linux-watchdog.html | watchdog |

#### 网络（25 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-af-packet.html | AF_PACKET 原始包 |
| 2 | linux-arp.html | ARP 协议 |
| 3 | linux-bpf-maps.html | BPF maps |
| 4 | linux-bridge.html | 网桥（bridge） |
| 5 | linux-icmp.html | ICMP 协议 |
| 6 | linux-ipv6.html | IPv6 |
| 7 | linux-napi.html | NAPI 轮询 |
| 8 | linux-net-device.html | 网络设备（net_device） |
| 9 | linux-net-overview.html | 网络子系统概览 |
| 10 | linux-netfilter.html | Netfilter / iptables / nftables |
| 11 | linux-netlink.html | Netlink 套接字 |
| 12 | linux-netns.html | 网络命名空间 |
| 13 | linux-network.html | 网络子系统（sk_buff、TCP/IP、XDP） |
| 14 | linux-routing.html | 路由子系统 |
| 15 | linux-rx-packet.html | 接收路径（NAPI → socket） |
| 16 | linux-skbuff.html | sk_buff 结构 |
| 17 | linux-socket.html | socket 层 |
| 18 | linux-tc.html | TC 流量控制 |
| 19 | linux-tcp.html | TCP 协议 |
| 20 | linux-tun-tap.html | tun/tap 虚拟网卡 |
| 21 | linux-tx-packet.html | 发送路径 |
| 22 | linux-udp.html | UDP 协议 |
| 23 | linux-unix-socket.html | Unix domain socket |
| 24 | linux-veth.html | veth 虚拟网卡对 |
| 25 | linux-vlan.html | VLAN / 802.1Q |
| 26 | linux-vxlan.html | VXLAN |
| 27 | linux-xdp-ebpf.html | XDP + eBPF |

#### 安全（7 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-capability.html | capabilities 权能 |
| 2 | linux-kaslr.html | KASLR |
| 3 | linux-lockdown.html | lockdown |
| 4 | linux-lsm.html | LSM 安全模块框架 |
| 5 | linux-seccomp.html | seccomp |
| 6 | linux-selinux.html | SELinux |
| 7 | linux-taint.html | Tainted |

#### IPC（4 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-ipc-overview.html | IPC 概览 |
| 2 | linux-message-queue.html | POSIX / SysV 消息队列 |
| 3 | linux-pipe.html | pipe |
| 4 | linux-shared-memory.html | 共享内存 |

#### 跟踪与调试（11 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-debugging-overview.html | 调试技术概览 |
| 2 | linux-debugging.html | 驱动调试 |
| 3 | linux-ftrace.html | ftrace 跟踪器 |
| 4 | linux-kprobe.html | kprobe / kretprobe |
| 5 | linux-perf-events.html | perf_events |
| 6 | linux-perf.html | perf |
| 7 | linux-profiling-overview.html | 性能分析概览 |
| 8 | linux-stack-trace.html | stack trace / unwinding |
| 9 | linux-tracepoints.html | tracepoints |
| 10 | linux-tracing-overview.html | 跟踪概览 |

#### 硬件与平台（6 篇）

| # | 文件 | 主题 |
|---|------|------|
| 1 | linux-arm-mm.html | ARM 内存管理（页表、MTE） |
| 2 | linux-devtree.html | 设备树（DTB、语法、Overlay） |
| 3 | linux-iommu.html | IOMMU |
| 4 | linux-pci.html | PCI/PCIe |
| 5 | linux-vdso.html | vDSO 虚拟动态共享库 |

### 已覆盖主题（Docker / 容器技术）

| # | 文件 | 主题 |
|---|------|------|
| 1 | docker-arch.html | Docker 整体架构 |
| 2 | docker-buildkit.html | BuildKit 构建引擎 |
| 3 | docker-capabilities.html | Linux capabilities 容器化 |
| 4 | docker-compose.html | Compose 编排 |
| 5 | docker-containerd.html | containerd 容器运行时 |
| 6 | docker-namespaces.html | 命名空间隔离 |
| 7 | docker-network.html | 网络模型 |
| 8 | docker-oci.html | OCI 标准（runtime + image + distribution） |
| 9 | docker-overlayfs.html | OverlayFS 联合文件系统 |
| 10 | docker-runc.html | runc 容器运行时 |
| 11 | docker-security.html | 安全机制 |
| 12 | docker-volume.html | 存储卷管理 |

### 已覆盖主题（Rust）

| # | 文件 | 主题 |
|---|------|------|
| 1 | rust-async.html | async/.await 异步编程 |
| 2 | rust-cargo.html | Cargo 包管理器 |
| 3 | rust-cli-tools.html | CLI 工具链 |
| 4 | rust-concurrency.html | 并发编程（Send/Sync） |
| 5 | rust-dioxus.html | Dioxus Web 框架 |
| 6 | rust-embedded.html | 嵌入式开发 |
| 7 | rust-gui-frameworks.html | GUI 框架（egui/iced/slint） |
| 8 | rust-macros.html | 宏系统 |
| 9 | rust-ownership.html | 所有权 / 借用 / 生命周期 |
| 10 | rust-tokio.html | Tokio 异步运行时 |
| 11 | rust-trait.html | Trait 系统 |
| 12 | rust-unsafe.html | unsafe Rust |
| 13 | rust-web-frameworks.html | Web 框架（Axum/Actix/Rocket） |

### 已覆盖主题（Python）

| # | 文件 | 主题 |
|---|------|------|
| 1 | python-basics.html | Python 基础 |
| 2 | python-asyncio.html | Python 异步编程 |
| 3 | python-concurrency.html | Python 并发编程 |
| 4 | python-pydantic.html | Pydantic 数据验证 |
| 5 | python-fastapi.html | FastAPI Web 框架 |
| 6 | python-nicegui.html | NiceGUI 桌面与 Web GUI |
| 7 | python-advanced.html | Python 高级特性 |
| 8 | python-web-ecosystem.html | Python Web 框架对比 |
| 9 | python-sqlalchemy.html | SQLAlchemy ORM |
| 10 | python-testing.html | Python 测试 |
| 11 | python-packaging.html | Python 包管理 |
| 12 | python-performance.html | Python 性能优化 |
| 13 | python-numpy-charts.html | NumPy 数据可视化 |
| 14 | linux-vivid-patterns.html | vivid TPG 测试图形（Linux 内核 + NumPy） |
| 15 | python-torchvision-patterns.html | torchvision 测试图形生成 |

### 已覆盖主题（Go 语言）

| # | 文件 | 主题 |
|---|------|------|
| 1 | go-basics.html | Go 语言基础 |
| 2 | go-concurrency.html | Go 并发编程 |
| 3 | go-scheduler.html | Go Goroutine 调度器 |
| 4 | go-gc.html | Go 内存管理与 GC |
| 5 | go-memory.html | Go 内存模型与逃逸分析 |
| 6 | go-reflection.html | Go 反射与泛型 |
| 7 | go-net-http.html | Go net/http 深度解析 |
| 8 | go-standard-lib.html | Go 标准库核心 |
| 9 | go-module.html | Go Module 包管理 |
| 10 | go-cgo.html | Go CGo 与跨语言调用 |
| 11 | go-profiling.html | Go 性能分析与调优 |
| 12 | go-generics.html | Go 泛型深入 |

### 已覆盖主题（AI 视觉）

| # | 文件 | 主题 |
|---|------|------|
| 1 | vision-opencv-intro.html | OpenCV 入门与环境搭建 |
| 2 | vision-opencv-image.html | OpenCV 图像处理基础 |
| 3 | vision-opencv-features.html | OpenCV 特征检测与匹配 |
| 4 | vision-yolo-evolution.html | YOLO 系列模型演进 |
| 5 | vision-yolo-practice.html | YOLOv8 目标检测实战 |
| 6 | vision-pytorch-basics.html | PyTorch 基础入门 |
| 7 | vision-pytorch-classification.html | PyTorch 图像分类实战 |
| 8 | vision-tensorflow-basics.html | TensorFlow 基础入门 |
| 9 | vision-tensorflow-detection.html | TensorFlow 目标检测实战 |
| 10 | vision-onnx-intro.html | ONNX 模型格式与转换 |
| 11 | vision-onnx-deployment.html | ONNX 模型部署实战 |
| 12 | vision-model-optimization.html | 模型量化与优化技术 |
| 13 | vision-object-detection.html | 目标检测基础原理 |
| 14 | vision-segmentation.html | 图像分割技术详解 |
| 15 | vision-face-detection.html | 人脸检测与识别技术 |

### 已覆盖主题（Windows）

| # | 文件 | 主题 |
|---|------|------|
| 1 | windows-atl-wtl.html | ATL / WTL 模板库 |
| 2 | windows-maui.html | .NET MAUI |
| 3 | windows-mfc.html | MFC 框架 |
| 4 | windows-uwp.html | UWP 通用平台 |
| 5 | windows-webview2.html | WebView2 |
| 6 | windows-win32.html | Win32 API |
| 7 | windows-winforms.html | WinForms |
| 8 | windows-winui3.html | WinUI 3 |
| 9 | windows-wpf.html | WPF |

### 已覆盖主题（Zephyr RTOS）

| # | 文件 | 主题 |
|---|------|------|
| 1 | zephyr-overview.html | Zephyr RTOS 整体架构 |
| 2 | zephyr-scheduler.html | 内核调度器 |
| 3 | zephyr-thread.html | 线程模型 |
| 4 | zephyr-memory.html | 内存管理 |
| 5 | zephyr-synchronization.html | 同步原语 |
| 6 | zephyr-ipc.html | 进程间通信 |
| 7 | zephyr-timer.html | 定时器与时间管理 |
| 8 | zephyr-interrupt.html | 中断与异常处理 |
| 9 | zephyr-device-model.html | 设备模型 |
| 10 | zephyr-device-tree.html | 设备树 |
| 11 | zephyr-driver-framework.html | 驱动框架 |
| 12 | zephyr-power-management.html | 电源管理 |
| 13 | zephyr-networking.html | 网络栈 |
| 14 | zephyr-bluetooth.html | 蓝牙协议栈 |
| 15 | zephyr-build-system.html | 构建系统 |
| 16 | zephyr-tracing.html | 追踪与调试 |
| 17 | zephyr-security.html | 安全机制 |
| 18 | zephyr-zbus.html | zbus 消息总线 |
| 19 | zephyr-smp.html | SMP 多核支持 |
| 20 | zephyr-filesystem.html | 文件系统 |
| 21 | zephyr-workqueue.html | 工作队列 (k_work) |
| 22 | zephyr-usb.html | USB 子系统 |
| 23 | zephyr-llext.html | LLEXT 可加载扩展 |
| 24 | zephyr-mcumgr.html | MCU 管理器 (mcumgr) |
| 25 | zephyr-modem.html | Modem 子系统 |
| 26 | zephyr-dfu.html | 设备固件升级 (DFU) |
| 27 | zephyr-sensing.html | 传感量子系统 |
| 28 | zephyr-can.html | CAN 总线 |
| 29 | zephyr-lorawan.html | LoRaWAN |
| 30 | zephyr-modbus.html | Modbus 协议 |
| 31 | zephyr-rtio.html | RTIO 异步 I/O |
| 32 | zephyr-posix.html | POSIX 兼容层 |
| 33 | zephyr-input.html | 输入子系统 |
| 34 | zephyr-stats.html | 统计子系统 |
| 35 | zephyr-settings.html | Settings 持久化 |
| 36 | zephyr-random.html | 随机数子系统 |
| 37 | zephyr-retention.html | Retention 掉电保留 |
| 38 | zephyr-task-wdt.html | 任务看门狗 |
| 39 | zephyr-net-management.html | 网络管理 |
| 40 | zephyr-shell.html | Shell 子系统 |
| 41 | zephyr-mcuboot.html | MCUboot 深度解析 |

---

## 公共文件

### common.css

提供所有文档共享的 CSS：
- 亮色/暗色（Dracula）主题变量（`[data-theme="dark"]` 选择器）
- 文档侧边栏（桌面端固定 260px，移动端折叠滑出）
- 侧边栏折叠按钮、展开按钮、拖拽调整宽度
- Hero / 导航 / 卡片 / 代码块 / 表格 / 流程图 / 提示框 / 文件树等组件
- `:has(.doc-sidebar)` 自动为有侧边栏的页面添加左侧边距
- `.sidebar-cat-*` / `.sidebar-item` / `.sidebar-search` 类（与 `index.html` 共用）

### common.js

提供所有文档共享的 JS：
- **主题切换**：localStorage 持久化 + 系统偏好检测，右上角按钮
- **文档侧边栏**：自动生成左侧导航栏（仅在有 `.hero` 的文档页面）
  - 桌面端固定 260px，标题栏 `‹` 折叠按钮
  - 折叠后左侧 `›` 展开按钮
  - 右侧边缘拖拽调整宽度（180-500px）
  - 移动端隐藏，底部 `☰` 按钮滑出
- **侧边栏持久化**：滚动位置保存到 `localStorage`（debounced 200ms），折叠状态按 `data-top` 保存/恢复
- **滚动高亮**：导航页 TOC 滚动高亮
- **代码高亮**：集成 Prism.js，按主题切换浅/暗着色方案
- **文档列表**：`DOCS` 数组定义所有文档（侧边栏 + 导航页共用）

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

### ⚠️ Mermaid 图表规则

架构图、流程图、状态图等一律使用 Mermaid，不使用 ASCII 框图或 HTML 表格：

```html
<script src="mermaid.min.js"></script>
<script src="common.js"></script>
```

图表类型选择：
- **架构/层次图** → `graph TD`（自上而下）
- **状态机** → `graph TD` + 彩色节点
- **流程图** → `graph TD` 或 `graph LR`
- **时序图** → `sequenceDiagram`
- **栈布局** → `graph BT`（自下而上）

样式规范：使用 `style` 设置节点颜色，颜色参考：
- 蓝色系：`fill:#dbeafe,stroke:#3b82f6,color:#1e40af`
- 绿色系：`fill:#dcfce7,stroke:#22c55e,color:#166534`
- 黄色系：`fill:#fef3c7,stroke:#f59e0b,color:#92400e`
- 红色系：`fill:#fee2e2,stroke:#ef4444,color:#991b1b`
- 紫色系：`fill:#f3e8ff,stroke:#a855f7,color:#6b21a8`

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
4. 更新 `index.html` 中的统计数字（`total-count` 等）
5. 如需新领域，在 `ICON_MAP` 中添加 emoji 和颜色

### 领域定义

```javascript
const ICON_MAP = {
  linux:    { emoji: "🐧", color: "#0969da" },
  docker:   { emoji: "🐳", color: "#2496ed" },
  rust:     { emoji: "🦀", color: "#ce422b" },
  windows:  { emoji: "🪟", color: "#0078d4" },
  zephyr:   { emoji: "⚡", color: "#1769aa" },
  ai:       { emoji: "🤖", color: "#ff6b6b" },
  embedded: { emoji: "🔧", color: "#bc4c00" },
  other:    { emoji: "📦", color: "#656d76" }
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
| Linux 内核 | ✅ 115 篇（基本覆盖核心子系统） |
| Linux 网络 | ✅ 26 篇 |
| Docker / 容器 | ✅ 12 篇 |
| Rust | ✅ 13 篇 |
| Windows | ✅ 9 篇 |
| 文件系统 | 待扩展（XFS、btrfs、F2FS） |
| 网络 | 待扩展（WireGuard、MPTCP、SRv6） |
| 设备驱动 | 待扩展（USB、PCIe、ALSA、V4L2） |
| Zephyr | ✅ 41 篇（内核/调度/内存/同步/IPC/定时器/中断/设备模型/驱动/PM/网络/蓝牙/构建/调试/安全/zbus/SMP/文件系统/工作队列/USB/LLEXT/mcumgr/Modem/DFU/传感/CAN/LoRaWAN/Modbus/RTIO/POSIX/输入/统计/Settings/随机数/Retention/看门狗/网络管理/Shell/MCUboot） |
| AI 视觉 | ✅ 15 篇（OpenCV / YOLO / PyTorch / TensorFlow / ONNX） |
| Go 语言 | ✅ 12 篇（基础/并发/调度/GC/内存/反射/net-http/CGo/模块/泛型/性能） |
| Python | ✅ 15 篇（基础/异步/并发/Pydantic/FastAPI/NiceGUI/SQLAlchemy/测试/性能/NumPy 可视化/torchvision 测试图形） |
