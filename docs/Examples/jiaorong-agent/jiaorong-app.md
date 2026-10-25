# 交融应用

快速搭建交融应用，创建智能体、创建对话，参见 [API 参考](./api.md)。

AI 开发技能包：[jiaorong-app-skill.zip](https://c4ai.ccccltd.cn/xkprosdk/jiaorong-app-skill.zip)。下载后解压给 Codex 等 AI 开发工具使用，可按官方交融应用 API 和组件规范自动开发应用。

## 1、下载交融应用

安装 JiaorongAI，打开并登录，进入开发者中心。应用目录可以用命令行生成，也可以手动创建，见步骤二。

## 2、创建交融应用

### 2.1 终端生成


```bash
pnpm create jiaorong-app
```

```bash
npm create jiaorong-app
```


应用配置在终端交互中选：

问答依次是：应用 id、应用名称、挂在哪儿、要不要官方 UI 组件（会话列表 + 对话区）、要不要路由、要不要技能模板、前端调试端口、本机服务端口、智能体 `agentKey`、用哪个包管理器、要不要现在就装依赖。

选完自动生成目录，`app.json` 按问答写好。选了现在就装依赖，依赖会装好、前端构建进 `web-ui/`，`entry` 已经指向它，到开发者中心创建应用选这个目录就能打开。这种方式第 3 到第 5 步都做完了，直接从第 6 步开始写业务；想弄清生成的代码怎么运作，再往下读第 3 到第 5 步。

- 选了稍后自己装依赖，按生成结束时打印出来的命令补跑：先装 `web` 与 `node` 的依赖，再在 `web` 里构建，否则 `entry` 指向的 `web-ui/index.html` 还不存在，打开是白屏。
- 问答里填的端口与 `agentKey` 会同时写进 `web/src/constants.ts` 和 `node/config.js`，两边已经对齐，要改就一起改。
- 生成的 `entry` 默认是 `web-ui/index.html`。改前端时换成 `http://127.0.0.1:<调试端口>/`，并在 `web` 里跑 `pnpm run dev`，交付前改回来。
- 带技能模板时生成 `skill/example/SKILL.md`，内容是替换说明，照着改成自己的技能。
- 目录已存在且不是空目录时会先确认覆盖，选「取消」不改动任何文件。

### 2.2 手动创建目录

```text
jiaorong-demo/
  app.json      # 应用配置文件
  web-ui/       # 客户端打开的页面，放前端项目的构建产物
  node/         # 本机服务
  icon.png      # 应用图标
  xxxxxx/       # 自定义文件夹，比如放技能，脚本等等
```

### app.json 格式

```json
{
  "id": "jiaorong-demo",
  "name": "交融示例",
  "version": "1.0.0",
  "entry": "http://127.0.0.1:5174/",
  "slot": "menu",
  "spawn": "node node/main.js"
}
```

调试时 `entry` 写本地页面地址，例如 `http://127.0.0.1:5174/`，以 Vite 终端打印的为准。交付前改回 `web-ui/index.html`，并先执行 `pnpm build`。

`id`、`name`、`version`、`entry` 必填。`slot` 填 `menu`。`version` 用三段式，例如 `1.0.0`。

创建好交融应用文件夹后，在开发者中心创建应用，选择这个文件夹。

## 3、初始化前端

前端项目放哪儿都行，可以在应用目录里，也可以是已有的独立仓库。联调只靠 `app.json` 的 `entry` 指向它的 dev 地址，交付时把构建产物拷进应用目录的 `web-ui/`。下面以 `web` 作为项目目录名举例。

```bash
pnpm create vue@latest web --ts --bare
cd web
pnpm install
```

调试：

```bash
pnpm dev --host 127.0.0.1 --port 5174
```

把 `app.json` 的 `entry` 改成终端打印的地址，例如 `http://127.0.0.1:5174/`。不要用系统浏览器打开这个地址，从开发者中心打开应用。

`web-ui` 是交给客户端打开的构建结果，需要注意：

- 前端项目 `vite.config.ts` 里的 `base` 必须是 `'./'`。写成 `'/'` 时，客户端打开 `web-ui/index.html` 会找不到脚本和样式。
- 用了路由就要 `createWebHashHistory()`。`createWebHistory()` 在客户端里刷新或直接进子路径会打不开。
- 页面请求自己的服务接口时，服务要允许页面所在来源跨域。调试来源是 `http://127.0.0.1:5174`，交付后来源是客户端打开 `web-ui` 的地址，两处都要允许。
- 改了页面后，调试中保存即可在开发者中心看到；交付前再 `pnpm build`。改了 `main.ts` 要在应用窗口里刷新，只改 `.vue` 会热更新。
- 前端项目放在应用目录里时，发布打 zip 前排除它的 `node_modules` 和 `dist`，包里只需要 `web-ui/` 的产物。

```bash
pnpm build
```

构建完成后，把前端项目 `dist/` 里的全部内容拷到应用目录的 `web-ui/` 下，让 `web-ui/index.html` 能直接打开，再把 `app.json` 的 `entry` 改回 `web-ui/index.html`。

## 4、页面连接服务

在前端项目的 `src/main.ts` 里调用。第二个参数是页面自定义方法，名字自己定，下面的 `toReturn` 只是示例。

```ts
import { createApp } from 'vue';
import App from './App.vue';

const bootstrap = async () => {
  const bridge = await window.initRendererBridge(51457, {
    toReturn(data: unknown) {
      return data;
    },
  });
  console.log('🚀 ~ bridge:', bridge);

  createApp(App).mount('#app');
};

bootstrap();
```

`initRendererBridge` 是 async，要 `await` 才拿得到返回值：

- 返回值只有 `stop`：关掉连接并停止重连，调用时机由应用自己决定，例如页面卸载、组件卸载或切换应用时。
- 不调 `stop` 也能跑，但刷新或热更新后旧桥仍会自动重连，本机服务可能同时收到新旧两个页面转发的同一事件，日志会重复。
- 别用顶层 `await`，Vite 默认构建目标不支持。
- 这个函数只在开发者中心打开的页面里有：调试阶段页面来自 `entry` 里的本地地址，交付后才是 `web-ui`。

用 `--ts` 时先在前端项目的 `env.d.ts` 里声明它，否则 `window` 上找不到这个方法：

```ts
interface Window {
  initRendererBridge: (
    port: number,
    apisCustom?: Record<string, unknown>
  ) => Promise<{ stop: () => void }>;
}
```

## 5、初始化后端

用 pnpm 安装 Elysia：

```bash
cd node
pnpm init
pnpm pkg set type=module
pnpm add elysia ws
```

### 5.1 把桥放在 `node/bridge.js` {#bridge-file}

```js
import { WebSocketServer } from 'ws';
import { randomUUID } from 'crypto';

export class ElysiaBridge {
  constructor(options = {}) {
    this.port = options.port || 0;
    this.wss = null;
    this.ws = null;
    this.pending = new Map();
    this.queue = [];
    this.hooks = new Map();
  }
  async start() {
    this.wss = new WebSocketServer({ host: '127.0.0.1', port: this.port });
    this.wss.on('connection', (ws) => {
      this.ws = ws;
      if (this.queue.length > 0) {
        for (const { reqId, method, payload } of this.queue) {
          ws.send(JSON.stringify({ msgType: 'request', reqId, method, payload }));
        }
        this.queue = [];
      }
      ws.on('message', (raw) => {
        try {
          this.handleIncoming(JSON.parse(raw.toString()));
        } catch (e) {
          console.error(e);
        }
      });
      ws.on('close', () => {
        this.ws = null;
      });
    });
    await new Promise((resolve) => this.wss.on('listening', resolve));
    return this.wss.address().port;
  }
  handleIncoming(msg) {
    if (msg.msgType === 'response') {
      const item = this.pending.get(msg.reqId);
      if (!item) return;
      clearTimeout(item.timer);
      this.pending.delete(msg.reqId);
      item.resolve(msg.data);
    } else if (msg.msgType === 'error') {
      const item = this.pending.get(msg.reqId);
      if (!item) return;
      clearTimeout(item.timer);
      this.pending.delete(msg.reqId);
      item.reject(new Error(msg.message));
    } else if (msg.msgType === 'event') {
      this.hooks.get(msg.event)?.(msg.payload);
    }
  }
  async call(method, args, timeout = 10000) {
    const reqId = randomUUID();
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(reqId);
        reject(new Error(`请求超时：${method}`));
      }, timeout);
      this.pending.set(reqId, { resolve, reject, timer });
      if (this.ws && this.ws.readyState === 1) {
        this.ws.send(JSON.stringify({ msgType: 'request', reqId, method, payload: args }));
      } else {
        this.queue.push({ reqId, method, payload: args });
      }
    });
  }
  createSAProxy(path = []) {
    const reserved = new Set([
      'then',
      'catch',
      'constructor',
      'toString',
      'valueOf',
      'hasOwnProperty',
    ]);
    const bridge = this;
    return new Proxy(function () {}, {
      get(target, prop) {
        const propStr = String(prop);
        if (reserved.has(propStr)) return Reflect.get(target, prop);
        return bridge.createSAProxy([...path, propStr]);
      },
      apply(_target, _thisArg, args) {
        const methodFullName = path.join('.');
        if (methodFullName === 'jiaorong.on') {
          bridge.hooks.set(args[0], args[1]);
          return bridge.call(methodFullName, [args[0]]);
        }
        return bridge.call(methodFullName, args);
      },
    });
  }
  stop() {
    this.wss?.close();
  }
}
```

### 5.2 在 node/main.js 里启动

页面先 `initRendererBridge` 连上服务端。这个窗口在开发者中心打开时已经对应 `app.json` 里的应用。服务端接着创建智能体、创建对话，并把本轮内容打印到日志。

```js
import { ElysiaBridge } from './bridge.js';

const jiaorong = async () => {
  const bridge = new ElysiaBridge({ port: 51457 });
  await bridge.start();
  const jr = bridge.createSAProxy();

  await jr.jiaorong.on('chat.stream.updated', (event) => {
    console.log(event);
  });

  const agent = await jr.jiaorong.agent.create({
    agentKey: 'demo',
    name: 'demo智能体',
    config: { systemPrompt: '你是demo智能体' },
  });
  const { session } = await jr.jiaorong.session.create({
    agentId: agent.id,
    message: '你好',
  });
  await jr.jiaorong.session.send({
    sessionId: session.id,
    content: { text: '你都能做什么' },
  });
};

jiaorong();
```

端口 `51457` 与页面里 `initRendererBridge` 的端口一致。

## 6、创建智能体和对话

在开发者中心打开 `jiaorong-demo`。客户端启动 `node/main.js`，并打开 `entry` 指向的页面。

### 6.1 创建智能体

```js
const agent = await jr.jiaorong.agent.create({
  agentKey: 'demo',
  name: 'demo智能体',
  config: { systemPrompt: '你是demo智能体' },
});
```

同一个 `agentKey` 重复调用不会新建智能体，只按本次传入的字段覆盖已有配置。

### 6.2 创建对话

```js
const { session } = await jr.jiaorong.session.create({
  agentId: agent.id,
  message: '你好',
});

await jr.jiaorong.session.send({
  sessionId: session.id,
  content: { text: '你都能做什么' },
});
```

发消息之前先订上 `chat.stream.updated`。服务端日志打印出本轮内容，即表示发送成功。

页面要显示这些内容，需要服务端自己写接口，把监听到的内容提供给前端。接口形式由应用决定，这里不写具体实现。

改了 `node/` 之后，离开应用再打开。调试页面保存后在应用窗口里看；交付前 `pnpm build`，并把 `entry` 改回 `web-ui/index.html`。
