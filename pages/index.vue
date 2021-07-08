<template>
  <div class="mb-15">
    <v-slide-y-transition v-if="isLoading" :hide-on-leave="true">
      <v-skeleton-loader type="image" :loading="isLoading" class="mt-12" />
    </v-slide-y-transition>
    <v-slide-y-transition v-else :hide-on-leave="true">
      <geocoder />
    </v-slide-y-transition>
    <v-slide-y-transition v-if="isLoading" :hide-on-leave="true">
      <v-skeleton-loader type="image" :loading="isLoading" class="mt-12" />
    </v-slide-y-transition>
    <v-slide-y-transition v-else :hide-on-leave="true">
      <reverse-geocoder />
    </v-slide-y-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Index',
  components: {
    geocoder: () => import('../components/geocoder'),
    reverseGeocoder: () => import('../components/reverseGeocoder')
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.config.isLoading
    })
  }
}
</script>
