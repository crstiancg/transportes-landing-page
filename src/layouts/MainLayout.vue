<template>
  <q-layout view="hHh lpR fFf" :class="['puno-layout', isDark ? 'dark-mode' : 'light-mode']">
    <q-header
      :class="['puno-header', scrolled ? 'header-scrolled' : 'header-top']"
      class="header-transition"
      elevated
    >
      <q-toolbar class="topbar q-px-lg" style="height: 72px">
        <div
          class="logo-wrapper row items-center q-gutter-sm"
          @click="scrollToTop"
          style="cursor: pointer"
        >
          <div class="logo-circle">
            <q-icon name="water" color="white" size="22px" />
          </div>
          <div class="column" style="line-height: 1">
            <span class="logo-title">PUNO</span>
            <span class="logo-sub">de mi Corazón</span>
          </div>
        </div>

        <q-space />

        <nav class="desktop-nav row items-center q-gutter-xs">
          <q-btn
            v-for="item in navItems"
            :key="item.label"
            flat
            no-caps
            :label="item.label"
            :to="item.to"
            class="nav-btn text-weight-medium"
          />
          <q-btn
            flat
            round
            dense
            :icon="isDark ? 'light_mode' : 'dark_mode'"
            @click="toggleDarkMode"
            class="q-ml-sm"
          />
          <q-btn
            unelevated
            no-caps
            label="Iniciar Sesión"
            class="login-btn q-ml-md"
            color="primary"
          />
          <q-btn round flat class="q-ml-xs">
            <q-avatar size="36px" class="avatar-ring">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
          </q-btn>
        </nav>

        <div class="mobile-menu-btn">
          <q-btn
            flat
            round
            dense
            :icon="drawerOpen ? 'close' : 'menu'"
            @click="toggleDrawer"
            color="white"
            size="md"
          />
        </div>
      </q-toolbar>

      <div class="scroll-progress">
        <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }" />
      </div>
    </q-header>

    <q-drawer v-model="drawerOpen" side="right" bordered behavior="mobile" :width="280">
      <div class="drawer-header column flex-center q-pa-lg">
        <div class="logo-circle logo-circle--lg q-mb-sm">
          <q-icon name="water" color="white" size="32px" />
        </div>
        <span class="text-h6 text-weight-bold text-primary">Puno de mi Corazón</span>
      </div>

      <q-separator />

      <q-list padding class="q-mt-sm">
        <q-item
          v-for="item in navItems"
          :key="item.label"
          clickable
          v-ripple
          :to="item.to"
          class="drawer-item rounded-borders q-mb-xs q-mx-sm"
          @click="drawerOpen = false"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" color="primary" />
          </q-item-section>
          <q-item-section class="text-weight-medium">{{ item.label }}</q-item-section>
        </q-item>

        <q-separator class="q-my-md q-mx-sm" />

        <div class="q-px-sm">
          <q-btn
            unelevated
            no-caps
            color="primary"
            label="Iniciar Sesión"
            icon="login"
            class="full-width"
            style="border-radius: 12px"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <section class="hero-section" ref="heroRef">
        <ImageCarousel :images="images" :height="heroHeight" />

        <div class="hero-overlay absolute-full" />

        <div class="hero-content absolute-full column flex-center text-white text-center">
          <div class="hero-badge" :class="{ 'animate-in': heroVisible }">
            <q-icon name="place" size="14px" class="q-mr-xs" />
            Capital Folklórica del Perú
          </div>

          <h1
            class="hero-title q-mb-sm"
            :class="{ 'animate-in': heroVisible }"
            style="animation-delay: 0.15s"
          >
            Puno de mi<br /><em>Corazón</em>
          </h1>

          <p
            class="hero-subtitle q-mb-xl"
            :class="{ 'animate-in': heroVisible }"
            style="animation-delay: 0.3s"
          >
            Gestiona tus trámites municipales, descubre eventos y<br class="gt-sm" />
            conecta con la esencia del altiplano peruano.
          </p>

          <div
            class="row q-gutter-md justify-center hero-cta-group"
            :class="{ 'animate-in': heroVisible }"
            style="animation-delay: 0.45s"
          >
            <q-btn
              unelevated
              no-caps
              size="lg"
              color="primary"
              label="Explorar servicios"
              icon-right="arrow_forward"
              @click="explorarClick"
              class="hero-cta-primary"
            />
            <q-btn
              outline
              no-caps
              size="lg"
              color="white"
              label="Contactar"
              icon="mail"
              to="/contact"
              class="hero-cta-secondary"
            />
          </div>
        </div>

        <div
          class="hero-stats absolute-bottom row justify-center q-pb-xl q-gutter-md"
          style="pointer-events: none"
        >
          <div
            v-for="stat in heroStats"
            :key="stat.label"
            class="hero-stat-card"
            :class="{ 'animate-in': heroVisible }"
            :style="{ animationDelay: stat.delay }"
          >
            <span class="stat-number">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>

        <div class="scroll-indicator" @click="explorarClick">
          <div class="scroll-mouse">
            <div class="scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </section>

      <section class="servicios-section q-py-xl" ref="serviciosRef">
        <div class="section-container">
          <div
            class="section-header text-center q-mb-xl"
            :class="{ 'section-visible': serviciosVisible }"
          >
            <div class="section-tag">Gestión municipal</div>
            <h2 class="section-title">Nuestros Servicios</h2>
            <p class="section-desc">
              Todo lo que necesitas para gestionar tus trámites desde un solo lugar
            </p>
          </div>

          <div class="servicios-grid">
            <div
              v-for="(servicio, i) in servicios"
              :key="i"
              class="servicio-card"
              :class="{ 'servicio-visible': serviciosVisible }"
              :style="{ transitionDelay: i * 0.07 + 's' }"
              @mouseenter="hoveredCard = i"
              @mouseleave="hoveredCard = null"
            >
              <div class="servicio-img-wrap">
                <img :src="servicio.image" :alt="servicio.title" class="servicio-img" />
                <div class="servicio-img-overlay" :class="{ active: hoveredCard === i }" />
              </div>

              <div class="servicio-icon-wrap">
                <q-avatar
                  size="52px"
                  :color="servicio.color"
                  text-color="white"
                  class="servicio-icon"
                >
                  <q-icon :name="servicio.icon" size="24px" />
                </q-avatar>
              </div>

              <div class="servicio-body q-pa-md q-pt-xl text-center">
                <h3 class="servicio-title">{{ servicio.title }}</h3>
                <p class="servicio-desc">{{ servicio.description }}</p>
                <q-btn
                  flat
                  no-caps
                  dense
                  :color="servicio.color"
                  label="Ver más"
                  icon-right="arrow_forward"
                  class="servicio-link"
                  :to="servicio.to || undefined"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="proceso-section q-py-xl" ref="procesoRef">
        <div class="section-container">
          <div
            class="section-header text-center q-mb-xl"
            :class="{ 'section-visible': procesoVisible }"
          >
            <div class="section-tag">Simple y rápido</div>
            <h2 class="section-title">¿Cómo funciona?</h2>
          </div>

          <div class="proceso-steps row q-col-gutter-lg">
            <div
              v-for="(paso, i) in pasos"
              :key="i"
              class="col-12 col-sm-6 col-md-3"
              :class="{ 'step-visible': procesoVisible }"
              :style="{ transitionDelay: i * 0.12 + 's' }"
            >
              <div class="paso-card text-center">
                <div class="paso-number">{{ String(i + 1).padStart(2, '0') }}</div>
                <div class="paso-icon-wrap q-my-md">
                  <q-avatar size="64px" :color="paso.color" text-color="white">
                    <q-icon :name="paso.icon" size="28px" />
                  </q-avatar>
                </div>
                <h4 class="paso-title">{{ paso.title }}</h4>
                <p class="paso-desc">{{ paso.desc }}</p>
              </div>

              <div v-if="i < pasos.length - 1" class="paso-connector gt-sm">
                <q-icon name="arrow_forward" size="20px" color="grey-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section q-py-xl" ref="ctaRef">
        <div class="cta-inner" :class="{ 'section-visible': ctaVisible }">
          <div class="cta-decoration">
            <div class="cta-orb cta-orb--1" />
            <div class="cta-orb cta-orb--2" />
          </div>
          <div class="cta-content text-center text-white">
            <div class="section-tag section-tag--light q-mb-lg">Únete ahora</div>
            <h2 class="cta-title">¿Listo para empezar?</h2>
            <p class="cta-desc q-mb-xl">
              Crea tu cuenta y accede a todos los servicios municipales<br class="gt-sm" />
              de Puno desde cualquier dispositivo.
            </p>
            <div class="row justify-center q-gutter-md">
              <q-btn
                unelevated
                no-caps
                size="lg"
                color="white"
                text-color="primary"
                label="Registrarme gratis"
                icon="how_to_reg"
                class="cta-btn-primary"
              />
              <q-btn
                outline
                no-caps
                size="lg"
                color="white"
                label="Conocer más"
                icon-right="arrow_forward"
              />
            </div>
          </div>
        </div>
      </section>
    </q-page-container>

    <q-footer class="puno-footer" bordered>
      <div class="footer-inner q-pa-xl">
        <div class="row q-col-gutter-xl">
          <!-- Brand -->
          <div class="col-12 col-md-4">
            <div class="row items-center q-gutter-sm q-mb-md">
              <div class="logo-circle">
                <q-icon name="water" color="white" size="20px" />
              </div>
              <span class="footer-brand">Puno de mi Corazón</span>
            </div>
            <p class="footer-text q-mb-lg">
              Descubre la riqueza cultural y natural de Puno, la capital folklórica del Perú a
              orillas del Titicaca.
            </p>
            <div class="row q-gutter-xs">
              <q-btn
                v-for="soc in socials"
                :key="soc"
                round
                flat
                :icon="soc"
                size="sm"
                class="footer-social"
              />
            </div>
          </div>

          <div class="col-6 col-md-2">
            <h6 class="footer-heading">Navegación</h6>
            <div class="column q-gutter-xs">
              <a v-for="item in navItems" :key="item.label" class="footer-link">{{ item.label }}</a>
            </div>
          </div>

          <div class="col-6 col-md-3">
            <h6 class="footer-heading">Contacto</h6>
            <div class="column q-gutter-sm">
              <div v-for="c in contactInfo" :key="c.text" class="row items-center q-gutter-xs">
                <q-icon :name="c.icon" size="16px" class="footer-icon" />
                <span class="footer-text text-caption">{{ c.text }}</span>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <h6 class="footer-heading">Boletín</h6>
            <p class="footer-text text-caption q-mb-md">
              Recibe novedades sobre trámites y eventos de Puno.
            </p>
            <div class="newsletter-wrap row no-wrap">
              <q-input
                v-model="newsletterEmail"
                outlined
                dense
                placeholder="tu@email.com"
                class="newsletter-input col"
                dark
              />
              <q-btn unelevated dense icon="send" color="primary" class="newsletter-btn" />
            </div>
          </div>
        </div>

        <q-separator color="grey-8" class="q-my-lg" />

        <div class="row items-center justify-between">
          <p class="footer-text text-caption q-mb-none">
            © 2025 Puno de mi Corazón · Todos los derechos reservados
          </p>
          <div class="row q-gutter-md">
            <a class="footer-link text-caption">Privacidad</a>
            <a class="footer-link text-caption">Términos</a>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import ImageCarousel from 'components/ImageCarousel.vue'

const $q = useQuasar()

const drawerOpen = ref(false)
const scrolled = ref(false)
const scrollPercent = ref(0)
const isDark = ref($q.dark.isActive)
const hoveredCard = ref(null)
const newsletterEmail = ref('')
const heroVisible = ref(false)
const serviciosVisible = ref(false)
const procesoVisible = ref(false)
const ctaVisible = ref(false)

const heroRef = ref(null)
const serviciosRef = ref(null)
const procesoRef = ref(null)
const ctaRef = ref(null)

const scrollProgress = computed(() => Math.min(scrollPercent.value, 100))
const heroHeight = computed(() => ($q.screen.lt.sm ? '480px' : '100vh'))

/*const navItems = [
  { label: 'Inicio', to: '/', icon: 'home' },
  { label: 'Servicios', to: '/services', icon: 'apps' },
  { label: 'Consultas', to: '/consult', icon: 'chat' },
  { label: 'Nosotros', to: '/about', icon: 'info' },
  { label: 'Contacto', to: '/contact', icon: 'contact_mail' },
]*/

const heroStats = [
  { value: '120+', label: 'Servicios', delay: '0.6s' },
  { value: '50k+', label: 'Usuarios', delay: '0.75s' },
  { value: '98%', label: 'Satisfacción', delay: '0.9s' },
]

const images = [
  'https://www.caminosalkantay.com/blog/wp-content/uploads/2024/09/Puno-sus-misterios-y-las-islas-del-Titicaca-960x640.jpg',
  'https://www.realcuscotour.com/wp-content/uploads/2025/07/puno.jpg',
  'https://www.viajaraperu.com/wp-content/uploads/2011/12/mirador-Kuntur-Wasi-puno-760x500.jpg',
  'https://depaseoperu.com/wp-content/uploads/2023/06/Puno-Peru.jpg',
  'https://portal.andina.pe/EDPfotografia3/Thumbnail/2025/11/08/001223417W.webp',
]

const servicios = [
  {
    icon: 'receipt_long',
    title: 'Papeletas de Tránsito',
    description: 'Consulta y paga tus infracciones de tránsito registradas.',
    image: 'https://picsum.photos/id/1015/400/220',
    color: 'deep-orange',
  },
  {
    icon: 'directions_car',
    title: 'Tarjeta de Circulación',
    description: 'Verifica el estado de tu tarjeta vehicular en línea.',
    image: 'https://picsum.photos/id/1016/400/220',
    color: 'blue-8',
    to: '/consult',
  },
  {
    icon: 'badge',
    title: 'Licencias de Conducir',
    description: 'Gestiona, renueva y consulta tu licencia de conducir.',
    image: 'https://picsum.photos/id/1018/400/220',
    color: 'teal',
  },
  {
    icon: 'local_shipping',
    title: 'Transporte',
    description: 'Solicita autorizaciones para transporte de carga y pasajeros.',
    image: 'https://picsum.photos/id/1019/400/220',
    color: 'indigo',
  },
  {
    icon: 'account_balance_wallet',
    title: 'Pagos en Línea',
    description: 'Paga tributos municipales de forma rápida y segura.',
    image: 'https://picsum.photos/id/1020/400/220',
    color: 'green-8',
  },
  {
    icon: 'engineering',
    title: 'Construcción',
    description: 'Tramita permisos y licencias de edificación.',
    image: 'https://picsum.photos/id/1021/400/220',
    color: 'brown',
  },
  {
    icon: 'store',
    title: 'Licencias Comerciales',
    description: 'Obtén tu licencia de funcionamiento para tu negocio.',
    image: 'https://picsum.photos/id/1022/400/220',
    color: 'purple',
  },
  {
    icon: 'recycling',
    title: 'Residuos Sólidos',
    description: 'Reporta y gestiona residuos en tu zona.',
    image: 'https://picsum.photos/id/1023/400/220',
    color: 'cyan-8',
  },
]

const pasos = [
  {
    icon: 'person_add',
    title: 'Regístrate',
    desc: 'Crea tu cuenta en menos de 2 minutos con tu DNI.',
    color: 'primary',
  },
  {
    icon: 'search',
    title: 'Busca tu trámite',
    desc: 'Encuentra el servicio que necesitas en segundos.',
    color: 'teal',
  },
  {
    icon: 'upload_file',
    title: 'Sube documentos',
    desc: 'Adjunta los archivos requeridos de forma segura.',
    color: 'deep-orange',
  },
  {
    icon: 'check_circle',
    title: '¡Listo!',
    desc: 'Recibe confirmación y seguimiento en tiempo real.',
    color: 'green',
  },
]

const contactInfo = [
  { icon: 'location_on', text: 'Jr. Lima 123, Puno, Perú' },
  { icon: 'phone', text: '+51 987 654 321' },
  { icon: 'email', text: 'info@munipuno.gob.pe' },
  { icon: 'schedule', text: 'Lun–Vie 8:00–17:00' },
]

const socials = ['facebook', 'twitter', 'instagram', 'youtube']

function toggleDarkMode() {
  $q.dark.toggle()
  isDark.value = $q.dark.isActive
}

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function explorarClick() {
  const el = document.querySelector('.servicios-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function handleScroll() {
  const y = window.scrollY
  scrolled.value = y > 60
  const max = document.body.scrollHeight - window.innerHeight
  scrollPercent.value = max > 0 ? (y / max) * 100 : 0
}

function createObserver(el, visibleRef, threshold = 0.15) {
  if (!el) return
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visibleRef.value = true
        obs.disconnect()
      }
    },
    { threshold },
  )
  obs.observe(el)
  return obs
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  setTimeout(() => {
    heroVisible.value = true
  }, 200)
  createObserver(serviciosRef.value, serviciosVisible)
  createObserver(procesoRef.value, procesoVisible)
  createObserver(ctaRef.value, ctaVisible)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
$puno-blue: #0057a8;
$puno-gold: #e8a020;
$puno-red: #c0392b;
$puno-teal: #0b8f6a;

.puno-layout {
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.header-transition {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-top {
  background: transparent !important;
  box-shadow: none !important;
}

.header-scrolled {
  background: rgba(0, 50, 120, 0.92) !important;
  backdrop-filter: blur(16px) saturate(1.5);
  -webkit-backdrop-filter: blur(16px) saturate(1.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25) !important;
}

.topbar {
  padding-inline: 2rem;
}

// Logo
.logo-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: $puno-blue;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
  &--lg {
    width: 56px;
    height: 56px;
  }
  &:hover {
    transform: rotate(-10deg) scale(1.1);
  }
}
.logo-title {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: white;
  line-height: 1;
}
.logo-sub {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.05em;
}

// Nav
.nav-btn {
  color: white !important;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  border-radius: 8px !important;
  padding: 6px 14px !important;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.12) !important;
  }
}

.login-btn {
  border-radius: 24px !important;
  padding: 6px 20px !important;
  font-weight: 600 !important;
}

.avatar-ring {
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: border-color 0.2s;
  &:hover {
    border-color: white;
  }
}

// Scroll progress
.scroll-progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.15);
}
.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, $puno-gold, $puno-red);
  transition: width 0.1s linear;
}

// Responsive nav
.desktop-nav {
  @media (max-width: 900px) {
    display: none !important;
  }
}
.mobile-menu-btn {
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
}

// Drawer
.drawer-header {
  background: linear-gradient(135deg, $puno-blue, darken($puno-blue, 12%));
  min-height: 140px;
  color: white;
}
.drawer-item {
  transition: background 0.2s;
  &:hover {
    background: rgba($puno-blue, 0.08);
  }
}

.hero-section {
  position: relative;
  height: 100vh;
  min-height: 560px;
  overflow: hidden;
}

.hero-overlay {
  background: linear-gradient(
    160deg,
    rgba(0, 20, 60, 0.72) 0%,
    rgba(0, 50, 120, 0.55) 50%,
    rgba(0, 0, 0, 0.45) 100%
  );
  z-index: 1;
}

.hero-content {
  z-index: 2;
  padding: 2rem;
  padding-bottom: 160px;
}

// Animaciones de entrada
.hero-badge,
.hero-title,
.hero-subtitle,
.hero-cta-group {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(8px);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.hero-title {
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  margin-bottom: 1rem;
  em {
    font-style: italic;
    color: $puno-gold;
  }
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 560px;
  line-height: 1.65;
  opacity: 0.9;
}

.hero-cta-primary {
  border-radius: 100px !important;
  padding: 10px 28px !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  box-shadow: 0 8px 32px rgba($puno-blue, 0.5) !important;
  transition:
    transform 0.2s,
    box-shadow 0.2s !important;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba($puno-blue, 0.6) !important;
  }
}
.hero-cta-secondary {
  border-radius: 100px !important;
  padding: 10px 28px !important;
  font-weight: 600 !important;
  backdrop-filter: blur(8px);
  &:hover {
    background: rgba(255, 255, 255, 0.12) !important;
  }
}

// Estadísticas hero
.hero-stats {
  z-index: 2;
}
.hero-stat-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}
.stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: $puno-gold;
}
.stat-label {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

// Scroll indicator
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: bounceScroll 2s infinite;
}
.scroll-mouse {
  width: 22px;
  height: 34px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
}
.scroll-wheel {
  width: 3px;
  height: 7px;
  background: white;
  border-radius: 100px;
  animation: scrollWheel 1.5s infinite;
}
@keyframes scrollWheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(12px);
    opacity: 0;
  }
}
@keyframes bounceScroll {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(6px);
  }
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  &.section-visible {
    opacity: 1;
    transform: none;
  }
}

.section-tag {
  display: inline-block;
  background: rgba($puno-blue, 0.1);
  color: $puno-blue;
  border: 1px solid rgba($puno-blue, 0.25);
  border-radius: 100px;
  padding: 4px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
  &--light {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border-color: rgba(255, 255, 255, 0.4);
  }
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 12px;
}

.section-desc {
  font-size: 1.05rem;
  color: #666;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.65;
}

.servicios-section {
  background: #f8f9fc;
  .dark-mode & {
    background: #111827;
  }
}

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.servicio-card {
  background: white;
  border-radius: 20px;
  overflow: visible;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(28px);
  cursor: pointer;
  &.servicio-visible {
    opacity: 1;
    transform: translateY(0);
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
  }
  .dark-mode & {
    background: #1e293b;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  }
}

.servicio-img-wrap {
  position: relative;
  height: 160px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
}
.servicio-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  .servicio-card:hover & {
    transform: scale(1.06);
  }
}
.servicio-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba($puno-blue, 0.1), rgba($puno-blue, 0.4));
  opacity: 0;
  transition: opacity 0.3s;
  &.active {
    opacity: 1;
  }
}

.servicio-icon-wrap {
  position: absolute;
  margin-top: -26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.servicio-icon {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25) !important;
  transition: transform 0.3s;
  .servicio-card:hover & {
    transform: scale(1.1) translateY(-4px);
  }
}

.servicio-body {
  position: relative;
}
.servicio-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 6px;
  line-height: 1.3;
}
.servicio-desc {
  font-size: 0.82rem;
  color: #777;
  line-height: 1.55;
  margin: 0 0 8px;
}
.servicio-link {
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  padding: 4px 8px !important;
}

.proceso-section {
  background: white;
  .dark-mode & {
    background: #0f172a;
  }
}

.proceso-steps {
  position: relative;
}

.col-12.col-sm-6.col-md-3 {
  position: relative;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  &.step-visible {
    opacity: 1;
    transform: none;
  }
}

.paso-card {
  padding: 2rem 1rem;
  border-radius: 20px;
  background: #f8f9fc;
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: 100%;
  position: relative;
  transition:
    box-shadow 0.3s,
    background 0.3s;
  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    background: white;
  }
  .dark-mode & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.06);
  }
  .dark-mode &:hover {
    background: #263548;
  }
}
.paso-number {
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba($puno-blue, 0.08);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  .dark-mode & {
    color: rgba(255, 255, 255, 0.06);
  }
}
.paso-icon-wrap {
  display: flex;
  justify-content: center;
}
.paso-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.paso-desc {
  font-size: 0.85rem;
  color: #777;
  line-height: 1.6;
}

.paso-connector {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.cta-section {
  background: #f8f9fc;
  .dark-mode & {
    background: #0f172a;
  }
}
.cta-inner {
  position: relative;
  background: linear-gradient(135deg, $puno-blue 0%, darken($puno-blue, 15%) 50%, #001a4e 100%);
  border-radius: 28px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 2rem;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.97);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  &.section-visible {
    opacity: 1;
    transform: scale(1);
  }
}
.cta-orb {
  position: absolute;
  border-radius: 50%;
  &--1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba($puno-gold, 0.25), transparent 70%);
    top: -100px;
    right: -80px;
  }
  &--2 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba($puno-teal, 0.2), transparent 70%);
    bottom: -80px;
    left: -50px;
  }
}
.cta-content {
  position: relative;
  z-index: 1;
}
.cta-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  margin-bottom: 1rem;
}
.cta-desc {
  font-size: 1.1rem;
  opacity: 0.88;
  line-height: 1.65;
}
.cta-btn-primary {
  border-radius: 100px !important;
  padding: 12px 32px !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  transition:
    transform 0.2s,
    box-shadow 0.2s !important;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25) !important;
  }
}

.puno-footer {
  background: #0a1628 !important;
  color: white;
  position: relative !important;
  bottom: auto !important;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.footer-brand {
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
}
.footer-heading {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
}
.footer-text {
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.65;
}
.footer-link {
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: $puno-gold;
  }
}
.footer-icon {
  color: rgba(255, 255, 255, 0.4);
}
.footer-social {
  color: rgba(255, 255, 255, 0.5) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 50% !important;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s !important;
  &:hover {
    color: $puno-gold !important;
    border-color: $puno-gold !important;
    background: rgba($puno-gold, 0.1) !important;
  }
}
.newsletter-wrap {
  border-radius: 12px;
  overflow: hidden;
}
.newsletter-input .q-field__control {
  border-radius: 12px 0 0 12px !important;
  background: rgba(255, 255, 255, 0.07);
}
.newsletter-btn {
  border-radius: 0 12px 12px 0 !important;
  height: 40px !important;
}

.dark-mode {
  .section-desc {
    color: #9ca3af !important;
  }
  .servicio-desc {
    color: #9ca3af;
  }
  .paso-desc {
    color: #9ca3af;
  }
  .section-tag {
    background: rgba(255, 255, 255, 0.08);
    color: #93c5fd;
    border-color: rgba(255, 255, 255, 0.15);
  }
}

@media (max-width: 599px) {
  .hero-section {
    height: 100svh;
  }
  .hero-content {
    padding-bottom: 120px;
  }
  .hero-stats {
    display: none !important;
  }
  .cta-inner {
    border-radius: 20px;
    padding: 3rem 1.25rem;
  }
}
</style>
