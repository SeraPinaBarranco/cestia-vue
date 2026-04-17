import { createApp } from 'vue'
import { createPinia } from 'pinia'

//Styles
import './assets/styles/base.css'
import './assets/styles/layout.css'
import './assets/styles/components.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
