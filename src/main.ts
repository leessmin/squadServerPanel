import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

import router from './router/index'

import { createPinia } from 'pinia'
const pinia = createPinia()

import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css'

// 全局使用ant icon
import * as Icons from '@ant-design/icons-vue'
const icons: any = Icons
for (const i in icons) {
    app.component(i, icons[i])
}


app.use(router).use(pinia).use(Antd).mount('#app')
