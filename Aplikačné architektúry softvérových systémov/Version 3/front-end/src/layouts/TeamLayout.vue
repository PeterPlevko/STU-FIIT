<template>
  <main>
    <team-header />
    <div class="bg-white">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TeamHeader from 'src/layouts/teamHeaders/TeamHeader.vue';

export default defineComponent({
  name: 'TeamLayout',
  components: {
    TeamHeader,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
main {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
