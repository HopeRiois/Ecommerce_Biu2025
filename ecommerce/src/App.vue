<template>
  <v-app>
    <v-main>
      <router-view />
      <Notification ref="notificationRef" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Notification from "@/components/Notification.vue";

const notificationRef = ref(null);

const notify = (message, isSuccess) => {
  notificationRef.value?.showNotification(message, isSuccess);
};

onMounted(() => {
  window.$notify = notify;
});
</script>
