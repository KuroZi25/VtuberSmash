import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {clientID, clientSecret} from './plugins/credentials'

const app = createApp(App);

app.config.globalProperties.$clientID = clientID;
app.config.globalProperties.$clientSecret = clientSecret;

app.use(vuetify).mount('#app')