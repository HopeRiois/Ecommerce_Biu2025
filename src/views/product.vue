<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container>
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between">
            <span class="text-h5">Gestión de productos</span>
            <v-spacer />
            <v-text-field
              v-model="search"
              density="compact"
              variant="solo"
              label="Buscar producto"
              append-inner-icon="mdi-magnify"
              single-line 
              clearable
              hide-details
              flat
            />
            <v-btn
              color="primary"
              @click="manageProduct(null)"
            >
              Agregar producto
            </v-btn>
          </v-card-title>
          <v-data-table
            :items="filteredProducts"
            :items-per-page="10"
          >
            <template #headers>
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.value"
                >
                  {{ header.text }}
                </th>
              </tr>
            </template>

            <template #item="{ item }">
              <tr>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.category.name }}</td>
                <td>{{ item.productType }}</td>
                <td>{{ item.value }}</td>
                <td>{{ item.img }}</td>
                <td>
                  <v-container class="d-flex align-center gap-2">
                    <v-btn
                      icon
                      color="blue"
                      @click="manageProduct(item)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="red"
                      class="ml-1"
                      @click="openConfirmDialog(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-container>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-form
            ref="saveFormRef"
            @submit.prevent="saveProduct"
          >
            <v-card>
              <v-card-title class="text-center mt-1">
                {{ product?.id ? 'Editar producto' : 'Agregar producto' }}
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="product.name"
                  label="Nombre"
                  outlined
                  persistent-placeholder
                  class="mb-2"
                  :rules="[rules.required]"
                />
                <v-text-field
                  v-model="product.description"
                  label="Descripción"
                  outlined
                  persistent-placeholder
                  class="mb-2"
                  :rules="[rules.required]"
                />
                <!--<v-text-field
                  v-model="product.category.name"
                  label="Categoría"
                  outlined
                  persistent-placeholder
                  class="mb-2"
                  :rules="[rules.required]"
                />-->
                <v-select
                  v-model="categorySelected"
                  :items="categories"
                  item-title="name"
                  item-value="id"
                  label="Categoria"
                  return-object
                  outlined
                  persistent-placeholder
                  class="mb-2"
                  :rules="[rules.required]"
                  @update:model-value="onCategorySelect"
                />
                <v-text-field
                  v-model="product.productType"
                  label="Tipo de Producto"
                  outlined
                  persistent-placeholder
                  class="mb-2"
                  :rules="[rules.required]"
                />
                <v-text-field
                  v-model="product.value"
                  label="Valor"
                  type="number"
                  outlined
                  persistent-placeholder
                  class="mb-2"
                  :rules="[rules.required, rules.minNumber]"
                />
                <v-text-field
                  v-model="product.img"
                  label="Imagen"
                  outlined
                  persistent-placeholder
                  :rules="[rules.required]"
                />
                <v-btn
                  text
                  class="text-blue mb-4 mr-3"
                  @click="dialog = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  type="sumit"
                  class="bg-blue-darken-1 text-white mb-4 mr-3"
                >
                  Guardar
                </v-btn>
              </v-card-text>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog
          v-model="confirmDialog"
          max-width="600px"
        >
          <v-card>
            <v-card-title class="text-h5">
              ¿Está seguro de eliminar el producto?
            </v-card-title>
            <v-card-text>
              Una vez eliminado el producto "{{ productToDelete?.name }}" no podrá recuperarlo. 
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                class="text-blue mb-5 mr-3"
                @click="confirmDialog = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                class="bg-red-darken-1 text-white mb-5 mr-3"
                @click="deleteProduct"
              >
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { ref, computed, onMounted } from 'vue';
import { Product } from '@/models/Response/Product';
import api from '@/router/api';

export default {
    setup() {
        const dialog = ref(false);
        const confirmDialog = ref(false);
        const product = ref({});
        const productToDelete = ref({});
        const products = ref([]);
        const saveFormRef = ref(null);
        const categories = ref([]);
        const categorySelected = ref(null);

        const rules = {
          required: value => !!value || 'Este campo es obligatorio',
          minNumber: value => value > 0 || 'El valor del producto debe ser mayor que cero'
        };

        const obtenerProducts = async () => {
            try {
                const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_PRODUCT;
                const respuesta = await api.get(url);
                products.value = respuesta.data;
            } catch (error) {
                console.error('Error al obtener data:', error);
            }
        };

        const getCategories = async () => {
          try {
                const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_CATEGORY;
                const respuesta = await api.get(url);
                categories.value = respuesta.data;
            } catch (error) {
                console.error('Error al obtener data:', error);
            }
        }

        const createProduct = async (product) => {
          try {
            const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_PRODUCT + "/create-product";
            const respuesta = await api.post(url, product);
            return new Product(respuesta.data);
            // return product.value;
          } catch (error) {
            console.error('Error al obtener data:', error);
          }
        };

        const updateProduct = async (product) => {
          try {
            const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_PRODUCT + "/update-product";
            await api.put(url, product);
            // product.value = new Product(respuesta.data);
            return product.value;
          } catch (error) {
            console.error('Error al obtener data:', error);
          }
        };

        const removeProduct = async (id) => {
          try {
            const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_PRODUCT + `/${id}`;
            const respuesta = await api.delete(url);
            return respuesta;
          } catch (error) {
            console.error('Error al obtener data:', error);
          }
        };

        const search = ref("");

        const headers = [
        { text: 'Id', value: 'id' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Categoría', value: 'categoria' },
        { text: 'Tipo de Producto', value: 'tipo_producto' },
        { text: 'Valor', value: 'valor' },
        { text: 'Imagen', value: 'img' },
        { text: 'Acciones', value: 'acciones', sortable: false }
        ];

        const manageProduct = (producto) => {
            product.value = producto ? { ...producto } : { id: '', name: '', description: '', category: '', productType: '', value: '', img: '' };
            categorySelected.value = producto ? producto.category : null;
            dialog.value = true;
        };

        const saveProduct = async () => {
            const { valid } = await saveFormRef.value.validate();
            if(valid){
                if (product.value.id) {
                    const index = products.value.findIndex(p => p.id === product.value.id);
                    const producto = await updateProduct(product.value);
                    if(producto){
                        products.value.splice(index, 1, product.value);
                        window.$notify("Se ha actualizado correctamente el producto: " + producto.id, true);
                    }else{
                        window.$notify("No se ha podido actualizar el producto.", false);
                    }
                } else {
                    // product.value.id = products.value.length + 1;
                    const producto = new Product();
                    producto.name = product.value.name;
                    producto.description = product.value.description;
                    producto.category = categorySelected.value;
                    producto.productType = product.value.productType;
                    producto.value = product.value.value;
                    producto.img = product.value.img;
                    const result = await createProduct(producto);
                    if(result){
                        products.value.push(result.value);
                        window.$notify("Se ha creado correctamente el producto: " + result.id, true);
                    }else{
                        window.$notify("No se ha podido crear el producto.", false);
                    }
                }
                dialog.value = false;
            }
        };

        const openConfirmDialog = (producto) => {
            productToDelete.value = producto;
            confirmDialog.value = true;
        };

        const onCategorySelect = (category) => {
          if (category) {
            categorySelected.value = category;
          }
        };

        const deleteProduct = async () => {
            if (productToDelete.value) {
                const response = await removeProduct(productToDelete.value.id);
                if(response){
                    products.value = products.value.filter(p => p.id !== productToDelete.value.id);
                    window.$notify("Se ha eliminado correctamente el producto: " + productToDelete.value.id, true);
                }else{
                    window.$notify("No se ha podido eliminar el producto: " + productToDelete.value.id, false);
                }
                confirmDialog.value = false;
            }
        };

        const filteredProducts = computed(() => {
            if (!search.value) return products.value;
            return products.value.filter((p) =>
                p.nombre.toLowerCase().includes(search.value.toLowerCase())
            );
        });

        onMounted(() => {
            obtenerProducts();
            getCategories();
        });

        return { 
            dialog,
            confirmDialog,
            productToDelete, 
            product, 
            products, 
            headers,
            search, 
            saveFormRef,
            rules,
            obtenerProducts,
            getCategories,
            onCategorySelect,
            categories,
            categorySelected,
            manageProduct, 
            saveProduct, 
            deleteProduct, 
            filteredProducts,
            openConfirmDialog,
            NavBar 
        }
    }
};
</script>

<style>

</style>