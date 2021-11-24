describe('store index.js', () => {
  let store
  let favoriteGifs

  beforeEach(() => {
    jest.isolateModules(() => {
      store = require('@/store/index.js').default
    })

    favoriteGifs = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    store.state.favoriteGifs = [...favoriteGifs]
  })

  it('returns favorite gifs from favoriteGifs getter', () => {
    store.state.favoriteGifs = favoriteGifs
    expect(store.getters.favoriteGifs).toStrictEqual(favoriteGifs)
  })

  it('adds a favorite gif on the addFavoriteGif action call', () => {
    const gifToAdd = { id: 'd', images: [{ id: 1 }] }

    store.dispatch('addFavoriteGif', gifToAdd)
    expect(store.getters.favoriteGifs).toStrictEqual([...favoriteGifs, gifToAdd])
  })

  it('removes a favorite gif on the removeFavoriteGif action call, does nothing if gif doesn\'t exist', () => {
    const gifToRemove = favoriteGifs[1]

    store.dispatch('removeFavoriteGif', gifToRemove.id)
    expect(store.getters.favoriteGifs).toStrictEqual([favoriteGifs[0], favoriteGifs[2]])

    store.dispatch('removeFavoriteGif', gifToRemove.id)
    expect(store.getters.favoriteGifs).toStrictEqual([favoriteGifs[0], favoriteGifs[2]])
  })
})
