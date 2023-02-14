import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import router from "./router/router.js";

import {createPinia} from "pinia";
const pinia = createPinia()

import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css'

// 引入default-passive-events
import 'default-passive-events';


createApp(App).use(pinia).use(router).use(Antd).mount('#app')
