import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import CurrentPageUrl from './components/CurrentPageUrl.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(CurrentPageUrl)
    })
}
