<template>
  <q-carousel
    v-model="slide"
    animated
    infinite
    arrows
    navigation
    autoplay
    :autoplay="5000"
    transition-prev="slide-right"
    transition-next="slide-left"
    class="carousel"
  >
    <q-carousel-slide v-for="(img, index) in images" :key="index" :name="index" class="slide">
      <img :src="img" class="slide-image" />
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup>
import { ref } from 'vue'

const slide = ref(0)

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.carousel {
  width: 100%;
  height: 70vh;
  background: transparent;
}

.carousel :deep(.q-carousel__slide) {
  padding: 0;
  background: transparent;
}

.slide {
  padding: 0;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
