import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { authManager } from 'src/services'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {}
})

const DEBUG = process.env.NODE_ENV === 'development'

// add interceptor to add authorization header for api calls
api.interceptors.request.use(
  (config) => {
    const token = authManager.getToken()

    if (token !== null) {
      config.headers!.Authorization = `Bearer ${token}`
    }

    if (DEBUG) {
      console.info('-> ', config)
    }

    return config
  },
  (error) => {
    if (DEBUG) {
      console.error('-> ', error)
    }

    return Promise.reject(error)
  }
)

// add interceptor for response to trigger logout
api.interceptors.response.use(
  (response) => {
    if (DEBUG) {
      console.info('<- ', response)
    }

    return response
  },
  (error) => {
    if (DEBUG) {
      console.error('<- ', error.response)
    }

    // server api request returned unathorized response so we trrigger logout
    if (error.response.status === 401 && !error.response.config.dontTriggerLogout) {
      authManager.logout()
    }

    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
