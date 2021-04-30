<template>
  <div>
    <div class="pointer-cursor" @click="toggleTheme">
      <v-icon class="mr-2">{{
        !this.$nuxt.$vuetify.theme.isDark
          ? 'mdi-weather-night'
          : 'mdi-weather-sunny'
      }}</v-icon
      >Theme
    </div>
    <h1 class="text-center">ADDRESS LOOKUP</h1>
    <geocoder />
    <reverse-geocoder />
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    geocoder: () => import('../components/geocoder'),
    reverseGeocoder: () => import('../components/reverseGeocoder')
  },
  mounted() {
    this.$nuxt.$vuetify.theme.isDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
  },
  methods: {
    toggleTheme() {
      this.$nuxt.$vuetify.theme.isDark = !this.$nuxt.$vuetify.theme.isDark
    }
  }
}
</script>
