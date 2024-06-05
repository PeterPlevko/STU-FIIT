<template>
<q-page class="row items-center justify-evenly">
  <q-card square style="width: 400px; padding:50px">
    <q-card-section>
      <div class="text-h6">
        Register
      </div>
    </q-card-section>

    <q-form ref="form" class="q-gutter-md">
      <q-card-section>
          <q-input
          name="firstName"
          id="firstName"
          v-model.trim="form.firstName"
          label="firstName"
          autofocus
        />
        <q-input
          name="lastName"
          id="lastName"
          v-model.trim="form.lastName"
          label="lastName"
          autofocus
        />
        <q-input
          name="nickname"
          id="nickname"
          v-model.trim="form.nickname"
          label="nickname"
          autofocus
        />
        <q-input
          name="email"
          id="email"
          v-model.trim="form.email"
          type="email"
          label="Email"
          autofocus
        />
        <q-input
          id="password"
          name="password"
          v-model="form.password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          bottom-slots
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
        <q-input
          id="password_confirmation"
          name="password_confirmation"
          v-model="form.passwordConfirmation"
          label="Confirm Password"
          :type="showPassword ? 'text' : 'password'"
          bottom-slots
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="between">
        <q-btn label="Login" size="sm" flat :to="{ name: 'login' }"></q-btn>
        <q-btn
          label="Register"
          color="primary"
          :loading="loading"
          @click="onSubmit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export default defineComponent({
  name: 'RegisterPage',
  data () {
    return {
      form: { firstName: '', lastName: '', nickname: '', email: '', password: '', passwordConfirmation: '', state: 'online' },
      showPassword: false
    }
  },
  computed: {
    redirectTo (): RouteLocationRaw {
      return { name: 'login' }
    },
    loading (): boolean {
      return this.$store.state.auth.status === 'pending'
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('auth/register', this.form).then(() => this.$router.push(this.redirectTo))
    }
  }
})
</script>
