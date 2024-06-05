<script setup lang="ts">
import SidebarNavigationComponent from '../components/SidebarNavigationComponent.vue'
import { ref } from 'vue'
import { notify } from '@kyvg/vue3-notification'
import router from '@/router'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

const email = ref('')
const password = ref('')
const errMsg = ref('')

const redirectToRegisterPage = () => {
  router.push({ name: 'register' })
}

const login = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      notify({
        title: 'Login',
        text: 'You have been logged in!',
        type: 'success'
      })
      data.user.getIdTokenResult().then((tokenResult) => {
        if (tokenResult.claims.admin) {
          router.push({ name: 'admin' })
        } else {
          router.push({ name: 'home' })
        }
      })
      router.push({ name: 'home' })
    })
    .catch((error) => {
      console.log(error)
      alert(error.message)

      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
          break
      }
    })
}

const signInWithGoogle = () => {
  const providers = new GoogleAuthProvider()
  signInWithPopup(getAuth(), providers)
    .then(() => {
      router.push({ name: 'home' })
    })
    .catch((error) => {
      console.log('error')
      console.log(error)
      alert(error.message)
    })
}
</script>

<template>
  <SidebarNavigationComponent></SidebarNavigationComponent>
  <div class="fle min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login into an account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            v-model="email"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required="true"
            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required="true"
            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="mt-2">
        <button
          @click="login()"
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>
      </div>

      <div class="mt-2">
        <button
          @click="signInWithGoogle()"
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in with google
        </button>
      </div>
      <div class="mt-2">
        <button
          href="/register"
          @click="redirectToRegisterPage()"
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
