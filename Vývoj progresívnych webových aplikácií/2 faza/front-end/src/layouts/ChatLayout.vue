<template>
  <q-layout view="lHh lpR fFf">
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
      :width="200"
    >
      <div>
        <div class="channelsWithOptions" style="min-width: 200px">
          <div class="channels">
            <p>Channels</p>
            <div>
              <div v-for="channel in channels" :key="channel.name">
                 <q-btn
                  :disabled='channel.state !== "accepted"'
                  @click="changeTo(channel.name.toString())"
                  v-bind:class="channel.isTopped ? 'toppedChannel' : ''"
                  color="primary"
                  class="channelButton"
                  text-color="black"
                  no-caps
                >
                  {{ channel.name }}
                  <i v-if="channel.isPrivate" class="material-icons">lock</i>
                </q-btn>
                <q-btn
                  class="btnSmaller"
                  v-if="channel.state === 'invited'"
                  @click="confirmInvite(channel.name, $store.state.auth.user.nickname)"
                  color="primary"
                ><i class="material-icons">done</i></q-btn>
                <q-btn
                  class="btnSmaller"
                  v-if="channel.state === 'invited'"
                  @click="declineInvite(channel.name, $store.state.auth.user.nickname)"
                  color="primary"
                ><i class="material-icons">close</i></q-btn>

              </div>
            </div>
             <q-btn
              class="confirmBtn"
              color="purple"
              label="ADD CHANNEL"
              @click="openDialog()"
            />
             <q-btn
              class="confirmBtn"
              color="purple"
              label="Leave CHANNEL"
              :disabled='$store.state.channels.active === null'
              @click="leaveChannel()"
            />
            <h1></h1>
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
            <q-toggle v-model="DndValue" label="Notifications" />
            <q-toggle v-model="OnlyNotificationAddressed" label="Notification addressed only" />
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">{{nickname}}</div>

            <q-btn
              color="primary"
              label="Logout"
              @click="logout"
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
            class="material-icons"> circle</span> {{nickname}}
            <i :class="[
            DndValue ? 'green-color' : 'red-color',
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
import AddChannelDialogVue from '../components/Dialogs/AddChannelDialog.vue';
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex'
import axios from 'axios';

export default defineComponent({
  created() {
      // po pridani usera sa nastavy jeho dnd do statu
      this.$store.commit('userData/UPDATE_IS_ONLINE', this.$store.state.auth.user?.isOnline, {root: true}) // dispatch action
      this.$store.commit('userData/UPDATE_IS_DND', this.$store.state.auth.user?.isDnd, {root: true})
      this.$store.commit('userData/UPDATE_NICKNAME', this.$store.state.auth.user?.nickname, {root: true})
      axios.get(`http://localhost:3333/getAllNotBannedChannels/${this.$store.state.auth.user?.nickname}`, {

      }).then(async (response) => {
        this.$store.commit('userData/SET_CHANNELS', response.data, {root: true})
      })

      axios.post('http://localhost:3333/getAllChannels', {
        userId: this.$store.state.auth.user?.id
      })
      .then( async (response) => {
        try {
          // let response = await getAllPosts();
      } catch(e) {
        // error
      }
        this.$store.dispatch('channels/allChannels', {channels: response.data})
      })
      .catch(function (error) {
      });

  },
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
      loading: false,
      message: '',
    };
  },
watch: {
     activeChannel:{
        handler(newVal, oldVal) {
          if (newVal === null) {
            this.$router.push('/')
          }
        },
     }
  },
  computed:{
    ...mapGetters('channels', {
      channels: 'joinedChannels',
      lastMessageOf: 'lastMessageOf'
    }),
    currentRouteName() {
      return this.$route.name;
    },
    activeChannel () {
      return this.$store.state.channels.active
    },
    isOnline: {
      get () {
        return this.$store.state.userData.isOnline;
      },
      set (isOnline) {
        this.$store.dispatch('userData/setOnline', { isOnline: isOnline, userId: this.$store.state.auth.user?.id})
      }
    },
    nickname: {
      get () {
        return this.$store.state.userData.nickname;
      },
      set (val) {
        this.$store.commit('userData/UPDATE_NICKNAME', val)
      }
    },
    DndValue: {
      get () {
        return this.$store.state.userData.isDnd;
      },
      set (isDnd) {
        this.$store.dispatch('userData/setDnd', { isDnd: isDnd, userId: this.$store.state.auth.user?.id})
      }
    },
    OnlyNotificationAddressed: {
      get () {
        return this.$store.state.userData.OnlyNotificationAddressed;
      },
      set (OnlyNotificationAddressed) {
        this.$store.dispatch('userData/setNotificationAddressed', OnlyNotificationAddressed)
      }
    },
    channels: {
      get () {
        this.$store.commit('userData/SORT_CHANNELS')
        return this.$store.state.userData.channels;
      },
      set (val) {
        this.$store.commit('userData/updateChannels', val)
      }
    },
  },

  // treba este nejako pridat chanel po prdani otvor socket
  methods: {
    confirmInvite(channelName:string, userName:string){
      this.$store.dispatch('userData/confirmInvite', {channelName: channelName, userName: userName})

    },
    declineInvite(channelName:string, userName:string){
      this.$store.dispatch('userData/declineInvite', {channelName: channelName, userName: userName})
    },
    async send () {
      this.loading = true
      await this.addMessage({ channel: this.activeChannel, message: this.message })
      this.message = ''
      this.loading = false
    },
    ...mapMutations('channels', {
      setActiveChannel: 'SET_ACTIVE'
    }),
    ...mapActions('auth', ['logout']),
    ...mapActions('channels', ['addMessage']),

     changeTo: async function (linkTo: string) {
      //  this.$store.commit('userData/REMOVE_IS_TYPING', {channelName:this.$store.state.channels.active, senderNickname: this.$store.state.auth.user?.nickname}, { root: true })

      this.$store.commit('channels/SET_PAGINATION', 10)
      this.$store.dispatch('channels/loadPaginatedMessage')
      this.setActiveChannel(linkTo)
      this.$store.commit('userData/UPDATE_CHANNEL_IS_TOPPED', { channelName: this.$store.state.channels.active, isTopped: false})

     axios.post(`http://localhost:3333/setNotTopped`, {
       channelName: this.$store.state.channels.active, nickname: this.$store.state.auth.user?.nickname
      })

      this.$router.push(linkTo)
    },
    getChannelName(id: string): string | undefined {
      return this.channels.find((channel:any) => channel.name.toString() === id)
        ?.name;
    },
    addChannel(channelName: string, isPrivate: boolean, userId: number) {
      this.$store.dispatch('userData/addChannel', { channelName: channelName, isPrivate: isPrivate, userId: userId})
    },
    leaveChannel(){
      this.$store.dispatch('channels/removeChannel', { channel: this.$store.state.channels.active, userId: this.$store.state.auth.user?.id})
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
          this.addChannel(data.channelName, data.isPrivate, this.$store.state.auth.user!.id);
        })
        .onCancel(() => {
        })
        .onDismiss(() => {
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
  margin-top: 5px;
  min-width: 150px;
}

.toppedChannel{
  border: 3px solid yellow;
}
.btnSmaller{
  max-width: 10px;
  max-height: 10px;
  padding: 0px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 5px;
}
</style>
