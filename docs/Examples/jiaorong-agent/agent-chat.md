# JiaorongAgentChat

对话区：消息块、输入框、附件、工具批准和提问。悬停消息可复制、重试、编辑、分叉、删除。

脚手架已把源码拷到 `web/src/components/jiaorongagentchat/`。页面从本地引用，不要再从 `jiaorong-app-sdk/vue` 引入。`jiaorong-app-sdk` 只负责 `connect`、发消息和类型。

```ts
import { JiaorongAgentChat } from '../components/jiaorongagentchat'
```

页面先创建客户端（脚手架用 `createNodeClient(NODE_PORT)`，或 `connect` 拿到的 `jr`），再 `agent.create`，把 `client` 和 `agentId` 传进来，并用 `v-model:session-id` 和会话列表绑在一起。

- 传入 `client`：用这条连接拉历史、发消息、听流式。
- 不传或传 `null`：组件停在未就绪，等页面后续注入，不会自己建连接。

`slashItems` 不传或传 `[]` 时，按 `/` 没有条目，组件不会去拉 `catalog.slash`。

```vue
<script setup>
import { JiaorongAgentChat } from '../components/jiaorongagentchat'

const chatFeatures = { modelPicker: false, knowledgeBase: false }
</script>

<template>
  <JiaorongAgentChat
    :app-id="APP_ID"
    :agent-id="agentId"
    agent-name="合同审核"
    :user-name="userName"
    placeholder="请输入你的问题…"
    :client="jr"
    v-model:session-id="sessionId"
    :features="chatFeatures"
    :slash-items="slashItems"
  />
</template>
```

脚手架对话页按上面这种方式传 `client` / `features` / `slashItems`：客户端由页面 `createNodeClient(NODE_PORT)` 创建后注入，组件自己不建连接。

## Props

| 名称 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| appId | string | `''` | 等于 `app.json` 的 id |
| agentId | string | `''` | 本应用智能体 id |
| sessionId | string \| null | `null` | `v-model:session-id` |
| agentName | string | `交融对话` | 顶栏与占位文案 |
| userName | string | `You` | 用户气泡名称 |
| placeholder | string | 按 agentName 拼 | 输入框占位 |
| client | JiaorongClient \| null | — | 页面注入的客户端。不传或 `null` 停在未就绪等注入，不会自己连 |
| attachments | boolean | `true` | 旧开关，会覆盖 `features.attachments`。`false` 时隐藏「+」，并关闭拖入 / 粘贴 |
| toolbar | JiaorongToolbarAction[] | — | 旧开关，会覆盖 `features.toolbar`。不传显示全部，空数组隐藏操作栏 |
| features | JiaorongAgentChatFeatures | 未写的项默认全开 | 见下 |
| slashItems | JiaorongSlashCommand[] | `[]` | `/` 菜单。空则没有条目 |

`JiaorongToolbarAction`：`copy`、`copyImage`、`retry`、`fork`、`edit`、`delete`。`copyImage` 只在助手气泡出现，`edit` 只在用户气泡出现。

选出的本机文件只传 `{ name, path, mimeType }`。不要自己拼绝对路径，否则 `FORBIDDEN`。

## features

未写的项默认全开。脚手架直连页关掉了模型选择和知识库：

```ts
const chatFeatures = {
  modelPicker: false,
  knowledgeBase: false
}
```

| 字段 | 默认 | 说明 |
| --- | --- | --- |
| attachments | true | 「+」、拖入、粘贴 |
| toolbar | true | `true` 为全部按钮；也可传按钮名数组；`false` 隐藏 |
| approvals | true | 工具批准 |
| questions | true | 模型提问 |
| stop | true | 停止生成本轮 |
| steer | true | 生成中改口 |
| topBar | true | 顶栏 |
| modelPicker | true | 模型选择 |
| permissionMode | true | 权限模式 |
| orchestration | true | 协作策略 |
| autoScroll | true | 自动滚到底 |
| plan | true | 计划面板 |
| knowledgeBase | true | 知识库 |
| slash | true | 是否启用 `/` 菜单（条目仍来自 `slashItems`） |
| queue | true | 发送排队 |
| generationSettings | true | 生成参数 |

## slashItems

`JiaorongSlashCommand`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| category | `'skill'` \| `'tool'` | 技能写入本轮 `activeSkills`；工具插入输入框 |
| skillDir | string | 应用 `skill/` 下的目录名。未传 `name` 时拼成 `app.{appId}.{skillDir}` |
| name | string | 宿主识别名。技能也可以直接写 `app.{appId}.{目录名}` |
| label | string | 菜单展示名 |
| description | string | 说明 |
| insertText | string | 选中后插入输入框。工具默认 `@${label} `，技能默认不插入 |
| id | string | 去重用。不传则按 `category:name` |

```ts
const slashItems = [
  {
    category: 'skill',
    skillDir: 'weekly-report',
    label: '周报整理',
    description: '把零散工作记录整理成周报。'
  }
]
```

## 事件

组件自己完成发送、重试、删除、编辑、分叉。下面这些事件给页面做旁路处理（例如本轮结束后自动再发一条），不是用来灌画面的。

| 事件 | 载荷类型 | 说明 |
| --- | --- | --- |
| stream-updated | ChatStreamUpdatedEvent | 对应 `chat.stream.updated`，`blocks` 为当前全量块 |
| stream-completed | ChatStreamCompletedEvent | 对应 `chat.stream.completed`。没有 `blocks` |
| stream-failed | ChatStreamFailedEvent | 对应 `chat.stream.failed` |
| plan-updated | ChatPlanUpdatedEvent | 对应 `chat.plan.updated` |
| messages-changed | SessionMessagesChangedEvent | 对应 `sessions.messages.changed` |
| context | HostContext | 对应 `context` |
| send | `{ sessionId, text, queued? }` | 用户点了发送（含排队） |
| runtime-ready | — | 运行时已就绪 |
| question / question-answered | 见组件 emit | 模型提问出现 / 用户已答 |
| approval / approval-answered | 见组件 emit | 工具批准出现 / 用户已选 |

流式事件字段见 [API 参考 · session.send](./api.md#jrsessionsend)。请与 `JiaorongAgentSessionList` 绑定同一个 `sessionId`。同一轮对话不要再订一套 `jr.on('chat.stream.*')`，除非页面要在组件之外做续发一类的逻辑。
