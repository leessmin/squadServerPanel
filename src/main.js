import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import router from "./router/router.js";

import { createPinia } from "pinia";
const pinia = createPinia()

import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css'



createApp(App).use(pinia).use(router).use(Antd).mount('#app')
