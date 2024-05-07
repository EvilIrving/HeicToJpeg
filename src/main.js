// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/windIndex.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import { createHead } from '@unhead/vue'
// Create a global head instance
// const head = createHead()
const app = createApp(App)

// 全局注册ElementPlusIconsVue组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(head)
app.use(createPinia())
app.use(router)

app.mount('#app')
