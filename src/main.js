/* eslint-disable no-unused-vars */
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './index.css'
import StarRating from 'vue-star-rating'
const app = createApp(App)
app.component('star-rating', StarRating.default);
app.mount('#app')

