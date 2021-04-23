---
title: wsl2 安装ArchLinux方法
date: 2021-04-23 17:25:30
tags:
  - Linux
  - ArchLinux
  - nvim

---

## wsl2 安装ArchLinux方法

如果大家使用过wsl2的话，我们通常只能在Microsoft Store 上下载安装Ubuntu等Linux操作系统， 但是找不到Arch Linux。那么我们需要如何在wsl2上安装Arch Linux呢？



###  通过LxRunOffline 安装

1.  安装LxRunOffline, 这里以3.5.0版本为例，实际上大家可以去安装最新版本

   ```powershell
   cd %USERPROFILE%\Downloads
   curl -LO https://github.com/DDoSolitary/LxRunOffline/releases/download/v3.5.0/LxRunOffline-v3.5.0-msvc.zip
   powershell -c Expand-Archive LxRunOffline-v3.5.0-msvc.zip
   cd LxRunOffline-v3.5.0-msvc
   copy LxRunOffline.exe C:\Windows # 这步可以根据自己的需要， 不需要也许，但使用时要注意该命令的位置
   ```

2. 下载最新版本

```po
cd %USERPROFILE%\Downloads
curl -LO http://mirrors.163.com/archlinux/iso/2021.04.01/archlinux-bootstrap-2021.04.01-x86_64.tar.gz
```

 3. 安装到wsl2, 时间稍微较长需要等待一会儿

``` po
mkdir D:\WSL\Arch
LxRunOffline i -n <ArchName> -d D:\WSL\Arch\ -f %USERPROFILE%\Downloads\archlinux-bootstrap-2021.04.01-x86_64.tar.gz -r root.x86_64
```

    4.	上一步默认使用的时wsl1，我们需要切换到wsl2，时间稍微较长需要等待一会儿

```po
wsl --set-version <ArchName> 2
```

	5. 到此已经安装完成，接下来去初始化ArchLinux即可

```powershell
wsl ~ -d <ArchName>
notepad.exe /etc/pacman.d/mirrorlist # 更改为国内镜像
pacman-key --init
pacman-key --populate archlinux
pacman -Syu base base-devel vim sudo # 初始化key和安装基本软件
passwd root # 设置root密码
useradd -m -G wheel username # 添加普遍用户
passwd username # 设置普通用户密码
visudo # 找到 %wheel ALL=(ALL), 取消前面的注释
```

6. 设置为普通用户启动

```powershell
LxRunOffline su -n Arch -v 1000
```

## 以下是个人环境的安装

1.  安装zsh框架zim， ohmyzsh太过庞大，这个小巧强悍

```bash
sudo pacman -S git zsh fzf pkgfile
chsh -s $(which zsh)
sudo pkgfile -u
git clone https://github.com/kabirz/zimfw ~/.zimfw
cd ~/.zimfw
bash ./install.sh # 等待安装完成，然后重启终端
```

2. 安装neovim及其插件

```bash
sudo pacman -S neovim python python-neovim the_silver_searcher ranger cmake nodejs yarn npm rust-analyzer ccls clang-format global ripgrep xonsh ipython3
git clone https://github.com/kabirz/nvim ~/.config/nvim/
sudo ln -s /usr/bin/nvim /usr/bin/vi
sudo ln -s /usr/bin/nvim /usr/bin/vim
vi  #等待较长一段时间，这是在安装相关环境及插件
```

