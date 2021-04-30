<template>
  <div>
    <div v-show="!bLoading" class="pointer-cursor" @click="toggleTheme">
      <v-icon class="mr-2">{{
        !this.$nuxt.$vuetify.theme.isDark
          ? 'mdi-weather-night'
          : 'mdi-weather-sunny'
      }}</v-icon
      >Theme
    </div>
    <v-skeleton-loader
      v-if="bLoading"
      type="text"
      :loading="bLoading"
      class="mt-12"
    />
    <h1 v-else class="text-center">ADDRESS LOOKUP</h1>
    <v-slide-y-transition v-if="bLoading" :hide-on-leave="true">
      <v-skeleton-loader type="image" :loading="bLoading" class="mt-12" />
    </v-slide-y-transition>
    <v-slide-y-transition v-else :hide-on-leave="true">
      <geocoder />
    </v-slide-y-transition>
    <v-slide-y-transition v-if="bLoading" :hide-on-leave="true">
      <v-skeleton-loader type="image" :loading="bLoading" class="mt-12" />
    </v-slide-y-transition>
    <v-slide-y-transition v-else :hide-on-leave="true">
      <reverse-geocoder />
    </v-slide-y-transition>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    geocoder: () => import('../components/geocoder'),
    reverseGeocoder: () => import('../components/reverseGeocoder')
  },
  data: () => ({
    bLoading: true
  }),
  mounted() {
    this.letRender()
    this.setPreferredTheme()
  },
  methods: {
    letRender() {
      setTimeout(() => {
        this.bLoading = false
      }, 1000)
    },
    setPreferredTheme() {
      this.$nuxt.$vuetify.theme.isDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
    },
    toggleTheme() {
      this.$nuxt.$vuetify.theme.isDark = !this.$nuxt.$vuetify.theme.isDark
    }
  }
}
</script>
