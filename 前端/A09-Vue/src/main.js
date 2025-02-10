import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from "element-plus/es/locale/lang/zh-cn";
import { createPinia } from 'pinia'
// import MakeitAdminPro from '@miitvip/admin-pro'

const app = createApp(App)
const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale })
// app.use(MakeitAdminPro)
app.mount('#app')