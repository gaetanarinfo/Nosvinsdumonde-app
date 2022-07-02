/**
 * Store News
 *
 *************/

import axios from 'axios'
import {
  Cookies
} from 'quasar';

const state = {
  listVins: [],
  listVinsOne: [],
  listVinsId: [],
  listIdAlliance: [],
  listIdVente: [],
  listVinsFavorisId: [],
  listVinsSuggest: [],
  listBonPlansAll: [],
  listPays: [],
  listApellation: [],
  listRegion: [],
}

var compteur = 1;

const mutations = {
  setListVins(state, value) {
    state.listVins = value
  },
  setOneListVins(state, value) {
    state.listVinsOne = value
  },
  setListVinsId(state, value) {
    state.listVinsId = value
  },
  setListVinsIdAlliance(state, value) {
    state.listIdAlliance = value
  },
  setListVinsIdVente(state, value) {
    state.listIdVente = value
  },
  setListVinsFavorisId(state, value) {
    state.listVinsFavorisId = value
  },
  setListVinsSuggest(state, value) {
    state.listVinsSuggest = value
  },
  setListBonPlansAll(state, value) {
    state.listBonPlansAll = value
  },
  setListPays(state, value) {
    state.listPays = value
  },
  setListApellation(state, value) {
    state.listApellation = value
  },
  setListRegion(state, value) {
    state.listRegion = value
  },
}

const actions = {
  getVins({
    commit
  }) {
    axios
      .get('/vins')
      .then(res => {
        commit('setListVins', res.data.listVins)
      })
  },
  getBonPlansAll({
    commit
  }, payload) {

    const vins = {
      prix: payload.prix,
      millesime: payload.millesime,
      couleur: payload.couleur,
      pays: payload.pays,
      appellation: payload.appellation,
      region: payload.region,
      gout: payload.gout,
      alliance: payload.alliance,
    };

    axios
      .post('/bonPlansAll/', vins)
      .then(res => {
        if (res.data.listBonPlansAll !== 0) {
          commit('setListBonPlansAll', res.data.listBonPlansAll)
        } else {
          commit('setListBonPlansAll', [])
        }
      })
  },
  getPays({
    commit
  }) {
    axios
      .get('/pays')
      .then(res => {
        if (res.data.listPays != 0) {
          commit('setListPays', res.data.listPays)
        } else {
          location.href = '/';
        }
      })
  },
  getApellation({
    commit
  }) {
    axios
      .get('/apellation')
      .then(res => {
        if (res.data.listApellation != 0) {
          commit('setListApellation', res.data.listApellation)
        } else {
          location.href = '/';
        }
      })
  },
  getRegion({
    commit
  }) {
    axios
      .get('/region')
      .then(res => {
        if (res.data.listRegion != 0) {
          commit('setListRegion', res.data.listRegion)
        } else {
          location.href = '/';
        }
      })
  },
  getOneVins({
    commit
  }) {
    axios
      .get('/vinsOne')
      .then(res => {
        commit('setOneListVins', res.data.listVinsOne)
      })
  },
  getVinsId({
    commit
  }, payload) {

    axios
      .get('/vins/' + payload)
      .then(res => {
        if (res.data.vinsId != 0) {
          commit('setListVinsId', res.data.vinsId[0])
          commit('setListVinsSuggest', res.data.listVinsSuggest)
        } else {
          location.href = '/';
        }
      })
      .catch(error => {
        console.log(error);
      })
  },
  getAllianceId({
    commit
  }, payload) {

    axios
      .get('/vinsAlliances/' + payload)
      .then(res => {
        if (res.data.vinsIdAlliances != 0) {
          commit('setListVinsIdAlliance', res.data.vinsIdAlliances)
        }
      })
  },
  getVenteId({
    commit
  }, payload) {

    axios
      .get('/vinsVente/' + payload)
      .then(res => {
        if (res.data.vinsIdVente != 0) {
          commit('setListVinsIdVente', res.data.vinsIdVente[0])
        } else {
          location.href = '/';
        }
      })
  },
  getVinsFavorisId({
    commit
  }, payload) {

    axios
      .get('/vinsFavoris/' + payload)
      .then(res => {
        if (Cookies.has('favoris')) {
          if (res.data.vinsFavorisId != 0) {
            commit('setListVinsFavorisId', res.data.vinsFavorisId)
          } else {
            location.href = '/';
          }
        } else {
          location.href = '/';
        }
      })
  },
  sendAvisVins({}, payload) {

    const vins = {
      avis_note: payload.avis_note,
      avis_prenom: payload.avis_prenom,
      avis_email: payload.avis_email,
      avis_content: payload.avis_content,
      id_vins: payload.id_vins,
    };

    if (compteur <= 1) {

      compteur++;

      axios
        .post('/postAvisVins', vins)

    }

    setTimeout(() => {
      compteur = 1;
    }, 2500);

  },
}

const getters = {
  setListVins: state => {
    return state.listVins
  },
  setOneListVins: state => {
    return state.listVinsOne
  },
  setListVinsId: state => {
    return state.listNewsId
  },
  setListVinsIdAlliance: state => {
    return state.listIdAlliance
  },
  setListVinsIdVente: state => {
    return state.listIdVente
  },
  setListVinsFavorisId: state => {
    return state.listVinsFavorisId
  },
  setListVinsSuggest: state => {
    return state.listVinsSuggest
  },
  setListBonPlansAll: state => {
    return state.listBonPlansAll
  },
  setListPays: state => {
    return state.listPays
  },
  setListApellation: state => {
    return state.listApellation
  },
  setListRegion: state => {
    return state.listRegion
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
