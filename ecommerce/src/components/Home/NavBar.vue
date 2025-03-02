<template>
  <v-app-bar flat>
    <template #prepend>
      <v-app-bar-nav-icon />
    </template>
    <v-app-bar-title>BIU</v-app-bar-title>
    <v-spacer />
    <v-text-field
      densify="compact"
      variant="solo"
      label="Buscar producto"
      append-inner-icon="mdi-magnify"
      single-line 
      hide-details
      flat
    />
    <v-spacer />
    <v-btn prepend-icon="mdi mdi-download-circle-outline">
      <template #preprend>
        <v-icon color="sucess" />
      </template>
      Descargar app
    </v-btn>
    <v-btn
      v-if="!isAuthenticated"
      @click.prevent="goToLogin"
    >
      Registrar / Iniciar sesión
    </v-btn>
    <v-btn
      v-else
      @click.prevent="goToLogin"
    >
      {{ user }}
    </v-btn>
  </v-app-bar>
</template>

<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

export default {
  setup(){
    const router = useRouter();
    const authStore = useAuthStore();

    const goToLogin = () =>{
      router.push('/iniciar-sesion');
    };
    return {
      goToLogin,
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user.username
    };
}
}
</script>

<style>
</style>