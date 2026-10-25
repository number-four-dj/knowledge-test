---
outline: [2, 3]
---

# CLI

`jiaorong` 是交融超级智能体客户端自带的本机命令，用于调用模型、生成多媒体内容、执行 OCR、管理设置、技能和连接器（MCP），也可以生成交融应用目录。

本文对应 JiaorongAI `0.8.x`，当前 CLI surface 为 `v2`。升级客户端后，以 `jiaorong help` 和 `jiaorong system capabilities --json` 的输出为准。

## 快速开始

1. 启动交融超级智能体客户端，并完成登录和模型服务配置。
2. 打开一个新的终端窗口。首次安装或客户端升级后，需要新开终端才能读取最新 PATH。
3. 检查 CLI 是否可用：

```bash
jiaorong help
jiaorong system status --json
jiaorong system doctor --json
```

`system status` 查看客户端本机服务状态；`system doctor` 诊断 CLI 与客户端的连接。

## 命令格式

日常提问可以使用简写，它会展开为 `model invoke`：

```bash
jiaorong '用一段话介绍交融超级智能体'
jiaorong '你是谁' --json
jiaorong '你是谁' --provider <服务商ID> --model <模型ID>
```

其他命令使用两段式：

```text
jiaorong <领域> <动作> [选项]
```

例如：

```bash
jiaorong image generate --provider <服务商ID> --model <模型ID> \
  --prompt '一张产品照片' --jsonl

jiaorong skill list --json
```

`--json`、`--jsonl`、`--timeout` 必须写在问题后面，或写在领域和动作后面。下面写法会被拒绝：

```text
jiaorong --json image generate
```

查看某个命令的参数：

```bash
jiaorong <领域> <动作> --help
```

## 输出与退出码

| 模式 | 用途 |
| --- | --- |
| 默认文本 | 直接阅读；结果在 stdout，诊断信息在 stderr |
| `--json` | 输出一条最终 JSON 结果，适合脚本解析 |
| `--jsonl` | 逐行输出事件，最后一行是终态，适合流式和日志记录 |

| 退出码 | 含义 |
| --- | --- |
| `0` | 成功 |
| `1` | 仅 `create app` 会出现：目录已生成，但装依赖或构建失败 |
| `2` | 命令或参数不合法 |
| `3` | 客户端未运行，或协议、CLI surface 不匹配 |
| `4` | 鉴权或授权失败 |
| `5` | 客户端窗口内的批准被拒绝或超时 |
| `6` | 领域操作失败，例如模型调用失败 |
| `7` | 超时、信号或取消 |
| `8` | 内部或协议错误 |

修改设置、写入凭据、安装技能、添加连接器等敏感操作会在客户端窗口弹出批准。CLI 会等待处理结果，没有跳过批准的参数。

`create app` 是本地脚手架命令，不要求客户端正在运行；除它以外，其他命令都需要客户端正在运行。

## 命令总表

系统与诊断：

| 命令 | 说明 |
| --- | --- |
| `jiaorong system status` | 查看本机控制面状态 |
| `jiaorong system version` | 查看客户端、协议和 CLI surface 版本 |
| `jiaorong system capabilities` | 列出当前暴露的 CLI 能力 |
| `jiaorong system doctor` | 诊断 CLI 与客户端连接 |

模型与服务商：

| 命令 | 说明 |
| --- | --- |
| `jiaorong model invoke` | 原始文本模型调用 |
| `jiaorong model list` | 列出服务商的运行时模型 |
| `jiaorong model enable` | 启用模型 |
| `jiaorong model disable` | 停用模型 |
| `jiaorong model config-get` | 查看模型公共配置 |
| `jiaorong model config-set` | 写入模型公共配置 |
| `jiaorong model config-reset` | 重置模型公共配置 |
| `jiaorong provider list` | 查看脱敏的服务商信息 |
| `jiaorong provider test` | 测试服务商连接 |
| `jiaorong provider add` | 添加自定义服务商 |
| `jiaorong provider update` | 更新自定义服务商 |
| `jiaorong provider remove` | 移除自定义服务商 |
| `jiaorong provider set-credential` | 写入服务商凭据 |
| `jiaorong provider clear-credential` | 清理服务商凭据 |

多媒体与识别：

| 命令 | 说明 |
| --- | --- |
| `jiaorong image generate` | 生成图片工件 |
| `jiaorong video generate` | 生成视频工件 |
| `jiaorong audio speak` | 生成语音工件 |
| `jiaorong audio transcribe` | 转写本地文件或已有工件 |
| `jiaorong artifact describe` | 查看工件元数据 |
| `jiaorong artifact get` | 下载工件 |
| `jiaorong artifact delete` | 删除工件 |
| `jiaorong ocr status` | 查看离线 OCR 状态 |
| `jiaorong ocr extract` | 识别图片或 PDF |
| `jiaorong ocr clear-cache` | 清理 OCR 派生缓存 |

Agent 运行：

| 命令 | 说明 |
| --- | --- |
| `jiaorong agent run` | 启动可恢复的后台 Agent 运行 |
| `jiaorong run get` | 查看后台运行 |
| `jiaorong run watch` | 订阅后台运行事件 |
| `jiaorong run cancel` | 取消后台运行 |

设置、技能与连接器：

| 命令 | 说明 |
| --- | --- |
| `jiaorong settings get` | 读取允许公开的设置 |
| `jiaorong settings set` | 修改允许公开的设置 |
| `jiaorong skill list` | 查看技能列表 |
| `jiaorong skill install` | 安装技能 |
| `jiaorong skill enable` | 启用技能 |
| `jiaorong skill disable` | 停用技能 |
| `jiaorong skill remove` | 移除技能 |
| `jiaorong mcp list` | 查看连接器列表 |
| `jiaorong mcp add` | 添加连接器 |
| `jiaorong mcp update` | 更新连接器 |
| `jiaorong mcp enable` | 启用连接器 |
| `jiaorong mcp disable` | 停用连接器 |
| `jiaorong mcp start` | 启动连接器 |
| `jiaorong mcp stop` | 停止连接器 |
| `jiaorong mcp remove` | 移除连接器 |

交融应用脚手架：

| 命令 | 说明 |
| --- | --- |
| `jiaorong create app` | 生成交融应用目录 |
| `jiaorong help` | 查看命令总览 |

## 模型与服务商

### `model invoke`

原始文本模型调用，不会创建聊天会话，也不会执行工具、技能或连接器。

```bash
jiaorong model invoke \
  --provider <服务商ID> \
  --model <模型ID> \
  --prompt '用一段话介绍交融超级智能体' \
  --jsonl
```

不指定服务商和模型时，默认使用 `jiaorong` / `jiaorong-deepseek-v4-pro`。

| 参数 | 说明 |
| --- | --- |
| `--provider <id>` | 服务商 ID |
| `--model <id>` | 模型 ID |
| `--prompt <text>` | 提示词，和 `--stdin` 二选一 |
| `--stdin` | 从标准输入读取提示词 |
| `--system <text>` | 覆盖系统提示词 |
| `--temperature <n>` | 采样温度，范围 `0..2` |
| `--max-tokens <n>` | 输出 token 上限 |

### 模型管理

```bash
jiaorong model list --provider <服务商ID> --json
jiaorong model enable --provider <服务商ID> --model <模型ID> --json
jiaorong model disable --provider <服务商ID> --model <模型ID> --json
```

模型公共配置：

```bash
jiaorong model config-get --provider <服务商ID> --model <模型ID> --json
jiaorong model config-set --provider <服务商ID> --model <模型ID> --stdin --json
jiaorong model config-reset --provider <服务商ID> --model <模型ID> --json
```

`config-set` 从标准输入读取完整 JSON，避免命令行历史泄露配置。

### 服务商管理

```bash
jiaorong provider list --enabled-only --json
jiaorong provider test --provider <服务商ID> --json
```

自定义服务商：

```bash
jiaorong provider add --name <名称> --api-type <类型> --base-url <地址> --json
jiaorong provider update --provider <服务商ID> --name <名称> --json
jiaorong provider remove --provider <服务商ID> --json
```

凭据：

```bash
jiaorong provider set-credential --provider <服务商ID> --stdin --json
jiaorong provider clear-credential --provider <服务商ID> --json
```

`set-credential` 从标准输入读取 API Key，不要写在命令行里。

## 多媒体与识别

### 图片与视频

```bash
jiaorong image generate --provider <服务商ID> --model <模型ID> \
  --prompt '一张产品照片' --jsonl

jiaorong video generate --provider <服务商ID> --model <模型ID> \
  --prompt '五秒产品转台视频' --jsonl
```

常用参数：

| 命令 | 参数 |
| --- | --- |
| `image generate` | `--size`、`--quality`、`--format`、`--compression`、`--background`、`--moderation` |
| `video generate` | `--seconds`、`--size`、`--ratio`、`--duration`、`--resolution`、`--watermark`、`--audio` |

### 语音

```bash
jiaorong audio speak --provider <服务商ID> --model <模型ID> \
  --text '你好，这里是交融超级智能体' --jsonl

jiaorong audio transcribe --provider <服务商ID> --model <模型ID> \
  --file ./sample.wav --json
```

`audio speak` 支持 `--voice`、`--format`、`--speed` 和 `--instructions`；`audio transcribe` 支持 `--file` / `--artifact` 和 `--mime`。

### 工件

多媒体生成结果是工件（Artifact）。

```bash
jiaorong artifact describe --id <工件ID> --json
jiaorong artifact get --id <工件ID> --out ./result.png --json
jiaorong artifact delete --id <工件ID> --json
```

`artifact get` 可加 `--overwrite` 覆盖本地文件。

### OCR

本地 OCR 不需要云端模型：

```bash
jiaorong ocr status --json
jiaorong ocr extract --file ./scan.png --json
jiaorong ocr clear-cache --json
```

`ocr extract` 支持 `--file` / `--artifact`、`--mime`、`--backend`、`--page-count` 和 `--max-tokens`。

## Agent 运行

### `agent run`

启动一个可恢复的后台运行。关闭终端不会取消运行：

```bash
jiaorong agent run --prompt '检查当前目录并总结问题' --json
```

| 参数 | 说明 |
| --- | --- |
| `--prompt <text>` | 任务提示词，和 `--stdin` 二选一 |
| `--stdin` | 从标准输入读取提示词 |
| `--agent <id>` | 指定 Agent |
| `--provider <id>` | 服务商 ID |
| `--model <id>` | 模型 ID |
| `--system <text>` | Agent 系统提示词 |
| `--title <text>` | 持久会话标题 |
| `--project-dir <path>` | 工作目录 |
| `--skills <id,id>` | 启用指定技能 |
| `--disable-tools <id,id>` | 禁用指定内置工具 |
| `--max-turns <n>` | 限制模型轮数，范围 `1..100` |

### 运行管理

```bash
jiaorong run get --run <运行ID> --json
jiaorong run watch --run <运行ID> --jsonl
jiaorong run cancel --run <运行ID> --json
```

`run get` 支持 `--cursor` 和 `--limit` 分页；`run watch` 支持 `--cursor` 从事件游标续读。

## 设置、技能与连接器

### 设置

```bash
jiaorong settings get --json
jiaorong settings set --key ocrBackend --value '"cpu"' --json
```

`settings get` 支持 `--keys <key,key>`；`settings set` 的 `--value` 是 JSON 标量。

### 技能

```bash
jiaorong skill list --json
jiaorong skill install --url <https地址> --json
jiaorong skill enable --name <技能名> --json
jiaorong skill disable --name <技能名> --json
jiaorong skill remove --name <技能名> --json
```

`skill install` 支持 `--file <压缩包>` / `--url <https地址>`、`--agent <id>` 和 `--overwrite`。

### 连接器

```bash
jiaorong mcp list --json
jiaorong mcp add --name <连接器名> --stdin --json
jiaorong mcp update --name <连接器名> --stdin --json
jiaorong mcp enable --name <连接器名> --json
jiaorong mcp disable --name <连接器名> --json
jiaorong mcp start --name <连接器名> --json
jiaorong mcp stop --name <连接器名> --json
jiaorong mcp remove --name <连接器名> --json
```

`mcp add` / `mcp update` 从标准输入读取 JSON 配置。

## 创建交融应用

```bash
jiaorong create app my-app
pnpm create jiaorong-app my-app
```

完整参数查看：

```bash
jiaorong create app --help
```

生成后到客户端「开发者中心」创建应用并选择该目录。详细开发流程见 [交融应用](./jiaorong-app.md)。

## 常见问题

### 提示命令不存在

先启动一次客户端，再新开终端。macOS / Linux 检查 `~/.local/bin` 是否在 PATH 中；Windows 检查用户命令目录是否在 PATH 中。

### 提示客户端不可用

启动交融超级智能体客户端后重试。除 `create app` 外，其他命令都需要客户端正在运行。

### 提示版本或 surface 不匹配

升级客户端后重新打开终端，再执行：

```bash
jiaorong system version --json
jiaorong system capabilities --json
```

### 敏感操作没有立即返回

客户端窗口可能正在等待批准。批准或拒绝后，CLI 会继续返回结果。

### 不要把密钥写在命令行

API Key、完整模型配置和超长文本都使用 `--stdin` 输入，避免进入 shell 历史记录。
