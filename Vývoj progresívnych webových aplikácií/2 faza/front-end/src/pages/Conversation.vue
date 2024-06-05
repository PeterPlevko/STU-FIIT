
<template>
  <q-infinite-scroll
    reverse
    style="padding: 3em 20px 4.5em 20px; display: flex; flex-direction: column; height: 90vh; overflow: auto;"
  >

  <q-scroll-area ref="area" style="width: 100%; height: calc(100vh - 150px)">
    <div>
     <div class="displayFlex">
        <button @click="incrementPaginate" class="buttonLoadMoreMessages">Load more messages</button>
      </div>

      <q-chat-message v-for="message in messages"
        :key="message.id"
        :name="message.author.email"
        :text="[message.content]"
        :stamp="message.createdAt"
        :sent="isMine(message)"
        :bg-color="isHighlighted(message) ? 'red' : isMine(message) ? 'primary' : 'amber-7'"
      >

      </q-chat-message>
        <div v-if="Object.keys(isTypingData).length !== 0 && isTypingData.message !== '' && isOnline">

          <div v-for="[key] of Object.entries(isTypingData)" :key="key" class="marginNone" >
              <q-chat-message
              bg-color="amber-7"
            >
              <button class="RTButton" @click="showRTMessage(key)" >{{key}}</button>
              <q-spinner-dots class="marginNone" size="2rem" />

            </q-chat-message>

          </div>
            <q-dialog v-model="icon">
              <q-card>
                <q-card-section class="row items-center q-pb-none">
                  <div class="text-h6">Message</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                  {{isTypingData[`${currentUsersMessageNickname}`]}}

                </q-card-section>
              </q-card>
            </q-dialog>
        </div>
          </div>
    </q-scroll-area>

  </q-infinite-scroll>

  <q-page-sticky position="bottom" expand>
    <command-line class="commandLine">
      <q-input
        v-model="message"
        rounded
        outlined
        label="Send message"
        style="width: 96%"
      />

      <q-btn :disable="loading || !isOnline" @click="send" round flat icon="send" />
    </command-line>

  </q-page-sticky>

  <!-- dialog for showing users list -->
  <div v-if="allUsersInChannel.length !== 0">
    <q-dialog v-model="usersAlert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            <h2>Vsetci pouzivatelia</h2>
            <div class="displayFlex" v-for="(item, i) in allUsersInChannel"
              :key="item.id">
              <p>{{i+1}}. Nickname: {{ item.nickname }}</p>
                <p style="margin: 0px">
                <span
                :class="[
                item.isOnline ? 'green-color' : 'red-color',
                ]"
                class="material-icons"> circle</span>
                <i :class="[
                item.isDnd ? 'green-color' : 'red-color',
                ]" class="material-icons">notifications</i>
          </p>
            </div>
          </div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat @click="changeUsersAlertToFalse()" label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>


</template>

<script lang="ts">
import { Notify, QScrollArea, useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { SerializedMessage } from '../contracts'
import { Channel } from '../store/module-userData/state';
export default defineComponent({
  watch: {
 activeChannel: {
      handler: function (newVal, oldVal) {
       if(!this.$store.state.userData.isOnline){
         this.allMessagesWhenLastOnline = {...this.$store.getters['channels/currentMessages']}
       }
      },
    },
    isTypingData: {
      handler: function (newVal, oldVal) {
      },
      deep: true
    },
    messages: {
      handler () {
        if(this.$store.getters['channels/currentMessages']){
          if(this.$store.getters['channels/currentMessages'].length === 10){
            this.scrollMessages()
          }
          this.$store.getters['channels/currentMessages']
          if(this.messageCount + 1 === this.$store.getters['channels/currentMessages'].length){
            this.$nextTick(() => this.scrollMessages())
          }

          this.messageCount = this.$store.getters['channels/currentMessages'].length
        }

      },
      deep: true
    },
    message: {
      handler () {
        this.$store.dispatch('channels/realTimeMessage', this.message)
      },
      deep: true
    },
    notifiCationMessage: {
      handler () {
        // check if user has dnd on
        if(this.$store.state.userData.isOnline){
          if(this.$store.state.userData.isDnd){
          // check if app is minimized
          if(!this.$q.appVisible){
            // check if user has only notification addressed on
                Notify.create({
                  position: 'top',
                  message: `${this.notifiCationMessage.userNickname}: ${this.notifiCationMessage.message}`,
                })
          }
        }
        else{
          if(this.$store.state.userData.OnlyNotificationAddressed){
              // check if the message contains addressed substring
              if(this.notifiCationMessage.message.includes('@' + this.$store.state.auth.user?.nickname)){
               Notify.create({
                  position: 'top',
                  message: `${this.notifiCationMessage.userNickname}: ${this.notifiCationMessage.message}`,
                })
              }
            }
          }
        }
      },
      deep: true
    },
  },
  data() {
    return {
      messageCount: 0,
      pagination: 10,
      loading: false,
      message: '',
      allMessagesWhenLastOnline: [],
    };
  },
  methods: {
    showRTMessage(name:string){
      this.icon = true
      this.currentUsersMessageNickname = name
    },
    incrementPaginate() {
      this.$store.commit('channels/SET_PAGINATION', this.$store.state.channels.pagination + 10)
      this.$store.dispatch('channels/loadPaginatedMessage')
    },
    loadMessages(){
    },
    changeUsersAlertToFalse(){
      this.$store.commit('channels/SET_USERS_ALERT_ACTIVE', false)
    },
    scrollMessages () {
      const area = this.$refs.area as QScrollArea
      area && area.setScrollPercentage('vertical', 100)
    },
    isMine (message: SerializedMessage): boolean {
      return message.author.id === this.currentUser
    },

    isHighlighted (message: SerializedMessage): boolean {
      if(message.author.nickname !== this.$store.state.auth.user!.nickname){
        return message.content.includes('@' + this.$store.state.auth.user!.nickname)
      }
      else return false

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
  },
   created() {
    return this.$store.getters['channels/currentMessages']
  },

  computed:{
    isOnline(){
      return this.$store.state.userData.isOnline
    },
    activeChannel () {
      return this.$store.state.channels.active
    },
    isTypingData(){
      if(this.$store.state.userData.isTyping[this.$store.state.channels.active!]){
        return this.$store.state.userData.isTyping[this.$store.state.channels.active!]
      }
      else return []
    },
    currentRouteName() {
        return this.$route.name;
    },
    allUsersInChannel () {
      return this.$store.state.channels.allUsersInChannel
    },
    usersAlert () :boolean{
      return this.$store.state.channels.usersAlert
    },

     messages (): SerializedMessage[] {
       if(this.$store.state.userData.isOnline){
          this.allMessagesWhenLastOnline = {...this.$store.getters['channels/currentMessages']}
          return this.$store.getters['channels/currentMessages']
       }
       else{
         return this.allMessagesWhenLastOnline
       }
    },
    currentUser () {
      return this.$store.state.auth.user?.id
    },
    currentUserNickname (){
      return this.$store.state.auth.user?.nickname
    },

    notifiCationMessage(){
      return this.$store.state.channels.notificationMessage
    }
  },
  setup() {
    const $q = useQuasar()
    let pagination = 10
    return {
      currentUsersMessageNickname: ref(''),
      icon: ref(false),
      loadMessages (index:any, done:any) {
        setTimeout(() => {
          done()
        }, 2000)
      }
    }
},
});
</script>

<style>
.channelsWithOptions {
  padding: 10px;
  background: black;
  color: white;
}
.displayFlex{
  display: flex;
}
.displayFlex p{
  font-size: 30px;
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
}
.userPanel p {
  font-size: 20px;
}
.green-color {
  color: green;
}
.leftSidePanel {
  background: white;
  float: left;
  min-width: 200px;
}
.underline {
  border-bottom: 2px solid black;
}
.commandLine {
  background: white;
  width: 100%;
  display: flex;
}
.active {
  background: black;
  color: white;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
}
.commandLine .q-input {
  width: 350px;
  color: white;
}
.icon-display {
  font-size: 27px;
  width: 4%;
}
.sendMessage {
  background-color: 'amber-7';
}
.receivedMessage {
  background-color: 'primary';
  color: 'white';
}
.green-color {
  color: #08fc31;
}

.red-color{
  color: red;
}

.buttonLoadMoreMessages{
  width: 20%;
  background-color: #1976d2;
  color: white;
}

.buttonLoadMoreMessages:hover{
  background-color: #1976d2af;;
}

.displayFlex{
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.marginNone .q-message-text{
  margin: 0px;
}


.marginNone .q-message-text--received{
  border-radius: 0px;
}

.marginNone .q-message-text{
  padding-top: 0px;
  padding-bottom: 0px;
}

.marginNone button{
  background-color: #ffb3007c;
  padding: 0;
  border: none;
  background: none;
}

.RTButton:hover{
  color: white;
}


.marginNone .q-message-text:last-child{
  min-height: 0px;
}

@media only screen and (max-width: 1400px) {
  .buttonLoadMoreMessages{
    width: 20%;
  }
}

@media only screen and (max-width: 1200px) {
  .buttonLoadMoreMessages{
    width: 30%;
  }
}

@media only screen and (max-width: 992px) {
  .buttonLoadMoreMessages{
    width: 30%;
  }
}

@media only screen and (max-width: 768px) {
  .buttonLoadMoreMessages{
    width: 30%;
  }
}

@media only screen and (max-width: 576px) {
  .buttonLoadMoreMessages{
    width: 50%;
  }
}

</style>
