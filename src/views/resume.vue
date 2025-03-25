<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container>
        <v-row>
          <!-- Frame izquierdo: Resumen de productos -->
          <v-col
            cols="12"
            md="8"
          >
            <v-card>
              <v-card-title>Resumen de la compra</v-card-title>
              <v-divider />
              <v-table>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(op, index) in orderProducts"
                    :key="index"
                  >
                    <td>
                      <v-img
                        :src="op.product.img"
                        width="80"
                        height="80"
                      />
                    </td>
                    <td>
                      <strong>{{ op.product.name }}</strong>
                      <p>Precio: {{ op.product.value }} USD</p>
                    </td>
                    <td>
                      <v-btn
                        icon
                        @click="reduceAmount(op)"
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <span class="mx-3">{{ op.amount }}</span>
                      <v-btn
                        icon
                        @click="increaseAmount(op)"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        color="red"
                        class="ml-2"
                        @click="deleteProduct(index)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <strong>{{ op.product.value * op.amount }} USD</strong>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
        
          <!-- Frame derecho: Total y botón de pago -->
          <v-col
            cols="12"
            md="4"
          >
            <v-card>
              <v-card-title>Resumen de pago</v-card-title>
              <v-divider />
              <v-card-text>
                <p><strong>Total:</strong> {{ totalPrice }} USD</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  block
                  @click="makeSale()"
                >
                  Pagar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog
          v-model="dialog"
          max-width="400"
          persistent
        >
          <v-card>
            <v-card-title>Resumen de compra</v-card-title>
            <v-divider />
            <v-card-text>
              <p><strong>Comprador: {{ authStore.logged.userName }}</strong></p>
              <p
                v-for="(op, index) in orderProducts"
                :key="index"
              >
                <strong>X{{ op.amount }} {{ op.product.name }}, valor: {{ op.product.value * op.amount }} USD</strong>
              </p>
              <p><strong>Total: {{ totalPrice }} USD</strong></p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="blue"
                text
                @click="redirect()"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted, computed } from 'vue';
import api from '@/router/api';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { Order } from '../models/Response/OrderResponse'
import { ManageOrderRequest, RemoveProductRequest } from '@/models/Request/OrderRequest';
import { MakeSaleRequest } from '@/models/Request/SaleRequest';

  export default {
    setup(){
        const order = ref({});
        const orderProducts = ref([]);
        const authStore = useAuthStore();
        const router = useRouter();
        const dialog = ref(false);

        const getOrder = async () => {
            try {
                const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_ORDER + "/get-enable-order?idUser=" + authStore.logged.idUser;
                const respuesta = await api.get(url);
                order.value = new Order(respuesta.data);
                orderProducts.value = order.value.orderProducts;
            } catch (error) {
                console.error('Error al obtener data:', error);
            }
        };

        const increaseAmount = async(op) => {
            try {
                const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_ORDER + "/manage-order";
                const request = new ManageOrderRequest();
                request.idUser = authStore.logged.idUser;
                request.idProduct = op.product.id;
                request.isAdding = true;
                request.amount = 1;
                console.log(request);
                await api.post(url, request);
                op.amount ++;
            } catch (error) {
                console.error('Error al obtener data:', error);
            }
        }

        const reduceAmount = async (op) => {
            try {
                if (op.amount > 1) {
                    const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_ORDER + "/manage-order";
                    const request = new ManageOrderRequest();
                    request.idUser = authStore.logged.idUser;
                    request.idProduct = op.product.id;
                    request.isAdding = false;
                    request.amount = 1;
                    console.log(request);
                    await api.post(url, request);
                    op.amount --;
                }
            } catch (error) {
                console.error('Error al obtener data:', error);
            }
        }

        const deleteProduct = async (index) => {
            try {
                const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_ORDER + "/remove-product";
                const request = new RemoveProductRequest();
                request.idOrder = order.value.id;
                request.idOrderProduct = orderProducts.value[index].id;
                console.log(request);
                await api.post(url, request);
                orderProducts.value.splice(index, 1);
            } catch (error) {
                console.error('Error al obtener data:', error);
            }
        }

        const makeSale = async () => {
            try {
                const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_SALE + "/make-sale";
                const request = new MakeSaleRequest();
                request.idOrder = order.value.id;
                request.idUser = authStore.logged.idUser;
                console.log(request);
                await api.post(url, request);
                window.$notify(`La compra con identificación: ${order.value.id} fue completada con éxito.`, true);
                dialog.value = true;
                } catch (error) {
                console.error('Error al obtener data:', error);
            }
        }

        const redirect = async () =>{
            dialog.value = false;
            router.push('/comprar');
        }
        const totalPrice = computed(() => {
            const price = ref(0);
            orderProducts.value.forEach((prod)=>{
                price.value += prod.product.value * prod.amount;
            })

            return price;
        });
        onMounted(() => {
            getOrder();
        });
        return {
            order,
            NavBar,
            dialog,
            authStore,
            totalPrice,
            orderProducts,
            increaseAmount,
            reduceAmount,
            deleteProduct,
            makeSale,
            redirect
        }
    }
  };
</script>
<style>
</style>