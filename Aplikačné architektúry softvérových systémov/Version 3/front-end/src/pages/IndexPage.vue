<template>
  <div class="column items-center justify-evenly q-py-lg">
    <div class="container-welcome">
      <h1 class="welcome-sign">{{ $t('welcome1') }}</h1>
    </div>

    <div>
      <img class="silly_img" src="home/silly_cat.png" alt="silly_cat" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    return {};
  },
  methods: {},
});
</script>

<style scoped lang="scss">
.container-welcome {
  text-align: center;
}

.welcome-sign {
  font: 3em Bahnschrift;
  margin: 10px 10px 30px 10px;
}

.silly_img {
  animation: 5s spinnow infinite linear;
}
</style>
