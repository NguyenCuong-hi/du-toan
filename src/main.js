import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import {
  Button,
  Badge,
  Avatar,
  Dialog,
  FeatherIcon,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)

// Register commonly used Frappe UI components globally
app.component('Button', Button)
app.component('Badge', Badge)
app.component('Avatar', Avatar)
app.component('Dialog', Dialog)
app.component('FeatherIcon', FeatherIcon)

app.mount('#app')
