<template>
  <div class="wrapper">
    <h2 class="title-login-form">Sign in</h2>
    <div id="formContent">
      <!-- Tabs Titles -->
      <form>
        <div class="inputField">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <q-input square outlined v-model="text" label="email@gmail.com" />
        </div>

        <div class="inputField">
          <label for="exampleInputEmail1" class="form-label">Password</label>
          <q-input square outlined v-model="text" label="Password" />
        </div>

        <div class="loginButton">
          <q-btn
            @click="$router.replace('/')"
            color="white"
            text-color="black"
            label="Login"
          />
        </div>
      </form>
      <div class="register-if-no-account">
        In case of no account, please
        <a
          href="../registration/registration.html"
          style="color: #db4a15 !important"
        >
          Register</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      text: ref(''),
    };
  },
  // name: 'PageName',
});
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}
.loginButton {
  display: flex;
  justify-content: center;
  padding: 15px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  width: 40%;
  position: relative;
  padding: 20px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
}

.inputField {
  padding: 15px 0px;
}

@media (max-width: 900px) {
  #formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 5px;
    width: 80%;
    position: relative;
    padding: 20px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  }
}
</style>
