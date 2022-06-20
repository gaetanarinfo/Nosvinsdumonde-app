/**
 * Store News
 *
 *************/

import axios from 'axios'

var compteur = 1;
var compteur2 = 1;

const state = {
  listNews: [],
  listNewsSearch: [],
  listNewsSearch2: [],
  listNewsReadMore: [],
  listNewsAll: [],
  listNewsId: [],
  listNewsCommentsId: [],
  listNewsCommentsCount: [],
}

const mutations = {
  setListNews(state, value) {
    state.listNews = value
  },
  setListNewsSearch(state, value) {
    state.listNewsSearch = value
  },
  setListNewsSearch2(state, value) {
    state.listNewsSearch2 = value
  },
  setListNewsAll(state, value) {
    state.listNewsAll = value
  },
  setListNewsReadMore(state, value) {
    state.listNewsReadMore = value
  },
  setListNewsId(state, value) {
    state.listNewsId = value
  },
  setListNewsCommentsId(state, value) {
    state.listNewsCommentsId = value
  },
  setListNewsCommentsCount(state, value) {
    state.listNewsCommentsCount = value
  }
}

const actions = {
  getNews({
    commit
  }) {
    axios
      .get('/actualites')
      .then(res => {
        commit('setListNews', res.data.listNews)
      })
  },
  getNewsId({
    commit
  }, payload) {

    axios
      .get('/actualite/' + payload)
      .then(res => {
        if (res.data.articleId[0]) {
          commit('setListNewsReadMore', res.data.listNewsReadMore);
          commit('setListNewsId', res.data.articleId[0])
        } else {
          location.href = '/';
        }
      })
  },
  getNewsCommentsId({
    commit
  }, payload) {

    axios
      .get('/actualite/' + payload)
      .then(res => {
        commit('setListNewsCommentsId', res.data.articleCommentsId)
        commit('setListNewsCommentsCount', res.data.articleCommentsId.length)
      })
  },
  sendCommentAbuse({}, payload) {

    const comments = {
      email_comm: payload.email_comm,
      message_comm: payload.message_comm,
      title_comm: payload.title_comm,
      id_actu: payload.id_actu,
      id_comm: payload.id_comment,
      id_comm: payload.id_comment,
      url_comm: payload.url_comm
    };

    if (compteur <= 1) {

      compteur++;

      axios
        .post('/postCommentActualite', comments)

    }

    setTimeout(() => {
      compteur = 1;
    }, 2500);

  },
  sendComment({}, payload) {

    const comments = {
      c_mail: payload.c_mail,
      c_message: payload.c_message,
      c_nom: payload.c_nom,
      id_actu: payload.id_actu
    };

    if (compteur2 <= 1) {

      compteur2++;

      axios
        .post('/postCommentActualiteSend', comments)

    }

    setTimeout(() => {
      compteur2 = 1;
    }, 2500);

  },
  getNewsAll({
    commit
  }, payload) {

    axios
      .get('/actualitesAll/' + payload)
      .then(res => {
        if (res.data.listNewsAll != 0) {
          commit('setListNewsAll', res.data.listNewsAll)
        } else {
          location.href = '/';
        }
      })
  },
  getNewsSearch({
    commit
  }, payload) {

    axios
      .get('/searchPage/' + payload)
      .then(res => {
        console.log(res.data);
        if (res.data.listNewsSearch != 0) {
          commit('setListNewsSearch', res.data.listNewsSearch)
        }
      })

    axios
      .get('/searchPage2/' + payload)
      .then(res => {
        console.log(res.data);
        if (res.data.listNewsSearch2 != 0) {
          commit('setListNewsSearch2', res.data.listNewsSearch2)
        }
      })
  },
}

const getters = {
  setListNews: state => {
    return state.listNews
  },
  setListNewsSearch: state => {
    return state.listNewsSearch
  },
  setListNewsSearch2: state => {
    return state.listNewsSearch2
  },
  setListNewsAll: state => {
    return state.listNewsAll
  },
  setListNewsReadMore: state => {
    return state.listNewsReadMore
  },
  setListNewsId: state => {
    return state.listNewsId
  },
  setListNewsCommentsId: state => {
    return state.listNewsCommentsId
  },
  setListNewsCommentsCount: state => {
    return state.listNewsCommentsCount
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
