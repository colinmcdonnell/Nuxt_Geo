<template>
  <v-app dark>
    <v-main>
      <v-container class="mb-15">
        <page-header />
        <nuxt />
      </v-container>
      <page-footer />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'MainLayout',
  components: {
    pageFooter: () => import('../components/footer.vue'),
    pageHeader: () => import('../components/header.vue')
  },
  mounted() {
    this.letRender()
  },
  methods: {
    letRender() {
      setTimeout(() => {
        this.$store.commit('config/setLoading', false)
      }, 1000)
    }
  }
}
</script>
