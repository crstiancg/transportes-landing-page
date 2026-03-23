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

      <!-- Buscador con botón -->
      <div class="q-mt-xl q-pt-lg search-box">
        <div class="search-wrapper">
          <q-input
            v-model="searchTerm"
            :placeholder="currentPlaceholder"
            outlined
            dense
            rounded
            :dark="isDark"
            class="search-input"
            @keyup.enter="performSearch"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <!--<p>{{ searchTerm }}</p>
          xd-->
          <q-btn
            @click="performSearch"
            color="primary"
            rounded
            :loading="searching"
            class="search-button"
            icon="search"
            label="Buscar"
            :disable="!searchTerm.trim()"
          />
        </div>
      </div>

      <!-- RESULTADOS EN TABLA MODERNA -->
      <div class="q-mt-lg results-container" v-if="filteredData.length">
        <div class="results-header">
          <div class="results-title">
            <q-icon name="assignment" size="20px" class="q-mr-sm" />
            Resultados de la consulta
          </div>
          <div class="results-count">{{ filteredData.length }} registro(s) encontrado(s)</div>
        </div>

        <div class="modern-table-wrapper">
          <table class="modern-table">
            <!--<thead>
              <tr>
                <th>Conductor</th>
                <th>Placa</th>
                <th>Infracción</th>
                <th>Fecha</th>
                <th>Monto</th>
              </tr>
            </thead>-->
            <tbody>
              <tr v-for="(row, index) in filteredData" :key="row.papeleta">
                <td class="driver-cell">
                  <div class="driver-info">
                    <q-avatar size="40px" class="driver-avatar">
                      <img :src="getAvatarUrl(row.nombreCompleto)" />
                    </q-avatar>
                    <div class="driver-details">
                      <div class="driver-name">{{ row.nombreCompleto }}</div>
                      <div class="driver-dni">DNI: {{ row.dni }}</div>
                    </div>
                  </div>
                </td>
                <td class="placa-cell">
                  <div class="placa-modern">{{ row.placa }}</div>
                </td>
                <td class="codigo-cell">
                  <div class="infraccion-badge">{{ row.codigo }}</div>
                </td>
                <td class="fecha-cell">
                  <div class="fecha-modern">
                    <q-icon name="event" size="14px" class="q-mr-xs" />
                    {{ formatDate(row.fecha) }}
                  </div>
                </td>
                <td class="monto-cell">
                  <div class="monto-modern">
                    <span class="monto-symbol">S/</span>
                    {{ formatMonto(row.monto) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- NUEVO: Total de montos -->
        <div class="total-container">
          <div class="total-card">
            <div class="total-label">
              <q-icon name="attach_money" size="20px" />
              <span>MONTO TOTAL</span>
            </div>
            <div class="total-amount">
              <span class="total-symbol">S/</span>
              {{ formatMonto(totalMonto) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay resultados después de buscar -->
      <div class="q-mt-lg no-results" v-else-if="searchPerformed && !filteredData.length">
        <q-icon name="search_off" size="48px" class="q-mb-sm" />
        <div class="no-results-text">No se encontraron resultados</div>
        <div class="no-results-subtext">Intenta con otro término de búsqueda</div>
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
              <q-img :src="card.image" height="180px" />
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
import { papeletas } from 'src/data/papeletas'

const data = ref(papeletas)

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false,
  },
})

// Variables de búsqueda
const searchTerm = ref('') // Término temporal mientras escribe
const searchQuery = ref('') // Término que se usa para filtrar después del botón
const searching = ref(false)
const searchPerformed = ref(false) // Indica si ya se realizó al menos una búsqueda
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
]

const changeSearchType = (type) => {
  searchType.value = type
  searchTerm.value = '' // Limpia el término de búsqueda
  searchQuery.value = '' // Limpia la búsqueda activa
  searchPerformed.value = false // Reinicia el estado de búsqueda
}

const currentPlaceholder = computed(() => {
  switch (searchType.value) {
    case 'dni':
      return 'Buscar por DNI...'
    case 'nombre':
      return 'Buscar por nombre...'
    case 'placa':
      return 'Buscar por placa...'
    default:
      return 'Buscar...'
  }
})

// Función para realizar la búsqueda
const performSearch = () => {
  const trimmedTerm = searchTerm.value.trim()

  if (trimmedTerm) {
    searching.value = true
    // Simular un pequeño retraso para dar feedback visual
    setTimeout(() => {
      searchQuery.value = trimmedTerm
      searchPerformed.value = true
      searching.value = false
    }, 300)
  } else {
    // Si el término está vacío, limpiar los resultados
    searchQuery.value = ''
    searchPerformed.value = false
  }
}

// Computed para filtrar los datos basado en la búsqueda activa
const filteredData = computed(() => {
  const value = searchQuery.value.toLowerCase().trim()

  if (!value) return []

  return data.value.filter((item) => {
    switch (searchType.value) {
      case 'dni':
        return item.dni.includes(value)
      case 'nombre':
        return item.nombreCompleto.toLowerCase().includes(value)
      case 'placa':
        return item.placa.toLowerCase().includes(value)
      default:
        return false
    }
  })
})

// NUEVO: Computed para calcular el monto total
const totalMonto = computed(() => {
  return filteredData.value.reduce((total, item) => total + (item.monto || 0), 0)
})

// Funciones auxiliares
const getAvatarUrl = (nombre) => {
  const initials = nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  return `https://ui-avatars.com/api/?name=${initials}&background=0D4C73&color=fff&bold=true&size=80`
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'Fecha no disponible'

  try {
    let date

    if (dateStr.includes('/')) {
      const parts = dateStr.split('/')
      if (parts.length === 3) {
        date = new Date(parts[2], parts[1] - 1, parts[0])
      }
    } else if (dateStr.includes('-')) {
      date = new Date(dateStr)
    } else if (!isNaN(dateStr)) {
      date = new Date(parseInt(dateStr))
    } else {
      date = new Date(dateStr)
    }

    if (isNaN(date.getTime())) {
      return 'Fecha inválida'
    }

    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch (error) {
    return 'Fecha inválida'
  }
}

const formatMonto = (monto) => {
  return new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(monto)
}
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
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 24px;
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
/* SEARCH WRAPPER CON BOTÓN */
.search-box {
  max-width: 600px;
  margin: 0 auto;
}

.search-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  flex: 1;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  transition: background 0.3s ease;
}

.search-button {
  height: 40px;
  min-width: 100px;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.search-button:hover {
  transform: translateY(-2px);
}

.search-button:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 600px) {
  .search-wrapper {
    gap: 8px;
  }

  .search-button {
    min-width: 80px;
    padding: 0 12px;
  }

  .search-button .q-icon {
    margin-right: 4px;
  }
}

/* RESULTS CONTAINER */
.results-container {
  width: 100%;
  animation: fadeInUp 0.4s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 8px;
}

.results-title {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.consult-page.dark .results-title {
  color: #fff;
}

.consult-page.light .results-title {
  color: #1a1a1a;
}

.results-count {
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(13, 76, 115, 0.1);
  color: #0d4c73;
}

.consult-page.dark .results-count {
  background: rgba(255, 255, 255, 0.1);
  color: #9e9e9e;
}

/* TABLA MODERNA */
.modern-table-wrapper {
  width: 100%;
  overflow-x: visible;
  border-radius: 20px;
  background: transparent;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
}

.modern-table thead tr th {
  text-align: left;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
  background: transparent;
}

.consult-page.dark .modern-table thead tr th {
  color: #9ca3af;
}

.modern-table tbody tr {
  background: transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.modern-table tbody tr:hover {
  transform: translateX(4px);
}

.modern-table td {
  padding: 16px;
  background: transparent;
  border: none;
}

/* CARD-STYLE ROWS */
.modern-table tbody tr td:first-child {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

.modern-table tbody tr td:last-child {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.consult-page.light .modern-table tbody tr td {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.consult-page.dark .modern-table tbody tr td {
  background: #1a1a1a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* DRIVER CELL */
.driver-cell {
  min-width: 220px;
}

.driver-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.driver-avatar {
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.driver-details {
  flex: 1;
}

.driver-name {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
}

.consult-page.light .driver-name {
  color: #1f2937;
}

.consult-page.dark .driver-name {
  color: #f3f4f6;
}

.driver-dni {
  font-size: 12px;
}

.consult-page.light .driver-dni {
  color: #6b7280;
}

.consult-page.dark .driver-dni {
  color: #9ca3af;
}

/* PLACA CELL */
.placa-cell {
  min-width: 100px;
}

.placa-modern {
  font-family: monospace;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
  border: 1px solid rgba(255, 77, 79, 0.3);
}

/* INFRACCION BADGE */
.codigo-cell {
  min-width: 100px;
}

.infraccion-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.consult-page.light .infraccion-badge {
  background: linear-gradient(135deg, #0d4c73 0%, #1a6d9e 100%);
}

.consult-page.dark .infraccion-badge {
  background: linear-gradient(135deg, #2d6a8f 0%, #1e4a6e 100%);
}

/* FECHA CELL */
.fecha-cell {
  min-width: 110px;
}

.fecha-modern {
  display: flex;
  align-items: center;
  font-size: 13px;
}

.consult-page.light .fecha-modern {
  color: #4b5563;
}

.consult-page.dark .fecha-modern {
  color: #d1d5db;
}

/* MONTO CELL */
.monto-cell {
  min-width: 100px;
}

.monto-modern {
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.monto-symbol {
  font-size: 12px;
  font-weight: 500;
  margin-right: 2px;
}

.consult-page.light .monto-modern {
  color: #10b981;
}

.consult-page.dark .monto-modern {
  color: #34d399;
}

/* NO RESULTS */
.no-results {
  text-align: center;
  padding: 48px 24px;
  border-radius: 24px;
}

.consult-page.light .no-results {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.consult-page.dark .no-results {
  background: #1a1a1a;
}

.no-results-text {
  font-size: 18px;
  font-weight: 500;
  margin-top: 8px;
}

.consult-page.light .no-results-text {
  color: #374151;
}

.consult-page.dark .no-results-text {
  color: #e5e7eb;
}

.no-results-subtext {
  font-size: 14px;
  margin-top: 4px;
}

.consult-page.light .no-results-subtext {
  color: #6b7280;
}

.consult-page.dark .no-results-subtext {
  color: #9ca3af;
}

/* FILTROS */
.filters-buttons {
  max-width: 700px;
  margin: 0 auto;
}

.big-search {
  max-width: 500px;
  margin: 0 auto;
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
    box-shadow 0.3s ease;
}

.consult-page.dark .custom-card {
  background: #1a1a1a;
  color: white;
}

.consult-page.light .custom-card {
  background: white;
  color: #111;
}

.custom-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
}

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

/* ICONOS SOCIALES */
.social-icons {
  color: #bdbdbd;
}

.consult-page.light .social-icons {
  color: #555;
}

.social-icons .q-icon:hover {
  color: inherit;
  cursor: pointer;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .consult-content {
    padding: 0 16px;
  }

  .modern-table tbody tr td {
    padding: 12px;
  }

  .driver-info {
    gap: 8px;
  }

  .driver-name {
    font-size: 13px;
  }

  .placa-modern,
  .monto-modern {
    font-size: 13px;
  }

  .infraccion-badge {
    font-size: 11px;
    padding: 2px 8px;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

/* TOTAL DE MONTOS (COMPACTO) */
.total-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.total-card {
  background: linear-gradient(135deg, #0d4c73 0%, #1a6d9e 100%);
  border-radius: 12px;
  padding: 8px 14px;
  min-width: 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.total-card:hover {
  transform: translateY(-1px);
}

.total-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.9);
}

.total-label .q-icon {
  font-size: 16px;
}

.total-amount {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.total-symbol {
  font-size: 12px;
  font-weight: 500;
  margin-right: 2px;
}

/* Dark mode */
.consult-page.dark .total-card {
  background: linear-gradient(135deg, #1e4a6e 0%, #2d6a8f 100%);
}

/* Responsive */
@media (max-width: 768px) {
  .total-container {
    justify-content: center;
  }

  .total-card {
    width: auto;
  }
}
</style>
