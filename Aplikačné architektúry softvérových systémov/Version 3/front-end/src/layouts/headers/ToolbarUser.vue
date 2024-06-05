<template>
  <div class="header">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-tabs v-model="model" class="menu">
        <q-tab icon="home" @click="onItemClick('/')" />
        <q-tab :label="$t('findCat')" @click="onItemClick('/cat/all')" />
        <q-tab :label="$t('catNames')" @click="onItemClick('/names')" />
      </q-tabs>

      <q-space />
      <q-btn
        class="q-mr-sm"
        :label="$t('addNewCat')"
        @click="openDialog()"
        icon="add"
      >
      </q-btn>
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import CreateCatDialog from 'src/components/CreateCatDialog.vue';
import CatService from 'src/services/cat/CatService';
import { socket } from 'src/socket';

export default defineComponent({
  name: 'toolbar-header-user',
  components: {},
  setup() {
    return {
      model: ref(''),
    };
  },
  methods: {
    openDialog: function () {
      this.$q
        .dialog({
          component: CreateCatDialog,
        })
        .onOk(async ({ cat }) => {
          const message = await CatService.create(cat);
          if (message?.message) {
            if (message.message === 'Cat with that name already exists') {
              this.$q.notify({
                message: message?.message,
                color: 'negative',
                position: 'top',
                icon: 'close',
              });
            } else {
              this.$q.notify({
                message: message?.message,
                color: 'positive',
                position: 'top',
                icon: 'check',
              });
            }
          }
        });
    },
    onItemClick(route: string) {
      this.$router.push(route);
    },
  },
  async beforeMount() {
    socket.on('showNotification', (...args) => {
      const message = args[0].message;
      const type = args[0].type;
      this.$q.notify({
        message: message,
        color: type,
        position: 'top',
        icon: 'close',
      });
      return;
    });
  },
});
</script>

<style scoped lang="scss">
.header {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}
</style>

<style lang="scss">
.q-menu {
  background-color: $primary;
}

.q-btn a {
  color: white;
  text-decoration: none;
}

.menu {
  .q-tab--active {
    background-color: #5e8fa5;
  }
}
</style>
