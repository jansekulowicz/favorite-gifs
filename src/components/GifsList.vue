<template>
  <ul class="pl-0">
    <div v-for="(gifsSubset, index) in gifsSubsets" :key="`column-${index}`">
      <gifs-list-item v-for="item in gifsSubset" :key="item.gif.id" :tabindex="item.tabindex" :gif="item.gif" />
    </div>
  </ul>
</template>

<script>
import GifsListItem from '@/components/GifsListItem.vue'
import debounce from 'lodash/debounce'

const COLUMN_WIDTH = 232

export default {
  components: {
    GifsListItem
  },
  props: {
    gifs: {
      type: Array,
      required: true
    },
    tabIndexOffset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      numberOfColumns: Math.floor(window.innerWidth / COLUMN_WIDTH),
      debouncedComputeNumberOfColumns: debounce(this.computeNumberOfColumns, 100)
    }
  },
  created() {
    this.computeNumberOfColumns()
    window.addEventListener('resize', this.debouncedComputeNumberOfColumns)
  },
  destroyed() {
    window.removeEventListener('resize', this.debouncedComputeNumberOfColumns)
  },
  computed: {
    gifsSubsets() {
      const subsets = Array(this.numberOfColumns).fill([])

      this.gifs.forEach((gif, index) => {
        const tabindex = index + 1 + this.tabIndexOffset
        const subsetIndex = index % this.numberOfColumns
        subsets[subsetIndex] = [...subsets[subsetIndex], { gif, tabindex }]
      })

      return subsets
    }
  },
  methods: {
    computeNumberOfColumns(e) {
      this.numberOfColumns = Math.floor(window.innerWidth / COLUMN_WIDTH)
    }
  }
}
</script>

<style scoped>
.pl-0 {
  padding-left: 0px;
}
</style>
