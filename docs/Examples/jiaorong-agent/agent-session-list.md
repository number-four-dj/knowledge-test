# JiaorongAgentSessionList

会话侧栏：搜索、置顶、删除、滚动加载和新对话。

脚手架已把源码拷到 `web/src/components/jiaorongagentsessionList/`。页面从本地引用，不要再从 `jiaorong-app-sdk/vue` 引入。

```ts
import { JiaorongAgentSessionList } from '../components/jiaorongagentsessionList'
```

和对话组件共用同一个 `client`、`agentId`、`sessionId`。客户端由页面注入；不传或传 `null` 时停在未就绪等注入，组件不会自己建连接，规则与 [JiaorongAgentChat](./agent-chat.md) 相同。

```vue
<JiaorongAgentSessionList
  class="session-list"
  :app-id="APP_ID"
  :agent-id="agentId"
  agent-name="合同审核"
  :client="jr"
  v-model:session-id="sessionId"
/>
```

列表按 `agentId` 过滤。点「新对话」会把 `sessionId` 置为 `null`。

## Props

| 名称 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| appId | string | `''` | 等于 `app.json` 的 id |
| agentId | string | `''` | 按智能体过滤会话 |
| sessionId | string \| null | `null` | `v-model:session-id` |
| agentName | string | `交融对话` | 顶栏名称 |
| client | JiaorongClient \| null | — | 页面注入的客户端。不传或 `null` 停在未就绪等注入 |

列表当前没有开关入参：搜索、置顶、删除、滚动加载和「新对话」都是内置行为，不能通过 props 关闭。

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| new | — | 用户点了新对话，`sessionId` 已置为 `null` |

置顶、删除、滚动加载由组件自己调 `session.pin` / `session.delete` / `session.list`，页面不必再接。

## 样式

传入 `class` 即可覆盖宽度和背景：

```css
.session-list {
  width: 280px;
  background: #fff;
}
```
