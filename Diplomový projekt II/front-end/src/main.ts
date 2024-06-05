import './assets/main.css'
import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'
import router from './router'

import Tooltip from 'primevue/tooltip'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import BadgeDirective from 'primevue/badgedirective'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import FocusTrap from 'primevue/focustrap'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
}

// Initialize Firebase
initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

const app = createApp({
  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.use(Notifications)

// prime vue component setup
app.use(PrimeVue, { ripple: true })
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)

app.directive('tooltip', Tooltip)
app.directive('badge', BadgeDirective)
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)
app.directive('focustrap', FocusTrap)

app.mount('#app')
