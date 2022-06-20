/**
 * Store News
 *
 *************/

import axios from 'axios'

const state = {
  listRegions: [],
  listRegionsAll: [],
  listRegionsTitle: [],
  listRegionsCount: [],
}

const mutations = {
  setListRegions(state, value) {
    state.listRegions = value
  },
  setListRegionsAll(state, value) {
    state.listRegionsAll = value
  },
  setListRegionsTitle(state, value) {
    state.listRegionsTitle = value
  },
  setListRegionsCount(state, value) {
    state.listRegionsCount = value
  }
}

const actions = {
  getRegions({
    commit
  }) {
    axios
      .get('/regions')
      .then(res => {
        commit('setListRegions', res.data.listRegions)
      })
  },
  getRegionsAll({
    commit
  }, payload) {

    axios
      .get('/regionsAll/' + payload.page + '/' + payload.id)
      .then(res => {
        if (res.data.listRegionsAll != 0) {
          commit('setListRegionsAll', res.data.listRegionsAll)
        }
      })
  },
  getRegionsTitle({
    commit
  }, payload) {

    axios
      .get('/regionsTitle/' + payload)
      .then(res => {
        if (res.data.listRegionsTitle != 0) {
          commit('setListRegionsTitle', res.data.listRegionsTitle)
        } else {
          location.href = '/';
        }
      })
  },
  getRegionsCount({
    commit
  }, payload) {

    axios
      .get('/regionsCount/' + payload)
      .then(res => {
        if (res.data.listRegionsCount != 0) {
          commit('setListRegionsCount', res.data.listRegionsCount)
        } else {
          location.href = '/';
        }
      })
  },
}

const getters = {
  setListRegions: state => {
    return state.listRegions
  },
  setListRegionsAll: state => {
    return state.listRegionsAll
  },
  setListRegionsTitle: state => {
    return state.listRegionsTitle
  },
  setListRegionsCount: state => {
    return state.listRegionsCount
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
