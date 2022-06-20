/**
 * Store News
 *
 *************/

import axios from 'axios'

var compteur = 1;

const state = {
  listContact: [],
  listVinsId: [],
}

const mutations = {
  setListContact(state, value) {
    state.listContact = value
  },
  setListVinsId(state, value) {
    state.listVinsId = value
  },
}

const actions = {
  sendContact({}, payload) {

    const contact = {
      societe: payload.societe,
      prenom: payload.prenom,
      nom: payload.nom,
      email: payload.email,
      phone: payload.phone,
      sujet: payload.sujet,
      message: payload.message,
    };

    if (compteur <= 1) {

      compteur++;

      axios
        .post('/postContact', contact)

    }

    setTimeout(() => {
      compteur = 1;
    }, 2500);

  },
  getVinsId({
    commit
  }, payload) {

    axios
      .get('/vins/' + payload)
      .then(res => {
        console.log(res.data.vinsId[0]);
        if (res.data.vinsId != 0) {
          commit('setListVinsId', res.data.vinsId[0])
        } else {
          location.href = '/';
        }
      })
      .catch(error => {
        console.log(error);
      })
  },
}

const getters = {
  setListcontact: state => {
    return state.listContact
  },
  setListVinsId: state => {
    return state.listVinsId
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
