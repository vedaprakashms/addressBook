import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'
const options = {
    position: 'bottom-left',
    timeout: 1000,
    closeOnClick: true,
    transition: 'Vue-Toastification__fade',
    maxToasts: 30,
    newestOnTop: false,
}
library.add(fas, fab)
createApp(App)
    .use(store)
    .use(router)
    .use(Toast, options)
    .component('fa', FontAwesomeIcon)
    .mount('#app')
