<template>
  <div>
    <h1 class="text-center">ADDRESS LOOKUP</h1>
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
        ><v-btn @click="geocode"
          ><v-icon class="mr-2">mdi-magnify</v-icon>Search</v-btn
        >
        <v-btn @click="oResult = { willAppearAs: 'json' }"
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
        ><v-btn @click="reverseGeocode"
          ><v-icon class="mr-2">mdi-magnify</v-icon>Search</v-btn
        >
        <v-btn @click="oReverseResult = { willAppearAs: 'json' }"
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
  </div>
</template>

<script>
export default {
  name: 'Geocoder',
  data: () => ({
    oResult: { willAppearAs: 'json' },
    oReverseResult: { willAppearAs: 'json' },
    // coordinates
    sLat: '',
    sLong: '',
    // address
    sStreet: '',
    sCity: '',
    sState: '',
    sZip: ''
  }),
  computed: {
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
    async reverseGeocode() {
      this.oReverseResult = await this.$geoCodeApi.$get(
        `/reverse?format=json&lat=${parseFloat(this.sLat)}&lon=${parseFloat(
          this.sLong
        )}&zoom=18&addressdetails=1`
      )
    }
  }
}
</script>

<style lang="scss"></style>
