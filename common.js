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
    { t:"Linux cgroup", f:"linux-cgroup.html", top:"linux" },
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
    { t:"Linux 网络", f:"linux-network.html", top:"net" }
  ];
  var TOP_LABELS = { linux:"Linux 内核", fs:"文件系统", driver:"设备与驱动", net:"网络", other:"硬件与平台" };

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
    ['linux','fs','driver','net','other'].forEach(function(top) {
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
