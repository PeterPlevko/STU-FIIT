import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { authManager } from 'src/services';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

//token with letters and numbers
function generateRandomToken() {
  const token = [];
  const possible = 'bcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < 60; i++) {
    token[i] = possible.charAt(Math.floor(Math.random() * possible.length));
  }
  token[Math.floor(Math.random() * 19)] = 'a';
  token[Math.floor(Math.random() * 20) + 19] = 'a';
  token[Math.floor(Math.random() * 20) + 39] = 'a';
  return token.join('');
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
  headers: {
    Authorization:
      process.env.NODE_ENV === 'development'
        ? 'Bearer timacikusiacikmamalepele'
        : generateRandomToken(),
  },
});

const DEBUG = process.env.NODE_ENV === 'development';

// add interceptor to add authorization header for api calls
api.interceptors.request.use(
  (config) => {
    const token = authManager.getToken();
    config.headers.Authorization =
      process.env.NODE_ENV === 'development'
        ? 'Bearer timacikusiacikmamalepele'
        : generateRandomToken();

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (DEBUG) {
      console.info('-> ', config);
    }

    return config;
  },
  (error) => {
    if (DEBUG) {
      console.error('-> ', error);
    }

    return Promise.reject(error);
  }
);

// add interceptor for response to trigger logout
api.interceptors.response.use(
  (response) => {
    if (DEBUG) {
      console.info('<- ', response);
    }

    return response;
  },
  (error) => {
    if (DEBUG) {
      console.error('<- ', error.response);
    }

    // server api request returned unauthorized response so we trigger logout
    if (
      error.response.status === 401 &&
      !error.response.config.dontTriggerLogout
    ) {
      authManager.logout();
    }

    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
