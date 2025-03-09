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
    <v-btn
      @click.prevent="goToHome"
    >
      BIU
    </v-btn>
    <v-spacer />
    <v-text-field
      v-if="showSearch"
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
import MenuBar from "@/components/MenuBar.vue";

export default {
  components: { MenuBar },
  setup(){
    const router = useRouter();
    const authStore = useAuthStore();

    const showSearch = () =>{
      console.log('pase aqui')
      if(router.path === '/inicio' || router.path === '/'){
        return true;
      }
      return false;
    }
    const goToLogin = () =>{
      router.push('/iniciar-sesion');
    };

    const goToHome = () =>{
      router.push('/inicio');
    };

    return {
      goToLogin,
      goToHome,
      showSearch,
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