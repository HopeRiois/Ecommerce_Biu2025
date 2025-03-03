<template>
  <v-snackbar
    v-model="show"
    location="top right"
    timeout="5000"
    class="notification"
    :color="type === 'success' ? 'green' : 'red'"
  >
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import {ref, defineExpose} from "vue";
const show = ref(false);
const message = ref("");
const type = ref("success");
const showNotification = (msg, isSucess) => {
    message.value = msg;
    type.value = isSucess ? "success" : "error";
    show.value = true;
}

defineExpose({ showNotification });
</script>

<style scoped>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
}
</style>