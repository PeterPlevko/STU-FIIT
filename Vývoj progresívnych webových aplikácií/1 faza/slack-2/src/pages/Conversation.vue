<template>
  <q-infinite-scroll
    reverse
    style="
      overflow: auto;
      height: 90vh;
      padding: 0px 20px 50px 20px;
      display: flex;
      flex-direction: column;
    "
    :offset="250"
  >
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner color="primary" name="dots" size="40px" />
      </div>
    </template>

    <q-chat-message
      v-for="message in messages"
      :key="message.id"
      :name="message.userId"
      avatar="https://cdn.quasar.dev/img/avatar1.jpg"
      :text="[message.content]"
      :stamp="message.date"
      :sent="message.userId === 'me' ? true : false"
      :bg-color="message.userId === 'me' ? 'primary' : 'amber-7'"
    >
    </q-chat-message>

    <!-- <q-chat-message
      name="me"
      avatar="https://cdn.quasar.dev/img/avatar1.jpg"
      :text="['hey, how are you?']"
      stamp="7 minutes ago"
      sent
      bg-color="amber-7"
    />
    <q-chat-message
      name="Jane"
      avatar="https://cdn.quasar.dev/img/avatar5.jpg"
      :text="['doing fine, how r you?']"
      stamp="4 minutes ago"
      text-color="white"
      bg-color="primary"
    /> -->
  </q-infinite-scroll>

  <q-page-sticky position="bottom" expand>
    <command-line class="commandLine">
      <q-input
        rounded
        standout
        v-model="text"
        label="Rounded standout"
        style="width: 96%"
      />
      <i class="material-icons icon-display">send</i>
    </command-line>
  </q-page-sticky>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {};
  },
  setup() {
    let messages: Messages[] = [
      {
        id: 1,
        userId: 'me',
        channelId: 1,
        content: 'hey, how are you?',
        date: '7 minutes ago',
      },
      {
        id: 2,
        userId: 'Peter Plevko',
        channelId: 1,
        content: 'I am good thanks?',
        date: '6 minutes ago',
      },
      {
        id: 3,
        userId: 'me',
        channelId: 1,
        content: 'Good to hear',
        date: '5 minutes ago',
      },
      {
        id: 4,
        userId: 'Peter Plevko',
        channelId: 1,
        content: 'Good to hear',
        date: '5 minutes ago',
      },
      {
        id: 5,
        userId: 'me',
        channelId: 1,
        content: 'Good to hear',
        date: '5 minutes ago',
      },
      {
        id: 6,
        userId: 'Peter Plevko',
        channelId: 1,
        content: 'Good to hear',
        date: '5 minutes ago',
      },
      {
        id: 7,
        userId: 'me',
        channelId: 1,
        content: 'Good to hear',
        date: '5 minutes ago',
      },
      {
        id: 8,
        userId: 'Peter Plevko',
        channelId: 1,
        content: 'Good to hear',
        date: '5 minutes ago',
      },
      {
        id: 9,
        userId: 'me',
        channelId: 1,
        content: 'Good to hear',
        date: '5 minutes ago',
      },
      {
        id: 10,
        userId: 'Peter Plevko',
        channelId: 1,
        content: 'Good to hear',
        date: '5 minutes ago',
      }
    ];
    return {
      text: '',
      messages,
    };
  },
});
interface Messages {
  id: number;
  userId: string;
  channelId: number;
  content: string;
  date: string;
}
</script>

<style scoped>
.channelsWithOptions {
  padding: 10px;
  background: black;
  color: white;
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
  background: black;
  color: white;
  /* width: calc(100% - 200px);
  position: fixed;
  bottom: 0; */
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
</style>
