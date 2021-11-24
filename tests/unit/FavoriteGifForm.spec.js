import { shallow } from 'unit-tests/utils.js'
import FavoriteGifsForm from '@/components/FavoriteGifsForm.vue'

describe('FavoriteGifsForm.vue', () => {
  let wrapper
  let favoriteGifs

  const setWrapper = () => {
    wrapper = shallow(FavoriteGifsForm, {
      storeConfig: {
        getters: {
          favoriteGifs: () => favoriteGifs
        }
      }
    })
  }

  beforeEach(() => {
    favoriteGifs = []
    setWrapper()
  })

  it('renders the gif-search component', () => {
    expect(wrapper.find('gifs-search-stub').exists()).toBeTruthy()
  })

  it('renders the gifs-list of favorite gifs when such gifs exist', () => {
    expect(wrapper.find('gifs-list-stub').exists()).toBeFalsy()

    favoriteGifs = [{ id: 'a' }, { id: 'b' }]
    setWrapper()
    expect(wrapper.find('gifs-list-stub').props('gifs')).toStrictEqual(favoriteGifs)
  })
})
