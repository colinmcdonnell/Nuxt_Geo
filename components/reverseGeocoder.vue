<template>
  <v-card class="mt-15">
    <v-card-title>
      <h2>Reverse Geocoder</h2>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="sLat" label="Latitude" />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="sLong" label="Longitude" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="mb-6"
      ><v-btn @click="reverseGeocode" :disabled="!bIsValid"
        ><v-icon class="mr-2">mdi-magnify</v-icon>Search</v-btn
      >
      <v-btn @click="clearData"
        ><v-icon class="mr-2">mdi-backspace</v-icon>Clear</v-btn
      ></v-card-actions
    >
    <v-card-title>
      <h3>Reverse Geocode Results</h3>
    </v-card-title>
    <v-card-text>
      Address:
      <pre>{{ oReverseResult ? oReverseResult.address : '' }}</pre>
    </v-card-text>
    <v-card-text>
      All Data:
      <pre>{{ oReverseResult ? oReverseResult : '' }}</pre>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ReverseGeocoder',
  data: () => ({
    oReverseResult: { will_appear_as: 'json' },
    // coordinates
    sLat: '',
    sLong: ''
  }),
  computed: {
    bIsValid() {
      return !!this.sLat && !!this.sLong
    }
  },
  methods: {
    async reverseGeocode() {
      this.oReverseResult = await this.$geoCodeApi.$get(
        `/reverse?format=json&lat=${parseFloat(this.sLat)}&lon=${parseFloat(
          this.sLong
        )}&zoom=18&addressdetails=1`
      )
    },
    clearData() {
      this.oReverseResult = { will_appear_as: 'json' }
      this.sLat = ''
      this.sLong = ''
    }
  }
}
</script>
