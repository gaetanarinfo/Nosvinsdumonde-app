/**
 * Store News
 *
 *************/

import axios from 'axios'
import {
  Cookies,
  Notify
} from 'quasar'

var compteur = 1;

const state = {
  listPaiementUser: [],
}

const mutations = {
  setListPaiementUser(state, value) {
    state.listPaiementUser = value
  },
}

const actions = {
  sendPaiementWithcard({

  }, payload) {

    if (compteur <= 1) {

      const paiement = {
        id: payload.user.id,
        email: payload.user.email,
        giftMessage: payload.formLivraison.giftMessage,
        paiementMethod: payload.formLivraison.paiementMethod,
        total: payload.paiement.total,
        port: payload.paiement.port,
        totalFDP: payload.paiement.totalFDP,
        vin_id: payload.paiement.vin_id,
        cashBackActive: payload.user.cashBackActive
      };

      compteur++;

      axios
        .post('/createPaiement', paiement)
        .then(res => {

          const error = res.data.error;
          const success = res.data.success;

          if (error === true) {

            Notify.create({
              position: 'top-left',
              timeout: 2500,
              type: 'positive',
              message: this.$t('MESSAGE_UPDATE_3')
            })

            setTimeout(() => {
              location.reload();
            }, 1500);
          }

          if (success === true) {

            Cookies.set('paiementToken', res.data.token, {
              secure: true,
              sameSite: 'None'
            });

            setTimeout(() => {
              location.href = 'https://nosvinsdumonde.com/fr/paiement/' + res.data.token;
            }, 1500);
          }

        })

    }

  },
  getPaiementWithPay({

  }, payload) {

    const token = payload;


    axios
      .get('/verificationPaiement/' + token)
      .then(res => {

        const success = res.data.success;

        if (success === true) {

          Cookies.remove('paiementToken');

          setTimeout(() => {
            location.href = '/#/cart/5';
          }, 1500);
        }

      })

  },
}

const getters = {
  setListPaiementUser: state => {
    return state.listPaiementUser
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
