/**
 * Store Auth
 *
 *************/

import axios from 'axios'
import {
  Notify
} from 'quasar'

const state = {
  listUser: {},
  loggedIn: false,
  logged: false,
  token: null
}

var compteur = 1;
var compteur2 = 1;

const mutations = {
  setListUser(state, value) {
    state.listUser = value
  },
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setListParams(state, value) {
    state.listParams = value
  },
}

const actions = {
  loginUser({
    commit
  }, payload) {
    axios
      .post('/login', {
        email: payload.email,
        password: payload.password,
        page: payload.page
      })
      .then((res) => {

        const err = res.data.error,
          err2 = res.data.error2

        // User empty
        if (err === true) {
          Notify.create({
            position: 'top-left',
            type: 'negative',
            message: 'Votre compte ne semble pas exister sur Nosvinsudmonde !',
            timeout: 2500,
          });
        }

        if (err2 === true) {
          Notify.create({
            position: 'top-left',
            type: 'negative',
            message: 'Le mot de passe ne correspond pas à vore compte !',
            timeout: 2500,
          })
        } else {
          commit('errorLogged', false);
        }

        if (err !== true && err !== true) {

          localStorage.setItem('active', res.data.sess.status)
          localStorage.setItem('admin', res.data.sess.admin)
          localStorage.setItem('lastname', res.data.sess.lastname)
          localStorage.setItem('firstname', res.data.sess.firstname)
          localStorage.setItem('userId', res.data.sess._id)
          localStorage.setItem('token', res.data.token)

          const sess = localStorage.getItem('active')

          if (sess == 1) {

            Notify.create({
              position: 'top-left',
              timeout: 2500,
              type: 'positive',
              message: `Bonjour ${res.data.sess.firstname} ${res.data.sess.lastname}`
            })

            setTimeout(function () {
              commit('setLoggedIn', true);
              if (payload.page == 'cart') {
                document.location.href = '#/cart/3';
                location.reload()
              } else {
                document.location.href = '/';
              }

            }, 2000);

          }

        }

      })
  },
  handleAuthStateChange({
    commit
  }) {

    const token = localStorage.getItem('token')

    axios
      .get('/session/' +
        token
      )
      .then(() => {

        if (token) {

          const sess = localStorage.getItem('active')

          if (sess === 1) {
            commit('setLoggedIn', true)
          }

        } else {
          commit('setLoggedIn', false)
        }

      })
  },
  logged({
    commit
  }) {

    const token = localStorage.getItem('token')

    if (token !== null) {

      axios
        .get('/session/', {
          token
        })
        .then(() => {

          const sess = localStorage.getItem('active')

          if (sess === 1) {

            commit('setLoggedIn', true)

          }
        })

    }
  },
  loggedDataUser({
    commit
  }) {

    const userToken = localStorage.getItem('token')

    if (userToken !== null) {

      axios
        .get('/profil/' + userToken)
        .then((res) => {

          if (userToken != '') {

            commit('setListUser', res.data.userData[0])

          }

        })

    }

  },
  loggedAuth({
    commit
  }) {

    const token = localStorage.getItem('token')

    axios
      .get('/session/', {
        token
      })
      .then(() => {

        const sess = localStorage.getItem('active')

        if (sess !== 1) {

          document.location.href = '#/login';

        } else {

          commit('setLoggedIn', true)

        }
      })
  },
  logoutUser({
    commit
  }, payload) {
    axios
      .get('/logout')
      .then(() => {

        Notify.create({
          position: 'top-left',
          timeout: 2500,
          type: 'positive',
          message: `Merci de votre visite ${payload} à bientôt !`
        })

        setTimeout(function () {
          localStorage.removeItem('sess', null)
          localStorage.removeItem('token', null)
          localStorage.removeItem('status', null)
          localStorage.removeItem('admin', null)
          localStorage.removeItem('userId', null)
          commit('setLoggedIn', false);
          document.location.href = '/';
        }, 2000);
      })
  },
  registerUser({}, payload) {

    const users = {
      email2: payload.email2,
      password2: payload.password2,
      societe: payload.societe,
      societeName: payload.societeName,
      civilite: payload.civilite,
      nom: payload.nom,
      prenom: payload.prenom,
      adresse: payload.adresse,
      ville: payload.ville,
      code_postal: payload.code_postal,
      pays: payload.pays,
      phone: payload.phone,
      livraison: payload.livraison,
      nom_livraison: payload.nom_livraison,
      prenom_livraison: payload.prenom_livraison,
      adresse_livraison: payload.adresse_livraison,
      ville_livraison: payload.ville_livraison,
      code_postal_livraison: payload.code_postal_livraison,
      pays_livraison: payload.pays_livraison,
      carte: payload.carte,
    };

    if (compteur <= 1) {

      compteur++;

      axios
        .post('/register', users)
        .then((res) => {

          const err = res.data.error;

          // User empty
          if (err === true) {

            Notify.create({
              position: 'top-left',
              type: 'negative',
              message: 'Votre compte semble exister sur Nosvinsudmonde !',
              timeout: 2500,
            });

          }

          Notify.create({
            position: 'top-left',
            timeout: 2500,
            type: 'positive',
            message: `Merci pour votre inscription ${users.prenom} ${users.nom} !`
          })

        });

    }

    setTimeout(() => {
      compteur = 1;
    }, 2500);

  },
  newsLetterUser({}, payload) {

    const newsletter = {
      email: payload.email,
    };

    if (compteur2 <= 1) {

      compteur2++;

      axios
        .post('/newsletter', newsletter)
        .then((res) => {

          const err = res.data.error;
          const success = res.data.success;

          // User empty
          if (err === true) {

            Notify.create({
              position: 'top-left',
              type: 'negative',
              message: 'Votre compte semble exister sur Nosvinsudmonde !',
              timeout: 2500,
            });

          }

          if (success === true) {

            Notify.create({
              position: 'top-left',
              timeout: 2500,
              type: 'positive',
              message: 'Nous avons tenu compte de votre abonnement à notre newsletter.',
            })

          }

        });

    }

    setTimeout(() => {
      compteur2 = 1;
    }, 2500);

  },
  paramsVerif({
    commit
  }) {
    axios
      .get('/params')
      .then((res) => {
        commit('setListParams', res.data.listParams);
      })
  },
}

const getters = {
  setListUser(state) {
    return state.listUser
  },
  setLoggedIn(state) {
    return state.loggedIn
  },
  setListParams(state) {
    return state.listParams
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
