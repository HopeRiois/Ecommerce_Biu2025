<template>
  <v-row style="background-color: #080A21;">
    <v-col
      cols="3"
      sm="3"
    >
      <v-card
        class="mx-auto my-12 pb-4"
        max-width="374"
        flat
        color="#080A21"
      >
        <v-card-item class="top-day">
          <v-card-title class="text-center">
            Ofertas del día
          </v-card-title>
        </v-card-item>
        <v-card-text>
          <div class="text-center">
            <h1>{{ formattedTime }}</h1>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      v-for="(client, i) in clients"
      :key="i"
      cols="3"
      sm="3"
    >
      <v-card
        class="mx-auto my-12 pb-4"
        max-width="374"
      >
        <v-img
          height="250"
          class="mx-4"
          :src="client.img"
        />
        <v-card-item class="mt-n4">
          <v-card-title class="text-center">
            {{ client.name }}
          </v-card-title>
        </v-card-item>
        <v-card-text>
          <div class="text-center">
            {{ client.description }}
          </div>
          <v-row
            align="center"
            class="mx-0 mt-2"
          >
            <v-rating
              :model-value="4.8"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            />
            <v-spacer />
            <div class="text-grey ms-4">
              $ {{ client.value }}
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import api from '@/router/api';

export default {
    setup() {
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);

    const clients = ref([]);

    const obtenerClients = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_PRODUCT + '/get-by-type?type=client';
        const respuesta = await api.get(url);
        clients.value = respuesta.data;
      } catch (error) {
        console.error('Error al obtener data:', error);
      }
    };

    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay - now;

      hours.value = Math.floor(diff / (1000 * 60 * 60));
      minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      seconds.value = Math.floor((diff % (1000 * 60)) / 1000);
    };

    const formattedTime = computed(() => {
      const formatNumber = (num) => String(num).padStart(2, '0');
      return `${formatNumber(hours.value)}:${formatNumber(minutes.value)}:${formatNumber(seconds.value)}`;
    });

    let interval;
    onMounted(() => {
      obtenerClients();
      updateCountdown();
      interval = setInterval(updateCountdown, 1000);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return { formattedTime,
      clients
     };
  }
//   data : ()=> ({
//   clients: [
//       {
//         img: "image/9.png",
//         title: "Appel Mac Book Pro",
//         price: "$ 93.358.01",
//         bio: " Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
//       },
//       {
//         img: "image/10.png",
//         title: "Appel Mac Book Pro",
//         price: "$ 93.358.01",
//         bio: " Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
//       },
//       {
//         img: "image/11.jpg",
//         title: "Appel Mac Book Pro",
//         price: "$ 93.358.01",
//         bio: " Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
//       },

//     ]
// })
};
</script>

<style>
</style>