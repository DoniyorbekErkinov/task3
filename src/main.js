/* eslint-disable no-unused-vars */
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './index.css'
import router from './router'
import StarRating from 'vue-star-rating'
const app = createApp(App)
app.use(router)
app.component('star-rating', StarRating.default);
app.mount('#app')

