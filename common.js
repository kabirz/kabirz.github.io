// ============================================
// 公共脚本 — 主题切换 + 滚动高亮 + 文档侧边栏
// ============================================

(function() {
  'use strict';

  // 文档列表
  var DOCS = [
    { t:"Linux 内核 MMU", f:"linux-mmu.html", top:"linux" },
    { t:"Linux 内存管理", f:"linux-mm.html", top:"linux" },
    { t:"Linux 调度器", f:"linux-scheduler.html", top:"linux" },
    { t:"Linux 原子操作", f:"linux-atomic.html", top:"linux" },
    { t:"Linux 自旋锁", f:"linux-spinlock.html", top:"linux" },
    { t:"Linux CAS vs Spinlock", f:"linux-cas-vs-spinlock.html", top:"linux" },
    { t:"Linux 互斥锁", f:"linux-mutex.html", top:"linux" },
    { t:"Linux 信号量", f:"linux-semaphore.html", top:"linux" },
    { t:"Linux 读写锁", f:"linux-rwlock.html", top:"linux" },
    { t:"Linux RCU", f:"linux-rcu.html", top:"linux" },
    { t:"Linux Completion", f:"linux-completion.html", top:"linux" },
    { t:"Linux 等待队列", f:"linux-waitqueue.html", top:"linux" },
    { t:"Linux 工作队列", f:"linux-workqueue.html", top:"linux" },
    { t:"Linux WQ_BH", f:"linux-wq-bh.html", top:"linux" },
    { t:"Linux cgroup", f:"linux-cgroup.html", top:"linux" },
    { t:"Linux cleanup.h", f:"linux-cleanup.html", top:"linux" },
    { t:"Linux seq_file", f:"linux-seq_file.html", top:"linux" },
    { t:"Linux Notifier Chain", f:"linux-notifier.html", top:"linux" },
    { t:"Linux kref", f:"linux-kref.html", top:"linux" },
    { t:"Linux XArray", f:"linux-xarray.html", top:"linux" },
    { t:"Linux sched_ext", f:"linux-sched-ext.html", top:"linux" },
    { t:"Linux procfs", f:"linux-procfs.html", top:"fs" },
    { t:"Linux VFS", f:"linux-vfs.html", top:"fs" },
    { t:"Linux 设备模型", f:"linux-devmodel.html", top:"driver" },
    { t:"Linux 设备树", f:"linux-devtree.html", top:"other" },
    { t:"Linux ARM 内存管理", f:"linux-arm-mm.html", top:"other" },
    { t:"Linux pinctrl", f:"linux-pinctrl.html", top:"driver" },
    { t:"Linux GPIO", f:"linux-gpio.html", top:"driver" },
    { t:"Linux I2C", f:"linux-i2c.html", top:"driver" },
    { t:"Linux SPI", f:"linux-spi.html", top:"driver" },
    { t:"Linux 串口", f:"linux-serial.html", top:"driver" },
    { t:"Linux MMC", f:"linux-mmc.html", top:"driver" },
    { t:"Linux LED", f:"linux-led.html", top:"driver" },
    { t:"Linux PWM", f:"linux-pwm.html", top:"driver" },
    { t:"Linux 时钟", f:"linux-clk.html", top:"driver" },
    { t:"Linux DMA", f:"linux-dma.html", top:"driver" },
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
    { t:"Linux sysfs", f:"linux-sysfs.html", top:"driver" },
    { t:"Linux ext4", f:"linux-ext4.html", top:"fs" },
    { t:"Linux 伙伴系统", f:"linux-buddy.html", top:"linux" },
    { t:"Linux Namespace", f:"linux-namespace.html", top:"linux" },
    { t:"Linux tmpfs", f:"linux-tmpfs.html", top:"fs" },
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
    { t:"select/poll/epoll", f:"linux-select-poll-epoll.html", top:"linux" },
    { t:"Linux ftrace", f:"linux-ftrace.html", top:"linux" },
    { t:"Linux io_uring", f:"linux-io-uring.html", top:"linux" },
    { t:"Linux 通用中断", f:"linux-irq.html", top:"linux" },
    { t:"Linux eBPF", f:"linux-ebpf.html", top:"linux" },
    { t:"Linux 时间子系统", f:"linux-timers.html", top:"linux" },
    { t:"Linux 块设备子系统", f:"linux-block.html", top:"linux" },
    { t:"Linux PCI/PCIe", f:"linux-pci.html", top:"linux" },
    { t:"Linux 电源管理", f:"linux-pm.html", top:"linux" },
    { t:"Linux 性能监控", f:"linux-perf.html", top:"linux" },
    { t:"Linux 安全模块", f:"linux-lsm.html", top:"linux" },
    { t:"Windows MFC", f:"windows-mfc.html", top:"windows" },
    { t:"Windows Win32 API", f:"windows-win32.html", top:"windows" },
    { t:"Windows ATL/WTL", f:"windows-atl-wtl.html", top:"windows" },
    { t:"Windows Forms", f:"windows-winforms.html", top:"windows" },
    { t:"Windows WPF", f:"windows-wpf.html", top:"windows" },
    { t:"Windows UWP", f:"windows-uwp.html", top:"windows" },
    { t:"Windows WinUI 3", f:"windows-winui3.html", top:"windows" },
    { t:".NET MAUI", f:"windows-maui.html", top:"windows" },
    { t:"Windows WebView2", f:"windows-webview2.html", top:"windows" },
    { t:"Dioxus", f:"rust-dioxus.html", top:"rust" }
  ];
  var TOP_LABELS = { linux:"Linux 内核", fs:"文件系统", driver:"设备与驱动", net:"网络", windows:"Windows 开发", rust:"Rust 开发", other:"硬件与平台" };

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
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    var tops = {};
    DOCS.forEach(function(d) {
      if (!tops[d.top]) tops[d.top] = [];
      tops[d.top].push(d);
    });

    var html = '<div class="doc-sidebar-hdr"><a class="back" href="index.html">← 导航页</a><div class="btns"><button class="hdr-btn" id="sb-collapse" title="收起">‹</button></div></div><nav class="doc-sidebar-nav">';
    ['linux','fs','driver','net','windows','rust','other'].forEach(function(top) {
      var items = tops[top];
      if (!items || !items.length) return;
      html += '<div class="doc-sidebar-cat">' + (TOP_LABELS[top]||top) + '</div>';
      items.forEach(function(d) {
        var cls = d.f === currentFile ? 'doc-sidebar-item current' : 'doc-sidebar-item';
        html += '<a href="' + d.f + '" class="' + cls + '">' + d.t + '</a>';
      });
    });
    html += '</nav>';

    var sidebar = document.createElement('div');
    sidebar.className = 'doc-sidebar';
    sidebar.innerHTML = html;
    document.body.appendChild(sidebar);

    // 将当前文档项滚动到侧边栏可见区域（避免每次打开都停在顶部）
    requestAnimationFrame(function() {
      var cur = sidebar.querySelector('.doc-sidebar-item.current');
      if (!cur) return;
      var scroller = sidebar.querySelector('.doc-sidebar-nav') || sidebar;
      var sR = scroller.getBoundingClientRect();
      var cR = cur.getBoundingClientRect();
      // 已在可视区则无需滚动
      if (cR.top >= sR.top - 1 && cR.bottom <= sR.bottom + 1) return;
      // 让当前项尽量居中显示（仅滚动侧边栏容器，不影响主窗口）
      scroller.scrollTop += cR.top - sR.top - (sR.height - cR.height) / 2;
    });

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
