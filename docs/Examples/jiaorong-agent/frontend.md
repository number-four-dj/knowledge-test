# Web 开发

调试时客户端打开 `app.json` 里的本地地址。交付时打开 `web-ui/index.html`。页面调用 `window.initRendererBridge` 连接本机服务。步骤见 [交融应用](./jiaorong-app.md)。

前端项目位置不限，可以在应用目录里，也可以是已有的独立仓库。联调只靠 `entry` 指向它的 dev 地址，交付时把构建产物拷进应用目录的 `web-ui/`。

第二个参数是页面自定义方法，名字自己定，下面的 `toReturn` 只是示例。`initRendererBridge` 是 async，要 `await` 才拿得到 `stop`；`stop` 的调用时机由应用自己决定，例如页面卸载或组件卸载时。

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

页面连上后，回复内容由服务端自己的接口提供。快速开始里服务端只把 `chat.stream.updated` 打印到日志。

调试：

```bash
pnpm dev --host 127.0.0.1 --port 5174
```

`entry` 写成 `http://127.0.0.1:5174/`。交付前：

```bash
pnpm build
```

再把 `entry` 改回 `web-ui/index.html`。

- `base` 必须是 `'./'`。
- 路由必须用 `createWebHashHistory()`。
- 页面请求自己的服务时，服务要允许调试来源 `http://127.0.0.1:5174` 和交付后 `web-ui` 的来源跨域。

方法说明见 [window.initRendererBridge](./api.md#initrendererbridge)。
