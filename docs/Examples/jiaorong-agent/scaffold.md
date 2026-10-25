# 应用目录

开发者中心打开 `jiaorong-demo`。调试时客户端加载 `entry` 里的本地地址，交付时加载 `web-ui/index.html`。按 [交融应用](./jiaorong-app.md) 做完即可发消息。

```text
jiaorong-demo/
  app.json      # 应用配置文件
  web-ui/       # 客户端打开的页面，放前端项目的构建产物
  node/         # 本机服务
```

## app.json

```json
{
  "id": "jiaorong-demo",
  "name": "交融示例",
  "version": "1.0.0",
  "entry": "http://127.0.0.1:5174/",
  "slot": "app-center",
  "spawn": "node node/main.js"
}
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| id | 是 | 应用 id |
| name | 是 | 显示名 |
| version | 是 | 三段式，例如 `1.0.0` |
| entry | 是 | 调试写 `http://127.0.0.1:<端口>/`，交付写 `web-ui/index.html` |
| slot | 是 | `app-center` 或 `menu` |
| spawn | 否 | 打开时启动本机服务，如 `node node/main.js` |
| description | 否 | 简介 |
| icon | 否 | 图标路径 |

前端项目不必放在应用目录里，位置任意：联调时 `entry` 指向它的 dev 地址，交付时把构建产物拷进 `web-ui/`。应用目录里 `app.json` 必需，`web-ui/` 放构建产物，`node/` 是本机服务；用到技能时再加 `skill/<技能名>/SKILL.md`，`icon` 填的图标文件也放在这一层。

页面与服务使用同一个端口 `51457`。改了 `node/` 后，离开应用再打开。
