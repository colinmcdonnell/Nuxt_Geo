<template>
  <v-card class="mt-8 mt-md-15">
    <v-card-title>
      <h2>Geocoder</h2>
    </v-card-title>
    <v-form ref="form" v-model="isValid">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="street"
              label="Street"
              :rules="$validation.required"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="city"
              label="City"
              :rules="$validation.required"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="state"
              label="State"
              :items="stateList"
              :rules="$validation.required"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="zip"
              label="Zip"
              v-mask="'#####'"
              type="tel"
              :rules="$validation.required"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mb-6 ml-2"
        ><v-btn @click="geocode" :disabled="!isValid"
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
      Latitude:
      {{ searchResults[0] ? searchResults[0].lat : '' }}
      <br />
      Longitude:
      {{ searchResults[0] ? searchResults[0].lon : '' }}
    </v-card-text>
    <v-card-text>
      All Data:
      <pre>{{ searchResults }}</pre>
    </v-card-text>
  </v-card>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'Geocoder',
  components: {
    loader: () => import('./loader')
  },
  directives: { mask },
  data: () => ({
    street: '',
    city: '',
    state: '',
    zip: '',
    isLoading: false,
    isValid: true,
    searchResults: { will_appear_as: 'json' },
    // prettier-ignore
    stateList: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']
  }),
  computed: {
    searchQuery() {
      return `${this.street} ${this.city}, ${this.state} ${this.zip}`
    }
  },
  methods: {
    async geocode() {
      this.isLoading = true
      this.searchResults = await this.$geoCodeApi.$get(
        `/search.php?q=${this.searchQuery}&polygon_geojson=1&format=jsonv2`
      )
      this.isLoading = false
    },
    clearData() {
      this.searchResults = { will_appear_as: 'json' }
    }
  }
}
</script>
