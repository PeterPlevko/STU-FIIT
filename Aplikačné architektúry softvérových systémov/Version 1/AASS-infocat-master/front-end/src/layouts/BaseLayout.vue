<template>
  <main>
    <main-header />
    <ToolbarUser />

    <div class="base-layout q-px-md footer-margin bg-grey-2">
      <router-view />
    </div>
    <MainFooter />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainHeader from 'src/layouts/headers/MainHeader.vue';
import MainFooter from 'src/layouts/headers/MainFooter.vue';
import ToolbarUser from 'src/layouts/headers/ToolbarUser.vue';

export default defineComponent({
  name: 'BaseLayout',

  components: {
    MainHeader,
    MainFooter,
    ToolbarUser,
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.footer-margin {
  min-height: 89vh;
}
main {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}
.q-btn {
  padding: 4px 10px 4px 8px;
}

.filter {
  max-width: 200px;

  .q-select {
    .q-field__native {
      padding-top: 0;
    }
  }

  .q-field--dense .q-field__control,
  .q-field--dense .q-field__marginal {
    height: 30px;
    min-height: 30px;
  }
}

.filter:not(:has(.q-field)) {
  margin-bottom: 30px;
}

tr > th:has(.filter) > .q-icon {
  display: none;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  h4 {
    margin-bottom: 15px;
    margin-top: 15px;
  }
}
.base-layout {
  @media (max-width: 575.98px) {
    padding: 0px;
  }
}
</style>
