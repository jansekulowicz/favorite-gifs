import { shallow, getElementByText } from 'unit-tests/utils.js'
import GifsListItem from '@/components/GifsListItem.vue'

describe('GifsListItem.vue', () => {
  let wrapper
  let gif
  let favoriteGifs
  let tabindex
  let storeConfig
  const gifUrl = 'someUrl'

  const setWrapper = () => {
    wrapper = shallow(GifsListItem, {
      propsData: {
        gif,
        tabindex
      },
      storeConfig
    })
  }

  beforeEach(() => {
    storeConfig = {
      getters: {
        favoriteGifs: () => favoriteGifs
      },
      actions: {
        addFavoriteGif: jest.fn(),
        removeFavoriteGif: jest.fn()
      }
    }

    gif = { id: 'b', title: 'A bold gif', images: { original: { url: gifUrl } } }
    favoriteGifs = [{ id: 'c', title: 'Citruses', images: { original: 'url' } }]
  })

  it('renders an image with a correct src and alt attribute based on the gif prop', () => {
    setWrapper()
    expect(wrapper.find('img').attributes('src')).toBe(gif.images.original.url)
    expect(wrapper.find('img').attributes('alt')).toBe(gif.title)
  })

  it('adds the gif to favorites on click when it is not favorite', () => {
    setWrapper()
    expect(storeConfig.actions.addFavoriteGif).toBeCalledTimes(0)

    wrapper.find('button').trigger('click')

    expect(storeConfig.actions.addFavoriteGif).toBeCalledTimes(1)
    expect(storeConfig.actions.addFavoriteGif.mock.calls[0][1]).toStrictEqual(gif)
  })

  it('removes the gif from favorites on click when it is favorite', () => {
    gif = favoriteGifs[0]
    setWrapper()
    expect(storeConfig.actions.removeFavoriteGif).toBeCalledTimes(0)

    wrapper.find('button').trigger('click')

    expect(storeConfig.actions.removeFavoriteGif).toBeCalledTimes(1)
    expect(storeConfig.actions.removeFavoriteGif.mock.calls[0][1]).toStrictEqual(gif.id)
  })

  it('sets tabindex attribute of the button based on the tabindex prop', () => {
    tabindex = 2
    setWrapper()

    expect(wrapper.find('button').attributes('tabindex')).toBe('2')
  })
})
