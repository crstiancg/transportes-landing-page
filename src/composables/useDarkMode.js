import { ref, watch } from 'vue'
import { Dark } from 'quasar'

// Estado global — una sola instancia compartida
const isDark = ref(Dark.isActive)

// Sincroniza si Quasar cambia por otro medio
Dark.watch = (val) => {
  isDark.value = val
}

export function useDarkMode() {
  function toggleDarkMode() {
    Dark.toggle()
    isDark.value = Dark.isActive
  }

  return { isDark, toggleDarkMode }
}
