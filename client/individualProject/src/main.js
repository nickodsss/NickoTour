import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
const pinia = createPinia()

app.use(vue3GoogleLogin, {
    clientId: '200860624871-83lp558asa5lr3p46s343es7psii840m.apps.googleusercontent.com'
})

pinia.use(({ store }) => {
    store.router = markRaw(router)
})
app.use(pinia)
app.use(router)

app.mount('#app')