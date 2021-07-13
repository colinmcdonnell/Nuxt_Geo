<template>
  <v-card class="mt-8 mt-md-15">
    <v-card-title>
      <h2>Reverse Geocoder</h2>
    </v-card-title>
    <v-form ref="form" v-model="isValid">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="lat"
              label="Latitude"
              :rules="$validation.required"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="long"
              label="Longitude"
              :rules="$validation.required"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mb-6 ml-2"
        ><v-btn @click="reverseGeocode" :disabled="!isValid"
          ><v-icon class="mr-2">mdi-magnify</v-icon>Search</v-btn
        >
        <v-btn @click="clearData"
          ><v-icon class="mr-2">mdi-backspace</v-icon>Clear Results</v-btn
        ></v-card-actions
      >
    </v-form>
    <v-divider />
    <v-card-title>
      <h3>Results</h3>
      <loader class="ml-3" :loading="isLoading" :size="'32px'" />
    </v-card-title>
    <v-card-text>
      Address:
      <pre>{{ reverseSearchResults ? reverseSearchResults.address : '' }}</pre>
    </v-card-text>
    <v-card-text>
      All Data:
      <pre>{{ reverseSearchResults }}</pre>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ReverseGeocoder',
  components: {
    loader: () => import('./loader')
  },
  data: () => ({
    lat: '',
    long: '',
    isLoading: false,
    isValid: '',
    reverseSearchResults: { will_appear_as: 'json' }
  }),
  computed: {
    bIsValid() {
      return !!this.lat && !!this.long
    }
  },
  methods: {
    async reverseGeocode() {
      this.isLoading = true
      this.reverseSearchResults = await this.$geoCodeApi.$get(
        `/reverse?format=json&lat=${parseFloat(this.lat)}&lon=${parseFloat(
          this.long
        )}&zoom=18&addressdetails=1`
      )
      this.isLoading = false
    },
    clearData() {
      this.reverseSearchResults = { will_appear_as: 'json' }
    }
  }
}
</script>
