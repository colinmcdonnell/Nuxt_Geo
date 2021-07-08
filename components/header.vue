<template>
  <div class="page-header">
    <div v-show="!isLoading" class="pointer-cursor" @click="toggleTheme">
      <v-icon class="mr-2">{{
        !this.$nuxt.$vuetify.theme.isDark
          ? 'mdi-weather-night'
          : 'mdi-weather-sunny'
      }}</v-icon
      >Theme
    </div>
    <v-skeleton-loader
      v-if="isLoading"
      type="text"
      :loading="isLoading"
      class="mt-12"
    />
    <h1 v-else class="text-center">Address Lookup with OpenStreetMap</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapState({
      isLoading: (state) => state.config.isLoading
    })
  },
  methods: {
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
