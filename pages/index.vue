<template>
  <div>
    <h1 class="text-center">ADDRESS LOOKUP</h1>
    <geocoder />
    <reverse-geocoder />
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    geocoder: () => import('../components/geocoder'),
    reverseGeocoder: () => import('../components/reverseGeocoder')
  }
}
</script>
