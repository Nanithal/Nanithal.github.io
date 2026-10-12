# Git 命令大全 + Git 与 GitHub 完整协作教程

> 
> 前置说明：
> 
> 
> - **Git**：本地版本控制软件，用来管理代码快照、记录修改
> - **GitHub**：远程代码托管平台，存放远程仓库，多人协作
> - 核心流程：**本地仓库 ↔ 远程仓库 (GitHub)**

## 一、Git 基础配置（首次安装 Git 只需要做一次）

```
# 设置用户名（GitHub用户名）
git config --global user.name "你的Github用户名"
# 设置邮箱（注册GitHub用的邮箱）
git config --global user.email "你的github注册邮箱"

# 查看全局配置
git config --global --list
```

> 
> `--global` 代表全局，对电脑所有 git 仓库生效；去掉只对当前仓库生效。

## 二、仓库初始化（两种方式）

### 方式 1：本地新建项目，关联到 GitHub

1. 在本地创建项目文件夹，进入文件夹

```
# 进入项目目录
cd /path/to/你的项目文件夹
# 初始化git仓库，生成隐藏文件夹 .git
git init
```

2. 在 GitHub 网页上**新建空仓库**，不要勾选`Add README`、`.gitignore`（避免冲突）
3. 将本地仓库关联远程 GitHub 仓库

```
# remote是远程仓库别名，默认名字origin；后面是仓库地址（HTTPS或SSH）
git remote add origin https://github.com/用户名/仓库名.git
# 查看已关联远程仓库
git remote -v
```

### 方式 2：直接把 GitHub 上已有的仓库克隆到本地（最常用）

```
# 克隆远程仓库到本地，自动创建文件夹，自动关联origin
git clone https://github.com/用户名/仓库名.git

# 克隆后进入仓库目录
cd 仓库名
```

> 
> 两种地址区别：
> 
> 
> - HTTPS：每次拉取推送需要输入账号密码 / 个人 token，新手推荐
> - SSH：配置 ssh 密钥后免密推送，长期使用推荐

## 三、Git 核心区域概念（必须理解）

Git 有 4 个区域，所有命令本质是文件在这几个区域移动：

1. **工作区 (Working Directory)**：你看到的项目文件夹，写代码的地方
2. **暂存区 (Stage/Index)**：临时存放准备提交的修改
3. **本地仓库 (Local Repository)**：`.git`文件夹，保存所有版本快照（commit）
4. **远程仓库 (Remote Repository)**：GitHub 服务器上的仓库

流转：`工作区` →(add)→ `暂存区` →(commit)→ `本地仓库` →(push)→ `GitHub远程仓库`

## 四、基础常用 Git 命令

### 1. 查看状态

```
# 查看当前文件状态：哪些修改、新增、删除，是否加入暂存区
git status

# 简洁版状态
git status -s
```

### 2. 添加文件到暂存区

```
# 添加单个文件
git add test.py
# 添加所有修改、新增文件（不包括删除）
git add .
# 添加当前目录所有变更（包括删除文件），推荐
git add -A
```

### 3. 提交暂存区内容到本地仓库（生成版本快照）

```
git commit -m "提交说明：写清楚本次修改内容"
# 示例
git commit -m "feat: 新增登录接口"
```

> 
> 规范提交信息（推荐）
> feat：新增功能 | fix：修复 bug | docs：文档修改 | refactor：重构代码 | test：增加测试

### 4. 查看提交历史

```
# 查看所有commit日志
git log
# 简洁单行日志
git log --oneline
# 看所有分支图形化提交记录
git log --oneline --graph
```

## 五、分支操作（多人协作核心！）

> 
> 主分支一般叫 `main`（新版 github 默认，旧仓库叫 master）
> 规范：**不在 main 分支直接写代码！新建功能分支开发，完成后合并**

```
# 查看本地所有分支，*代表当前所在分支
git branch

# 创建新分支
git branch dev

# 切换到dev分支
git checkout dev
# 新版git推荐：创建+切换一步完成
git checkout -b dev

# 把dev分支合并到当前分支（比如切回main再合并dev）
git checkout main
git merge dev

# 删除本地分支（合并完成后）
git branch -d dev
```

## 六、本地 ↔ GitHub 远程仓库交互命令

```
# 拉取远程仓库最新代码到本地（推荐，先拉再写代码避免冲突）
git pull origin main

# 将本地commit推送到GitHub远程仓库
git push origin main

# 只拉取远程更新，但不自动合并，需要手动merge
git fetch origin
```

> 
> `git pull` = `git fetch` + `git merge`

## 七、撤销、回滚命令（排错必备）

```
# 撤销工作区修改（文件回到上次commit状态，未add的修改直接丢弃）
git checkout -- 文件名

# 取消暂存（已经git add，但还没commit，把文件移出暂存区）
git reset HEAD 文件名

# 版本回退，回退到指定commit，--hard会丢弃所有未提交修改，谨慎！
git reset --hard commitID

# 撤销最近一次commit（commit保留，代码回到add之前，适合改错commit信息）
git reset --soft HEAD~1
```

> 
> HEAD 代表当前最新 commit；HEAD~1 = 上一个版本

## 八、Git 与 GitHub 完整协作流程（两种模式）

## 模式 A：同仓库多人协作（团队成员，有仓库写权限）

> 
> 规范工作流：**Feature 分支工作流**

1. 拉取远程最新代码，保证本地 main 是最新

```
git checkout main
git pull origin main
```

2. 从 main 新建功能分支，在分支开发

```
git checkout -b feature/login
```

3. 在分支写代码，反复提交

```
git add -A
git commit -m "feat:实现登录页面"
```

4. 分支开发完成，**推送到 GitHub 远程**

```
git push origin feature/login
```

5. 在 GitHub 网页操作：打开仓库 → New pull request (PR)
   - 源分支：feature/login；目标分支：main
   - 填写修改说明，提交 PR
6. 队友 Review（代码评审），提出修改意见
7. 如果需要改代码：本地继续在 feature/login 分支修改，add+commit，再次 push，PR 会自动更新
8. Review 通过，网页点击 Merge pull request，合并到 main
9. 合并完成后：
   - 删除远程 feature/login 分支（网页操作）
   - 本地切回 main，拉取合并后的最新代码

```
git checkout main
git pull origin main
git branch -d feature/login
```

## 模式 B：Fork 协作（开源项目，没有仓库写权限，最常用）

开源项目不能直接 push 原仓库，需要 fork：

1. GitHub 网页打开目标开源仓库，点击右上角 `Fork`，复制一份仓库到你自己的 GitHub 账号下
2. 克隆**你自己 fork 后的仓库**到本地

```
git clone https://github.com/你的用户名/开源仓库名.git
cd 仓库名
```

3. 添加原项目仓库为上游 remote（upstream），用来同步原仓库更新

```
git remote add upstream https://github.com/原作者/开源仓库.git
# 查看remote，可以看到origin(你的仓库) 和 upstream(原仓库)
git remote -v
```

4. 新建分支开发

```
git checkout -b fix/bug1
```

5. 本地提交，推送到**你自己的 GitHub 仓库 origin**

```
git push origin fix/bug1
```

6. 在你自己 GitHub 仓库网页，New Pull Request，PR 提交到**原项目仓库**
7. 等待原作者 review、合并

> 
> ⚠️ 同步上游原仓库更新（原仓库有人提交代码，你本地要同步）

```
# 获取原仓库所有更新
git fetch upstream
# 切换本地main分支
git checkout main
# 合并上游main到本地main
git merge upstream/main
# 推送到你自己的github仓库
git push origin main
```

## 九、冲突处理（多人协作最常见问题）

当两个人修改同一个文件同一行，`git pull` / `git merge` 会出现冲突：

1. Git 会自动标记冲突文件，打开文件，看到标记

```
<<<<<<< HEAD （你本地代码）
本地写的内容
=======
远程仓库的代码
>>>>>>> commit哈希（远程版本）
```

2. **手动编辑文件**，删掉冲突标记，保留最终想要的代码
3. 修改完成后，add，commit

```
git add 冲突文件
git commit -m "merge:解决冲突"
```

## 十、SSH 免密配置（可选，推荐长期使用）

HTTPS 每次推送要输密码，SSH 配置一次永久免密：

1. 生成本地 ssh 密钥

```
ssh-keygen -t ed25519 -C "你的github邮箱"
```

一路回车，不要设置密码也可以。
2. 打开公钥文件，复制全部内容
Windows：`C:\Users\用户名\.ssh\id_ed25519.pub`
Linux/macOS：`~/.ssh/id_ed25519.pub`
3. GitHub 网页：Settings → SSH and GPG keys → New SSH key，粘贴公钥保存
4. 仓库地址换成 SSH 地址，克隆 /remote 使用 ssh 链接

## 十一、常用命令速查表

表格

| 命令                      | 作用                     |
| ------------------------- | ------------------------ |
| git init                  | 初始化本地 git 仓库      |
| git clone url             | 克隆远程仓库             |
| git remote add origin url | 关联远程仓库             |
| git status                | 查看文件状态             |
| git add .                 | 添加所有修改到暂存区     |
| git commit -m "msg"       | 提交到本地仓库           |
| git log                   | 查看提交记录             |
| git branch                | 查看分支                 |
| git checkout -b xxx       | 创建并切换分支           |
| git merge xxx             | 合并分支到当前分支       |
| git pull origin main      | 拉取远程 main 代码       |
| git push origin main      | 推送本地分支到远程       |
| git fetch                 | 获取远程更新，不自动合并 |
| git reset --hard xxx      | 硬回退版本               |

## 十二、重要规范与避坑

1. **永远不要直接在 main/master 分支写业务代码**
2. `.gitignore` 文件：放在项目根目录，写不需要 git 管理的文件（日志、编译产物、IDE 缓存、密钥）
示例 .gitignore

```
# python
__pycache__/
*.pyc
# IDE
.vscode/
.idea/
# 系统文件
.DS_Store
```

3. 提交粒度要小：一个 commit 解决一件事，不要一次性提交几百个文件
4. 推送前先 pull，拉取远程最新代码，提前发现冲突

如果你需要，我可以单独给你：

1. 一份极简可打印 git 命令卡片
2. 完整演示：从零新建仓库 + 提交 + PR 合并的实操示例
3. 冲突模拟练习脚本