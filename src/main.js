/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia();
app.use(pinia)

registerPlugins(app)
app.mount('#app')
