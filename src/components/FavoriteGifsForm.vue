<template>
  <form :class="{ 'mb-80': favoriteGifs.length }">
    <gifs-search />

    <section v-if="favoriteGifs.length" class="bottom-container mt-6 ">
      <h1>Favorite gifs:</h1>
      <div class="favorite-gifs-list-wrapper">
        <gifs-list class="gifs-list" :gifs="favoriteGifs" :tab-index-offset="20" />
      </div>
    </section>
  </form>
</template>

<script>
import GifsSearch from '@/components/GifsSearch.vue'
import GifsList from '@/components/GifsList.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    GifsSearch,
    GifsList
  },
  computed: {
    ...mapGetters(['favoriteGifs'])
  }
}
</script>

<style scoped>
.bottom-container {
  position: fixed;
  height: 256px;
  background: #FFFFFF;
  bottom: 0;
  right: 0;
  left: 0;
  padding-bottom: 64px;
}

.favorite-gifs-list-wrapper {
  height: 100%;
  overflow-y: auto;
}

.gifs-list {
  display: inline-flex;
  white-space: nowrap;
}

.mb-80 {
  margin-bottom: 320px;
}
</style>
