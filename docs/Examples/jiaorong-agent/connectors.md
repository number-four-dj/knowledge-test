# 连接器

## 连接器中心

### 展示位置

连接器展示在交融超级智能体客户端市场上，用户点击左侧菜单【插件中心】出现二级菜单，选择【连接器】，进入【连接器中心】

![](/connectors/image1.png)

用户点击对应连接器卡片右侧【开关】，启用或停用连接器，并支持在对话中调用已启用的连接器

![](/connectors/image2.png)

![](/connectors/image3.png)

## 连接器创建工具

点击开放平台-连接器-右上角【创建连接器】

选择本地 connector.zip，开放平台解析 mcp.json 后创建连接器草稿

![](/connectors/image4.png)

草稿创建成功后，点击卡片【发布】。已发布连接器支持【更新连接器】【下架】【重新发布】，草稿和已下架记录支持【移除】。

## 开放平台解析失败原因

在开放平台上如创建连接器过程中，提交zip包后解析失败，可参考后续【连接器基础结构】【mcp.json说明】定位问题，如定位问题失败，请发送邮件联系运营同学

- 文件扩展名不是 .zip。
- mcp.json 不在 zip 根目录。
- mcp.json 不是合法 JSON。
- mcp.json 顶层缺少 mcpServers，或 mcpServers 不是对象。
- 一个 zip 内包含多个 MCP 服务；需要多个服务时拆成多个 zip 上传。
- MCP 服务配置不是对象。
- type / transport 不是 stdio、http、sse，且无法根据 baseUrl 或 url 推断为 http。
- stdio 连接器缺少非空 command。
- http / sse 连接器缺少非空 baseUrl 或 url。
- 更新连接器时，包内服务名与当前连接器 ID 不一致。

### 连接器基础结构

```text
connector.zip
└── mcp.json          # 连接器定义（必须）
```

- mcp.json 必须放在 zip 根目录。
- 一个连接器包只允许一个 MCP 服务；需要多个服务时拆成多个 zip 上传。
- mcpServers 必须且只能有一个键，服务名对应唯一连接器记录。
- 服务名长度为 1–256 字符，不得包含首尾空白、控制字符和双向控制字符。
- 服务名同模块唯一；首次发布后会持续占用，更新时必须保持一致。

### mcp.json说明

mcp.json 使用 JSON 配置，服务名写在 mcpServers 下。

#### stdio 示例：

```json
{
  "mcpServers": {
    "我的连接器": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "my-mcp-server"],
      "env": {},
      "descriptions": "示例 MCP 服务",
      "icons": "🔌"
    }
  }
}
```

#### HTTP 示例：

```json
{
  "mcpServers": {
    "我的连接器": {
      "type": "http",
      "url": "https://example.com/mcp",
      "headers": {},
      "descriptions": "示例远程 MCP",
      "icons": "🌐"
    }
  }
}
```

#### SSE 示例：

```json
{
  "mcpServers": {
    "我的连接器": {
      "type": "sse",
      "baseUrl": "https://example.com/sse",
      "customHeaders": {},
      "descriptions": "示例 SSE MCP",
      "icons": "🌐"
    }
  }
}
```

- type：stdio / http / sse。
- command：stdio 必填，本地进程启动命令。
- args：数组，传给 command 的参数。
- env：对象，进程环境变量。
- url / baseUrl：http 和 sse 必填，远程服务地址。
- headers / customHeaders：远程请求头，customHeaders 优先。
- descriptions：连接器描述。
- icons：连接器图标。

### 包大小限制

- 压缩包最大 200 MB。
- 解压后最大 256 MB。
- 单文件最大 64 MB。
- zip 条目最多 4096 个。
- mcp.json 最大 768 KB。
