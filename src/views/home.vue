<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-progress-circular
              v-if="cargando"
              indeterminate
              color="primary"
            />

            <v-carousel v-if="!cargando && items.length">
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                cover
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <div class="d-flex fill-height justify-center align-center">
                      <h2 class="text-white top">
                        {{ item.title }}
                      </h2>
                      <br>
                    </div>
                    <div class="d-flex fill-height justify-center align-center">
                      <p class="text text-wite">
                        {{ item.text }}
                      </p>
                    </div>
                    <div class="d-flex fill-height justify-center align-center">
                      <v-btn style="margin-top: -120px;">
                        Comprar
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
            <p v-else-if="!cargando">
              No hay productos disponibles
            </p>
          </v-col>
          <v-toolbar color="transparent">
            <v-toolbar-title>Productos populares</v-toolbar-title>
            <v-spacer />
            <v-btn icon="mdi mdi-chevron-left" />
            <v-btn icon="mdi mdi-chevron-right" />
          </v-toolbar>
          <v-col
            cols="12"
            sm="12"
            class="mt-n10"
          >
            <popular />
          </v-col>
          <v-toolbar
            color="transparent"
            class="mt-n10"
          >
            <v-toobar-title>
              Productos presentados
            </v-toobar-title>
            <v-spacer />
            <v-btn icon="mdi mdi-chevron-left" />
            <v-btn icon="mdi mdi-chevron-right" />
          </v-toolbar>
          <v-col
            cols="12"
            sm="12"
            class="mt-n10"
          >
            <Featured />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            class="mt-n10"
          >
            <Client />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            class="mt-n10"
          >
            <v-row>
              <v-col
                cols="3"
                sm="4"
              >
                <v-card
                  class="mx-auto my-12 pb-4"
                  max-width="374"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-card-item class="mt-10">
                        <v-card-title class="text-center">
                          Smart watch
                        </v-card-title>
                        <v-card-text>
                          <div class="text-center">
                            small paltes, salades & sandwitches
                          </div>
                          <div class="text-center mt-4">
                            <v-btn color="black">
                              Comprar
                            </v-btn>
                          </div>
                        </v-card-text>
                      </v-card-item>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-img
                        height="250"
                        class="mx4"
                        src="/image/13.jpg"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col
                cols="3"
                sm="4"
              >
                <v-card
                  class="mx-auto my-12 pb-4"
                  max-width="374"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-card-item class="mt-10">
                        <v-card-title class="text-center">
                          Smart watch
                        </v-card-title>
                        <v-card-text>
                          <div class="text-center">
                            small paltes, salades & sandwitches
                          </div>
                          <div class="text-center mt-4">
                            <v-btn color="black">
                              Comprar
                            </v-btn>
                          </div>
                        </v-card-text>
                      </v-card-item>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-img
                        height="250"
                        class="mx4"
                        src="/image/14.jpg"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col
                cols="3"
                sm="4"
              >
                <v-card
                  class="mx-auto my-12 pb-4"
                  max-width="374"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-card-item class="mt-10">
                        <v-card-title class="text-center">
                          Smart watch
                        </v-card-title>
                        <v-card-text>
                          <div class="text-center">
                            small paltes, salades & sandwitches
                          </div>
                          <div class="text-center mt-4">
                            <v-btn color="black">
                              Comprar
                            </v-btn>
                          </div>
                        </v-card-text>
                      </v-card-item>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-img
                        height="250"
                        class="mx4"
                        src="/image/15.jpg"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <Foot />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Popular from '@/components/Home/Popular.vue'
import Featured from '@/components/Home/Featured.vue'
import Client from '@/components/Home/Client.vue'
import Foot from '@/components/Home/Footer.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  
  setup() {
    const items = ref([]);
    const cargando = ref(true);

    const obtenerItems = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_ITEM;
        const respuesta = await axios.get(url);
        items.value = respuesta.data;
      } catch (error) {
        console.error('Error al obtener data:', error);
      }finally{
        cargando.value = false;
      }
    };

    onMounted(() => {
      obtenerItems();
    });
    return { items, cargando, NavBar, Popular, Featured, Client, Foot }
  },
  // data() {
  //   return {
  //     items: [
  //       {
  //         src: "7.jpg",
  //         title: "Articulo 1",
  //         text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  //       },
  //       {
  //         src: "1.jpg",
  //         title: "Articulo 2",
  //         text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  //       },
  //       {
  //         src: "2.jpg",
  //         title: "Articulo 3",
  //         text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  //       },
  //       {
  //         src: "3.jpg",
  //         title: "Articulo 4",
  //         text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  //       },
  //       {
  //         src: "4.jpg",
  //         title: "Articulo 5",
  //         text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  //       },
  //       {
  //         src: "5.jpg",
  //         title: "Articulo 6",
  //         text: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès ",
  //       },
  //     ],
  //   };
  // },
};
</script>
<style scoped>
.top {
  margin-top: 100px;
}
.text {
  margin-top: -40px;
  margin-left: 80px;
}
.top-day {
  margin-top: 120px;
}
</style>