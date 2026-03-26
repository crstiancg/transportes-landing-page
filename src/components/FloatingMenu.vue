<template>
  <!-- NAVBAR NORMAL -->
  <div v-if="!useFab" class="floating-navbar">
    <q-btn
      v-for="item in items"
      :key="item.title"
      flat
      dense
      no-caps
      :icon="item.icon"
      :label="item.title"
      class="menu-btn"
      @click="goTo(item.link)"
    />

    <!-- BOTÓN DARK MODE -->
    <q-btn
      flat
      dense
      round
      class="menu-btn"
      :icon="isDark ? 'light_mode' : 'dark_mode'"
      @click="toggleTheme"
    />
  </div>

  <!-- MENU DESPLEGABLE (FAB) -->
  <q-fab
    v-else
    v-model="opened"
    color="primary"
    icon="menu"
    close-icon="close"
    direction="down"
    class="floating-fab"
  >
    <q-fab-action
      v-for="item in items"
      :key="item.title"
      :icon="item.icon"
      :label="item.title"
      color="primary"
      label-position="left"
      @click="goTo(item.link)"
    />

    <q-fab-action
      :icon="isDark ? 'light_mode' : 'dark_mode'"
      label="Tema"
      color="primary"
      label-position="left"
      @click="toggleTheme"
    />
  </q-fab>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const opened = ref(false)

// Umbral móvil
const MOBILE_BREAKPOINT = 768

const windowWidth = ref(window.innerWidth)

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  isDark: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-theme'])

// Cambia a FAB cuando es móvil
const useFab = computed(() => windowWidth.value < MOBILE_BREAKPOINT)

function onResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

function goTo(link) {
  router.push(link)
  opened.value = false
}

function toggleTheme() {
  emit('toggle-theme')
  opened.value = false
}
</script>

<style scoped>
/* ── NAVBAR ESCRITORIO ── */
.floating-navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  gap: 10px;
  align-items: center;

  padding: 8px 16px;
  border-radius: 40px;

  background: rgba(25, 118, 210, 0.9);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);

  z-index: 9999;
}

.menu-btn {
  color: white;
  font-weight: 500;
  border-radius: 20px;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* ── FAB MÓVIL: esquina superior derecha ── */
.floating-fab {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 9999;
}
</style>
