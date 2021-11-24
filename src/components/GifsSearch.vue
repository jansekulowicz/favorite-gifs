<template>
  <section>
    <header>
      <h1 class="mt-0">Search and add gifs to favorite</h1>

      <div class="mb-6">
        <input
          class="search-input"
          v-model="query"
          placeholder="Search gifs..."
          type="search"
          tabindex="1"
          @keydown.enter.prevent="searchGifs"
        />
        <button class="search-button ml-2" tabindex="1" type="button" @click="searchGifs">Search</button>
      </div>
    </header>

    <div v-if="loading">Loading...</div>
    <div v-else-if="searchErrorMessage">{{ searchErrorMessage }}</div>
    <div v-else-if="searchResults">
      <gifs-list class="gifs-grid" :gifs="searchResults" />
    </div>
  </section>
</template>

<script>
import GifsList from '@/components/GifsList.vue'
import { GiphyFetch } from '@giphy/js-fetch-api'

export default {
  components: {
    GifsList,
  },
  data() {
    return {
      giphyApi: new GiphyFetch('HqAvKVtqkWGQusQ4RQzCOoRoaMsDjG3O'),
      searchResults: null,
      query: '',
      searchErrorMessage: null,
      resultsPerPage: 20,
      nextOffset: 0,
      loading: false
    }
  },
  watch: {
    query() {
      this.nextOffset = 0
    }
  },
  methods: {
    async searchGifs() {
      this.searchErrorMessage = null
      this.loading = true

      try {
        const { data, pagination } = await this.giphyApi.search(this.query, { limit: this.resultsPerPage, offset: this.nextOffset })

        this.nextOffset = pagination.offset + this.resultsPerPage
        if (this.nextOffset > pagination.total_count) {
          this.nextOffset = 0
        }

        if (data.length) {
          this.searchResults = data
        } else {
          this.searchErrorMessage = 'There are no results for this query. Try something else!'
        }
      } catch (e) {
        this.searchErrorMessage = e.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.mt-0 {
  margin-top: 0;
}

.mb-6 {
  margin-bottom: 24px;
}

.search-input,
.search-button {
  height: 30px;
  border: 1px solid;
  padding: 0 8px;
}

.ml-2 {
  margin-left: 8px;
}

.gifs-grid {
  display: flex;
  justify-content: center;
}
</style>
