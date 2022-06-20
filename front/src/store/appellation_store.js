/**
 * Store News
 *
 *************/

import axios from 'axios'

const state = {
  listAppellations: [],
  listAppellationsAll: [],
  listAppellationsTitle: [],
  listAppellationsCount: [],
}

const mutations = {
  setListAppelations(state, value) {
    state.listAppellations = value
  },
  setListAppellationsAll(state, value) {
    state.listAppellationsAll = value
  },
  setListAppellationsTitle(state, value) {
    state.listAppellationsTitle = value
  },
  setListAppellationsCount(state, value) {
    state.listAppellationsCount = value
  }
}

const actions = {
  getAppellations({
    commit
  }) {
    axios
      .get('/appellations')
      .then(res => {
        commit('setListAppelations', res.data.listAppellations)
      })
  },
  getAppellationsAll({
    commit
  }, payload) {

    axios
      .get('/appellationsAll/' + payload.page + '/' + payload.id)
      .then(res => {
        if (res.data.listAppellationsAll != 0) {
          commit('setListAppellationsAll', res.data.listAppellationsAll)
        }
      })
  },
  getAppellationsTitle({
    commit
  }, payload) {

    axios
      .get('/appellationsTitle/' + payload)
      .then(res => {
        if (res.data.listAppellationsTitle != 0) {
          commit('setListAppellationsTitle', res.data.listAppellationsTitle)
        } else {
          location.href = '/';
        }
      })
  },
  getAppellationsCount({
    commit
  }, payload) {

    axios
      .get('/appellationsCount/' + payload)
      .then(res => {
        if (res.data.listAppellationsCount != 0) {
          commit('setListAppellationsCount', res.data.listAppellationsCount)
        } else {
          location.href = '/';
        }
      })
  },
}

const getters = {
  setListAppelations: state => {
    return state.listAppellations
  },
  setListAppellationsAll: state => {
    return state.listAppellationsAll
  },
  setListAppellationsTitle: state => {
    return state.listAppellationsTitle
  },
  setListAppellationsCount: state => {
    return state.listAppellationsCount
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
