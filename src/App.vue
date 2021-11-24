<template>
  <div id="app">
    <favorite-gifs-form />
  </div>
</template>

<script>
import FavoriteGifsForm from '@/components/FavoriteGifsForm.vue'

export default {
  name: 'App',
  components: {
    FavoriteGifsForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 24px;
}
</style>
