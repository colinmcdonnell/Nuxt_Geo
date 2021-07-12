<template>
  <v-card class="mt-8 mt-md-15">
    <v-card-title>
      <h2>Geocoder</h2>
    </v-card-title>
    <v-form ref="form" v-model="isValid" lazy-validation>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="street"
              label="Street"
              :rules="$validation.required"
              tabindex="1"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="city"
              label="City"
              :rules="$validation.required"
              tabindex="2"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="state"
              label="State"
              :items="stateList"
              :rules="$validation.required"
              tabindex="3"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="zip"
              label="Zip"
              v-mask="'#####'"
              type="tel"
              :rules="$validation.required"
              tabindex="4"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mb-6 ml-2"
        ><v-btn @click="geocode" :disabled="!isValid"
          ><v-icon class="mr-2">mdi-magnify</v-icon>Search</v-btn
        >
        <v-btn @click="clearData"
          ><v-icon class="mr-2">mdi-backspace</v-icon>Clear</v-btn
        ></v-card-actions
      >
    </v-form>
    <v-card-title>
      <h3>Geocode Results</h3>
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
  directives: { mask },
  data: () => ({
    street: '',
    city: '',
    state: '',
    zip: '',
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
      this.$refs.form.validate()
      this.searchResults = await this.$geoCodeApi.$get(
        `/search.php?q=${this.searchQuery}&polygon_geojson=1&format=jsonv2`
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
