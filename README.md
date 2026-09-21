# Sud0x67 · Resume

个人简历网站，通过 GitHub Pages 托管：**https://sud0x67.github.io/resume/**

- 中英双语一键切换（右上角 `中 / EN`）
- 「下载 PDF」按钮在前端直接生成 A4 PDF（html2pdf.js）
- 开源项目与 GitHub 统计通过 GitHub API 实时获取（1 小时本地缓存）

## 如何修改简历内容

所有文字内容都在 **`js/data.js`** 中，`zh` 和 `en` 两份一一对应，直接编辑即可：

| 字段 | 内容 |
|---|---|
| `meta` | 姓名 / 头衔 / 方向标签 |
| `contact` | 联系方式 |
| `about` | 个人简介段落 |
| `work` | 工作经历（每条含 `bullets` 列表） |
| `openSource` | 开源社区身份 |
| `research` | 论文 / 研究成果 |
| `education` | 教育经历 |
| `skills` | 技能分组 |
| `ui` | 界面文案（按钮、标题等，一般不用动） |

改完推送到 `master` 即自动生效（GitHub Pages）。

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

> 直接双击 index.html 也能看，但 GitHub API / 字体等跨域资源在本地文件模式下可能受限，建议起本地服务。

## 结构

```
index.html      页面骨架
css/style.css   样式（打印/PDF 适配）
js/data.js      简历内容（中英双语）
js/app.js       渲染 / 语言切换 / PDF 导出 / GitHub API
```
