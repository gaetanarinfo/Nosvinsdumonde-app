/**
 * Store News
 *
 *************/

import axios from 'axios'
import {
  Cookies
} from 'quasar';

const state = {
  listCartId: [],
}

const mutations = {
  setListCartId(state, value) {
    state.listCartId = value
  },
}

const actions = {
  getCartId({
    commit
  }, payload) {

    axios
      .get('/cart/' + payload)
      .then(res => {
        if (Cookies.has('cart')) {
          if (res.data.cartId != 0) {
            commit('setListCartId', res.data.cartId)
          } else {
            location.href = '/';
          }
        } else {
          location.href = '/';
        }
      })
  },
}

const getters = {
  setListCartId: state => {
    return state.listCartId
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
