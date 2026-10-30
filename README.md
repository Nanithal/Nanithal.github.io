# Nanithal 的博客

Hugo Extended 0.167.0 + PaperMod，部署至 <https://nanithal.github.io/>。

## 本地预览

```bash
git submodule update --init --recursive
hugo server -D --renderToMemory
```

打开 <http://localhost:1313/>。`-D` 包括草稿；正式构建默认排除草稿。

## 新建文章

```bash
hugo new content posts/my-new-post.md
```

文章模板自动生成 YAML、日期和 `draft: true`。填写标题、简介、分类和标签，正文从二级标题开始。
分类按大方向选择：Linux、编程、算法、机器学习、嵌入式、项目、博客。标签描述具体技术。

图片放在 `static/images/posts/my-new-post/`，正文使用：

```markdown
![图片说明](/images/posts/my-new-post/example.png)
```

数学公式使用 `$...$`、`$$...$$`；流程图使用标记为 `mermaid` 的代码块。
准备发布时，将 `draft` 改为 `false`，日期不要晚于实际发布时间。

## 检查与发布

```bash
hugo --minify --destination /tmp/nanithal-blog-check
git status --short
git add content static layouts assets archetypes hugo.toml .github .gitignore README.md
git diff --cached
git commit -m "更新博客"
git push origin main
```

推送 `main` 自动触发 GitHub Actions，构建和部署成功后检查线上页面。
`public/`、`resources/`、Hugo 锁文件和 Obsidian 工作区状态不参与版本管理。
CI 从空目录生成部署产物，避免历史页面残留。自定义模板放在项目 `layouts/`，不要直接改主题子模块。

## SEO 与分享信息

- 标题、简介、作者、中文语言、canonical、Open Graph、Twitter Card 和结构化数据由配置及 PaperMod 输出。
- 网站地图：<https://nanithal.github.io/sitemap.xml>
- 爬虫说明：<https://nanithal.github.io/robots.txt>
- RSS：<https://nanithal.github.io/index.xml>
- 默认分享图：`static/images/social-card.png`；可编辑的矢量源文件是同目录的 `social-card.svg`。
- 图标源文件：`static/favicon.svg`。PNG、ICO 和 Apple Touch Icon 为其导出版本。
- 搜索页及功能测试文章使用 `robotsNoIndex: true`，并从 sitemap 排除；仍保留原网址和站内访问。

## 搜索引擎站点验证

代码配置已准备好。Google Search Console、Bing Webmaster 等账号的所有权验证需要站长本人完成。
Google 可新增网址前缀属性 `https://nanithal.github.io/`，取得 HTML 标签验证值后，按 PaperMod 的参数填写：

```toml
[params.analytics.google]
    SiteVerificationTag = "验证值"
```

部署后完成验证，再提交 `sitemap.xml`。不要把整个验证标签填入参数，只填 `content` 的值。
验证值未提供时，不生成占位验证标签。提交 sitemap 不保证立即收录。
