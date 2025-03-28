<template>
  <v-app>
    <v-main>
      <router-view />
      <Notification ref="notificationRef" />
      <ChatBot />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Notification from "@/components/Notification.vue";
import ChatBot from "@/components/ChatBot.vue";

const notificationRef = ref(null);
const notify = (message, isSuccess) => {
  notificationRef.value?.showNotification(message, isSuccess);
};

onMounted(() => {
  window.$notify = notify;
});

</script>
