# 技能

## 技能市场

### 展示位置

技能展示在交融超级智能体客户端市场上，用户点击左侧菜单【插件中心】出现二级菜单，选择【技能】，进入【技能市场】

![](/skills/image1.png)

用户点击对应技能卡片右下角【安装】按钮，安装对应技能，并支持在对话中调用已安装的技能

![](/skills/image2.png)

## 技能创建工具

点击市场右上角【新建技能】-【创建技能】

![](/skills/image3.png)

跳转进入对话，补全创建技能提示词，开启创建

![](/skills/image4.png)

## 开放平台解析失败原因

在开放平台上如创建技能过程中，提交zip包后解析失败，可参考后续【技能基础结构】【子资源目录说明】定位问题，如定位问题失败，请发送邮件联系运营同学

### 技能基础结构

```text
{skill-name}/
    ├── SKILL.md              # ★ 技能定义（必须）
    ├── references/           # 参考资料（可选）
    │   ├── api-spec.md       #   API 规范、字段类型等
    │   └── examples.md       #   示例数据
    ├── scripts/              # 可执行脚本（可选）
    │   ├── fetch-data.js     #   数据获取脚本
    │   └── transform.py      #   数据处理脚本
    └── templates/            # 模板文件（可选）
        ├── report.sh         #   报告生成模板
        └── workflow.sh       #   工作流模板格式
```

SKILL.md使用 YAML frontmatter + Markdown 正文

```markdown
---
name: your-skill-name
description: 一句话描述技能能力
metadata:
    displayName：
---

# 技能指令正文

当用户需要做 XX 时，按以下步骤执行：
1. ...
2. ...
3. ...
```

### 子资源目录说明

#### references--参考资料

存放SKILL.md引用的补充知识文档，AI执行技能时会读取这些文件作为上下文。

适用场景：API字段类型定义、协议规范、领域知识参考、示例数据等。

使用方式：在SKILL.md中通过@reference/xxx.md引用。

示例：

```text
references/
├── field-types.md           # 字段类型枚举和用法
├── api-endpoints.md         # API 接口文档
└── best-practices.md        # 最佳实践指南
```

#### Scripts--可执行脚本

存放技能执行中需要调用的脚本，AI通过Bash工具执行。

适用场景：调用外部API、数据处理、批量操作、需要特定运行时的逻辑。

使用方式：在SKILL.md中声明调用命令和参数。

示例：

```text
scripts/
├── data-index.js            # 数据查询入口
└── tool-index.js            # 工具集入口
```

#### Templates--模板文件

存放可复用的模板脚本或配置文件。

适用场景：标准化操作流程的模板、报告生成模板

示例：

```text
templates/
├── authenticated-session.sh  # 认证会话模板
└── capture-workflow.sh       # 数据采集工作流模板
```
