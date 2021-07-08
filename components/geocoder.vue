<template>
  <v-card class="mt-15">
    <v-card-title>
      <h2>Geocoder</h2>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="street" label="Street" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="city" label="City" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="state" label="State" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="zip" label="Zip" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="mb-6 ml-2"
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
      Latitude: {{ searchResults[0] ? searchResults[0].lat : '' }}
      <br />
      Longitude:
      {{ searchResults[0] ? searchResults[0].lon : '' }}
    </v-card-text>
    <v-card-text>
      All Data:
      <pre>{{ searchResults ? searchResults : '' }}</pre>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Geocoder',
  data: () => ({
    searchResults: { will_appear_as: 'json' },
    // address
    street: '',
    city: '',
    state: '',
    zip: ''
  }),
  computed: {
    bIsValid() {
      return !!this.street && !!this.city && !!this.state && !!this.zip
    },
    sFullAddress() {
      return `${this.street} ${this.city}, ${this.state} ${this.zip}`
    }
  },
  methods: {
    async geocode() {
      this.searchResults = await this.$geoCodeApi.$get(
        `/search.php?q=${this.sFullAddress}&polygon_geojson=1&format=jsonv2`
      )
    },
    clearData() {
      this.searchResults = { will_appear_as: 'json' }
      this.street = ''
      this.city = ''
      this.state = ''
      this.zip = ''
    }
  }
}
</script>
