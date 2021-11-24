import { shallow } from 'unit-tests/utils.js'
import GifsList from '@/components/GifsList.vue'

describe('GifsList.vue', () => {
  let wrapper
  let gifs
  let tabIndexOffset

  const setWrapper = () => {
    wrapper = shallow(GifsList, {
      propsData: {
        gifs,
        tabIndexOffset
      }
    })
  }

  beforeEach(() => {
    gifs = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }))

    setWrapper()
    window.innerWidth = 1000
  })

  it('arranges gifs in columns based on the free space, provides tabindex so you can navigate from left to right', () => {
    setWrapper()

    expect(wrapper.findAll('gifs-list-item-stub').wrappers.map(w => w.props())).toStrictEqual([
      { gif: { id: 1 }, tabindex: 1 }, { gif: { id: 5 }, tabindex: 5 }, { gif: { id: 9 }, tabindex: 9 },
      { gif: { id: 2 }, tabindex: 2 }, { gif: { id: 6 }, tabindex: 6 },
      { gif: { id: 3 }, tabindex: 3 }, { gif: { id: 7 }, tabindex: 7 },
      { gif: { id: 4 }, tabindex: 4 }, { gif: { id: 8 }, tabindex: 8 },
    ])
  })

  it('rearranges the gifs on screen resize based on the free space', async () => {
    jest.useFakeTimers()
    setWrapper()

    window.innerWidth = 768
    global.dispatchEvent(new Event("resize"))

    await jest.runAllTimers()

    expect(wrapper.findAll('gifs-list-item-stub').wrappers.map(w => w.props())).toStrictEqual([
      { gif: { id: 1 }, tabindex: 1 }, { gif: { id: 4 }, tabindex: 4 }, { gif: { id: 7 }, tabindex: 7 },
      { gif: { id: 2 }, tabindex: 2 }, { gif: { id: 5 }, tabindex: 5 }, { gif: { id: 8 }, tabindex: 8 },
      { gif: { id: 3 }, tabindex: 3 }, { gif: { id: 6 }, tabindex: 6 }, { gif: { id: 9 }, tabindex: 9 },
    ])
  })

  it('removes the resize event listener on destroy', () => {
    setWrapper()
    window.removeEventListener = jest.fn()

    wrapper.destroy()
    expect(window.removeEventListener).toBeCalledTimes(1)
    expect(window.removeEventListener.mock.calls[0][0]).toBe('resize')
  })
})
