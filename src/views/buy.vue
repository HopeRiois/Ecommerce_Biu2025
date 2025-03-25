<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="product in products"
            :key="product.product.id"
            cols="12"
            md="3"
          >
            <v-card>
              <v-img
                :src="product.product.img"
                height="200px"
                cover
              />
              <v-card-title>{{ product.product.name }}</v-card-title>
              <v-card-subtitle>
                {{ product.product.description }}
              </v-card-subtitle>
              <v-card-text>
                <p>Precio: {{ product.product.value }} USD</p>
                <v-row
                  align="center"
                  justify="space-between"
                >
                  <v-col
                    cols="6"
                    class="d-flex align-center"
                  >
                    <v-btn
                      icon
                      @click="decreaseQuantity(product)"
                    >
                      -
                    </v-btn>
                    <span class="mx-3">{{ product.quantity }}</span>
                    <v-btn
                      icon
                      @click="increaseQuantity(product)"
                    >
                      +
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="6"
                    class="d-flex justify-end"
                  >
                    <v-btn
                      color="primary"
                      @click="manageOrder(product)"
                    >
                      Agregar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted } from 'vue';
import api from '@/router/api';
import { ManageOrderRequest } from '@/models/Request/OrderRequest';
import { useAuthStore } from '../store/auth';


  export default {
    setup(){
        const products = ref([]);
        const dialog= false;
        const selectedProduct = ref({});
        const authStore = useAuthStore();

        const obtenerProducts = async () => {
            try {
                const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_PRODUCT + "/get-for-buying";
                const respuesta = await api.get(url);
                products.value = respuesta.data;
            } catch (error) {
                console.error('Error al obtener data:', error);
            }
        };

        const manageOrder = async (product) => {
            try {
                selectedProduct.value = { ...product };
                const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_ORDER + "/manage-order";
                const request = new ManageOrderRequest();
                request.idUser =authStore.logged.idUser;
                request.idProduct = selectedProduct.value.product.id;
                request.amount = selectedProduct.value.quantity;
                await api.post(url, request);
                window.$notify("X" + selectedProduct.value.quantity + " " + selectedProduct.value.product.name + " Agregado al carrito.", true);
                product.quantity = 1;
                // products.value = respuesta.data;
            } catch (error) {
                console.error('Error al obtener data:', error);
            }
        }

        onMounted(() => {
            obtenerProducts();
        });

      return {
        products,
        dialog,
        NavBar,
        manageOrder,
        selectedProduct
      };
    },
    methods: {
      increaseQuantity(product) {
        product.quantity++;
      },
      decreaseQuantity(product) {
        if (product.quantity > 1) {
          product.quantity--;
        }
      },
    //   addToCart(product) {
    //     this.selectedProduct.value = { ...product };
    //     window.$notify("X" + this.selectedProduct.value.quantity + " " + this.selectedProduct.value.product.name + " Agregado al carrito.", true);

    //   },
     
    },
  };
  </script>

<style>
</style>