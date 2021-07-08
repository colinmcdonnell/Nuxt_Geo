<template>
  <div class="footer">
    <v-container class="d-sm-flex">
      <div class="menu my-4">
        <div class="footer-text">
          {{ new Date().getFullYear() }} - Built with Nuxt.js, Vuetify and
          OpenStreetMap
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  background: #1e1e1e;
  box-shadow: 0 2px 8px #00000040;
  .container {
    padding: 1rem;
    color: #fff;
    justify-content: space-between;
    .menu {
      .footer-text {
        font-size: 0.6875rem;
        color: #f7f7f7;
      }
    }
  }
}
.theme--light .footer {
  background: #fff;
  .container .menu .footer-text {
    color: #000;
  }
}
</style>
