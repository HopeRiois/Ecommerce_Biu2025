<template>
  <v-row>
    <v-col
      v-for="(popular, i) in populars"
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
          :src="popular.img"
        />
        <v-card-item class="mt-n4">
          <v-card-title class="text-center">
            {{ popular.title }}
          </v-card-title>
        </v-card-item>
        <v-card-text>
          <div class="text-center">
            {{ popular.bio }}
          </div>
          <v-row
            align="center"
            class="mx-0 mt-2"
          >
            <v-rating
              :model-value="4.5"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            >
              <v-spacer />
              <div class="text-gray ms-4">
                {{ popular.price }}
              </div>
            </v-rating>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    populars: [
      {
        img: "image/1.png",
        title: "Appel Mac Book Pro",
        price: "$ 93.358.01",
        bio: " Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
      },
      {
        img: "image/2.png",
        title: "Appel Mac Book Pro",
        price: "$ 93.358.01",
        bio: " Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
      },
      {
        img: "image/3.png",
        title: "Appel Mac Book Pro",
        price: "$ 93.358.01",
        bio: " Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
      },
      {
        img: "image/4.png",
        title: "Appel Mac Book Pro",
        price: "$ 93.358.01",
        bio: " Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
      },
    ],
  }),
};
</script>

<style>

</style>