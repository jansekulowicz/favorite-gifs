import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const ADD_FAVORITE_GIF = 'ADD_FAVORITE_GIF'
const REMOVE_FAVORITE_GIF = 'REMOVE_FAVORITE_GIF'

export default new Vuex.Store({
  state: {
    favoriteGifs: []
  },
  getters: {
    favoriteGifs: (state) => state.favoriteGifs
  },
  mutations: {
    [ADD_FAVORITE_GIF]: (state, gifData) => state.favoriteGifs.push(gifData),
    [REMOVE_FAVORITE_GIF]: (state, gifId) => {
      const gifIndex = state.favoriteGifs.findIndex((gif) => gif.id === gifId)

      if (gifIndex > -1) {
        state.favoriteGifs.splice(gifIndex, 1)
      }
    }
  },
  actions: {
    addFavoriteGif: ({ commit }, gif) => {
      const { id, images } = gif
      commit(ADD_FAVORITE_GIF, { id, images })
    },
    removeFavoriteGif: ({ commit }, gifId) => commit(REMOVE_FAVORITE_GIF, gifId)
  },
  plugins: [
    createPersistedState({ paths: ['favoriteGifs'] })
  ]
})
