# WSL & Bash Migration Guide

## 1. Current State Analysis
I checked your system's Windows Subsystem for Linux (WSL) status and found:
- **Default Version:** You are configured for **WSL 2**, which is perfect. It offers full system call compatibility and blazing-fast file performance.
- **Installed Distros:** Currently, there are **NO Linux distributions installed**. The WSL engine is present, but it needs an OS (like Ubuntu) to run.

## 2. Setting Up WSL (Ubuntu)
Because you don't have a distro installed, the first step is to get one. Ubuntu is the industry standard and most widely supported.

Open **PowerShell** (run as Administrator for best results) and execute:
```powershell
wsl --install -d Ubuntu
```
- This will download and install Ubuntu.
- Once it finishes, it will open a new Ubuntu terminal window and prompt you to create a **UNIX username and password**. 
  *(Tip: Keep the password simple; you will type it frequently when running `sudo` administrative commands, and when typing it, the characters won't show on screen for security).*

## 3. Installing Node.js via FNM inside WSL
Now that you have a Bash environment, you install all your development tools natively inside Linux. 

Open your new **Ubuntu** terminal and run these commands one at a time:

1. **Install fnm:**
   ```bash
   curl -fsSL https://fnm.vercel.app/install | bash
   ```
2. **Reload your shell profile** (so bash recognizes the `fnm` command):
   ```bash
   source ~/.bashrc
   ```
3. **Install the latest Node.js LTS version:**
   ```bash
   fnm install --lts
   fnm default lts-latest
   fnm use lts-latest
   ```
4. **Verify it worked:**
   ```bash
   node -v
   npm -v
   ```

## 4. Migrating Your Code to the WSL Filesystem
For massive performance gains (especially with Node.js and `npm`), your code **must** live inside the Linux virtual hard drive, not on the Windows `C:\` drive.

Inside your **Ubuntu** terminal:
1. Create a matching workspace folder in your Linux home directory (`~`):
   ```bash
   mkdir -p ~/learnCoding/localrepo
   cd ~/learnCoding/localrepo
   ```
2. **Copy your existing repo from Windows to Linux.** 
   Windows files are automatically mounted inside WSL under `/mnt/c/`. Run this command to copy everything over:
   ```bash
   cp -r /mnt/c/learnCoding/localrepo/kumarshaz.github.io .
   ```
*(Heads up: If you have a `node_modules` folder inside your old Windows directory, it's highly recommended to delete it inside Linux and run a fresh `npm install` so Linux grabs the correct binary versions of your dependencies).*

## 5. Viewing WSL Files in Windows Explorer
Moving code to WSL **does not** mean you are trapped in a terminal. You can effortlessly browse, edit, and drag-and-drop Linux files using Windows Explorer.

**Method 1: From the Linux Terminal (Fastest)**
While inside your Ubuntu terminal, navigate to your project and run:
```bash
explorer.exe .
```
*(Don't forget the dot `.` which stands for "current directory")*. This instantly opens the current Linux folder inside the native Windows File Explorer.

**Method 2: Directly from Windows Explorer**
Open any Windows Explorer window and type this into the address bar at the top:
```text
\\wsl$\Ubuntu
```
or 
```text
\\wsl.localhost\Ubuntu
```
Your entire Linux filesystem will mount like a network drive. You can pin it to Quick Access for convenience.

## 6. Developing with VS Code
To bridge the gap between Windows UI and Linux performance, use the Official WSL extension.

1. Open VS Code on Windows.
2. Go to Extensions and search for **"WSL"** (Publisher: Microsoft) and install it.
3. Once installed, go to your **Ubuntu** terminal, enter your project folder:
   ```bash
   cd ~/learnCoding/localrepo/kumarshaz.github.io
   ```
4. Launch VS Code natively from Linux:
   ```bash
   code .
   ```
VS Code will launch on Windows, but the UI will state "WSL: Ubuntu" in the bottom left corner. Any terminal you open inside VS Code (`Ctrl + ~`) will be your pure Ubuntu Bash shell!
