<template>
  <v-navigation-drawer 
    v-model="localMenuOpen" 
    :value="menuOpen" 
    temporary 
    right 
    @update:model-value="$emit('update:menuOpen', $event)" 
  >
    <v-list>
      <v-list-item 
        link 
        to="/producto"
      >
        <v-list-item-title>Administrar Productos</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Administrar Usuarios</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Categorías</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    menuOpen: Boolean
  },
  emits: ["update:menuOpen"],
  computed: {
    localMenuOpen: {
      get() {
        return this.menuOpen;
      },
      set(value) {
        this.$emit("update:menuOpen", value);
      }
    }
  }
};
</script>