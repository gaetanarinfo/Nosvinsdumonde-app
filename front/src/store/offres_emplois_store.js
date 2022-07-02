/**
 * Store News
 *
 *************/

import axios from 'axios'

const state = {
  listEmplois: [],
}


const mutations = {
  setListEmplois(state, value) {
    state.listEmplois = value
  },
}

const actions = {
  getEmplois({
    commit
  }, payload) {

    const emplois = {
      search_emplois: payload.search_emplois,
      checkEntreprises: payload.checkEntreprises,
      domaine: payload.domaine,
      vendanges: payload.vendanges,
      contrat: payload.contrat,
      experience: payload.experience,
      region: payload.region,
    };

    axios
      .post('/offres-emplois', emplois)
      .then(res => {
        commit('setListEmplois', res.data.listOffresEmplois)
      })
  },
}

const getters = {
  setListEmplois: state => {
    return state.listEmplois
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
