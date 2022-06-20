/**
 * Store News
 *
 *************/

import axios from 'axios'

const state = {
  listProduitsAll: [],
}

const mutations = {
  setListProduitsAll(state, value) {
    state.listProduitsAll = value
  },
}

const actions = {
  getProduitsAll({
    commit
  }, payload) {

    axios
      .get('/produitsAll/' + payload)
      .then(res => {
        if (res.data.listProduitsAll != 0) {
          commit('setListProduitsAll', res.data.listProduitsAll)
        }
      })
  },
}

const getters = {
  setListProduits: state => {
    return state.listProduits
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
