import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
//import 'vue-carousel'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
