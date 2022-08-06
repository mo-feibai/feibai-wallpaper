import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from '@router'
// 重置样式
import '@/assets/reset.css'
//引入elment-plus完整样式文件
import 'element-plus/theme-chalk/index.css'

// 引入动画
import 'animate.css';



const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')