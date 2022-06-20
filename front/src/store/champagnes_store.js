/**
 * Store News
 *
 *************/

import axios from 'axios'
import {
  Cookies
} from 'quasar';

const state = {
  listChampagnes: [],
  listChampagnesOne: [],
  listChampagnesId: [],
  listIdAlliance: [],
  listIdVente: [],
  listChampagnesFavorisId: [],
  listChampagnesSuggest: [],
  listChampagnesAll: [],
  listPays: [],
  listApellation: [],
  listRegion: [],
}

var compteur = 1;

const mutations = {
  setListChampagnes(state, value) {
    state.listChampagnes = value
  },
  setOneListChampagnes(state, value) {
    state.listChampagnesOne = value
  },
  setListChampagnesId(state, value) {
    state.listChampagnesId = value
  },
  setListChampagnesIdAlliance(state, value) {
    state.listIdAlliance = value
  },
  setListChampagnesIdVente(state, value) {
    state.listIdVente = value
  },
  setListChampagnesFavorisId(state, value) {
    state.listChampagnesFavorisId = value
  },
  setListChampagnesSuggest(state, value) {
    state.listChampagnesSuggest = value
  },
  setListChampagnesAll(state, value) {
    state.listChampagnesAll = value
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
  getChampagnes({
    commit
  }) {
    axios
      .get('/champagnes')
      .then(res => {
        commit('setListChampagnes', res.data.listChampagnes)
      })
  },
  getChampagnesAll({
    commit
  }, payload) {

    const champagnes = {
      page: payload.page,
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
      .post('/champagnesAll/', champagnes)
      .then(res => {
        if (res.data.listChampagnesAll != 0) {
          commit('setListChampagnesAll', res.data.listChampagnesAll)
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
  getOneChampagnes({
    commit
  }) {
    axios
      .get('/champagnesOne')
      .then(res => {
        commit('setOneListChampagnes', res.data.listChampagnesOne)
      })
  },
  getChampagnesId({
    commit
  }, payload) {

    axios
      .get('/champagnes/' + payload)
      .then(res => {
        if (res.data.champagnesId != 0) {
          commit('setListChampagnesId', res.data.champagnesId[0])
          commit('setListChampagnesSuggest', res.data.listChampagnesSuggest)
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
      .get('/champagnesAlliances/' + payload)
      .then(res => {
        if (res.data.champagnesIdAlliances != 0) {
          commit('setListChampagnesIdAlliance', res.data.champagnesIdAlliances)
        }
      })
  },
  getVenteId({
    commit
  }, payload) {

    axios
      .get('/champagnesVente/' + payload)
      .then(res => {
        if (res.data.champagnesIdVente != 0) {
          commit('setListChampagnesIdVente', res.data.champagnesIdVente[0])
        } else {
          location.href = '/';
        }
      })
  },
  getChampagnesFavorisId({
    commit
  }, payload) {

    axios
      .get('/champagnesFavoris/' + payload)
      .then(res => {
        if (Cookies.has('favoris')) {
          if (res.data.champagnesFavorisId != 0) {
            commit('setListChampagnesFavorisId', res.data.champagnesFavorisId)
          } else {
            location.href = '/';
          }
        } else {
          location.href = '/';
        }
      })
  },
  sendAvisChampagnes({}, payload) {

    const champagnes = {
      avis_note: payload.avis_note,
      avis_prenom: payload.avis_prenom,
      avis_email: payload.avis_email,
      avis_content: payload.avis_content,
      id_champagnes: payload.id_champagnes,
    };

    if (compteur <= 1) {

      compteur++;

      axios
        .post('/postAvisChampagnes', champagnes)

    }

    setTimeout(() => {
      compteur = 1;
    }, 2500);

  },
}

const getters = {
  setListChampagnes: state => {
    return state.listChampagnes
  },
  setOneListChampagnes: state => {
    return state.listChampagnesOne
  },
  setListChampagnesId: state => {
    return state.listNewsId
  },
  setListChampagnesIdAlliance: state => {
    return state.listIdAlliance
  },
  setListChampagnesIdVente: state => {
    return state.listIdVente
  },
  setListChampagnesFavorisId: state => {
    return state.listChampagnesFavorisId
  },
  setListChampagnesSuggest: state => {
    return state.listChampagnesSuggest
  },
  setListChampagnesAll: state => {
    return state.listChampagnesAll
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
