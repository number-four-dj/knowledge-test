# Node 开发

本机服务用 pnpm 安装 Elysia，由 `app.json` 的 `spawn` 拉起。步骤见 [交融应用](./jiaorong-app.md)。

```bash
cd node
pnpm init
pnpm pkg set type=module
pnpm add elysia ws
```

`node/main.js` 在页面连上之后创建智能体、创建对话，并把 `chat.stream.updated` 打印到日志。页面要显示这些内容，由服务端自己写接口提供。

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

桥的代码见 [交融应用 · 5.1](./jiaorong-app.md#bridge-file)。字段见 [jr.agent.create](./api.md#jragentcreate)、[jr.session.send](./api.md#jrsessionsend)。
