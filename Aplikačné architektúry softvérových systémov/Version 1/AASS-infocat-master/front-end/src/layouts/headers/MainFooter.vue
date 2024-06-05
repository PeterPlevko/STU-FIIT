<template>
  <div class="footer bg-primary shadow-2 flex items-center justify-end">
    <div class="text-white q-mr-md">
      {{ $t('contactUs') }}
      <a class="text-white" href="mailto:timacikusiacik@gmail.com"
        >timacikusiacik@gmail.com</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MainFooter',
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.footer {
  position: static;
  bottom: 0;
  max-width: 1440px;
  height: 50px;
  width: 100%;
  margin: 0 auto;
}
</style>
<!-- .q-btn{
  color: red;
  box-shadow: none;

} -->

<style lang="scss">
.q-menu {
  background-color: $secondary !important;
  color: black;
}

.q-item__section--main {
  flex: none;
  margin-right: 8px;
}
</style>
