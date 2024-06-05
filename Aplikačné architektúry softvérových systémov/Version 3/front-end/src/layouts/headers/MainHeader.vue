<template>
  <div class="header">
    <div class="container-header">
      <div>
        <img
          class="cat-logo"
          :src="'/logo/black_infocat_logo.svg'"
          alt="infocat logo"
        />
      </div>

      <div class="container-lang">
        <q-select
          v-model="locale"
          :options="localeOptions"
          dense
          options-dense
          borderless
          emit-value
          map-options
          class="select-lang"
          color="white"
          hide-dropdown-icon
          menu-anchor="bottom left"
          menu-self="top middle"
        >
          <template v-slot:selected-item="scope">
            <q-item v-bind="scope">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" class="lang-icon-selected" />
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" class="lang-icon-menu" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'main-header',
  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    return {
      model: ref('English'),
      dense: ref(false),
      denseOpts: ref('English'),
      locale,
      localeOptions: [
        { label: 'English', value: 'en-US', icon: 'img:/flags/uk-flag.svg' },
        { label: 'Deutsch', value: 'de', icon: 'img:/flags/ge-flag.svg' },
        { label: 'Français', value: 'fr', icon: 'img:/flags/fr-flag.svg' },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
.not-verified {
  background-color: red;
  color: white;
  padding: 5px;
  width: 100%;
  text-align: center;
  max-width: 1440px;
}

.header {
  background-image: linear-gradient(whitesmoke, #8fdaff);
  max-width: 1440px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
}

.container-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.cat-logo {
  width: 100%;
  object-fit: contain;
}

.select-lang {
  width: 70px;
}

.lang-icon-selected {
  width: 40px;
}

.lang-icon-menu {
  width: 30px;
}
</style>

<style lang="scss">
.q-field__control {
  display: flex;
  align-items: center;
}
</style>
