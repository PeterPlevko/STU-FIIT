/* eslint-disable @typescript-eslint/no-unsafe-call */
<template>
  <q-layout view="lHh lpR fFf">
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
      :width="200"
    >
      <div class="leftSidePanel">
        <div class="channelsWithOptions" style="min-width: 200px">
          <div class="channels">
            <p>Channels</p>
            <div>
              <div v-for="channel in channels" :key="channel.name">
                 <q-btn
                  @click="changeTo(channel.id.toString())"

                  v-bind:class="channel.isTopped ? 'toppedChannel' : ''"
                  color="primary"
                  class="channelButton"
                  text-color="black"
                >
                  <!-- <router-link to=""></router-link> -->
                  <!-- :to="`/applications/${currentApplicationId}`" -->
                  {{ channel.name }}
                  <i v-if="channel.isPrivate" class="material-icons">lock</i>
                </q-btn>
              </div>
            </div>
             <q-btn
              class="confirmBtn"
              color="purple"
              label="ADD CHANNEL"
              @click="openDialog()"
            />
          </div>
        </div>
        <div class="userPanel">
          <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Settings</div>
             <q-btn
              color="primary"
               @click="isOnline = false"
              push
              size="sm"
              v-close-popup
            >
            <span class="material-icons red-color"> circle</span> Offline
            </q-btn>
             <q-btn
              color="primary"
              @click="isOnline = true"
              push
              size="sm"
              v-close-popup
            >
            <span class="material-icons green-color"> circle</span> Online
            </q-btn>
            <q-toggle v-model="DNDvalue" label="Notifications" />
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">{{userName}}</div>

            <q-btn
              color="primary"
              label="Logout"
              push
              size="sm"
              v-close-popup
            />
          </div>
        </div>
      </q-menu>
          <p style="margin: 0px">
            <span
            :class="[
            isOnline ? 'green-color' : 'red-color',
            ]"
            class="material-icons"> circle</span> {{userName}}
            <i :class="[
            DNDvalue ? 'green-color' : 'red-color',
            ]" class="material-icons">notifications</i>
          </p>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="toggleLeftDrawer"
        />
        <q-separator dark vertical inset />
        <div v-if="$route.params.id" style="padding-left: 10px">
          Conversation: {{ getChannelName($route.params.id.toString()) }}
        </div>

        <q-space />
      </q-toolbar>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import AddChannelDialogVue from 'src/components/Dialogs/AddChannelDialog.vue';
import { ref } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      DND: ref(true),
    };

  },
  data() {
    return {

    };
  },
  computed:{
    isOnline: {
      get () {
        return this.$store.state.userData.isOnline;
      },
      set (val) {
        this.$store.commit('userData/updateIsOnline', val)
      }
    },
    userName: {
      get () {
        return this.$store.state.userData.userName;
      },
      set (val) {
        this.$store.commit('userData/updateUserName', val)
      }
    },
    DNDvalue: {
      get () {
        return this.$store.state.userData.DNDValue;
      },
      set (val) {
        this.$store.commit('userData/updateDNDValue', val)
      }
    },
    channels: {
      get () {
        return this.$store.state.userData.channels;
      },
      set (val) {
        this.$store.commit('userData/updateChannels', val)
      }
    },
  },
  methods: {
    changeTo: function (linkTo: string) {
      void this.$router.push(linkTo);
    },
    getChannelName(id: string): string | undefined {
      return this.channels.find((channel) => channel.id.toString() === id)
        ?.name;
    },
    addChannel(channelName: string, isPrivate: boolean) {
      console.log('addChannel', channelName, isPrivate);
      this.$store.commit('userData/updateChannels', {
        id: this.channels.length + 1,
        name: channelName,
        isPrivate,
        isTopped: false,
      });
      this.$store.commit('userData/sortChannels')
    },
    openDialog() {
      this.$q
        .dialog({
          component: AddChannelDialogVue,

          // props forwarded to your custom component
          componentProps: {
            text: 'something',
            // ...more..props...
          },
        })
        .onOk((data: { channelName: string; isPrivate: boolean }) => {
          console.log('toto su data', data);
          this.addChannel(data.channelName, data.isPrivate);
        })
        .onCancel(() => {
          console.log('Cancel');
        })
        .onDismiss(() => {
          console.log('Called on OK or Cancel');
        });
    },
  },
});
</script>

<style scoped>
.channelsWithOptions {
  padding: 10px;
  background: black;
  color: white;
  height: 92vh;
}
.channels {
  margin-top: 100px;
  margin-bottom: 200px;
}

.channels p {
  font-size: 20px;
}

.userPanel {
  background: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
}
.userPanel p {
  font-size: 20px;
}

.green-color {
  color: #08fc31;
}

.red-color{
  color: red;
}

.commandLine .q-input {
  width: 350px;
  color: white;
}

.icon-display {
  font-size: 27px;
  width: 4%;
}

.channelButton {
  margin: 5px 0 5px 0;
  min-width: 130px;
}

.confirmBtn {
  min-width: 130px;
}

.toppedChannel{
  border: 3px solid yellow;
}
</style>
