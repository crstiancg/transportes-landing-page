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
    direction="down"
    class="fixed-top-right q-mr-md q-mt-md"
  >
    <q-fab-action
      v-for="item in items"
      :key="item.title"
      :icon="item.icon"
      :label="item.title"
      color="primary"
      @click="goTo(item.link)"
    />

    <q-fab-action
      :icon="isDark ? 'light_mode' : 'dark_mode'"
      label="Tema"
      color="primary"
      @click="toggleTheme"
    />
  </q-fab>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const opened = ref(false)

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

const MAX_BUTTONS = 5

const useFab = computed(() => props.items.length > MAX_BUTTONS)

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

/* Hover */
.menu-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
