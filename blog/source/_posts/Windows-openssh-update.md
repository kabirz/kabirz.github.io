---
title: Windows 升级 openssh
date: 2021-04-26 10:06:50
tags:
   - PowerShell
   - openssh
   - Windows
---

## 由于Windows默认的opennssh有bug导致Windows terminal远程ssh到其他主机时无法使用鼠标， 要升级Windows openssh到8，
```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$url = 'https://github.com/PowerShell/Win32-OpenSSH/releases/latest/'
$request = [System.Net.WebRequest]::Create($url)
$request.AllowAutoRedirect=$false
$response=$request.GetResponse()
$source = $([String]$response.GetResponseHeader("Location")).Replace('tag','download') + '/OpenSSH-Win64.zip' 
(New-Object System.Net.WebClient).DownloadFile($source, 'OpenSSH-Win64.zip')


# Overwrite windows installed bins
$openSshBins = (Get-ChildItem 'C:\WINDOWS\System32\OpenSSH\').Name
Expand-Archive -Path .\OpenSSH-Win64.zip -DestinationPath .
takeown.exe /a /r /f C:\Windows\System32\OpenSSH\
icacls.exe 'C:\Windows\System32\OpenSSH' /grant 'BUILTIN\Administrators:(OI)(CI)F'
icacls.exe 'C:\Windows\System32\OpenSSH' /grant 'BUILTIN\Administrators:F' /t
Stop-Service ssh-agent
$openSshBins | %{ Copy-Item -Path .\OpenSSH-Win64\$_ -Destination C:\Windows\System32\OpenSSH\ }
Start-Service ssh-agent
```

把上面的代码保存到xx.ps1里， 用管理员用户执行它，如果抱错可能是系统禁止了powershell的执行，需要先执行
set-ExecutionPolicy RemoteSigned

