<template>
  <div class="centerMiddle">
    <form class="registrationForm" action="submit()">
      <h1>Registracia</h1>
      <hr class="solid" />
      <q-separator />
      <label for="name">Meno</label>
      <q-input
        id="name"
        bg-color="white"
        square
        outlined
        v-model="name"
        label="Meno"
      />
      <label for="surName">Priezvisko</label>
      <q-input
        id="surName"
        bg-color="white"
        square
        outlined
        v-model="surName"
        label="Priezvisko"
      />
      <label for="nickName">Prezivka</label>
      <q-input
        id="nickName"
        bg-color="white"
        square
        outlined
        v-model="nickName"
        label="Prezivka"
      />
      <label for="email">Email</label>
      <q-input
        id="email"
        bg-color="white"
        square
        outlined
        v-model="email"
        label="Email"
      />
      <label for="passWord">Heslo</label>
      <q-input
        id="passWord"
        bg-color="white"
        square
        outlined
        v-model="passWord"
        label="heslo"
      />
      <label for="confirmPassword">Potvrd heslo</label>
      <q-input
        id="confirmPassword"
        bg-color="white"
        square
        outlined
        v-model="confirmPassword"
        label="Potvrd heslo"
      />

      <q-btn class="confirmBtn" color="purple" label="Registrovat" />
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      name: ref(''),
      surName: ref(''),
      nickName: ref(''),
      email: ref(''),
      passWord: ref(''),
      confirmPassword: ref(''),
    };
  },
});
</script>

<style scoped>
.registrationForm {
  padding: 10px;
  border: 1px solid black;
  box-shadow: -1px 1px black, -2px 2px black, -3px 3px black, -4px 4px black,
    -5px 5px black;
  min-width: 500px;
  padding: 20px;
  display: flex;
  background: rgb(202, 199, 199);
  font-size: 20px;
  flex-direction: column;
  align-items: center;
}
.registrationForm .q-input {
  min-width: 200px;
}

.centerMiddle {
  margin: auto;
  width: 25%;
  margin-top: 100px;
}

.confirmBtn {
  margin-top: 10px;
}

h1 {
  margin: 0px;
  font-size: 50px;
}

hr.solid {
  border-top: 3px solid black;
  min-width: 400px;
}
</style>
