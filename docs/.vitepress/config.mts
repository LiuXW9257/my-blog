import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "newsboy's blog",
  description: "newsboy's blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'vue-study',
        items: [
          { text: 'SFC 单文件组件', link: '/vue/sfc' },
          { text: '虚拟 DOM', link: '/vue/virtual-dom' },
          { text: 'shallowRef', link: '/vue/shallowRef' },
          { text: '计算属性', link: '/vue/computed' },
          { text: '侦听', link: '/vue/watch-watchEffect' },
          { text: 'customRef', link: '/vue/customRef' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
