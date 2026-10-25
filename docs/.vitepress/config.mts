import { defineConfig } from 'vitepress'

const jiaorongAppSidebar = [
  {
    text: '交融应用',
    collapsed: false,
    items: [
      { text: '开发指南', link: '/Examples/jiaorong-agent/jiaorong-app' },
      { text: 'Web 开发', link: '/Examples/jiaorong-agent/frontend' },
      { text: 'Node 开发', link: '/Examples/jiaorong-agent/backend' },
      { text: 'API 参考', link: '/Examples/jiaorong-agent/api' },
      { text: 'JiaorongAgentChat', link: '/Examples/jiaorong-agent/agent-chat' },
      {
        text: 'JiaorongAgentSessionList',
        link: '/Examples/jiaorong-agent/agent-session-list'
      }
    ]
  }
]

const jiaorongAppRoutes = [
  '/Examples/jiaorong-agent/jiaorong-app.md',
  '/Examples/jiaorong-agent/frontend.md',
  '/Examples/jiaorong-agent/backend.md',
  '/Examples/jiaorong-agent/api.md',
  '/Examples/jiaorong-agent/agent-chat.md',
  '/Examples/jiaorong-agent/agent-session-list.md',
  '/Examples/jiaorong-agent/scaffold.md'
]

export default defineConfig({
  lang: 'zh-CN',
  title: '超级智能体文档',
  description: '超级智能体产品使用与开发文档',
  cleanUrls: false,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }]
  ],

  themeConfig: {
    logo: {
      src: '/zjxkLogo1.png',
      alt: '交融超级智能体'
    },

    nav: [
      {
        text: '快速开始',
        link: '/Examples/jiaorong-agent/started',
        activeMatch: '/Examples/jiaorong-agent/started'
      },
      {
        text: '交融应用',
        items: [
          { text: '开发指南', link: '/Examples/jiaorong-agent/jiaorong-app' },
          { text: 'Web 开发', link: '/Examples/jiaorong-agent/frontend' },
          { text: 'Node 开发', link: '/Examples/jiaorong-agent/backend' },
          { text: 'API 参考', link: '/Examples/jiaorong-agent/api' },
          { text: 'JiaorongAgentChat', link: '/Examples/jiaorong-agent/agent-chat' },
          {
            text: 'JiaorongAgentSessionList',
            link: '/Examples/jiaorong-agent/agent-session-list'
          }
        ]
      },
      {
        text: '技能',
        link: '/Examples/jiaorong-agent/skills',
        activeMatch: '/Examples/jiaorong-agent/skills'
      },
      {
        text: '连接器',
        link: '/Examples/jiaorong-agent/connectors',
        activeMatch: '/Examples/jiaorong-agent/connectors'
      },
      {
        text: 'CLI',
        link: '/Examples/jiaorong-agent/cli',
        activeMatch: '/Examples/jiaorong-agent/cli'
      }
    ],

    sidebar: {
      '/Examples/jiaorong-agent/started.md': [
        {
          text: '快速开始',
          link: '/Examples/jiaorong-agent/started'
        }
      ],
      ...Object.fromEntries(
        jiaorongAppRoutes.map(route => [route, jiaorongAppSidebar])
      ),
      '/Examples/jiaorong-agent/skills.md': [
        {
          text: '技能',
          link: '/Examples/jiaorong-agent/skills'
        }
      ],
      '/Examples/jiaorong-agent/connectors.md': [
        {
          text: '连接器',
          link: '/Examples/jiaorong-agent/connectors'
        }
      ],
      '/Examples/jiaorong-agent/cli.md': [
        {
          text: 'CLI',
          link: '/Examples/jiaorong-agent/cli',
        }
      ],
      // '/guide/': [
      //   {
      //     text: '使用指南',
      //     items: [
      //       { text: '快速开始', link: '/guide/getting-started' },
      //       { text: '编写文档', link: '/guide/writing' }
      //     ]
      //   }
      // ]
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    outline: {
      level: [2, 3, 4],
      label: '本页导航'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    currentPageUrl: {
      origin: 'https://c4ai.ccccltd.cn',
      base: '/jiaorong-super-agent-doc',
      label: '当前网址'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  }
})
