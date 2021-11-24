<template>
  <li class="gifs-list-item">
    <button
      class="gif-button"
      :class="{ 'favorite': isFavorite }"
      type="button"
      :tabindex="tabindex"
      @click="onAction"
    ><img class="gif-image" :src="gif.images.original.url" :alt="gif.title" /></button>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    gif: {
      type: Object,
      required: true
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(['favoriteGifs']),
    isFavorite() {
      return this.favoriteGifs.find(gif => gif.id === this.gif.id)
    }
  },
  methods: {
    ...mapActions(['addFavoriteGif', 'removeFavoriteGif']),
    onAction() {
      this.isFavorite ? this.removeFavoriteGif(this.gif.id) : this.addFavoriteGif(this.gif)
    }
  }
}
</script>

<style scoped>
.gifs-list-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 8px;
}

.gif-button {
  display: flex;
  overflow: hidden;
  position: relative;
  padding: 0;
  border: none;
  cursor: pointer;
  color: #FFFFFF;
}

.gif-button:hover::after,
.gif-button:focus-visible::after {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  content: '➕';
  font-size: 100px;
  color: rgba(0,0,0,0) !important;
  text-shadow: 0 0 #FFFFFF, 2px 2px #000000;
  line-height: 1;
}

.gif-button:hover,
.gif-button:focus-visible {
  opacity: 0.3;
}

.gif-button.favorite:hover::after,
.gif-button.favorite:focus-visible::after {
  content: '✖';
  font-size: 100px;
}

.gif-image {
  width: 200px;
}
</style>
