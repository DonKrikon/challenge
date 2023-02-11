import { createApp } from 'vue'
import App from './App.vue'
//Importacion de Modulos
import VueAxios from 'vue-axios'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '@/style/style.css'
// Axios Configuration
axios.defaults.baseURL = 'https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks'
axios.defaults.headers.common['Authorization'] = `Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd`

const app = createApp(App)
app.use(VueAxios, axios)
app.mount('#app')
