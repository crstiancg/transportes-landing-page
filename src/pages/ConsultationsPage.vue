<template>
  <q-page :class="['consult-page', isDark ? 'dark' : 'light']">
    <div class="consult-content text-center">
      <!-- Avatar -->
      <q-avatar size="90px" class="q-mb-md">
        <img
          src="https://images.seeklogo.com/logo-png/36/1/municipalidad-de-puno-logo-png_seeklogo-367391.png"
        />
      </q-avatar>

      <!-- Título -->
      <div class="consult-title">
        Hola, Vecino y Vecina <br />
        En esta página puedes <br />
        realizar tus consultas.
      </div>

      <!-- Descripción -->
      <div class="consult-subtitle q-mt-md">
        Realiza las consultas que desees, estamos aquí para ayudarte.
        <br />
        Based in Boston, bringing ideas to life through code and creativity.
      </div>

      <!-- BOTONES DE FILTRO -->
      <div class="filters-buttons q-mt-xl q-pt-lg">
        <div class="row justify-center q-gutter-sm">
          <q-btn
            v-for="type in searchTypes"
            :key="type.value"
            :label="type.label"
            :color="searchType === type.value ? 'primary' : 'grey-8'"
            :outline="searchType !== type.value"
            @click="changeSearchType(type.value)"
            rounded
          />
        </div>
      </div>

      <!-- Buscador -->
      <div class="q-mt-xl q-pt-lg search-box">
        <q-input
          v-model="search"
          :placeholder="currentPlaceholder"
          outlined
          dense
          rounded
          :dark="isDark"
          class="search-input big-search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <!-- RESULTADOS -->
      <div class="q-mt-lg">
        <div class="row q-col-gutter-lg">
          <div v-for="item in filteredData" :key="item.papeleta" class="col-12 col-md-6 col-lg-4">
            <q-card class="custom-card">
              <q-card-section>
                <div class="card-title">Papeleta N° {{ item.papeleta }}</div>

                <div class="card-desc">
                  <strong>Conductor:</strong> {{ item.nombreCompleto }} <br />
                  <strong>DNI:</strong> {{ item.dni }} <br />
                  <strong>Placa:</strong> {{ item.placa }} <br />
                  <strong>Infracción:</strong> {{ item.codigo }} <br />
                  <strong>Fecha:</strong> {{ item.fecha }} <br />
                  <strong>Monto:</strong> S/. {{ item.monto }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <!-- Carrusel -->
      <div class="carousel-container q-mt-xl q-pt-lg">
        <q-carousel
          v-model="slide"
          animated
          infinite
          autoplay
          :autoplay-delay="3000"
          arrows
          navigation
          height="200px"
          class="custom-carousel"
        >
          <q-carousel-slide
            v-for="(img, index) in images"
            :key="index"
            :name="index"
            :img-src="img"
          />
        </q-carousel>
      </div>

      <!-- Cards -->
      <div class="cards-container q-mt-xl q-pt-lg">
        <div class="row q-col-gutter-lg">
          <div v-for="(card, index) in cards" :key="index" class="col-12 col-sm-6 col-md-4">
            <q-card class="custom-card">
              <!-- Imagen -->
              <q-img :src="card.image" height="180px" />

              <!-- Contenido -->
              <q-card-section>
                <div class="card-title">{{ card.title }}</div>
                <div class="card-author">by {{ card.author }}</div>
                <div class="card-desc">
                  {{ card.description }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Iconos -->
      <div class="q-mt-lg row justify-center q-gutter-lg social-icons">
        <q-icon name="discord" size="24px" />
        <q-icon name="close" size="24px" />
        <q-icon name="code" size="24px" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false,
  },
})

const search = ref('')

const slide = ref(0)

const images = [
  'https://picsum.photos/1200/400?random=1',
  'https://picsum.photos/1200/400?random=2',
  'https://picsum.photos/1200/400?random=3',
  'https://picsum.photos/1200/400?random=4',
]

const cards = [
  {
    title: 'Our Changing Planet',
    author: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://picsum.photos/400/300?random=10',
  },
  {
    title: 'Future of Technology',
    author: 'Jane Smith',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://picsum.photos/400/300?random=11',
  },
  {
    title: 'Nature and Life',
    author: 'Carlos Ruiz',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: 'https://picsum.photos/400/300?random=12',
  },
  {
    title: 'Urban Design',
    author: 'Maria Lopez',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://picsum.photos/400/300?random=13',
  },
  {
    title: 'Digital World',
    author: 'Alex Brown',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    image: 'https://picsum.photos/400/300?random=14',
  },
  {
    title: 'Green Energy',
    author: 'Laura Torres',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    image: 'https://picsum.photos/400/300?random=15',
  },
]

const searchType = ref('dni')

const searchTypes = [
  { label: 'DNI', value: 'dni' },
  { label: 'Nombre', value: 'nombre' },
  { label: 'Placa', value: 'placa' },
  /*{ label: 'Código', value: 'codigo' },*/
]

const changeSearchType = (type) => {
  searchType.value = type
  search.value = ''
}

const currentPlaceholder = computed(() => {
  switch (searchType.value) {
    case 'dni':
      return 'Buscar por DNI...'
    case 'nombre':
      return 'Buscar por nombre...'
    case 'placa':
      return 'Buscar por placa...'
    case 'codigo':
      return 'Buscar por código...'
  }
})

const data = ref([
  {
    papeleta: '0114791LL',
    dni: '71565321',
    nombreCompleto: 'FERNANDO DANIEL MACEDO RIVERA',
    placa: 'T1H208',
    codigo: 'G.28',
    fecha: '13/03/2026',
    monto: 440,
  },
  {
    papeleta: '0218892AA',
    dni: '45678912',
    nombreCompleto: 'MARIA LOPEZ GARCIA',
    placa: 'ABC123',
    codigo: 'M.02',
    fecha: '10/02/2026',
    monto: 220,
  },
  {
    papeleta: '0312345BB',
    dni: '12345678',
    nombreCompleto: 'JUAN PEREZ TORRES',
    placa: 'XYZ789',
    codigo: 'G.10',
    fecha: '05/01/2026',
    monto: 330,
  },
])

const filteredData = computed(() => {
  const value = search.value.toLowerCase().trim()

  if (!value) return []

  return data.value.filter((item) => {
    switch (searchType.value) {
      case 'dni':
        return item.dni.includes(value)

      case 'nombre':
        return item.nombreCompleto.toLowerCase().includes(value)

      case 'placa':
        return item.placa.toLowerCase().includes(value)

      case 'codigo':
        return item.codigo.toLowerCase().includes(value)

      default:
        return false
    }
  })
})
</script>

<style scoped>
/* BASE */
.consult-page {
  min-height: 100vh;
  padding-top: 90px;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

/* 🌙 DARK MODE */
.consult-page.dark {
  background: #0d0d0d;
  color: white;
}

/* ☀️ LIGHT MODE */
.consult-page.light {
  background: #f5f5f5;
  color: #111;
}

/* CONTENEDOR */
.consult-content {
  max-width: 700px;
  margin: 20px auto;
  padding: 0 16px;
}

/* TITULO */
.consult-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
}

@media (max-width: 600px) {
  .consult-title {
    font-size: 28px;
  }
}

/* SUBTITULO */
.consult-subtitle {
  font-size: 16px;
  line-height: 1.6;
}

.consult-page.dark .consult-subtitle {
  color: #9e9e9e;
}

.consult-page.light .consult-subtitle {
  color: #555;
}

/* BUSCADOR */
.search-box {
  max-width: 400px;
  margin: 0 auto;
}

.search-input {
  border-radius: 30px;
  backdrop-filter: blur(10px);
  transition: background 0.3s ease;
}

/* INPUT DARK */
.consult-page.dark .search-input {
  background: rgba(255, 255, 255, 0.05);
}

/* INPUT LIGHT */
.consult-page.light .search-input {
  background: rgba(0, 0, 0, 0.05);
}

/* TEXTO INPUT */
.consult-page.dark .search-input input {
  color: white;
}

.consult-page.light .search-input input {
  color: #333;
}

/* ICONO */
.search-input .q-icon {
  color: #9e9e9e;
}

/* HOVER */
.consult-page.dark .search-input:hover {
  background: rgba(255, 255, 255, 0.08);
}

.consult-page.light .search-input:hover {
  background: rgba(0, 0, 0, 0.08);
}

/* ICONOS SOCIALES */
.consult-page.dark .social-icons {
  color: #bdbdbd;
}

.consult-page.light .social-icons {
  color: #555;
}

.social-icons .q-icon:hover {
  color: inherit;
  cursor: pointer;
}

/* CAROUSEL */
.carousel-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.custom-carousel {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.custom-carousel img {
  object-fit: cover;
}

/* CARDS */
.cards-container {
  max-width: 1100px;
  margin: 0 auto;
}

.custom-card {
  border-radius: 15px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease,
    color 0.3s ease;
}

/* CARD DARK */
.consult-page.dark .custom-card {
  background: #1a1a1a;
  color: white;
}

/* CARD LIGHT */
.consult-page.light .custom-card {
  background: white;
  color: #111;
}

.custom-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* TEXTO */
.card-title {
  font-size: 18px;
  font-weight: 600;
}

/* AUTOR */
.card-author {
  font-size: 13px;
  margin-bottom: 8px;
}

.consult-page.dark .card-author {
  color: #9e9e9e;
}

.consult-page.light .card-author {
  color: #777;
}

/* DESCRIPCIÓN */
.card-desc {
  font-size: 14px;
  line-height: 1.5;
}

.consult-page.dark .card-desc {
  color: #cccccc;
}

.consult-page.light .card-desc {
  color: #555;
}

/* FILTROS */
.filters-buttons {
  max-width: 700px;
  margin: 0 auto;
}

/* SEARCH GRANDE */
.big-search {
  max-width: 500px;
  margin: 0 auto;
  transform: scale(1.05);
}
</style>
