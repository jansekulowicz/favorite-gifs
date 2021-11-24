import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const shallow = (component, config = {}) => {
  const localVue = createLocalVue()

  const { storeConfig, ...mountOptions } = config

  if (storeConfig) {
    localVue.use(Vuex)
    mountOptions.store = new Vuex.Store(storeConfig)
  }

  return shallowMount(component, { localVue, ...mountOptions })
}

const getElementByText = (wrapper, text, selector = '*') => wrapper
  .findAll(selector)
  .wrappers.find((w) => w.text() === text)

export {
  shallow,
  getElementByText
}
