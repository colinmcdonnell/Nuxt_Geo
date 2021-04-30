<template>
  <v-card class="mt-15">
    <v-card-title>
      <h2>Geocoder</h2>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-text-field v-model="sStreet" label="Street" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="sCity" label="City" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="sState" label="State" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="sZip" label="Zip" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="mb-6"
      ><v-btn @click="geocode" :disabled="!bIsValid"
        ><v-icon class="mr-2">mdi-magnify</v-icon>Search</v-btn
      >
      <v-btn @click="clearData"
        ><v-icon class="mr-2">mdi-backspace</v-icon>Clear</v-btn
      ></v-card-actions
    >
    <v-card-title>
      <h3>Geocode Results</h3>
    </v-card-title>
    <v-card-text>
      Latitude: {{ oResult[0] ? oResult[0].lat : '' }}
      <br />
      Longitude:
      {{ oResult[0] ? oResult[0].lon : '' }}
    </v-card-text>
    <v-card-text>
      All Data:
      <pre>{{ oResult ? oResult : '' }}</pre>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Geocoder',
  data: () => ({
    oResult: { will_appear_as: 'json' },
    // address
    sStreet: '',
    sCity: '',
    sState: '',
    sZip: ''
  }),
  computed: {
    bIsValid() {
      return !!this.sStreet && !!this.sCity && !!this.sState && !!this.sZip
    },
    sFullAddress() {
      return `${this.sStreet} ${this.sCity}, ${this.sState} ${this.sZip}`
    }
  },
  methods: {
    async geocode() {
      this.oResult = await this.$geoCodeApi.$get(
        `/search.php?q=${this.sFullAddress}&polygon_geojson=1&format=jsonv2`
      )
    },
    clearData() {
      this.oResult = { will_appear_as: 'json' }
      this.sStreet = ''
      this.sCity = ''
      this.sState = ''
      this.sZip = ''
    }
  }
}
</script>
