// ============================================
// 公共脚本 — 主题切换 + 滚动高亮 + 文档侧边栏
// ============================================

(function() {
  'use strict';

  // 文档列表
  var DOCS = [
    { t:"Linux 内核 MMU 实现详解", f:"linux-mmu.html", top:"linux" },
    { t:"Linux 内核内存管理", f:"linux-mm.html", top:"linux" },
    { t:"Linux 调度器", f:"linux-scheduler.html", top:"linux" },
    { t:"Linux 原子操作", f:"linux-atomic.html", top:"linux" },
    { t:"Linux 自旋锁", f:"linux-spinlock.html", top:"linux" },
    { t:"Linux CAS 与自旋锁区别", f:"linux-cas-vs-spinlock.html", top:"linux" },
    { t:"Linux 互斥锁", f:"linux-mutex.html", top:"linux" },
    { t:"Linux 信号量", f:"linux-semaphore.html", top:"linux" },
    { t:"Linux 读写锁", f:"linux-rwlock.html", top:"linux" },
    { t:"Linux RCU", f:"linux-rcu.html", top:"linux" },
    { t:"Linux Completion", f:"linux-completion.html", top:"linux" },
    { t:"Linux 等待队列", f:"linux-waitqueue.html", top:"linux" },
    { t:"Linux 工作队列", f:"linux-workqueue.html", top:"linux" },
    { t:"Linux WQ_BH", f:"linux-wq-bh.html", top:"linux" },
    { t:"Linux WRITE_ONCE/READ_ONCE", f:"linux-rwonce.html", top:"linux" },
    { t:"Linux 内存屏障", f:"linux-membarrier.html", top:"linux" },
    { t:"Linux 内核代码统计", f:"linux-code-stats.html", top:"linux" },
    { t:"Linux cgroup", f:"linux-cgroup.html", top:"linux" },
    { t:"Linux cleanup.h", f:"linux-cleanup.html", top:"linux" },
    { t:"Linux seq_file", f:"linux-seq_file.html", top:"linux" },
    { t:"Linux Notifier Chain", f:"linux-notifier.html", top:"linux" },
    { t:"Linux kref", f:"linux-kref.html", top:"linux" },
    { t:"Linux XArray", f:"linux-xarray.html", top:"linux" },
    { t:"Linux sched_ext", f:"linux-sched-ext.html", top:"linux" },
    { t:"Linux io_uring", f:"linux-io-uring.html", top:"linux" },
    { t:"Linux 通用中断子系统", f:"linux-irq.html", top:"linux" },
    { t:"Linux eBPF", f:"linux-ebpf.html", top:"linux" },
    { t:"Linux 时间子系统", f:"linux-timers.html", top:"linux" },
    { t:"Linux 块设备子系统", f:"linux-block.html", top:"linux" },
    { t:"Linux PCI/PCIe", f:"linux-pci.html", top:"linux" },
    { t:"Linux 电源管理", f:"linux-pm.html", top:"linux" },
    { t:"Linux 性能监控", f:"linux-perf.html", top:"linux" },
    { t:"Linux 安全模块", f:"linux-lsm.html", top:"linux" },
    { t:"Docker Namespaces 与容器隔离", f:"docker-namespaces.html", top:"docker" },
    { t:"Docker Capabilities 与权限", f:"docker-capabilities.html", top:"docker" },
    { t:"Docker OverlayFS 镜像存储", f:"docker-overlayfs.html", top:"docker" },
    { t:"Docker OCI 规范", f:"docker-oci.html", top:"docker" },
    { t:"Docker 引擎架构", f:"docker-arch.html", top:"docker" },
    { t:"Docker containerd", f:"docker-containerd.html", top:"docker" },
    { t:"Docker runc", f:"docker-runc.html", top:"docker" },
    { t:"Docker BuildKit", f:"docker-buildkit.html", top:"docker" },
    { t:"Docker 网络模型", f:"docker-network.html", top:"docker" },
    { t:"Docker 存储卷", f:"docker-volume.html", top:"docker" },
    { t:"Docker Compose", f:"docker-compose.html", top:"docker" },
    { t:"Docker 容器安全", f:"docker-security.html", top:"docker" },
    { t:"Rust 所有权系统深度解析", f:"rust-ownership.html", top:"rust" },
    { t:"Rust Trait 系统深度解析", f:"rust-trait.html", top:"rust" },
    { t:"Rust Unsafe 与内存模型", f:"rust-unsafe.html", top:"rust" },
    { t:"Rust 宏系统深度解析", f:"rust-macros.html", top:"rust" },
    { t:"Rust 并发原语深度解析", f:"rust-concurrency.html", top:"rust" },
    { t:"Rust Async/Await 深度解析", f:"rust-async.html", top:"rust" },
    { t:"Tokio 异步运行时深度解析", f:"rust-tokio.html", top:"rust" },
    { t:"Cargo 包管理器深度解析", f:"rust-cargo.html", top:"rust" },
    { t:"Rust Web 框架深度对比", f:"rust-web-frameworks.html", top:"rust" },
    { t:"Rust GUI 框架深度对比", f:"rust-gui-frameworks.html", top:"rust" },
    { t:"Rust 嵌入式开发深度解析", f:"rust-embedded.html", top:"rust" },
    { t:"Rust CLI 工具链深度解析", f:"rust-cli-tools.html", top:"rust" },
    { t:"Linux procfs", f:"linux-procfs.html", top:"linux" },
    { t:"Linux VFS", f:"linux-vfs.html", top:"linux" },
    { t:"Linux 设备模型", f:"linux-devmodel.html", top:"linux" },
    { t:"Linux 设备树", f:"linux-devtree.html", top:"linux" },
    { t:"Linux ARM 内存管理", f:"linux-arm-mm.html", top:"linux" },
    { t:"Linux pinctrl", f:"linux-pinctrl.html", top:"linux" },
    { t:"Linux GPIO", f:"linux-gpio.html", top:"linux" },
    { t:"Linux I2C", f:"linux-i2c.html", top:"linux" },
    { t:"Linux SPI", f:"linux-spi.html", top:"linux" },
    { t:"Linux 串口", f:"linux-serial.html", top:"linux" },
    { t:"Linux MMC", f:"linux-mmc.html", top:"linux" },
    { t:"Linux LED", f:"linux-led.html", top:"linux" },
    { t:"Linux PWM", f:"linux-pwm.html", top:"linux" },
    { t:"Linux 时钟", f:"linux-clk.html", top:"linux" },
    { t:"Linux DMA", f:"linux-dma.html", top:"linux" },
    { t:"Linux V4L2", f:"linux-v4l2.html", top:"linux" },
    { t:"Linux 网络", f:"linux-network.html", top:"net" },
    { t:"Linux Bridge", f:"linux-bridge.html", top:"net" },
    { t:"Linux veth", f:"linux-veth.html", top:"net" },
    { t:"Linux tun/tap", f:"linux-tun-tap.html", top:"net" },
    { t:"数据包接收流程", f:"linux-rx-packet.html", top:"net" },
    { t:"数据包发送流程", f:"linux-tx-packet.html", top:"net" },
    { t:"Netfilter/iptables", f:"linux-netfilter.html", top:"net" },
    { t:"XDP/eBPF 网络", f:"linux-xdp-ebpf.html", top:"net" },
    { t:"Linux TCP 协议栈", f:"linux-tcp.html", top:"net" },
    { t:"Linux 网络命名空间", f:"linux-netns.html", top:"net" },
    { t:"Linux Socket 层", f:"linux-socket.html", top:"net" },
    { t:"Linux UDP 协议栈", f:"linux-udp.html", top:"net" },
    { t:"Linux VLAN", f:"linux-vlan.html", top:"net" },
    { t:"Linux VXLAN", f:"linux-vxlan.html", top:"net" },
    { t:"Linux ARP", f:"linux-arp.html", top:"net" },
    { t:"Linux 路由子系统", f:"linux-routing.html", top:"net" },
    { t:"Linux sk_buff", f:"linux-skbuff.html", top:"net" },
    { t:"Linux NAPI", f:"linux-napi.html", top:"net" },
    { t:"Linux ICMP", f:"linux-icmp.html", top:"net" },
    { t:"Linux Netlink", f:"linux-netlink.html", top:"net" },
    { t:"Linux Traffic Control", f:"linux-tc.html", top:"net" },
    { t:"Linux AF_PACKET", f:"linux-af-packet.html", top:"net" },
    { t:"UNIX Domain Socket", f:"linux-unix-socket.html", top:"net" },
    { t:"Linux Signal", f:"linux-signal.html", top:"linux" },
    { t:"Linux Pipe", f:"linux-pipe.html", top:"linux" },
    { t:"Linux net_device", f:"linux-net-device.html", top:"net" },
    { t:"Linux IPv6", f:"linux-ipv6.html", top:"net" },
    { t:"Linux mmap", f:"linux-mmap.html", top:"linux" },
    { t:"Linux Page Cache", f:"linux-page-cache.html", top:"linux" },
    { t:"Linux 共享内存", f:"linux-shared-memory.html", top:"linux" },
    { t:"Linux FIFO", f:"linux-fifo.html", top:"linux" },
    { t:"Linux sysfs", f:"linux-sysfs.html", top:"linux" },
    { t:"Linux ext4", f:"linux-ext4.html", top:"linux" },
    { t:"Linux 伙伴系统", f:"linux-buddy.html", top:"linux" },
    { t:"Linux Namespace", f:"linux-namespace.html", top:"linux" },
    { t:"Linux tmpfs", f:"linux-tmpfs.html", top:"linux" },
    { t:"Linux fork/exec", f:"linux-fork-exec.html", top:"linux" },
    { t:"Linux splice", f:"linux-splice.html", top:"linux" },
    { t:"Linux seccomp", f:"linux-seccomp.html", top:"linux" },
    { t:"Linux Capability", f:"linux-capability.html", top:"linux" },
    { t:"Linux kthread", f:"linux-kthread.html", top:"linux" },
    { t:"Linux futex", f:"linux-futex.html", top:"linux" },
    { t:"Linux Overcommit", f:"linux-overcommit.html", top:"linux" },
    { t:"Linux Huge Pages", f:"linux-hugepages.html", top:"linux" },
    { t:"Linux NUMA", f:"linux-numa.html", top:"linux" },
    { t:"Linux SELinux", f:"linux-selinux.html", top:"linux" },
    { t:"Linux 进程组与会话", f:"linux-process-groups.html", top:"linux" },
    { t:"Linux inotify", f:"linux-inotify.html", top:"linux" },
    { t:"Linux Audit", f:"linux-audit.html", top:"linux" },
    { t:"Linux 随机数", f:"linux-random.html", top:"linux" },
    { t:"Linux fanotify", f:"linux-fanotify.html", top:"linux" },
    { t:"Linux 内核模块", f:"linux-kernel-modules.html", top:"linux" },
    { t:"Linux Softirq", f:"linux-softirq.html", top:"linux" },
    { t:"Linux debugfs", f:"linux-debugfs.html", top:"linux" },
    { t:"Linux Panic", f:"linux-panic.html", top:"linux" },
    { t:"Linux Watchdog", f:"linux-watchdog.html", top:"linux" },
    { t:"Linux CPUFreq", f:"linux-cpufreq.html", top:"linux" },
    { t:"Linux cpuidle", f:"linux-cpuidle.html", top:"linux" },
    { t:"Linux ptrace", f:"linux-ptrace.html", top:"linux" },
    { t:"Linux Coredump", f:"linux-coredump.html", top:"linux" },
    { t:"Linux Thermal", f:"linux-thermal.html", top:"linux" },
    { t:"Linux Suspend/Resume", f:"linux-suspend.html", top:"linux" },
    { t:"Linux IOMMU", f:"linux-iommu.html", top:"linux" },
    { t:"Linux 内存压缩", f:"linux-compaction.html", top:"linux" },
    { t:"Linux Swap", f:"linux-swap.html", top:"linux" },
    { t:"Linux 内存热插拔", f:"linux-memory-hotplug.html", top:"linux" },
    { t:"Linux VDSO", f:"linux-vdso.html", top:"linux" },
    { t:"Linux TTY", f:"linux-tty.html", top:"linux" },
    { t:"Linux 页面回收", f:"linux-page-reclaim.html", top:"linux" },
    { t:"Linux Writeback", f:"linux-writeback.html", top:"linux" },
    { t:"Linux 缺页异常", f:"linux-pagefault.html", top:"linux" },
    { t:"Linux KSM", f:"linux-ksm.html", top:"linux" },
    { t:"Linux 消息队列", f:"linux-message-queue.html", top:"linux" },
    { t:"Linux KASAN", f:"linux-kasan.html", top:"linux" },
    { t:"Linux Kernel Lockdown", f:"linux-lockdown.html", top:"linux" },
    { t:"Linux 内核污染", f:"linux-taint.html", top:"linux" },
    { t:"Linux Static Keys", f:"linux-static-keys.html", top:"linux" },
    { t:"Linux Livepatch", f:"linux-livepatch.html", top:"linux" },
    { t:"Linux KASLR", f:"linux-kaslr.html", top:"linux" },
    { t:"Linux RAS", f:"linux-ras.html", top:"linux" },
    { t:"Linux 内存模型", f:"linux-lkmm.html", top:"linux" },
    { t:"Linux 内核调试", f:"linux-debugging.html", top:"linux" },
    { t:"Linux perf events", f:"linux-perf-events.html", top:"linux" },
    { t:"Linux ftrace", f:"linux-ftrace.html", top:"linux" },
    { t:"Linux Tracepoint", f:"linux-tracepoints.html", top:"linux" },
    { t:"Linux Kprobe/Uprobe", f:"linux-kprobe.html", top:"linux" },
    { t:"Linux BPF Map", f:"linux-bpf-maps.html", top:"linux" },
    { t:"Linux 内核追踪全景", f:"linux-tracing-overview.html", top:"linux" },
    { t:"Linux 锁定机制全景", f:"linux-locking-overview.html", top:"linux" },
    { t:"Linux 内存管理全景", f:"linux-mm-overview.html", top:"linux" },
    { t:"Linux 网络栈全景", f:"linux-net-overview.html", top:"net" },
    { t:"Linux 性能分析全景", f:"linux-profiling-overview.html", top:"linux" },
    { t:"Linux 调试技术全景", f:"linux-debugging-overview.html", top:"linux" },
    { t:"Linux 进程间通信全景", f:"linux-ipc-overview.html", top:"linux" },
    { t:"select/poll/epoll", f:"linux-select-poll-epoll.html", top:"linux" },
    { t:"Windows MFC 深度解析", f:"windows-mfc.html", top:"windows" },
    { t:"Windows Win32 API 深度解析", f:"windows-win32.html", top:"windows" },
    { t:"Windows ATL/WTL 深度解析", f:"windows-atl-wtl.html", top:"windows" },
    { t:"Windows Forms 深度解析", f:"windows-winforms.html", top:"windows" },
    { t:"Windows WPF 深度解析", f:"windows-wpf.html", top:"windows" },
    { t:"Windows UWP 深度解析", f:"windows-uwp.html", top:"windows" },
    { t:"Windows WinUI 3 深度解析", f:"windows-winui3.html", top:"windows" },
    { t:".NET MAUI 深度解析", f:"windows-maui.html", top:"windows" },
    { t:"Windows WebView2 深度解析", f:"windows-webview2.html", top:"windows" },
    { t:"Dioxus 深度解析", f:"rust-dioxus.html", top:"rust" },
    { t:"OpenCV 入门与环境搭建", f:"vision-opencv-intro.html", top:"vision" },
    { t:"OpenCV 图像处理基础", f:"vision-opencv-image.html", top:"vision" },
    { t:"OpenCV 特征检测与匹配", f:"vision-opencv-features.html", top:"vision" },
    { t:"YOLO 系列模型演进", f:"vision-yolo-evolution.html", top:"vision" },
    { t:"YOLOv8 目标检测实战", f:"vision-yolo-practice.html", top:"vision" },
    { t:"PyTorch 基础入门", f:"vision-pytorch-basics.html", top:"vision" },
    { t:"PyTorch 图像分类实战", f:"vision-pytorch-classification.html", top:"vision" },
    { t:"TensorFlow 基础入门", f:"vision-tensorflow-basics.html", top:"vision" },
    { t:"TensorFlow 目标检测实战", f:"vision-tensorflow-detection.html", top:"vision" },
    { t:"ONNX 模型格式与转换", f:"vision-onnx-intro.html", top:"vision" },
    { t:"ONNX 模型部署实战", f:"vision-onnx-deployment.html", top:"vision" },
    { t:"模型量化与优化技术", f:"vision-model-optimization.html", top:"vision" },
    { t:"目标检测基础原理", f:"vision-object-detection.html", top:"vision" },
    { t:"图像分割技术详解", f:"vision-segmentation.html", top:"vision" },
    { t:"人脸检测与识别技术", f:"vision-face-detection.html", top:"vision" },
    { t:"Go 语言基础", f:"go-basics.html", top:"go" },
    { t:"Go 并发编程", f:"go-concurrency.html", top:"go" },
    { t:"Go Goroutine 调度器", f:"go-scheduler.html", top:"go" },
    { t:"Go 内存管理与 GC", f:"go-gc.html", top:"go" },
    { t:"Go 内存模型与逃逸分析", f:"go-memory.html", top:"go" },
    { t:"Go 反射与泛型", f:"go-reflection.html", top:"go" },
    { t:"Go net/http 深度解析", f:"go-net-http.html", top:"go" },
    { t:"Go 标准库核心", f:"go-standard-lib.html", top:"go" },
    { t:"Go Module 包管理", f:"go-module.html", top:"go" },
    { t:"Go CGo 与跨语言调用", f:"go-cgo.html", top:"go" },
    { t:"Go 性能分析与调优", f:"go-profiling.html", top:"go" },
    { t:"Go 泛型深入", f:"go-generics.html", top:"go" },
    { t:"Python 基础", f:"python-basics.html", top:"python" },
    { t:"Python 异步编程", f:"python-asyncio.html", top:"python" },
    { t:"Python 并发编程", f:"python-concurrency.html", top:"python" },
    { t:"Pydantic 数据验证", f:"python-pydantic.html", top:"python" },
    { t:"FastAPI Web 框架", f:"python-fastapi.html", top:"python" },
    { t:"NiceGUI 桌面与 Web GUI", f:"python-nicegui.html", top:"python" },
    { t:"Python 高级特性", f:"python-advanced.html", top:"python" },
    { t:"Python Web 框架对比", f:"python-web-ecosystem.html", top:"python" },
    { t:"SQLAlchemy ORM", f:"python-sqlalchemy.html", top:"python" },
    { t:"Python 测试", f:"python-testing.html", top:"python" },
    { t:"Python 包管理", f:"python-packaging.html", top:"python" },
    { t:"Python 性能优化", f:"python-performance.html", top:"python" },
    { t:"NumPy 数据可视化", f:"python-numpy-charts.html", top:"python" },
    { t:"vivid TPG 测试图形", f:"linux-vivid-patterns.html", top:"python" },
    { t:"torchvision 测试图形生成", f:"python-torchvision-patterns.html", top:"python" },
    { t:"Zephyr RTOS 整体架构", f:"zephyr-overview.html", top:"zephyr" },
    { t:"Zephyr 内核调度器", f:"zephyr-scheduler.html", top:"zephyr" },
    { t:"Zephyr 线程模型", f:"zephyr-thread.html", top:"zephyr" },
    { t:"Zephyr 内存管理", f:"zephyr-memory.html", top:"zephyr" },
    { t:"Zephyr 同步原语", f:"zephyr-synchronization.html", top:"zephyr" },
    { t:"Zephyr 进程间通信", f:"zephyr-ipc.html", top:"zephyr" },
    { t:"Zephyr 定时器与时间管理", f:"zephyr-timer.html", top:"zephyr" },
    { t:"Zephyr 中断与异常处理", f:"zephyr-interrupt.html", top:"zephyr" },
    { t:"Zephyr 设备模型", f:"zephyr-device-model.html", top:"zephyr" },
    { t:"Zephyr 设备树", f:"zephyr-device-tree.html", top:"zephyr" },
    { t:"Zephyr 驱动框架", f:"zephyr-driver-framework.html", top:"zephyr" },
    { t:"Zephyr 电源管理", f:"zephyr-power-management.html", top:"zephyr" },
    { t:"Zephyr 网络栈", f:"zephyr-networking.html", top:"zephyr" },
    { t:"Zephyr 蓝牙协议栈", f:"zephyr-bluetooth.html", top:"zephyr" },
    { t:"Zephyr 构建系统", f:"zephyr-build-system.html", top:"zephyr" },
    { t:"Zephyr 追踪与调试", f:"zephyr-tracing.html", top:"zephyr" },
    { t:"Zephyr 安全机制", f:"zephyr-security.html", top:"zephyr" },
    { t:"Zephyr zbus 消息总线", f:"zephyr-zbus.html", top:"zephyr" },
    { t:"Zephyr SMP 多核支持", f:"zephyr-smp.html", top:"zephyr" },
    { t:"Zephyr 文件系统", f:"zephyr-filesystem.html", top:"zephyr" },
    { t:"Zephyr 工作队列", f:"zephyr-workqueue.html", top:"zephyr" },
    { t:"Zephyr USB 子系统", f:"zephyr-usb.html", top:"zephyr" },
    { t:"Zephyr LLEXT 可加载扩展", f:"zephyr-llext.html", top:"zephyr" },
    { t:"Zephyr MCU 管理器", f:"zephyr-mcumgr.html", top:"zephyr" },
    { t:"Zephyr Modem 子系统", f:"zephyr-modem.html", top:"zephyr" },
    { t:"Zephyr 设备固件升级", f:"zephyr-dfu.html", top:"zephyr" },
    { t:"Zephyr 传感量子系统", f:"zephyr-sensing.html", top:"zephyr" },
    { t:"Zephyr CAN 总线", f:"zephyr-can.html", top:"zephyr" },
    { t:"Zephyr LoRaWAN", f:"zephyr-lorawan.html", top:"zephyr" },
    { t:"Zephyr Modbus 协议", f:"zephyr-modbus.html", top:"zephyr" },
    { t:"Zephyr RTIO 异步 I/O", f:"zephyr-rtio.html", top:"zephyr" },
    { t:"Zephyr POSIX 兼容层", f:"zephyr-posix.html", top:"zephyr" },
    { t:"Zephyr 输入子系统", f:"zephyr-input.html", top:"zephyr" },
    { t:"Zephyr 统计子系统", f:"zephyr-stats.html", top:"zephyr" },
    { t:"Zephyr Settings 持久化", f:"zephyr-settings.html", top:"zephyr" },
    { t:"Zephyr 随机数子系统", f:"zephyr-random.html", top:"zephyr" },
    { t:"Zephyr Retention 掉电保留", f:"zephyr-retention.html", top:"zephyr" },
    { t:"Zephyr 任务看门狗", f:"zephyr-task-wdt.html", top:"zephyr" },
    { t:"Zephyr 网络管理", f:"zephyr-net-management.html", top:"zephyr" },
    { t:"Zephyr Shell 子系统", f:"zephyr-shell.html", top:"zephyr" },
    { t:"Zephyr MCUboot 深度解析", f:"zephyr-mcuboot.html", top:"zephyr" },
    { t:"FreeRTOS 整体架构", f:"freertos-overview.html", top:"freertos" },
    { t:"FreeRTOS 任务管理", f:"freertos-task.html", top:"freertos" },
    { t:"FreeRTOS 队列与 IPC", f:"freertos-queue.html", top:"freertos" },
    { t:"FreeRTOS 内存管理", f:"freertos-memory.html", top:"freertos" },
    { t:"FreeRTOS 软件定时器", f:"freertos-timer.html", top:"freertos" },
    { t:"FreeRTOS 事件组与流缓冲", f:"freertos-event-stream.html", top:"freertos" },
    { t:"FreeRTOS Tick 与时间管理", f:"freertos-tick.html", top:"freertos" },
    { t:"FreeRTOS 临界区与中断管理", f:"freertos-critical.html", top:"freertos" },
    { t:"FreeRTOS 空闲任务与电源管理", f:"freertos-idle.html", top:"freertos" },
    { t:"FreeRTOS 移植深度解析", f:"freertos-port.html", top:"freertos" },
    { t:"FreeRTOS ARM Cortex-M 移植", f:"freertos-cortexm.html", top:"freertos" },
    { t:"FreeRTOS RISC-V 移植", f:"freertos-riscv.html", top:"freertos" },
    { t:"FreeRTOS MPU 内存保护", f:"freertos-mpu.html", top:"freertos" },
    { t:"FreeRTOS 安全与认证", f:"freertos-safety.html", top:"freertos" },
    { t:"FreeRTOS 内核配置", f:"freertos-config.html", top:"freertos" },
    { t:"FreeRTOS CLI 深度解析", f:"freertos-cli.html", top:"freertos" },
    { t:"FreeRTOS 追踪与调试", f:"freertos-trace.html", top:"freertos" },
    { t:"FreeRTOS TCP/IP 深度解析", f:"freertos-tcp.html", top:"freertos" },
    { t:"FreeRTOS vs Zephyr 对比", f:"freertos-vs-zephyr.html", top:"freertos" },
    { t:"FreeRTOS 最佳实践", f:"freertos-best-practices.html", top:"freertos" },
  ];
  var TOP_LABELS = { linux:"Linux 内核", fs:"文件系统", driver:"设备与驱动", net:"Linux 网络", zephyr:"Zephyr RTOS", freertos:"FreeRTOS", windows:"Windows 开发", rust:"Rust 开发", docker:"Docker 容器", vision:"AI 视觉", go:"Go 语言", python:"Python 开发", other:"硬件与平台" };

  // 主题切换
  var STORAGE_KEY = 'kernel-docs-theme';
  function getPreferredTheme() {
    var s = localStorage.getItem(STORAGE_KEY);
    if (s) return s;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(STORAGE_KEY, t);
    var b = document.getElementById('theme-toggle');
    if (b) { b.textContent = t === 'dark' ? '\u2600' : '\u263E'; b.title = t === 'dark' ? '切换到亮色' : '切换到暗色'; }
    var pt = document.getElementById('prism-theme');
    if (pt) pt.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/' + (t === 'dark' ? 'prism-tomorrow.min.css' : 'prism.min.css');
  }
  setTheme(getPreferredTheme());
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (!localStorage.getItem(STORAGE_KEY)) setTheme(e.matches ? 'dark' : 'light');
    });
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', function() {
      var c = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(c === 'dark' ? 'light' : 'dark');
    });

    // 滚动高亮
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('nav.toc a');
    if (sections.length && navLinks.length) {
      new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            navLinks.forEach(function(l) { l.classList.remove('active'); });
            var l = document.querySelector('nav.toc a[href="#' + e.target.id + '"]');
            if (l) l.classList.add('active');
          }
        });
      }, { rootMargin: '-80px 0px -70% 0px' }).observe(sections[0]);
      sections.forEach(function(s) { /* observer already set up */ });
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            navLinks.forEach(function(l) { l.classList.remove('active'); });
            var l = document.querySelector('nav.toc a[href="#' + e.target.id + '"]');
            if (l) l.classList.add('active');
          }
        });
      }, { rootMargin: '-80px 0px -70% 0px' });
      sections.forEach(function(s) { obs.observe(s); });
    }

    // 文档页面侧边栏
    if (!document.querySelector('.hero')) return;

    var ICON_MAP = {
      linux: { emoji: "🐧", color: "#0969da" },
      windows: { emoji: "🪟", color: "#0078d4" },
      rust: { emoji: "🦀", color: "#dea584" },
      docker: { emoji: "🐳", color: "#2496ed" },
      net: { emoji: "🌐", color: "#0969da" },
      fs: { emoji: "📁", color: "#1a7f37" },
      driver: { emoji: "🔌", color: "#8250df" },
      vision: { emoji: "👁️", color: "#e74c3c" },
      go: { emoji: "🔷", color: "#00ADD8" },
      python: { emoji: "🐍", color: "#3776AB" },
      other: { emoji: "📦", color: "#656d76" }
    };

    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    var tops = {};
    DOCS.forEach(function(d) {
      if (!tops[d.top]) tops[d.top] = { label: TOP_LABELS[d.top] || d.top, items: [] };
      tops[d.top].items.push(d);
    });

    var html = '<div class="doc-sidebar-hdr"><a class="back" href="index.html">← 导航页</a><div class="btns"><button class="hdr-btn" id="sb-collapse" title="收起">‹</button></div></div>';
    html += '<div class="sidebar-search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><input type="text" id="sb-search-input" placeholder="搜索文档..."></div>';
    html += '<nav class="doc-sidebar-nav">';
    var SIDEBAR_ORDER = ['linux', 'net', 'zephyr', 'freertos', 'docker', 'rust', 'python', 'windows', 'vision', 'go'];
    Object.keys(tops).sort(function(a,b){ return SIDEBAR_ORDER.indexOf(a) - SIDEBAR_ORDER.indexOf(b); }).forEach(function(top) {
      var cat = tops[top];
      if (!cat || !cat.items || !cat.items.length) return;
      var info = ICON_MAP[top] || ICON_MAP.other;
      html += '<div class="sidebar-cat" data-top="' + top + '">';
      html += '<div class="sidebar-cat-header">';
      html += '<div class="sidebar-cat-icon" style="background:' + info.color + '20;color:' + info.color + '">' + info.emoji + '</div>';
      html += '<span class="sidebar-cat-title">' + cat.label + '</span>';
      html += '<span class="sidebar-cat-count">' + cat.items.length + '</span>';
      html += '<span class="arrow">▾</span>';
      html += '</div>';
      html += '<div class="sidebar-cat-items">';
      cat.items.forEach(function(d) {
        var cls = d.f === currentFile ? 'sidebar-item current' : 'sidebar-item';
        html += '<a href="' + d.f + '" class="' + cls + '" data-search="' + d.t.toLowerCase() + '">' + d.t + '</a>';
      });
      html += '</div></div>';
    });
    html += '</nav>';

    var sidebar = document.createElement('div');
    sidebar.className = 'doc-sidebar';
    sidebar.innerHTML = html;
    document.body.appendChild(sidebar);

    sidebar.querySelectorAll('.sidebar-cat-header').forEach(function(hdr) {
      hdr.addEventListener('click', function() {
        var items = hdr.nextElementSibling;
        hdr.classList.toggle('collapsed');
        items.classList.toggle('collapsed');
        saveCollapseState();
      });
    });

    var SB_SCROLL_KEY = 'doc-sidebar-scroll';
    var SB_COLLAPSE_KEY = 'doc-sidebar-collapsed';

    function saveCollapseState() {
      var collapsed = [];
      sidebar.querySelectorAll('.sidebar-cat-header.collapsed').forEach(function(h) {
        collapsed.push(h.parentElement.getAttribute('data-top'));
      });
      try { localStorage.setItem(SB_COLLAPSE_KEY, JSON.stringify(collapsed)); } catch(e) {}
    }

    try {
      var saved = JSON.parse(localStorage.getItem(SB_COLLAPSE_KEY) || '[]');
      if (saved.length) {
        saved.forEach(function(top) {
          var cat = sidebar.querySelector('.sidebar-cat[data-top="' + top + '"]');
          if (cat) {
            var hdr = cat.querySelector('.sidebar-cat-header');
            var items = cat.querySelector('.sidebar-cat-items');
            hdr.classList.add('collapsed');
            items.classList.add('collapsed');
          }
        });
      }
    } catch(e) {}

    var curItem = sidebar.querySelector('.sidebar-item.current');
    if (curItem) {
      var curCat = curItem.closest('.sidebar-cat');
      if (curCat) {
        var curHdr = curCat.querySelector('.sidebar-cat-header');
        var curItems = curCat.querySelector('.sidebar-cat-items');
        if (curHdr && curHdr.classList.contains('collapsed')) {
          curHdr.classList.remove('collapsed');
          curItems.classList.remove('collapsed');
          saveCollapseState();
        }
      }
    }

    var searchInput = document.getElementById('sb-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var q = searchInput.value.toLowerCase().trim();
        sidebar.querySelectorAll('.sidebar-cat').forEach(function(cat) {
          var visible = 0;
          cat.querySelectorAll('.sidebar-item').forEach(function(item) {
            var match = !q || item.getAttribute('data-search').indexOf(q) >= 0;
            item.style.display = match ? '' : 'none';
            if (match) visible++;
          });
          cat.style.display = visible > 0 ? '' : 'none';
        });
      });
    }

    var nav = sidebar.querySelector('.doc-sidebar-nav');
    if (nav) {
      try {
        var savedScroll = parseInt(localStorage.getItem(SB_SCROLL_KEY) || '0', 10);
        if (savedScroll > 0) nav.scrollTop = savedScroll;
      } catch(e) {}
      var scrollTimer;
      nav.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
          try { localStorage.setItem(SB_SCROLL_KEY, nav.scrollTop); } catch(e) {}
        }, 200);
      });
    }

    // 展开按钮
    var expandBtn = document.createElement('button');
    expandBtn.className = 'doc-sidebar-expand';
    expandBtn.innerHTML = '›';
    expandBtn.title = '展开侧边栏';
    document.body.appendChild(expandBtn);

    // 拖拽手柄
    var resizeHandle = document.createElement('div');
    resizeHandle.className = 'doc-sidebar-resize';
    sidebar.appendChild(resizeHandle);

    // 折叠/展开
    var collapsed = false;
    function toggleSidebar() {
      collapsed = !collapsed;
      sidebar.classList.toggle('collapsed', collapsed);
    }
    var collapseBtn = document.getElementById('sb-collapse');
    if (collapseBtn) collapseBtn.addEventListener('click', toggleSidebar);
    expandBtn.addEventListener('click', toggleSidebar);

    // 拖拽调宽
    var startX, startW;
    resizeHandle.addEventListener('mousedown', function(e) {
      e.preventDefault(); startX = e.clientX; startW = sidebar.offsetWidth;
      resizeHandle.classList.add('active');
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onDragEnd);
    });
    function onDrag(e) {
      var w = Math.min(Math.max(startW + (e.clientX - startX), 180), 500);
      sidebar.style.width = w + 'px';
      document.body.style.marginLeft = w + 'px';
    }
    function onDragEnd() {
      resizeHandle.classList.remove('active');
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onDragEnd);
    }

    // 移动端按钮
    var mobileBtn = document.createElement('button');
    mobileBtn.className = 'doc-sidebar-btn';
    mobileBtn.id = 'doc-sidebar-btn';
    mobileBtn.innerHTML = '\u2630';
    mobileBtn.title = '导航';
    document.body.appendChild(mobileBtn);

    var overlay = document.createElement('div');
    overlay.className = 'doc-sidebar-overlay';
    overlay.id = 'doc-sidebar-overlay';
    document.body.appendChild(overlay);

    mobileBtn.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('visible');
    });
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
    });
  });
})();

(function() {
  var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0';
  var add = ['c', 'rust', 'go', 'python', 'bash', 'cpp'];

  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.id = 'prism-theme';
  var initTheme = document.documentElement.getAttribute('data-theme') || 'light';
  css.href = cdn + '/themes/' + (initTheme === 'dark' ? 'prism-tomorrow.min.css' : 'prism.min.css');
  document.head.appendChild(css);

  var toolbarCss = document.createElement('link');
  toolbarCss.rel = 'stylesheet';
  toolbarCss.href = cdn + '/plugins/toolbar/prism-toolbar.min.css';
  document.head.appendChild(toolbarCss);

  var allScripts = [
    cdn + '/prism.min.js',
    cdn + '/plugins/toolbar/prism-toolbar.min.js',
    cdn + '/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js',
  ];
  add.forEach(function(l) { allScripts.push(cdn + '/components/prism-' + l + '.min.js'); });

  function loadNext(i) {
    if (i >= allScripts.length) {
      if (Prism.plugins.copyToClipboard) Prism.plugins.copyToClipboard.delay = 3000;
      Prism.hooks.add('complete', function() {
        document.querySelectorAll('.copy-to-clipboard-button').forEach(function(btn) {
          var icon = document.createElement('span');
          icon.style.cssText = 'font-size:14px;line-height:1';
          icon.textContent = '📋';
          btn.innerHTML = '';
          btn.appendChild(icon);
          var obs = new MutationObserver(function() {
            var state = btn.getAttribute('data-copy-state');
            if (state === 'copy-success') {
              icon.textContent = '✅';
              if (btn._copyTimer) clearTimeout(btn._copyTimer);
              btn._copyTimer = setTimeout(function() {
                icon.textContent = '📋';
                btn._copyTimer = null;
              }, 3000);
            } else {
              icon.textContent = '📋';
              if (btn._copyTimer) { clearTimeout(btn._copyTimer); btn._copyTimer = null; }
            }
          });
          obs.observe(btn, { attributes: true, attributeFilter: ['data-copy-state'] });
        });
      });
      Prism.highlightAll();
      return;
    }
    var s = document.createElement('script');
    s.src = allScripts[i];
    s.async = false;
    s.onload = function() { loadNext(i + 1); };
    document.body.appendChild(s);
  }
  loadNext(0);

  // Mermaid 初始化
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
      themeVariables: {
        darkMode: document.documentElement.getAttribute('data-theme') === 'dark'
      }
    });
  }
})();
