<template>
  <q-layout view="hHh lpR fFf" class="layout-fit" :class="isDark ? 'dark-mode' : 'light-mode'">
    <!-- Header mejorado con efecto de scroll -->
    <q-header
      :class="{
        'bg-transparent text-white': !scrolled,
        'bg-primary text-white shadow-2': scrolled,
      }"
      class="header-transition"
    >
      <q-toolbar class="topbar">
        <!-- Logo y marca -->
        <q-avatar size="45px" class="q-mr-sm">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>

        <q-toolbar-title class="text-weight-bold text-h6"> Puno de mi Corazón :v </q-toolbar-title>

        <!-- Menú desktop -->
        <div class="row items-center no-wrap desktop-menu">
          <q-btn flat dense color="white" label="Inicio" to="/" class="q-mx-xs" />
          <q-btn flat dense color="white" label="Servicios" to="/services" class="q-mx-xs" />
          <q-btn flat dense color="white" label="Consultas" to="/consult" class="q-mx-xs" />
          <q-btn flat dense color="white" label="Nosotros" to="/about" class="q-mx-xs" />
          <q-btn flat dense color="white" label="Contacto" to="/contact" class="q-mx-xs" />
          <q-btn
            flat
            round
            dense
            :icon="isDark ? 'light_mode' : 'dark_mode'"
            @click="toggleDarkMode"
            class="q-ml-sm"
          />

          <q-separator vertical dark class="q-mx-sm" />

          <q-btn outline color="white" label="Iniciar Sesión" class="q-mx-xs" />

          <q-btn round flat class="q-ml-sm">
            <q-avatar size="36px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
            <q-tooltip>Mi perfil</q-tooltip>
          </q-btn>
        </div>

        <!-- Menú móvil -->
        <div class="mobile-menu">
          <q-btn flat round dense icon="menu" @click="toggleDrawer" color="white" />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Drawer para móvil -->
    <q-drawer v-model="drawerOpen" side="right" bordered behavior="mobile">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header class="text-weight-bold text-primary"> Menú Principal </q-item-label>

          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="home" color="primary" />
            </q-item-section>
            <q-item-section>Inicio</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/services">
            <q-item-section avatar>
              <q-icon name="services" color="primary" />
            </q-item-section>
            <q-item-section>Servicios</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/consult">
            <q-item-section avatar>
              <q-icon name="chat" color="primary" />
            </q-item-section>
            <q-item-section>Consultas</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/about">
            <q-item-section avatar>
              <q-icon name="info" color="primary" />
            </q-item-section>
            <q-item-section>Nosotros</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/contact">
            <q-item-section avatar>
              <q-icon name="contact_mail" color="primary" />
            </q-item-section>
            <q-item-section>Contacto</q-item-section>
          </q-item>

          <q-separator class="q-my-sm" />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="login" color="primary" />
            </q-item-section>
            <q-item-section>Iniciar Sesión</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar size="32px">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>
            <q-item-section>Mi Perfil</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Contenido principal que ocupa el espacio disponible -->
    <q-page-container class="main-content">
      <!-- Sección Portada con carrusel -->
      <section class="portada-section">
        <ImageCarousel :images="images" :height="portadaHeight" />

        <!-- Overlay con contenido -->
        <div
          class="portada-content absolute-full text-white text-center flex flex-center column"
          style="pointer-events: none"
        >
          <h1 class="text-h2 text-weight-bold q-mb-md">Bienvenido a Puno de mi Corazón</h1>
          <p class="text-h5 q-mb-lg">Descubre por estos huaycos lo que tu quieras :v</p>
          <div class="row q-gutter-md justify-center" style="pointer-events: auto">
            <q-btn
              size="lg"
              color="primary"
              label="Explorar"
              icon="explore"
              @click="explorarClick"
            />
            <q-btn
              size="lg"
              outline
              color="white"
              label="Contactar"
              icon="contact_mail"
              to="/contact"
            />
          </div>
        </div>
      </section>

      <!-- Sección de características -->
      <section class="caracteristicas-section q-pa-xl">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-weight-bold text-primary">Nuestros Servicios</h2>
          <p class="text-subtitle1 text-grey-7">Descubre todo lo que tenemos para ofrecerte</p>
        </div>

        <div class="row q-col-gutter-lg">
          <div
            v-for="(caracteristica, index) in caracteristicas"
            :key="index"
            class="col-12 col-sm-6 col-md-3"
          >
            <q-card class="caracteristica-card" flat bordered>
              <!-- Imagen superior -->
              <div class="card-image-wrapper">
                <img :src="caracteristica.image" class="card-image" />
                <!-- Ícono circular superpuesto -->
                <div class="card-icon-wrapper">
                  <q-avatar size="52px" color="primary" text-color="white">
                    <q-icon :name="caracteristica.icon" size="26px" />
                  </q-avatar>
                </div>
              </div>

              <!-- Contenido -->
              <q-card-section class="text-center q-pt-lg">
                <h3 class="text-subtitle1 text-weight-bold text-primary q-mb-xs">
                  {{ caracteristica.title }}
                </h3>
                <p class="text-grey-7 text-caption q-mb-none">{{ caracteristica.description }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>

      <!-- Sección de Llamado a la Acción -->
      <section class="llamado-accion-section bg-primary text-white text-center q-pa-xl">
        <h2 class="text-h3 text-weight-bold q-mb-md">¿Listo para comenzar?</h2>
        <p class="text-h6 q-mb-lg">
          Únete a nuestra comunidad y descubre todo lo que tenemos para ti
        </p>
        <q-btn
          size="xl"
          color="white"
          text-color="primary"
          label="Regístrate ahora"
          icon="how_to_reg"
        />
      </section>

      <!-- Router View para contenido adicional 
      <router-view />-->
    </q-page-container>

    <!-- Footer fijo al final -->
    <q-footer class="bg-grey-9 text-white footer-fijo">
      <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4">
            <div class="row items-center q-mb-md">
              <q-avatar size="40px" class="q-mr-sm">
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
              </q-avatar>
              <span class="text-h6 text-weight-bold">Puno de mi Corazón</span>
            </div>
            <p class="text-grey-5">
              Descubre la riqueza cultural y natural de Puno, la capital folklórica del Perú.
            </p>
            <div class="row q-gutter-sm">
              <q-btn round flat color="white" icon="facebook" size="md" />
              <q-btn round flat color="white" icon="twitter" size="md" />
              <q-btn round flat color="white" icon="instagram" size="md" />
              <q-btn round flat color="white" icon="youtube" size="md" />
            </div>
          </div>

          <div class="col-12 col-md-2">
            <h6 class="text-weight-bold q-mb-md">Enlaces rápidos</h6>
            <q-list dense>
              <q-item clickable v-ripple to="/" class="text-grey-5">
                <q-item-section>Inicio</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/services" class="text-grey-5">
                <q-item-section>Servicios</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/about" class="text-grey-5">
                <q-item-section>Nosotros</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/contact" class="text-grey-5">
                <q-item-section>Contacto</q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-12 col-md-3">
            <h6 class="text-weight-bold q-mb-md">Contacto</h6>
            <q-list>
              <q-item class="text-grey-5">
                <q-item-section avatar>
                  <q-icon name="location_on" />
                </q-item-section>
                <q-item-section>Jr. Lima 123, Puno, Perú</q-item-section>
              </q-item>
              <q-item class="text-grey-5">
                <q-item-section avatar>
                  <q-icon name="phone" />
                </q-item-section>
                <q-item-section>+51 987 654 321</q-item-section>
              </q-item>
              <q-item class="text-grey-5">
                <q-item-section avatar>
                  <q-icon name="email" />
                </q-item-section>
                <q-item-section>info@punodemicorazon.com</q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-12 col-md-3">
            <h6 class="text-weight-bold q-mb-md">Boletín informativo</h6>
            <p class="text-grey-5 q-mb-md">Suscríbete para recibir novedades</p>
            <q-input outlined dense bg-color="white" placeholder="Tu email" class="q-mb-sm">
              <template v-slot:append>
                <q-btn flat dense icon="send" color="primary" />
              </template>
            </q-input>
          </div>
        </div>

        <q-separator dark class="q-my-md" />

        <div class="text-center text-grey-6">
          <p>© 2024 Puno de mi Corazón. Todos los derechos reservados.</p>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import ImageCarousel from 'components/ImageCarousel.vue'

const $q = useQuasar()
const drawerOpen = ref(false)
const scrolled = ref(false)
const portadaHeight = ref('600px')

const isDark = ref($q.dark.isActive)

function toggleDarkMode() {
  $q.dark.toggle()
  isDark.value = $q.dark.isActive
}

const images = [
  'https://picsum.photos/id/1015/800/400',
  'https://picsum.photos/id/1016/800/400',
  'https://picsum.photos/id/1018/800/400',
  'https://picsum.photos/id/1015/800/400',
  'https://picsum.photos/id/1016/800/400',
  'https://picsum.photos/id/1018/800/400',
]

const caracteristicas = [
  {
    icon: 'location_on',
    title: 'Consulta de Papeletas',
    description: 'Consulta tus infracciones de tránsito registradas.',
    image: 'https://picsum.photos/id/1015/400/200',
  },
  {
    icon: 'directions_car',
    title: 'Tarjeta de Circulación',
    description: 'Verifica tu tarjeta vehicular.',
    image: 'https://picsum.photos/id/1016/400/200',
  },
  {
    icon: 'badge',
    title: 'Licencias de Conducir',
    description: 'Gestiona tu licencia de conducir.',
    image: 'https://picsum.photos/id/1018/400/200',
  },
  {
    icon: 'local_shipping',
    title: 'Autorizaciones de Transporte',
    description: 'Solicita autorizaciones para transporte.',
    image: 'https://picsum.photos/id/1019/400/200',
  },
  {
    icon: 'receipt_long',
    title: 'Pagos en Línea',
    description: 'Realiza pagos de tributos municipales.',
    image: 'https://picsum.photos/id/1020/400/200',
  },
  {
    icon: 'engineering',
    title: 'Licencias de Construcción',
    description: 'Tramita permisos de edificación.',
    image: 'https://picsum.photos/id/1021/400/200',
  },
  {
    icon: 'store',
    title: 'Licencias Comerciales',
    description: 'Obtén tu licencia de funcionamiento.',
    image: 'https://picsum.photos/id/1022/400/200',
  },
  {
    icon: 'recycling',
    title: 'Residuos Sólidos',
    description: 'Gestiona reportes de residuos en tu zona.',
    image: 'https://picsum.photos/id/1023/400/200',
  },
]

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value
}

function explorarClick() {
  // Desplazamiento suave a la sección de características
  const element = document.querySelector('.caracteristicas-section')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
// Asegurar que el layout ocupe toda la altura
.layout-fit {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-transition {
  transition: all 0.3s ease;
}

// Contenido principal que crece para ocupar espacio disponible
.main-content {
  flex: 1 0 auto;
  padding-bottom: 0 !important;
}

// Footer fijo al final
.footer-fijo {
  flex-shrink: 0;
  width: 100%;
  position: relative;
  left: 0;
  bottom: 0;
}

.portada-section {
  position: relative;
  height: v-bind(portadaHeight);
  overflow: hidden;
}

.portada-content {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  padding: 2rem;
}

.caracteristicas-section {
  background-color: #f5f5f5;
}

.caracteristica-card {
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: $shadow-4;
  }
}

.llamado-accion-section {
  background: linear-gradient(135deg, $primary 0%, darken($primary, 10%) 100%);
}

// Responsive
@media (max-width: $breakpoint-sm-max) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu {
    display: block;
  }

  .portada-content {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1.2rem;
    }
  }

  .portada-section {
    height: 400px;
  }
}

@media (min-width: $breakpoint-md-min) {
  .mobile-menu {
    display: none;
  }

  .desktop-menu {
    display: flex;
  }
}

.card-image-wrapper {
  position: relative;
  height: 160px;
  overflow: visible; // permite que el ícono sobresalga

  .card-image {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
    border-radius: 4px 4px 0 0;
  }

  .card-icon-wrapper {
    position: absolute;
    bottom: -26px; // la mitad del avatar (52px / 2)
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
}

.caracteristica-card {
  transition: all 0.3s ease;
  height: 100%;
  overflow: visible; // permite que el ícono sobresalga del card

  &:hover {
    transform: translateY(-6px);
    box-shadow: $shadow-4;
  }
}

.card-icon-wrapper {
  position: absolute;
  bottom: -26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35));
  transition:
    filter 0.3s ease,
    transform 0.3s ease;
}

.caracteristica-card {
  transition: all 0.3s ease;
  height: 100%;
  overflow: visible;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12) !important;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22) !important;

    .card-image-wrapper::after {
      background: rgba(0, 0, 0, 0.4);
    }

    .card-icon-wrapper {
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
    }
  }
}

/* MODO CLARO (default) */
.light-mode {
  background: #f5f5f5;
  color: #1d1d1d;
}

/* MODO OSCURO */
.dark-mode {
  background: #121212;
  color: #ffffff;

  .caracteristicas-section {
    background: #1e1e1e;
  }

  .caracteristica-card {
    background: #1f1f1f;
    color: #fff;
  }

  .portada-content {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8));
  }

  .footer-fijo {
    background: #0d0d0d !important;
  }

  .text-grey-5,
  .text-grey-6,
  .text-grey-7 {
    color: #bbbbbb !important;
  }
}
</style>
