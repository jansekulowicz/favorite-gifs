const mockGiphyApiConstructor = jest.fn()
const mockGiphySearch = jest.fn()

jest.mock('@giphy/js-fetch-api', () => {
  return {
    GiphyFetch: class {
      constructor(constructorArg) {
        mockGiphyApiConstructor(constructorArg)
      }

      search(...args) {
        return mockGiphySearch(...args)
      }
    }
  }
})

import { shallow, getElementByText } from 'unit-tests/utils.js'
import GifsSearch from '@/components/GifsSearch.vue'
import flushPromises from 'flush-promises'

describe('GifsSearch.vue', () => {
  let wrapper
  let favoriteGifs
  const limit = 20

  const setWrapper = () => {
    wrapper = shallow(GifsSearch)
  }

  const pressEnterOnInput = async () => {
    const keydownEvent = new Event('keydown')
    keydownEvent.key = 'Enter'
    wrapper.find('input').element.dispatchEvent(keydownEvent)
    await flushPromises()
  }

  beforeEach(() => {
    mockGiphyApiConstructor.mockReset()
    mockGiphySearch.mockReset()

    favoriteGifs = []
    setWrapper()
  })

  it('initializes Giphy API when created', () => {
    expect(mockGiphyApiConstructor).toBeCalledTimes(1)
    expect(mockGiphyApiConstructor.mock.calls[0][0]).toBeTruthy()
  })

  it('renders correct title', () => {
    expect(wrapper.find('h1').text()).toBe('Search and add gifs to favorite')
  })

  it('renders an input field with correct placeholder which searches for the gifs on keydown enter', async () => {
    let query = ''

    setWrapper()
    const inputField = wrapper.find('input')
    expect(inputField.attributes('placeholder')).toBe('Search gifs...')

    mockGiphySearch.mockResolvedValue({ pagination: { limit, offset: 0, total_count: 1000 } })
    await pressEnterOnInput()

    expect(mockGiphySearch).toHaveBeenLastCalledWith(query, { limit, offset: 0 })
  })

  it('renders a button which searches for the gifs on click event', async () => {
    let query = ''

    setWrapper()
    const button = getElementByText(wrapper, 'Search', 'button')

    mockGiphySearch.mockResolvedValue({ pagination: { limit, offset: 0, total_count: 1000 } })
    button.trigger('click')
    await flushPromises()

    expect(mockGiphySearch).toHaveBeenLastCalledWith(query, { limit, offset: 0 })
  })

  it('renders the loading state before the search results appear', async () => {
    expect(getElementByText(wrapper, 'Loading...')).toBeFalsy()

    pressEnterOnInput()

    await wrapper.vm.$nextTick()
    expect(getElementByText(wrapper, 'Loading...')).toBeTruthy()
  })

  it('renders the empty state when the result\'s data array is empty', async () => {
    expect(getElementByText(wrapper, 'There are no results for this query. Try something else!')).toBeFalsy()

    mockGiphySearch.mockResolvedValue({ data: [], pagination: { limit: 20, offset: 20, total_count: 1000 } })
    await pressEnterOnInput()

    expect(getElementByText(wrapper, 'There are no results for this query. Try something else!')).toBeTruthy()
  })

  it('renders the error message when the search api call returns an error', async () => {
    const message = 'This is an error message!'
    expect(getElementByText(wrapper, message)).toBeFalsy()

    mockGiphySearch.mockRejectedValue({ message })
    await pressEnterOnInput()

    expect(getElementByText(wrapper, message)).toBeTruthy()
  })

  it('renders the gifs-list with the search results when the result\'s data array is empty', async () => {
    const gifs = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    expect(wrapper.find('gifs-list-stub').exists()).toBeFalsy()

    mockGiphySearch.mockResolvedValue({ data: gifs, pagination: { limit: 20, offset: 20, total_count: 1000 } })
    await pressEnterOnInput()

    expect(wrapper.find('gifs-list-stub').props('gifs')).toStrictEqual(gifs)
  })

  it('resets the search offset when searched while being on the last page of the results for the specific query', async () => {
    let query = 'test'

    setWrapper()
    const inputField = wrapper.find('input')
    await inputField.setValue(query)

    mockGiphySearch.mockResolvedValue({ pagination: { limit, offset: 0, total_count: 30 } })
    await pressEnterOnInput()
    expect(mockGiphySearch).toHaveBeenLastCalledWith(query, { limit, offset: 0 })

    mockGiphySearch.mockResolvedValue({ pagination: { limit, offset: 20, total_count: 30 } })
    await pressEnterOnInput()
    expect(mockGiphySearch).toHaveBeenLastCalledWith(query, { limit, offset: 20 })
  })

  it('resets the search offset when the query changes', async () => {
    let query = 'test'

    setWrapper()
    const inputField = wrapper.find('input')
    await inputField.setValue(query)

    mockGiphySearch.mockResolvedValue({ pagination: { limit, offset: 0, total_count: 30 } })
    await pressEnterOnInput()
    expect(mockGiphySearch).toHaveBeenLastCalledWith(query, { limit, offset: 0 })

    query = 'something else'
    await inputField.setValue(query)
    await pressEnterOnInput()
    expect(mockGiphySearch).toHaveBeenLastCalledWith(query, { limit, offset: 0 })
  })
})
