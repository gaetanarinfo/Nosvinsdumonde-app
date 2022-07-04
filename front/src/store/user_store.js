/**
 * Store Auth
 *
 *************/
import axios from 'axios'
import {
  Cookies,
  Notify
} from 'quasar'

// outside of a Vue file
import {
  Quasar
} from 'quasar'

Quasar.lang.getLocale() // returns a string

if (Quasar.lang.getLocale() == 'fr-FR') {

  var langs = {
    MESSAGE_USER_1: 'Votre compte ne semble pas exister sur Nosvinsdumonde !',
    MESSAGE_USER_2: 'Le mot de passe ne correspond pas à vore compte !',
    MESSAGE_USER_3: 'Merci de votre visite',
    MESSAGE_USER_4: ' à bientôt !',
    MESSAGE_USER_4_4: 'Votre compte semble exister sur Nosvinsdumonde !',
    MESSAGE_USER_5: 'Merci pour votre inscription ',
    MESSAGE_USER_6: 'Votre profil est maintenant à jour.',
    MESSAGE_USER_7: 'Vous n\'avez pas assez de point !',
    MESSAGE_USER_8: 'Vos points ont été transformés en euro.',
    BONJOUR: 'Bonjour',
    MESSAGE_USER_5: 'Merci pour votre inscription ',
    MESSAGE_FORGOT_SUCCESS: 'Vous allez recevoir un email prochainement.',
  }

} else if (Quasar.lang.getLocale() == 'en-US') {

  var langs = {
    MESSAGE_USER_1: 'Your account does not seem to exist on Nosvinsdumonde !',
    MESSAGE_USER_2: 'The password does not match your account!',
    MESSAGE_USER_3: 'Thank you for visiting',
    MESSAGE_USER_4: 'see you soon!',
    MESSAGE_USER_4: 'Your account seems to exist on Nosvinsdumonde !',
    MESSAGE_USER_5: 'Thank you for registering',
    MESSAGE_USER_6: 'Your profile is now up to date.',
    MESSAGE_USER_7: 'You don\'t have enough points!',
    MESSAGE_USER_8: 'Your points have been converted into euros.',
    BONJOUR: 'Hello',
    MESSAGE_FORGOT_SUCCESS: 'You will receive an email soon.',
  }

}

const state = {
  listUser: {},
  loggedIn: false,
  logged: false,
  token: null,
  points: 0,
  cashback: 0,
  listCommandesHistorique: [],
  listColisHistorique: [],
}

if (!Cookies.has('setLoggedIn')) {
  Cookies.set('setLoggedIn', false, {
    secure: true,
    sameSite: 'None'
  })
}

var compteur = 1;
var compteur2 = 1;
var compteur3 = 1;
var compteur4 = 1;
var compteur5 = 1;

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
  setPoints(state, value) {
    state.points = value
  },
  setCashBack(state, value) {
    state.cashback = value
  },
  setListCommandes(state, value) {
    state.listCommandesHistorique = value
  },
  setListColis(state, value) {
    state.listColisHistorique = value
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
            message: langs.MESSAGE_USER_1,
            timeout: 2500,
          });
        }

        if (err2 === true) {
          Notify.create({
            position: 'top-left',
            type: 'negative',
            message: t('MESSAGE_USER_2'),
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
              message: langs.BONJOUR + ` ${res.data.sess.firstname} ${res.data.sess.lastname}`
            })

            Cookies.set('setLoggedIn', true, {
              secure: true,
              sameSite: 'None'
            });

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
          } else {
            commit('setLoggedIn', false)
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

        const sess = localStorage.getItem('active');

        if (sess == 1) {

          commit('setLoggedIn', true)

        } else {

          document.location.href = '#/';

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
          message: langs.MESSAGE_USER_3 + ` ${payload} ` + langs.MESSAGE_USER_4
        })

        Cookies.set('setLoggedIn', false, {
          secure: true,
          sameSite: 'None'
        });

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
              message: langs.MESSAGE_USER_4_4,
              timeout: 2500,
            });

          }

          Notify.create({
            position: 'top-left',
            timeout: 2500,
            type: 'positive',
            message: langs.MESSAGE_USER_5 + ` ${users.prenom} ${users.nom} !`
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
              message: langs.MESSAGE_USER_4_4,
              timeout: 2500,
            });

          }

          if (success === true) {

            Notify.create({
              position: 'top-left',
              timeout: 2500,
              type: 'positive',
              message: langs.MESSAGE_1_NEWSLETTER
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
  updateUser({}, payload) {



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

    if (compteur3 <= 1) {

      compteur3++;

      axios
        .post('/update', users)
        .then((res) => {

          const error = res.data.error;
          const success = res.data.success;

          // User empty
          if (error === true) {

            Notify.create({
              position: 'top-left',
              type: 'negative',
              message: langs.MESSAGE_2_NEWSLETTER,
              timeout: 2500,
            });

          }

          if (success === true) {
            Notify.create({
              position: 'top-left',
              timeout: 2500,
              type: 'positive',
              message: langs.MESSAGE_USER_6
            })
          }

        });

    }

    setTimeout(() => {
      compteur3 = 1;
    }, 2500);

  },
  convertPointCash({}, payload) {



    const users = {
      id: payload.id,
      email: payload.email,
    };

    if (compteur4 <= 1) {

      compteur4++;

      axios
        .post('/convertCashback', users)
        .then((res) => {

          const error = res.data.error;
          const success = res.data.success;

          // User empty
          if (error === true) {

            Notify.create({
              position: 'top-left',
              type: 'negative',
              message: langs.MESSAGE_USER_7,
              timeout: 2500,
            });

          }

          if (success === true) {
            Notify.create({
              position: 'top-left',
              timeout: 2500,
              type: 'positive',
              message: langs.MESSAGE_USER_8,
            })

          }

        });

    }

    setTimeout(() => {
      compteur4 = 1;
    }, 2500);

  },
  verifPointCash({
    // commit
  }, payload) {



    axios
      .get('/verifCashback/' + payload)
      .then((res) => {

        const point = res.data.point;
        const cashback = res.data.cashback;

        Cookies.set('cashback', cashback, {
          secure: true,
          sameSite: 'None'
        });
        Cookies.set('point', point, {
          secure: true,
          sameSite: 'None'
        });

      })
  },
  getHistoriqueCommandes({
    commit
  }, payload) {



    axios
      .get('/commandesHistorique/' + payload)
      .then(res => {
        commit('setListCommandes', {
          data1: res.data.listCommandesHistorique,
          data2: res.data.listCommandesHistoriquePort,
          data3: res.data.listCommandesHistoriquePrix,
          data4: res.data.listCommandesHistorique.length,
        })
      })
  },
  getHistoriqueColis({
    commit
  }, payload) {



    axios
      .get('/colisHistorique/' + payload)
      .then(res => {
        commit('setListColis',
          res.data.listcolisHistorique,
        )
      })
  },
  forgotUser({}, payload) {

    const users = {
      email: payload.email,
    };

    if (compteur5 <= 1) {

      compteur5++;

      axios
        .post('/forgot', users)
        .then((res) => {

          const err = res.data.error;
          const suc = res.data.success;

          // User empty
          if (err === true) {

            Notify.create({
              position: 'top-left',
              type: 'negative',
              message: langs.MESSAGE_USER_1,
              timeout: 2500,
            });

          }

          if (suc === true) {
            Notify.create({
              position: 'top-left',
              timeout: 2500,
              type: 'positive',
              message: langs.MESSAGE_FORGOT_SUCCESS
            })
          }

        });

    }

    setTimeout(() => {
      compteur5 = 1;
    }, 2500);

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
  setPoints(state) {
    return state.points
  },
  setCashBack(state) {
    return state.cashback
  },
  setListCommandes(state) {
    return state.listCommandesHistorique
  },
  setListColis(state) {
    return state.listColisHistorique
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
