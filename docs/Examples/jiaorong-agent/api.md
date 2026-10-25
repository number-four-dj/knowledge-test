---
outline: [2, 3]
---

# API 参考

交融超级智能体开发者中心 API 参考。

<!-- 有包内 Node 时，页面先调用 [initRendererBridge](#initrendererbridge)，让 Node 能调本页的 `window.jiaorong`。其余方法在 `connect({ appId })` 拿到的 `jr` 上调用。入门、`app.json` 字段和接入方式见 [交融应用](./jiaorong-app.md)、[应用脚手架](./scaffold.md)。

调用失败会抛 Error，带 `code`（见 [错误码](#错误码)）和 `message`。创建智能体、开会话、发消息、查目录、查知识库都要已登录，否则 `UNAUTHORIZED`；只能操作本应用名下的智能体和会话，越权是 `FORBIDDEN`。 -->

<!-- 附件有本机绝对路径时只传 `{ name, path, mimeType }`，不要打 `content`；`content` 只在没有路径时用（图片 data URL，其它裸 base64）。 -->

## 方法总表 {#方法总表}

页面桥：

| 方法 | 说明 |
| --- | --- |
| [window.initRendererBridge](#initrendererbridge) | 连包内 Node，让 Node 调本页能力 |

连接与环境：

| 方法 | 说明 |
| --- | --- |
| [jr.getContext](#jrgetcontext) | 用户环境、token、应用目录 |
| [jr.userinfo](#jruserinfo) | 本地用户信息 |
| [jr.invoke](#jrinvoke) | 按方法名直接调用，未封装方法兜底 |
| [jr.getPathForFile](#jrgetpathforfile) | `File` 转本机绝对路径 |
| [jr.disconnect](#jrdisconnect) | 释放本次连接 |

智能体：

| 方法 | 说明 |
| --- | --- |
| [jr.agent.create](#jragentcreate) | 创建或同步智能体 |
| [jr.agent.get](#jragentget) | 按 id 查询 |
| [jr.agent.list](#jragentlist) | 列出本应用智能体 |

会话与消息：

| 方法 | 说明 |
| --- | --- |
| [jr.session.create](#jrsessioncreate) | 创建会话，可带首条消息 |
| [jr.session.send](#jrsessionsend) | 发消息，画面走事件 |
| [jr.session.stop](#jrsessionstop) | 停止生成 |

界面提示：

| 方法 | 说明 |
| --- | --- |
| [jr.notification.show](#jrnotificationshow) | 在主窗口右上角弹应用通知 |

应用间通信：

| 方法 | 说明 |
| --- | --- |
| [jr.app.open](#jrappopen) | 打开另一个应用并携带一次性参数 |
| [jr.app.emit](#jrappemit) | 向已打开的另一个应用发送实时消息 |

事件监听：

| 方法 / 事件 | 说明 |
| --- | --- |
| [jr.on](#jron) | 订阅事件 |
| [chat.stream.updated](#chatstreamupdated) | 助手画面变化 |
| [chat.stream.completed](#chatstreamcompleted) | 本轮正常结束 |
| [chat.stream.failed](#chatstreamfailed) | 本轮失败 |
| [chat.plan.updated](#chatplanupdated) | 计划步骤变化 |
| [sessions.messages.changed](#sessionsmessageschanged) | 消息落库变化 |
| [context](#context) | 登录态、主题变化 |
| [app.intent](#appintent) | 其它应用打开本应用时携带一次性参数 |
| [app.message](#appmessage) | 收到其它已打开应用发来的实时消息 |
| [jr.respondToolInteraction](#jrrespondtoolinteraction) | 回工具批准或模型提问 |

会话操作：

| 方法 | 说明 |
| --- | --- |
| [jr.session.list](#jrsessionlist) | 按智能体分页列会话 |
| [jr.session.search](#jrsessionsearch) | 搜索历史 |
| [jr.session.get](#jrsessionget) | 恢复会话与消息 |
| [jr.session.rename](#jrsessionrename) | 重命名 |
| [jr.session.pin](#jrsessionpin) | 置顶 |
| [jr.session.delete](#jrsessiondelete) | 删除会话 |
| [jr.session.steer](#jrsessionsteer) | 生成中改口 |
| [jr.session.retryMessage](#jrsessionretrymessage) | 重试一条消息 |
| [jr.session.deleteMessage](#jrsessiondeletemessage) | 删除该条及之后 |
| [jr.session.editUserMessage](#jrsessioneditusermessage) | 改用户消息 |
| [jr.session.fork](#jrsessionfork) | 从该条分出新会话 |

会话设置：

| 方法 | 说明 |
| --- | --- |
| [jr.session.setModel](#jrsessionsetmodel) | 切换会话模型 |
| [jr.session.setPermissionMode](#jrsessionsetpermissionmode) | 改权限模式 |
| [jr.session.setOrchestrationPolicy](#jrsessionsetorchestrationpolicy) | 改编排策略 |
| [jr.session.getGenerationSettings](#jrsessiongetgenerationsettings) | 读模型高级设置 |
| [jr.session.updateGenerationSettings](#jrsessionupdategenerationsettings) | 写模型高级设置 |
| [jr.session.getContextOccupancy](#jrsessiongetcontextoccupancy) | 读上下文占用 |
| [jr.session.setToolMode](#jrsessionsettoolmode) | 覆盖工具模式 |
| [jr.session.getDisabledAgentTools](#jrsessiongetdisabledagenttools) | 读已关闭的内置工具 |
| [jr.session.updateDisabledAgentTools](#jrsessionupdatedisabledagenttools) | 写已关闭的内置工具 |

目录：

| 方法 | 说明 |
| --- | --- |
| [jr.catalog.slash](#jrcatalogslash) | `/` 菜单：技能 + MCP 工具 |
| [jr.catalog.models](#jrcatalogmodels) | 可用模型 |
| [jr.catalog.systemPrompts](#jrcatalogsystemprompts) | 系统提示词 |
| [jr.catalog.agentTools](#jrcatalogagenttools) | 可配置的智能体工具 |

MCP 与知识库：

| 方法 | 说明 |
| --- | --- |
| [jr.mcp.create](#jrmcpcreate) | 按 JSON 注册 MCP，限定到智能体 |
| [jr.knowledgeBase.query](#jrknowledgebasequery) | 查知识库列表 |
| [jr.knowledgeBase.queryDirectory](#jrknowledgebasequerydirectory) | 下探知识库目录 |

对话框、剪贴板与截图：

| 方法 | 说明 |
| --- | --- |
| [jr.dialog.selectDirectory](#jrdialogselectdirectory) | 选目录并授权 |
| [jr.dialog.selectFiles](#jrdialogselectfiles) | 选文件（可多选） |
| [jr.dialog.readFilePreview](#jrdialogreadfilepreview) | 读文件预览 |
| [jr.dialog.rememberDroppedFiles](#jrdialogrememberdroppedfiles) | 记住拖入的文件 |
| [jr.dialog.allowProjectDir](#jrdialogallowprojectdir) | 授权项目目录 |
| [jr.clipboard.writeImage](#jrclipboardwriteimage) | 写图片到系统剪贴板 |
| [jr.capture.pageArea](#jrcapturepagearea) | 截取应用页面区域 |

调试：

| 方法 | 说明 |
| --- | --- |
| [jr.openDevTools](#jropendevtools) | 弹出本应用页面的调试控制台 |
| [jr.setDebug](#jrsetdebug) | 开关调试日志 |

## 页面桥 {#页面桥}

### window.initRendererBridge {#initrendererbridge}

在 `web-ui` 里调用，连上本机服务。端口与服务端一致，交融应用文档里是 `51457`。步骤见 [交融应用](./jiaorong-app.md)。

第二个参数是页面自定义方法，名字自己定。`toReturn` 只是示例。`initRendererBridge` 是 async，要 `await` 才拿得到 `stop`；`stop` 的调用时机由应用自己决定。

```ts
const bridge = await window.initRendererBridge(51457, {
  toReturn(data: unknown) {
    return data
  }
})
console.log(bridge)

// 需要断开时由应用自己调，例如页面卸载、组件卸载或切换应用
// bridge.stop()
```

服务端调用写成 `jr.jiaorong.agent.create(...)`、`jr.jiaorong.session.create(...)`、`jr.jiaorong.session.send(...)`，自定义方法写成 `jr.apisCustom.toReturn(...)`。服务端用 `jr.jiaorong.on('chat.stream.updated', ...)` 接收本轮内容并打印；页面要使用这些内容时，由服务端自己写接口提供。

下面各节的 `jr.agent` / `jr.session` 是方法名，服务端调用时加 `jiaorong.`。

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| port | number | 是 | 包内 Node 的 WebSocket 端口 |
| apisCustom | object | 否 | 页面自定义方法表。Node 用 `apisCustom.<方法名>` 调用，参数按位置传入 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| stop | `() => void` | 关掉连接并停止重连。调用时机由应用自己决定，例如页面卸载、组件卸载或切换应用时 |

## 连接与环境 {#连接与环境}

### jr.getContext {#jrgetcontext}

读取当前登录用户、组织、主题、应用目录，以及调业务后端要用的 token。主题、登录、组织变化时会推 [context](#context) 事件，内容与出参相同，不要轮询。

```js
const ctx = await jr.getContext()

// 请求业务后端时把 token 放进请求头 Fusion-Auth，apiBaseUrl 与 productId 成对使用
console.log(ctx.token, ctx.apiBaseUrl, ctx.productId)
```

**入参**

无。

**出参**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| userId | string | 是 | 登录用户名，未登录为空字符串 |
| orgId | string \| null | 是 | 当前组织号，没有为 `null` |
| appId | string | 是 | 本应用 id |
| clientVersion | string | 是 | 当前 JiaorongAI 客户端版本号 |
| appDir | string | 是 | 本应用安装目录，供 Node 读文件 |
| token | string \| null | 是 | 登录 token，未登录为 `null`，请求业务后端放头 `Fusion-Auth` |
| env | `'dev'` \| `'prod'` | 是 | 测试服或正式服 |

### jr.userinfo {#jruserinfo}

读取本机登录用户的资料，并带上当前 token。除 `token` 外字段不保证都有，用前先判空。

```js
const info = await jr.userinfo()
const name = info.userName || info.displayName || ''
console.log(name)
```

**入参**

无。

**出参**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| token | string \| null | 是 | 登录 token，未登录为 `null` |
| userName | string | 否 | 登录名 |
| displayName | string | 否 | 展示名 |
| （其它） | unknown | 否 | 本地用户资料的其余字段 |

### jr.invoke {#jrinvoke}

按方法名直接调用。上面的快捷方法都是它的封装，正常开发优先用快捷方法；SDK 版本还没有封装某个方法时，再用它兜底。方法名去掉 `jr.` 前缀即可。

```js
const { files } = await jr.invoke('dialog.selectFiles', {})
console.log(files)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| method | string | 是 | 方法名，如 `session.send`、`dialog.selectFiles` |
| args | object | 否 | 方法入参，不传按 `{}` 处理 |

**出参**

对应方法的出参，结构见各 API。

### jr.getPathForFile {#jrgetpathforfile}

把页面拿到的 `File`（拖入或选择器选中）换成本机绝对路径，同步调用。拿到路径后按 `{ name, path, mimeType }` 传给发消息接口。远程文件拿不到路径时返回空字符串，不抛错。

```js
// dropZone 是页面上接收拖拽的元素
dropZone.addEventListener('drop', async (event) => {
  event.preventDefault()
  // File 只能在本页换成本机绝对路径
  const picked = []
  for (const file of event.dataTransfer?.files ?? []) {
    const path = jr.getPathForFile(file)
    if (path) picked.push({ name: file.name, path, mimeType: file.type })
  }
  // 登记为已授权，之后 picked 就能直接当附件发出去
  await jr.dialog.rememberDroppedFiles(picked.map((item) => item.path))
})
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| file | File | 是 | 拖入或选中的文件对象 |

**出参**

string，本机绝对路径；拿不到为 `''`。

### jr.disconnect {#jrdisconnect}

释放本次连接订过的全部事件监听。页面离开时调用，不会登出用户。

```js
await jr.disconnect()
```

**入参**

无。

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| ok | `true` | 监听已释放 |

## 智能体 {#智能体}

### jr.agent.create {#jragentcreate}

创建智能体。`agentKey` 是应用内的稳定编号，同一 `agentKey` 重复调用不会新建第二条，只按本次传入的字段覆盖已有配置。之后的查询、更新、开会话、发消息都用返回的 `id`。

`config` 只有 `systemPrompt`、`permissionMode`、`enabledSkillNames`、`assistantModel` 四个字段会生效，其余忽略。`skills` 传技能目录名数组即可。

```js
const agent = await jr.agent.create({
  agentKey: 'contract-review',
  name: '合同审核',
  description: '审核商务合同风险',
  skills: ['contract-review'],
  config: {
    systemPrompt: '你是合同审核助手。不要编造条款。',
    permissionMode: 'default',
    assistantModel: { providerId: 'jiaorong', modelId: 'jiaorong-deepseek-v4-pro' }
  }
})
console.log(agent)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| agentKey | string | 是 | 应用内稳定编号，如 `contract-review` |
| name | string | 是 | 显示名 |
| enabled | boolean | 否 | 只有显式 `false` 才停用 |
| description | string | 否 | 描述 |
| icon | string | 否 | 图标 |
| avatar | object \| null | 否 | 头像 |
| config | object | 否 | 见下表 |
| skills | string[] | 否 | 技能目录名 |

`config`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| systemPrompt | string | 系统提示词 |
| permissionMode | `'default'` \| `'auto_approve'` \| `'full_access'` | 会话权限 |
| enabledSkillNames | string[] | 技能全名，如 `app.<appId>.<目录名>` |
| assistantModel | `{ providerId, modelId }` \| null | 默认模型，`null` 表示不指定 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 智能体 id。查询、更新、开会话都用它 |
| appId | string | 本应用 id |
| name | string | 显示名 |
| type | string | 智能体类型 |
| enabled | boolean | 是否启用 |
| description | string | 描述 |
| icon | string | 图标 |
| avatar | object \| null | 头像 |
| config | object \| null | 生效的配置 |
| created | boolean | `true` 本次新建，`false` 覆盖已有 |
| updated | boolean | `true` 本次写入了配置 |

### jr.agent.get {#jragentget}

按创建时返回的 `id` 查一个智能体。查不到返回 `null`，不抛错。

```js
const current = await jr.agent.get({ id: agent.id })
console.log(current)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 创建智能体返回的 `id` |

**出参**

智能体对象，字段同 [jr.agent.create](#jragentcreate) 出参；查不到为 `null`。

### jr.agent.list {#jragentlist}

列出本应用下全部智能体，不会返回其它应用或用户自建的智能体。

```js
const { agents } = await jr.agent.list()
const contract = agents.find((item) => item.id === agent.id)
console.log(contract)
```

**入参**

无。

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| agents | object[] | 智能体列表，元素字段同 [jr.agent.create](#jragentcreate) 出参，可能为空数组 |

## 会话与消息 {#会话与消息}

最常用的三件套：开会话、发消息、停止生成。流式画面走事件，发消息后按 [事件监听](#事件监听) 订阅渲染；列表、搜索、恢复、重命名、置顶、删除和消息纠正等见 [会话设置](#会话设置)。

### jr.session.create {#jrsessioncreate}

在某个智能体下开一条新会话。`message` 传空字符串表示只建会话不生成；带上文本和附件则立刻开始第一轮。附件路径未授权时 `accepted` 为 `false`，会话已建但本轮没有开始。

```js
// 只建会话不生成：message 传空字符串
const { session } = await jr.session.create({ agentId: agent.id, message: '' })
console.log(session)

// pickedPath 是已授权的本机绝对路径，来自 jr.dialog.selectFiles() 或 jr.getPathForFile()
const withFile = await jr.session.create({
  agentId: agent.id,
  message: '核对这份合同',
  files: [{ name: '合同.pdf', path: pickedPath, mimeType: 'application/pdf' }]
})
if (withFile.accepted === false) throw new Error('附件未受理，请重新选择文件')
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| agentId | string | 是 | 创建智能体返回的 `id` |
| message | string | 是 | 首条用户文本，只建会话传 `''` |
| files | MessageFile[] | 否 | 附件，见 [MessageFile](#messagefile) |
| search | boolean | 否 | 是否联网搜索 |
| activeSkills | string[] | 否 | 本轮技能全名 |
| inlineItems | UserMessageInlineItem[] | 否 | 行内技能 / 文件标记 |
| projectDir | string \| null | 否 | 工作区目录，`null` 表示不带工作区 |
| providerId | string | 否 | 指定服务商，与 `modelId` 一起用 |
| modelId | string | 否 | 指定模型 |
| permissionMode | `'default'` \| `'auto_approve'` \| `'full_access'` | 否 | 本会话权限 |
| orchestrationPolicy | `'explicit'` \| `'proactive'` | 否 | 编排策略 |

**出参**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| session | SessionWithState | 是 | 新会话，见 [SessionWithState](#sessionwithstate) |
| accepted | boolean | 是 | `false` 表示附件未受理 |
| initialTurn | object | 否 | 开了第一轮才有：`requestId` / `messageId` / `attachmentPreparation` |

### jr.session.send {#jrsessionsend}

在已有会话里发一条用户消息，开始本轮生成。返回值只有受理结果和本轮 id，**画面不在返回值里**，要先 [jr.on](#jron) 订阅 [chat.stream.updated](#chatstreamupdated) 再发，否则可能错过前几帧。

```js
jr.on('chat.stream.updated', (event) => {
  // event.blocks 是这条助手消息的全量块，用它覆盖式刷新画面
  console.log(event.messageId, event.blocks)
})

// pickedPath 来自 jr.dialog.selectFiles() 或 jr.getPathForFile()
const sent = await jr.session.send({
  sessionId,
  content: {
    text: '核对这份合同',
    files: [{ name: '合同.pdf', path: pickedPath, mimeType: 'application/pdf' }]
  }
})
if (sent.accepted === false) throw new Error('附件未受理，请重新选择文件')
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| content | string \| SendMessageInput | 是 | 字符串等价于 `{ text: 该字符串 }`，见 [SendMessageInput](#sendmessageinput) |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| accepted | boolean | `false` 表示附件未受理，不抛错也不开新一轮 |
| requestId | string \| null | 本轮请求 id，给 [jr.session.stop](#jrsessionstop) 用 |
| messageId | string \| null | 本轮助手消息 id |
| attachmentPreparation | unknown | 附件处理状态，一般不用 |

### jr.session.stop {#jrsessionstop}

停止当前生成。`sessionId` 与 `requestId` 至少给一个。

```js
await jr.session.stop({ sessionId })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 否 | 会话 id，优先使用 |
| requestId | string | 否 | 本轮请求 id |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| stopped | boolean | `true` 已停止；两个 id 都解析不出会话时为 `false` |

## 界面提示 {#界面提示}

### jr.notification.show {#jrnotificationshow}

在客户端主窗口右上角弹出应用通知。

```js
const result = await jr.notification.show({
  type: 'success',
  title: '导入完成',
  description: '共导入 20 条数据',
  dedupeKey: 'import-completed'
})

if (result.accepted) console.log('通知已发送')
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | `'success' \| 'info' \| 'warning' \| 'error'` | 是 | 提示类型，决定图标与样式 |
| title | string | 是 | 标题，去除首尾空白后 1–60 字符 |
| description | string | 否 | 描述，去除首尾空白后 1–160 字符 |
| dedupeKey | string | 否 | 去重标识，去除首尾空白后 1–128 字符。同一应用的同一个 `dedupeKey` 通知还在显示时，后续调用不会新增一条，而是刷新原 toast 并累加次数；不传则每次调用都算新通知 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| accepted | `true` | 通知已投递给主窗口 |

**限制**

- 只支持纯文本，不支持 HTML、Markdown、按钮、进度和点击跳转。
- 单应用默认每分钟最多 10 条，超出时抛 `RATE_LIMITED`。

## 应用间通信 {#应用间通信}

### jr.app.open {#jrappopen}

打开或切换到另一个应用，并给目标应用传递参数。

```js
await jr.app.open({
  appId: 'approval-center',
  intent: 'open-expense',
  data: {
    expenseId: 'exp-001'
  }
})
```

目标应用监听 `app.intent`：

```js
jr.on('app.intent', (event) => {
  if (event.type !== 'expense-app:open-expense') return

})
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| appId | string | 是 | 目标应用 id，只能是客户端已登记且当前用户可见的应用 |
| intent | string | 是 | 业务意图，小写字母开头，可含数字和中划线，最长 64 字符 |
| data | object | 是 | 业务参数，JSON 序列化后不超过 16KB |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| accepted | `true` | 跳转请求已受理；目标应用是否完成业务处理由其自行决定 |

**目标事件**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | string | `<来源应用id>:<intent>`，前缀由客户端注入，来源应用不能伪造 |
| data | object | 调用方传入的业务参数 |

**限制**

- 只做一次性跳转参数，不做实时通信、离线消息和请求响应。
- 目标应用未注册 `app.intent` 监听时，Intent 最多保留 5 分钟；同一目标应用未消费前只保留最新一条。

### jr.app.emit {#jrappemit}

向另一个**当前已打开**的应用发送实时消息。这个方法不会打开目标应用，也不会离线暂存消息。

```js
await jr.app.emit({
  appId: 'approval-center',
  type: 'expense-approved',
  data: {
    expenseId: 'exp-001'
  }
})
```

目标应用监听 `app.message`：

```js
jr.on('app.message', (event) => {
  if (event.type !== 'expense-app:expense-approved') return
  // event.data 是调用方传入的业务数据
})
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| appId | string | 是 | 目标应用 id，只能是客户端已登记且当前用户可见的应用 |
| type | string | 是 | 业务消息名，小写字母开头，可含数字和中划线，最长 64 字符 |
| data | object | 是 | 业务数据，JSON 序列化后不超过 64KB |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| accepted | `true` | 消息已投递给当前打开的目标应用页面 |

**目标事件**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | string | `<来源应用id>:<type>`，来源前缀由客户端注入，来源应用不能伪造 |
| data | object | 调用方传入的业务数据 |

**限制**

- 只投递给当前已打开的目标应用页面；目标未打开时抛 `APP_NOT_READY`。
- 不做 ACK、重试、顺序保证、请求响应和离线消息邮箱。
- 同一目标应用在多个窗口打开时，所有已打开页面都会收到这条消息。

## 事件监听 {#事件监听}

流式内容在事件里，不在 `session.send` 的返回值里。服务端先 `jr.jiaorong.on` 订阅，再发消息，并在日志里看到这些事件。页面要使用这些内容时，由服务端自己写接口提供。回调入参 `event` 就是对应事件的数据包，字段在各事件小节逐个说明。

| 事件 | 何时推 | 数据包主要内容 |
| --- | --- | --- |
| [chat.stream.updated](#chatstreamupdated) | 助手画面变化（流式输出） | 全量 `blocks` |
| [chat.stream.completed](#chatstreamcompleted) | 本轮正常结束 | `requestId` / `messageId` |
| [chat.stream.failed](#chatstreamfailed) | 本轮失败 | `error` |
| [chat.plan.updated](#chatplanupdated) | 计划步骤变化 | `plan` |
| [sessions.messages.changed](#sessionsmessageschanged) | 消息落库变化 | `messages` |
| [context](#context) | 登录态、主题、组织变化 | 与 `jr.getContext` 出参相同 |
| [app.intent](#appintent) | 其它应用通过 `jr.app.open` 打开本应用 | `type` / `data` |
| [app.message](#appmessage) | 其它已打开应用发来实时消息 | `type` / `data` |

### jr.on {#jron}

订阅事件。同一个事件可以挂多个回调，某个回调抛错不影响其它回调。

注意区分两个 `event`：`jr.on` 的第一个入参是事件名（字符串）；回调里的 `event` 是该事件的数据包（对象），例如监听 `chat.stream.updated` 时收到的就是流式输出事件，字段见 [事件 chat.stream.updated](#chatstreamupdated)。

```js
const off = jr.on('chat.stream.updated', (event) => {
  if (event.sessionId !== sessionId) return
  // event.blocks 是全量块，用它覆盖式刷新画面
  console.log(event.messageId, event.blocks)
})

// 不再需要监听时退订
// off()
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| event | string | 是 | 事件名，只能是上面总表里的事件 |
| handler | `(payload) => void` | 是 | 回调，入参是该事件的数据包，字段见各事件小节 |

**出参**

`() => void`，退订函数，调一次即退订。

### app.intent {#appintent}

其它应用调用 `jr.app.open` 打开本应用时触发。`type` 的来源前缀由客户端注入，应用不能伪造。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | string | `<来源应用id>:<intent>` |
| data | object | 调用方传入的一次性业务参数 |

### app.message {#appmessage}

其它已打开应用调用 `jr.app.emit` 时触发。`type` 的来源前缀由客户端注入，应用不能伪造。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | string | `<来源应用id>:<业务type>` |
| data | object | 调用方传入的业务数据 |

### 事件 chat.stream.updated {#chatstreamupdated}

助手消息画面变化。`blocks` 是该助手消息当前的**全量**块，后一次覆盖前一次，不要拼增量；同一个 `messageId` 不是新消息。正文只在 `type: 'content'` 的块里。

```js
jr.on('chat.stream.updated', (event) => {
  if (event.sessionId !== sessionId) return
  // event.blocks 是全量块，后一包覆盖前一包，用它刷新画面
  console.log(event.messageId, event.blocks)
})
```

**回调 `event` 字段**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| kind | `'snapshot'` | 是 | 固定 |
| requestId | string | 是 | 本轮请求 id |
| sessionId | string | 是 | 会话 id |
| messageId | string | 是 | 助手消息 id |
| providerId | string | 否 | 本轮服务商 id |
| modelId | string | 否 | 本轮模型 id |
| updatedAt | number | 是 | 本包时间，Unix 毫秒 |
| blocks | AssistantMessageBlock[] | 是 | 当前全量块，见 [AssistantMessageBlock](#assistantmessageblock) |

### 事件 chat.stream.completed {#chatstreamcompleted}

本轮正常结束。**没有 `blocks`，没有正文**。需要最终正文时，在 `chat.stream.updated` 里记住最后一包，或结束后调 [jr.session.get](#jrsessionget)。

```js
jr.on('chat.stream.completed', (event) => {
  // 本轮正常结束：这里做收尾，例如解除输入框的禁用态
  console.log(event.messageId, event.completedAt)
})
```

**回调 `event` 字段**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| requestId | string | 本轮请求 id |
| sessionId | string | 会话 id |
| messageId | string | 助手消息 id |
| completedAt | number | 结束时间，Unix 毫秒 |

### 事件 chat.stream.failed {#chatstreamfailed}

本轮失败，原因在 `error` 里。

```js
jr.on('chat.stream.failed', (event) => {
  // 本轮失败：把 error 文案提示给用户
  console.log(event.messageId, event.error)
})
```

**回调 `event` 字段**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| requestId | string | 本轮请求 id |
| sessionId | string | 会话 id |
| messageId | string | 助手消息 id |
| failedAt | number | 失败时间，Unix 毫秒 |
| error | string | 错误文案 |

### 事件 chat.plan.updated {#chatplanupdated}

计划（模型维护的待办列表）变化，按 `revision` 取最新。

```js
jr.on('chat.plan.updated', (event) => {
  // 用 event.plan 覆盖式刷新计划面板，revision 越大越新
  console.log(event.plan, event.terminalReason)
})
```

**回调 `event` 字段**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| messageId | string | 是 | 助手消息 id |
| toolCallId | string | 否 | 关联的工具调用 id |
| plan | object[] | 是 | 步骤列表，见下表 |
| explanation | string | 否 | 本次更新说明 |
| revision | number | 是 | 版本号，越大越新 |
| updatedAt | string | 是 | 更新时间，ISO 字符串 |
| terminalReason | `'aborted'` \| `'max_steps'` \| `'error'` | 否 | 计划结束原因，进行中没有 |

`plan[]`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| step | string | 步骤文案 |
| status | `'pending'` \| `'in_progress'` \| `'completed'` | 步骤状态 |
| priority | string \| null | 优先级 |

### 事件 sessions.messages.changed {#sessionsmessageschanged}

消息落库后的变化，用来同步历史行，例如流式结束后助手消息的最终形态。

```js
jr.on('sessions.messages.changed', (event) => {
  // 用 event.messages 更新本地历史行
  console.log(event.sessionId, event.messages)
})
```

**回调 `event` 字段**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| sessionId | string | 会话 id |
| messages | ChatMessageRecord[] | 本批变化的消息行，见 [ChatMessageRecord](#chatmessagerecord) |
| version | number | 版本号，越大越新 |

### 事件 context {#context}

登录、登出、换用户、主题、组织变化时推送，回调 `event` 与 [jr.getContext](#jrgetcontext) 出参相同。登出时 `token` 为 `null`、`userId` 为空字符串。

```js
jr.on('context', (ctx) => {
  // 主题变了就换皮肤；token 为 null 说明已登出，要引导重新登录
  console.log(ctx.theme, ctx.token, ctx.orgId)
})
```

**回调 `event` 字段**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| userId | string | 是 | 登录用户名 |
| orgId | string \| null | 是 | 当前组织号 |
| locale | string | 是 | 界面语言 |
| theme | `'light'` \| `'dark'` | 是 | 当前主题 |
| appId | string | 是 | 本应用 id |
| clientVersion | string | 是 | 当前 JiaorongAI 客户端版本号 |
| appDir | string | 是 | 应用安装目录 |
| token | string \| null | 是 | 登录 token |
| apiBaseUrl | string | 否 | 业务后端根地址 |
| productId | string | 否 | 请求头 `Product-Id` |
| env | `'dev'` \| `'prod'` | 是 | 测试服或正式服 |

### AssistantMessageBlock {#assistantmessageblock}

助手消息块。流式事件的 `blocks` 和历史消息解析出来的块是同一套结构。

**顶层字段**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| id | string | 否 | 块 id，`search` 块才有 |
| type | string | 是 | 块类型，见下表 |
| content | string | 否 | 块正文，含义随 `type` 变化 |
| status | string | 是 | 块状态，见下表 |
| timestamp | number | 是 | 块时间，Unix 毫秒 |
| reasoning_time | number \| `{ start, end }` | 否 | 仅思考块，思考起止时间 |
| image_data | `{ data, mimeType }` | 否 | 仅图片块，`data` 是裸 base64 |
| tool_call | object | 否 | 工具块和交互块才有，见下表 |
| extra | object | 否 | 附加信息，见下表 |
| action_type | string | 否 | 仅交互块，见下表 |

**type 取值**

| type | 含义 | `content` 是什么 |
| --- | --- | --- |
| `content` | 助手正文（Markdown） | 正文文本，流式期间逐步变长 |
| `reasoning_content` | 思考过程 | 思考文本 |
| `search` | 联网搜索 | 搜索词，结果在 `extra.pages` |
| `tool_call` | 工具调用与结果 | 一般空串，信息在 `tool_call` |
| `action` | 需要用户处理的交互：批准 / 提问 / 限流 | 批准块是权限说明 |
| `plan` | 计划块 | — |
| `image` | 生成的图片 | — |
| `error` | 错误块 | 错误文案 |

**status 取值**

| status | 含义 |
| --- | --- |
| `pending` | 进行中；交互块表示在等用户回答 |
| `loading` | 加载中 |
| `success` | 正常结束 |
| `error` | 出错 |
| `granted` | 交互块：用户已批准 |
| `denied` | 交互块：用户已拒绝 |

**action_type 取值**

| action_type | 含义 | 怎么回 |
| --- | --- | --- |
| `tool_call_permission` | 工具调用需要批准 | [jr.respondToolInteraction](#jrrespondtoolinteraction) 传 `{ kind: 'permission', granted }` |
| `question_request` | 模型向用户提问 | 传 `question_option` / `question_custom` / `question_other` |
| `rate_limit` | 触发限流排队 | 不用回，等自动恢复 |

判断有没有待处理的批准或提问：`type === 'action'` 且 `extra.needsUserAction === true` 且 `tool_call.id` 非空，自己从 `blocks` 里 `find` 一遍即可，见 [jr.respondToolInteraction](#jrrespondtoolinteraction)。

**tool_call 字段**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| id | string | 否 | 工具调用 id，回批准时用 |
| name | string | 否 | 工具名 |
| params | string | 否 | 工具入参 JSON 字符串，流式期间逐步变长 |
| response | string | 否 | 工具返回 |
| server_name | string | 否 | MCP 服务器名 |
| server_icons | string | 否 | MCP 服务器图标 |
| server_description | string | 否 | MCP 服务器说明 |
| rtkApplied | boolean | 否 | 是否套用了工具结果压缩 |
| rtkMode | `'rewrite'` \| `'direct'` \| `'bypass'` | 否 | 压缩模式 |
| rtkFallbackReason | string | 否 | 压缩回退原因 |
| imagePreviews | object[] | 否 | 工具产出的图片：`id` / `data` / `mimeType` / `title` / `source` |
| mcpResult | object | 否 | MCP 工具完整结果：`serverId` / `toolName` / `isError` / `content` / `structuredContent` / `meta` / `app` / `modelContext` / `truncated` |

**extra 常见键**

| 键 | 出现场景 | 说明 |
| --- | --- | --- |
| needsUserAction | 交互块 | `true` 在等用户回答，回答后变 `false` |
| permissionType | 批准块 | `'read'` \| `'write'` \| `'all'` \| `'command'` |
| toolName / toolSource | 工具块、批准块 | 工具名、来源（`'agent'` \| `'mcp'`） |
| serverName | 批准块 | MCP 服务器名 |
| permissionRequestId | 批准块 | 权限请求 id |
| rememberable | 批准块 | 是否允许「记住这次选择」 |
| questionHeader / questionText | 提问块 | 提问标题与正文 |
| questionOptions | 提问块 | 选项 `{ label, description? }[]`，`optionLabel` 要与 `label` 完全一致 |
| questionMultiple / questionCustom | 提问块 | 是否多选、是否允许自由输入 |
| questionResolution | 提问块 | `'asked'` \| `'replied'` \| `'rejected'` |
| answerText | 提问块 | 用户已给的回答 |
| pages / total / engine | 搜索块 | 搜索结果列表（最多 6 条 `{ title, url, content? }`）、总数、引擎 |
| toolCallArgsComplete | 工具块 | `true` 表示 `tool_call.params` 已完整 |
| toolCallSkippedReason | 工具块 | `'max_tool_calls'` \| `'max_tokens'` |
| plan_entries / plan_revision | 计划块 | 计划步骤与版本号 |
| subagentProgress / subagentFinal | 子任务块 | 子智能体进度与最终结果 |
| qpsLimit / queueLength / estimatedWaitTime | 限流块 | 限流排队信息 |

### jr.respondToolInteraction {#jrrespondtoolinteraction}

回答工具批准或模型提问。流式块里出现 `type: 'action'` 且 `extra.needsUserAction === true` 时必须调用，否则这一轮会一直停着。无界面场景把权限模式设成 `auto_approve` 可免去这一步。

```js
// event 是 chat.stream.updated 的数据包，从全量块里找出等用户批准的那一块
const pending = event.blocks.find(
  (block) => block.type === 'action' && block.extra?.needsUserAction === true && block.tool_call?.id
)

if (pending) {
  // 允许这次工具调用；拒绝就传 granted: false
  await jr.respondToolInteraction({
    sessionId: event.sessionId,
    messageId: event.messageId,
    toolCallId: pending.tool_call.id,
    response: { kind: 'permission', granted: true }
  })
}
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| messageId | string | 是 | 助手消息 id |
| toolCallId | string | 是 | 该块的 `tool_call.id` |
| response | object | 是 | 见下表 |

`response` 四种之一：

| kind | 其它字段 | 说明 |
| --- | --- | --- |
| `permission` | `granted: boolean` | 允许或拒绝工具 |
| `question_option` | `optionLabel: string` | 点选选项，文案要与选项一致 |
| `question_custom` | `answerText: string` | 自由输入的回答 |
| `question_other` | 无 | 选「其它」 |

**出参**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| accepted | `true` | 是 | 已收下 |
| resumed | boolean | 否 | 是否已恢复生成 |
| waitingForUserMessage | boolean | 否 | 是否还在等用户说话 |
| handledInline | boolean | 否 | 是否已在本轮内处理完 |

## 会话设置 {#会话设置}

开会话、发消息、停止生成之外的会话操作与设置：列表、搜索、恢复、重命名、置顶、删除，消息纠正（改口、重试、删除、改、分叉），以及模型、权限、生成、工具一类设置。

### jr.session.list {#jrsessionlist}

按智能体分页拉会话列表，给侧栏用。必须传本应用的 `agentId`。用上一页的 `nextCursor` 拉下一页。

```js
const { items, nextCursor, hasMore } = await jr.session.list({ agentId: agent.id, limit: 20 })
console.log(items, nextCursor, hasMore)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| agentId | string | 是 | 本应用智能体 id |
| limit | number | 否 | 每页条数，默认 10，上限 50 |
| cursor | `{ updatedAt, id }` \| null | 否 | 上一页的 `nextCursor`，首页不传 |
| includeSubagents | boolean | 否 | 是否含子智能体会话 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| items | SessionWithState[] | 本页会话 |
| nextCursor | `{ updatedAt, id }` \| null | 下一页游标，没有更多为 `null` |
| hasMore | boolean | 是否还有下一页 |

### jr.session.search {#jrsessionsearch}

在本应用的会话里按关键词搜标题和消息正文。结果分两种：会话命中和消息命中。

```js
const { hits } = await jr.session.search({ query: '合同', options: { limit: 10 } })
console.log(hits)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| query | string | 是 | 关键词 |
| options | `{ limit?: number }` | 否 | 返回条数上限 |

**出参**

`{ hits }`，元素两种形状：

| kind | 其它字段 | 说明 |
| --- | --- | --- |
| `'session'` | `sessionId` / `title` / `projectDir` / `updatedAt` | 会话命中 |
| `'message'` | `sessionId` / `messageId` / `title` / `role` / `snippet` / `updatedAt` | 消息命中 |

### jr.session.get {#jrsessionget}

恢复一条会话：拿会话状态和首页消息。打开历史对话用它。消息的 `content` 是 JSON 字符串，自己 `JSON.parse`：助手消息解析出块数组，见 [AssistantMessageBlock](#assistantmessageblock)；用户消息解析出 `{ text, files, … }`，见 [SendMessageInput](#sendmessageinput)。

```js
const { session, messages, nextCursor, hasMore } = await jr.session.get({ sessionId })
console.log(session, messages, nextCursor, hasMore)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| limit | number | 否 | 每页消息条数，默认 10，上限 50 |
| cursor | `{ orderSeq, id }` \| null | 否 | 上一页的 `nextCursor` |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| session | SessionWithState | 会话 |
| messages | ChatMessageRecord[] | 本页消息，见 [ChatMessageRecord](#chatmessagerecord) |
| nextCursor | `{ orderSeq, id }` \| null | 下一页游标 |
| hasMore | boolean | 是否还有下一页 |

### jr.session.rename {#jrsessionrename}

改会话标题。

```js
const { session } = await jr.session.rename({ sessionId, title: 'Q3 合同审核' })
console.log(session)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| title | string | 是 | 新标题 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| session | SessionWithState | 改过标题的会话 |

### jr.session.pin {#jrsessionpin}

把会话置顶或取消置顶，置顶后排在列表前面。

```js
await jr.session.pin({ sessionId, pinned: true })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| pinned | boolean | 是 | `true` 置顶，`false` 取消 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| session | SessionWithState | 更新后的会话 |

### jr.session.delete {#jrsessiondelete}

删掉整条会话及其消息，不能恢复。

```js
await jr.session.delete({ sessionId })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| deleted | `true` | 固定 |

### jr.session.steer {#jrsessionsteer}

生成中改口：在本轮还没结束时插入一条追问，并入当前这一轮，不开新一轮。不在生成中调用会抛 `STEER_NOT_ALLOWED`。

```js
const steered = await jr.session.steer({ sessionId, content: '只看违约条款' })
console.log(steered)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| content | string \| SendMessageInput | 是 | 追问内容，结构同 [jr.session.send](#jrsessionsend) |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| accepted | boolean | `true` 已插入本轮 |
| message | ChatMessageRecord \| null | 插入的用户消息行 |

### jr.session.retryMessage {#jrsessionretrymessage}

从指定那条消息重新跑一轮，常用于失败后重试或改完用户消息后再生成。

```js
const sent = await jr.session.retryMessage({ sessionId, messageId })
console.log(sent)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| messageId | string | 是 | 要重试的消息 id |

**出参**

同 [jr.session.send](#jrsessionsend)。

### jr.session.deleteMessage {#jrsessiondeletemessage}

从指定那条消息起，把它和后面的消息一起删掉，用来截断对话。正在生成时会先停掉。

```js
await jr.session.deleteMessage({ sessionId, messageId })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| messageId | string | 是 | 起始消息 id（含本条） |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| deleted | `true` | 固定 |

### jr.session.editUserMessage {#jrsessioneditusermessage}

改一条用户消息的正文，不能改助手回复。改完要再生成一轮就调 [jr.session.retryMessage](#jrsessionretrymessage)。

```js
const { message } = await jr.session.editUserMessage({ sessionId, messageId, text: '只核对违约条款' })
await jr.session.retryMessage({ sessionId, messageId: message.id })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| messageId | string | 是 | 用户消息 id |
| text | string | 是 | 新文本，不能为空 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| message | ChatMessageRecord | 改过的用户消息行 |

### jr.session.fork {#jrsessionfork}

从指定那条消息拷出一条新会话，原会话不动，之后用新会话的 id 发消息。

```js
const { session: branched } = await jr.session.fork({ sessionId, messageId })
console.log(branched)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 原会话 id |
| messageId | string | 是 | 从哪一条开始拷 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| session | SessionWithState | 新会话 |

### jr.session.setModel {#jrsessionsetmodel}

切换会话当前用的模型。可用模型先用 [jr.catalog.models](#jrcatalogmodels) 拿。

```js
const { session } = await jr.session.setModel({
  sessionId,
  providerId: 'jiaorong',
  modelId: 'jiaorong-deepseek-v4-pro'
})
console.log(session)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| providerId | string | 是 | 服务商 id |
| modelId | string | 是 | 模型 id |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| session | SessionWithState | 切换后的会话 |

### jr.session.setPermissionMode {#jrsessionsetpermissionmode}

改会话的权限模式，决定工具调用要不要弹批准。无界面场景设成 `auto_approve` 就不用再回工具批准。

```js
await jr.session.setPermissionMode({ sessionId, mode: 'auto_approve' })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| mode | `'default'` \| `'auto_approve'` \| `'full_access'` | 是 | 权限模式 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| ok | `true` | 固定 |
| mode | string | 生效的权限模式 |

### jr.session.setOrchestrationPolicy {#jrsessionsetorchestrationpolicy}

改会话的编排策略，决定模型能不能自己派子任务。

```js
await jr.session.setOrchestrationPolicy({ sessionId, policy: 'explicit' })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| policy | `'explicit'` \| `'proactive'` | 是 | `explicit` 只在明确要求时派子任务，`proactive` 可主动派 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| ok | `true` | 固定 |
| policy | `'explicit'` \| `'proactive'` | 生效的策略 |

### jr.session.getGenerationSettings {#jrsessiongetgenerationsettings}

读会话的模型高级设置，没单独设过时返回 `null`。

```js
const { settings } = await jr.session.getGenerationSettings({ sessionId })
console.log(settings)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |

**出参**

`{ settings }`，`settings` 字段：

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| systemPrompt | string | 是 | 本会话覆盖的系统提示词 |
| temperature | number | 是 | 采样温度 |
| topP | number | 否 | 核采样 |
| contextLength | number | 是 | 上下文长度 |
| maxTokens | number | 是 | 最大生成 token |
| timeout | number | 是 | 单次请求超时（秒） |
| thinkingBudget | number | 否 | 思考预算 |
| reasoningEffort | `'none'` \| `'minimal'` \| `'low'` \| `'medium'` \| `'high'` \| `'xhigh'` \| `'max'` | 否 | 推理力度 |
| verbosity | `'low'` \| `'medium'` \| `'high'` | 否 | 回答详细程度 |
| forceInterleavedThinkingCompat | boolean | 否 | 是否强制交错思考兼容 |
| imageGeneration | object | 否 | 图片生成参数 |
| videoGeneration | object | 否 | 视频生成参数 |

### jr.session.updateGenerationSettings {#jrsessionupdategenerationsettings}

写会话的模型高级设置，只传要改的字段，返回改完的完整设置。

```js
const { settings } = await jr.session.updateGenerationSettings({
  sessionId,
  settings: { temperature: 0.2, maxTokens: 4096 }
})
console.log(settings)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| settings | object | 是 | 补丁，字段同 [jr.session.getGenerationSettings](#jrsessiongetgenerationsettings) 出参 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| settings | object | 改完的完整设置 |

### jr.session.getContextOccupancy {#jrsessiongetcontextoccupancy}

读会话当前的上下文占用，用来画「已用 / 窗口」进度条。拿不到数据时 `freshness` 为 `'unavailable'`，数值字段全是 `null`。

```js
const { occupancy } = await jr.session.getContextOccupancy({ sessionId })
if (occupancy.freshness !== 'unavailable') {
  const percent = Math.round((occupancy.occupiedTokens / occupancy.contextWindowTokens) * 100)
  console.log(percent)
}
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |

**出参**

`{ occupancy }`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| freshness | `'current'` \| `'stale'` \| `'unavailable'` | 数据新鲜度 |
| source | `'provider'` \| `'estimated'` \| null | 实测或估算 |
| occupiedTokens | number \| null | 已占用 token |
| contextWindowTokens | number \| null | 上下文窗口 token |
| requestSeq | number \| null | 测量时的请求序号 |
| measuredAt | number \| null | 测量时间，Unix 毫秒 |

### jr.session.setToolMode {#jrsessionsettoolmode}

覆盖会话的工具模式，传 `null` 取消覆盖、回到按模型默认。

```js
await jr.session.setToolMode({ sessionId, override: 'code' })
await jr.session.setToolMode({ sessionId, override: null })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| override | `'agent'` \| `'code'` \| `'minimal'` \| null | 是 | 工具模式，`null` 取消覆盖 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| session | SessionWithState | 更新后的会话 |

### jr.session.getDisabledAgentTools {#jrsessiongetdisabledagenttools}

读会话里被关掉的内置工具名，空数组表示全部打开。

```js
const { toolNames } = await jr.session.getDisabledAgentTools({ sessionId })
console.log(toolNames)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| toolNames | string[] | 已关闭的工具名 |

### jr.session.updateDisabledAgentTools {#jrsessionupdatedisabledagenttools}

写会话里要关掉的内置工具名，全量覆盖，传空数组表示全部打开。可关的工具全集用 [jr.catalog.agentTools](#jrcatalogagenttools) 拿。

```js
await jr.session.updateDisabledAgentTools({ sessionId, toolNames: ['web_search'] })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 是 | 会话 id |
| toolNames | string[] | 是 | 要关闭的工具名 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| toolNames | string[] | 生效的已关闭工具名 |

## 目录 {#目录}

### jr.catalog.slash {#jrcatalogslash}

拉输入框按 `/` 时弹出的菜单：本应用技能、平台技能、已配置的 MCP 工具。脚手架对话组件不调用它，组件的 `/` 列表只看 `slashItems`。

```js
const { items } = await jr.catalog.slash()
const skills = items.filter((item) => item.category === 'skill')
console.log(skills)
```

**入参**

无。

**出参**

`{ items }`：

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 项 id |
| category | `'skill'` \| `'tool'` | 是 | 技能或 MCP 工具 |
| label | string | 是 | 展示名 |
| description | string | 否 | 说明 |
| skillName | string | 否 | 技能项才有，传给 `activeSkills` |
| insertText | string | 否 | 工具项才有，插入输入框的文本 |

### jr.catalog.models {#jrcatalogmodels}

列当前可用的模型，给模型选择器用。

```js
const { models } = await jr.catalog.models()
console.log(models)
```

**入参**

无。

**出参**

`{ models }`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| providerId | string | 服务商 id |
| modelId | string | 模型 id |
| name | string | 模型显示名 |
| providerName | string | 服务商显示名，用于分组 |

### jr.catalog.systemPrompts {#jrcatalogsystemprompts}

列已配置的系统提示词，选中后把 `content` 写进智能体配置或会话高级设置。

```js
const { prompts } = await jr.catalog.systemPrompts()
console.log(prompts)
```

**入参**

无。

**出参**

`{ prompts }`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 提示词 id |
| name | string | 显示名 |
| content | string | 提示词正文 |

### jr.catalog.agentTools {#jrcatalogagenttools}

列可配置的智能体内置工具，给工具开关面板用。带 `sessionId` 时按该会话的实际配置列。

```js
const { tools } = await jr.catalog.agentTools({ sessionId })
console.log(tools)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sessionId | string | 否 | 会话 id |

**出参**

`{ tools }`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| name | string | 工具名 |
| group | string | 工具分组 |

## MCP 与知识库 {#mcp-与知识库}

### jr.mcp.create {#jrmcpcreate}

按 JSON 注册 MCP 服务器，注册后默认启用，并且只对指定 `agentId` 的智能体可见。同名 MCP 已存在且不是本应用创建时会失败，不会覆盖别人的配置。

```js
const { servers } = await jr.mcp.create({
  agentId: agent.id,
  json: {
    mcpServers: {
      'acme-search': { type: 'http', url: 'https://mcp.acme.com/search' },
      'acme-local': { command: 'npx', args: ['-y', '@acme/mcp-local'] }
    }
  }
})
console.log(servers)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| agentId | string | 是 | 限定可见的智能体 |
| json | object \| string | 否 | `{ mcpServers: { 名称: 配置 } }` 或带 `name` 的单条配置 |
| mcpServers | object | 否 | 不传 `json` 时用它 |
| enabled | boolean | 否 | 是否注册后启用，默认 `true` |

单条 MCP 配置常用字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | `'stdio'` \| `'http'` \| `'sse'` | 传输类型，不传按 `url` 有无推断 |
| command | string | `stdio` 必填，启动命令 |
| args | string[] | 命令参数 |
| env | object | 环境变量 |
| url / baseUrl | string | 远程必填，服务地址 |
| headers / customHeaders | object | 自定义请求头 |
| descriptions | string | 说明 |
| icons | string | 图标 |

**出参**

`{ servers }`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| name | string | MCP 名称 |
| enabled | boolean | 是否已启用 |
| started | boolean | 进程是否在跑 |

### jr.knowledgeBase.query {#jrknowledgebasequery}

查当前用户可见的知识库列表，分个人库和共享库。

```js
const { data } = await jr.knowledgeBase.query({ type: 1, name: '合同', page: 1, size: 50 })
console.log(data)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | `1` \| `2` | 否 | `1` 个人库，`2` 共享库，默认 `1` |
| name | string | 否 | 按名称过滤 |
| page | number | 否 | 页码，默认 1 |
| size | number | 否 | 每页条数，默认 200，上限 200 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| data | unknown \| null | 知识库列表数据 |

### jr.knowledgeBase.queryDirectory {#jrknowledgebasequerydirectory}

下探一个知识库目录，列子目录和文件。

```js
// directoryId 来自 jr.knowledgeBase.query() 的返回
const { data } = await jr.knowledgeBase.queryDirectory({ directoryId, page: 1, size: 20 })
console.log(data)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| directoryId | string | 是 | 目录 id |
| fileName | string | 否 | 按文件名过滤 |
| page | number | 否 | 页码，默认 1 |
| size | number | 否 | 每页条数，默认 20，上限 20 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| data | unknown \| null | 目录内容数据 |

## 对话框、剪贴板与截图 {#对话框剪贴板与截图}

### jr.dialog.selectDirectory {#jrdialogselectdirectory}

弹出系统文件夹选择器。选中的目录自动获得授权，之后可以直接当工作区或附件来源。用户取消时 `path` 为 `null`。

```js
const { path } = await jr.dialog.selectDirectory()
if (path) await jr.session.create({ agentId: agent.id, message: '', projectDir: path })
```

**入参**

无。

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| path | string \| null | 选中的目录绝对路径，取消为 `null` |

### jr.dialog.selectFiles {#jrdialogselectfiles}

弹出系统文件选择器，可多选。用户取消时返回空数组。

```js
const { files } = await jr.dialog.selectFiles()
console.log(files)
```

**入参**

无。

**出参**

`{ files }`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| path | string | 文件绝对路径 |
| name | string | 文件名 |

### jr.dialog.readFilePreview {#jrdialogreadfilepreview}

读一个文件的预览信息。图片返回一张缩略图；非图片或超过 12 MB 只返回 MIME。文件不存在时不抛错，返回 `{ code: 'NOT_FOUND' }`，用前先判 `code`。

```js
// path 是已授权的文件绝对路径，来自 jr.dialog.selectFiles()
const preview = await jr.dialog.readFilePreview({ path })

// 有 thumbnail 就渲染成图片，没有就按 mimeType 显示占位
console.log(preview.mimeType, preview.thumbnail)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| path | string | 是 | 文件绝对路径，需已授权 |

**出参**

| 字段 | 类型 | 必有 | 说明 |
| --- | --- | --- | --- |
| mimeType | string | 是 | 文件 MIME |
| thumbnail | string | 否 | 图片才有，`data:image/png;base64,…` |

### jr.dialog.rememberDroppedFiles {#jrdialogrememberdroppedfiles}

把页面拖进来的文件登记为已授权，等价于用选择器选过。不登记就发附件会 `FORBIDDEN`。配合 [jr.getPathForFile](#jrgetpathforfile) 使用。

```js
// paths 是拖入文件经 jr.getPathForFile() 得到的绝对路径数组
const { files } = await jr.dialog.rememberDroppedFiles(paths)
console.log(files)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| files | string[] | 是 | 文件绝对路径数组 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| files | string[] | 登记成功的路径 |

### jr.dialog.allowProjectDir {#jrdialogallowprojectdir}

把一个目录授权为可用工作区，之后可以作为 `projectDir` 传给 [jr.session.create](#jrsessioncreate)。目录必须先用 [jr.dialog.selectDirectory](#jrdialogselectdirectory) 选过。

```js
await jr.dialog.allowProjectDir({ path })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| path | string | 是 | 目录绝对路径 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| ok | `true` | 已授权 |

### jr.clipboard.writeImage {#jrclipboardwriteimage}

把一张 PNG 写进系统剪贴板，用于「复制为图片」。可以传裸 base64，也可以传 data URL。

```js
// pngBase64 来自 jr.capture.pageArea() 的返回，或图片块的 image_data.data
await jr.clipboard.writeImage({ pngBase64 })
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| pngBase64 | string | 是 | PNG 的 base64 或 data URL |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| ok | `true` | 已写入剪贴板 |

### jr.capture.pageArea {#jrcapturepagearea}

截取本应用页面的一个矩形区域，返回 PNG 的 base64。区域按页面 CSS 像素给。

```js
// el 是要截取的页面元素，区域按页面 CSS 像素给
const rect = el.getBoundingClientRect()
const { pngBase64 } = await jr.capture.pageArea({
  x: rect.left,
  y: rect.top,
  width: rect.width,
  height: rect.height
})

// pngBase64 可直接交给 jr.clipboard.writeImage，或拼成 data:image/png;base64, 显示
console.log(pngBase64.slice(0, 32))
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| x | number | 是 | 区域左上角 x |
| y | number | 是 | 区域左上角 y |
| width | number | 是 | 宽，至少 1 |
| height | number | 是 | 高，至少 1 |

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| pngBase64 | string | PNG 的裸 base64，可直接给 [jr.clipboard.writeImage](#jrclipboardwriteimage) |

## 调试 {#调试}

### jr.openDevTools {#jropendevtools}

弹出本应用页面的独立调试控制台（Elements / Console / Network）。页面需要已经从侧栏打开。

```js
await jr.openDevTools()
```

**入参**

无。

**出参**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| ok | `true` | 已弹出控制台 |

### jr.setDebug {#jrsetdebug}

开关调试日志。打开后每次调用、每条事件都会在控制台打一行 `[jiaorong-app]` 前缀的日志；token、密码等敏感字段自动打码，超长字符串自动截断。

```js
jr.setDebug(true)
```

**入参**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enabled | boolean | 是 | `true` 打开，`false` 关闭 |

**出参**

无返回值。

## 数据类型 {#数据类型}

### MessageFile {#messagefile}

消息附件。有本机路径时只传 `name` / `path` / `mimeType`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| name | string | 是 | 文件名 |
| path | string | 有本机文件时是 | 本机绝对路径，需已授权 |
| mimeType | string | 建议 | MIME，如 `application/pdf` |
| type | string | 否 | 与 `mimeType` 同类 |
| size | number | 否 | 字节数 |
| content | string | 无 path 时是 | 图片 data URL，其它裸 base64 |
| dataBase64 | string | 否 | 已废弃，会转成 `content` |
| metadata | object | 否 | 文件元数据 |

### UserMessageInlineItem {#usermessageinlineitem}

用户消息里的行内标记，`offset` 是文本里的插入位置。

| 形态 | 字段 |
| --- | --- |
| 技能 | `{ type: 'skill', offset, skillName }` |
| 文件 | `{ type: 'file', offset, fileName, filePath, mimeType? }` |

### SendMessageInput {#sendmessageinput}

发消息的 `content` 对象形态。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| text | string | 是 | 用户文本，只发附件时可为空字符串 |
| files | MessageFile[] | 否 | 附件 |
| search | boolean | 否 | 是否联网搜索 |
| activeSkills | string[] | 否 | 本轮技能全名 |
| inlineItems | UserMessageInlineItem[] | 否 | 行内标记 |

### SessionWithState {#sessionwithstate}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 会话 id |
| agentId | string | 所属智能体 id |
| title | string | 标题 |
| projectDir | string \| null | 工作区目录 |
| isPinned | boolean | 是否置顶 |
| sessionKind | string | 会话种类 |
| orchestrationPolicy | object | 编排策略 |
| toolModeOverride | unknown | 工具模式覆盖，`null` 表示跟模型默认 |
| createdAt | number | 创建时间，Unix 毫秒 |
| updatedAt | number | 更新时间，Unix 毫秒 |
| status | `'idle'` \| `'generating'` \| `'error'` | 当前状态 |
| providerId | string | 当前服务商 id |
| modelId | string | 当前模型 id |
| permissionMode | `'default'` \| `'auto_approve'` \| `'full_access'` | 当前权限，历史会话可能没有 |

### ChatMessageRecord {#chatmessagerecord}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 消息 id |
| sessionId | string | 所属会话 |
| orderSeq | number | 消息顺序号，分页游标用它 |
| role | `'user'` \| `'assistant'` | 角色 |
| content | string | JSON 字符串：助手是块数组，用户是 `{ text, files, … }` |
| status | `'pending'` \| `'sent'` \| `'error'` | 消息状态 |
| isContextEdge | number | 是否上下文边界 |
| metadata | string | 元数据 JSON 字符串 |
| createdAt | number | 创建时间，Unix 毫秒 |
| updatedAt | number | 更新时间，Unix 毫秒 |

## 错误码 {#错误码}

调用失败时抛出的 Error 上有 `code` 和 `message`，先看 `code`。

| code | 含义 | 处理 |
| --- | --- | --- |
| NOT_IN_JIAORONG | 不在交融客户端窗口 | 从侧栏打开应用 |
| JIAORONG_NOT_RUNNING | 交融客户端未启动，或本机 Node 连不上 | 先启动并登录客户端 |
| APP_NOT_FOUND | 本机没有该应用 id | 检查应用是否已安装 |
| APP_NOT_READY | 目标应用当前未打开 | 先用 `jr.app.open` 打开目标应用 |
| UNAUTHORIZED | 未登录 | 先登录客户端 |
| VALIDATION_ERROR | 入参不合法 | 查看 `message` |
| AGENT_NOT_FOUND | 智能体不存在或不属于本应用 | 先创建智能体 |
| SESSION_NOT_FOUND | 会话或消息不存在 | 重新创建会话 |
| SKILL_NOT_FOUND | 缺少 `SKILL.md` | 检查 `skill/<name>/SKILL.md` |
| FORBIDDEN | 越权，或附件路径未授权 | 不要传其它应用的 id；附件重新选择 |
| STEER_NOT_ALLOWED | 当前没有在生成 | 仅在生成中改口 |
| GENERATION_FAILED | 模型或运行时失败 | 展示 `message` |
| TIMEOUT | 调用超时 | 停止后重试 |
| DISCONNECTED | 等待中途释放了连接 | 重新连接再发 |

```js
try {
  await jr.session.send({ sessionId, content: { text: '核对这份合同' } })
} catch (err) {
  if (err.code === 'NOT_IN_JIAORONG') alert('请在交融客户端中打开本应用')
  else console.error(err.code, err.message)
}
```
