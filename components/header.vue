<template>
  <div class="page-header">
    <v-icon v-if="!isLoading" x-large @click.stop="drawer = !drawer"
      >mdi-menu</v-icon
    >
    <v-navigation-drawer v-if="!isLoading" v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="d-flex"
            >Menu
            <v-icon class="ml-auto" @click.stop="drawer = !drawer"
              >mdi-close</v-icon
            ></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list dense>
        <v-list-item @click="toggleTheme" class="pointer-cursor">
          <v-icon x-large class="mr-2">{{
            !this.$nuxt.$vuetify.theme.isDark
              ? 'mdi-weather-night'
              : 'mdi-weather-sunny'
          }}</v-icon>
          Theme
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-skeleton-loader
      v-if="isLoading"
      type="text"
      :loading="isLoading"
      class="mt-8 mt-md-12"
    />
    <h1 v-else class="text-left text-md-center mt-6">
      Geocoding with OpenStreetMap
    </h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageHeader',
  data: () => ({
    drawer: null
  }),
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
