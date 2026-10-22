# 快速开始

本项目使用 [VitePress](https://vitepress.dev/) 构建。文档源文件位于 `docs/` 目录，站点配置位于 `docs/.vitepress/`。

## 环境要求

- Node.js 18 或更高版本
- pnpm 9 或更高版本

## 本地开发

安装依赖：

```bash
pnpm install
```

启动开发服务器：

```bash
pnpm docs:dev
```

启动后访问终端中显示的本地地址。修改 Markdown 文件时，页面会自动刷新。

## 构建与预览

构建生产版本：

```bash
pnpm docs:build
```

构建产物生成在 `docs/.vitepress/dist/`。

本地预览构建结果：

```bash
pnpm docs:preview
```

## 目录结构

```text
.
├── docs
│   ├── .vitepress
│   │   └── config.mts
│   ├── guide
│   │   ├── getting-started.md
│   │   └── writing.md
│   └── index.md
├── package.json
└── README.md
```

