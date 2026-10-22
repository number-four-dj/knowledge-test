# 编写文档

在 `docs/` 目录中新增 Markdown 文件即可创建页面。页面路径与文件路径对应，例如 `docs/guide/example.md` 对应 `/guide/example`。

## 添加导航

- 顶部导航在 `docs/.vitepress/config.mts` 的 `themeConfig.nav` 中配置。
- 指南侧边栏在 `themeConfig.sidebar` 中配置。
- 有多个内容板块时，可以按目录增加独立的侧边栏配置。

## Markdown 示例

```md
# 页面标题

这里是正文内容。

## 二级标题

- 列表项
- 另一个列表项
```

## 链接

站内页面使用以 `/` 开头的绝对路径：

```md
[快速开始](/guide/getting-started)
```

外部链接直接填写完整地址：

```md
[VitePress](https://vitepress.dev/)
```

