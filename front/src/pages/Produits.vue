<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <div class="text-h4 text-white bloc_vin_title" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
      <q-item class="title">{{ $t('TITLE_PAGE_PRODUITS') }}</q-item>
    </div>

    <!-- BreadCrump -->
    <div v-if="listProduitsAll.length !== 0" style="justify-content: center; display: flex; width: 100%"
      v-show="showSimulatedReturnData">

      <q-pagination v-model="page" :input="true" input-class="text-info" :min="currentPage"
        :max="Math.ceil(listProduitsAll.length / totalPages)" direction-links outline color="orange"
        :boundary-numbers="false" active-color="primary" v-ripple />
    </div>

    <div class="items-start q-gutter-md justify-center q-mt-md" style="margin-bottom: 0; padding: 0 0; width: 100%"
      v-show="showSimulatedReturnData">
      <q-card class="card_vin q-mb-lg" flat v-for="(produits, index) in getData" :key="index.idBoisson">
        <q-item class="card_imgs_vin">
          <q-img class="card_image_vin q-ma-sm" :src="
            'https://nosvinsdumonde.com/assets/img/' +
            produits.typeBoisson +
            '/' +
            produits.imageBoisson +
            ''
          ">
          </q-img>
        </q-item>

        <q-card-section>
          <q-item clickable :to="'/' + produits.typeBoisson + '/' + produits.idBoisson"
            class="text-h6 q-mt-sm q-mb-xs text-bold text-black" style="padding: 0 0">
            {{ decode(produits.nomBoisson) }}
            {{ produits.millesimeBoisson }}
          </q-item>
          <div class="q-mt-lg">
            <span class="badge_region" style="margin: 0 auto">{{
                produits.regionBoisson
            }}</span>
          </div>

          <q-item class="q-my-md q-mx-none" style="justify-content: start; padding: 1em 0">
            <q-btn :to="'/' + produits.typeBoisson + '/' + produits.idBoisson" push color="warning">
              {{ $t('DECOUVRIR_BTN') }}
            </q-btn>
          </q-item>

          <div>
            <span class="text-caption">{{ produits.apellationBoisson }}</span>
          </div>
          <div class="q-mt-sm prix">
            <span><span class="chiffre">{{
                replaceVirgule(produits.prixBoisson)
            }}</span>
              €</span>
          </div>
          <div class="contenance text-subtitle1">
            <span>{{ $t('CONTENANCE') }} {{ produits.contenanceBoisson }}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Loader -->
    <div style="position: relative; min-height: 5vw; width: 100%">
      <div :showing="visible" v-show="visible" class="container-md q-mt-lg q-mb-lg" style="padding: 0 5vw">
        <div id="load" class="col text-center">
          <div id="loaderComment" class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { ref } from 'vue';

let decoder;

export default {
  name: 'produitsAll',
  setup() {
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);
    return {
      visible,
      showSimulatedReturnData,
      showTextLoading() {
        visible.value = true;
        showSimulatedReturnData.value = false;

        setTimeout(() => {
          visible.value = false;
          showSimulatedReturnData.value = true;
        }, 1500);
      },
    };
  },
  data() {
    return {
      dense: ref(null),
      page: 1,
      nextPage: null,
      totalPages: 20,
      filter: '',
      loading: false,
      mode: true,
      perPage: 20,
      currentPage: 1,
    };
  },
  components: {},
  methods: {
    ...mapActions('produits', ['getProduitsAll']),
    // Source: https://github.com/vuejs/vue/blob/v2.6.14/src/compiler/parser/entity-decoder.js
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    replaceVirgule(html) {
      return (html + '').replace('.', ',');
    },
  },
  computed: {
    ...mapState('produits', ['listProduitsAll']),
    getData() {
      return this.listProduitsAll.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
    },
  },
  mounted() {
    this.getProduitsAll();
    this.showTextLoading();
  },
};
</script>
