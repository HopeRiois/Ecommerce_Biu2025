<template>
  <v-app-bar flat>
    <template #prepend>
      <!--<v-app-bar-nav-icon />
      -->
      <v-btn
        icon
        @click="menuOpen = !menuOpen"
      >
        <v-icon>{{ menuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </v-btn>
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
      v-if="!authStore.isAuthenticated"
      @click.prevent="goToLogin"
    >
      Registrar / Iniciar sesión
    </v-btn>
    <v-btn
      v-else
      @click.prevent="goToLogin"
    >
      {{ authStore.user?.userName || 'Invitado' }}
    </v-btn>
  </v-app-bar>

  <MenuBar v-model:menu-open="menuOpen" />
</template>

<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import MenuBar from "@/components/Home/MenuBar.vue";

export default {
  components: { MenuBar },
  setup(){
    const router = useRouter();
    const authStore = useAuthStore();

    const goToLogin = () =>{
      router.push('/iniciar-sesion');
    };
    return {
      goToLogin,
      authStore
    };
  },
  data() {
    return {
      menuOpen: false
    };
  }
}
</script>

<style>
</style>