<template>
  <div class="text-h4 text-white bloc_vin_title" style="
      font-size: 500;
      justify-content: center;
      display: flex;
      width: 100%;
      margin: 24px 0;
    ">
    <q-item class="title">{{ $t('TITLE_PAGE_ACTUALITES') }}</q-item>
  </div>

  <!-- BreadCrump -->
  <div class="q-pa-none q-gutter-sm">
    <q-breadcrumbs class="text-brown">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="white" />
      </template>

      <q-breadcrumbs-el clickable to="/" :label="$t('NAVBAR_ITEM_1')" style="color: #ffc107" />
      <q-breadcrumbs-el label="Actualités" style="color: white" />
    </q-breadcrumbs>
  </div>

  <div class="q-mb-lg q-mt-lg" v-show="showSimulatedReturnData"
    style="justify-content: center; display: flex; width: 100%">
    <q-pagination v-model="current" :max="max" :max-pages="7" @click="chargeNews()" direction-links outline
      color="orange" :boundary-numbers="false" active-color="primary" v-ripple />
  </div>

  <div class="row items-start q-gutter-md justify-center" style="margin-bottom: 0; padding: 0 0"
    v-show="showSimulatedReturnData">
    <q-card class="card_actus q-mb-lg" v-for="news in listNewsAll" :key="news.id" flat>
      <q-item class="q-pa-none">
        <div :style="
          'background-repeat: no-repeat;background: url(https://nosvinsdumonde.com/assets/img/contents/' +
          news.image +
          '); background-size: cover;width: 100%;height: 250px;border: none;border-top-left-radius: 16px;border-top-right-radius: 16px;'
        "></div>
      </q-item>

      <q-card-section>
        <div class="text-h6 q-mt-sm q-mb-xs text-bold">
          <a :href="'#/actualite/' + news.url" style="text-decoration: none; color: black">{{ decode(news.title) }}</a>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <div style="
              position: relative;
              display: inline-flex;
              vertical-align: middle;
            ">
            <div class="groupe_article">{{ news.groupeName }}</div>
          </div>
        </div>

        <div class="q-mt-sm">{{ news.content }}</div>

        <q-item class="q-mt-md q-mx-none" style="
            justify-content: space-between;
            padding: 0 0;
            align-items: center;
          ">
          <q-btn :href="'#/actualite/' + news.url" color="info" push>
            {{ $t('SUITE') }}
          </q-btn>

          <div>{{ news.date }}</div>
        </q-item>
      </q-card-section>
    </q-card>
  </div>

  <div class="q-mb-lg q-mt-lg" style="justify-content: center; display: flex; width: 100%"
    v-show="showSimulatedReturnData">
    <q-pagination v-model="current" :max="max" :max-pages="7" @click="chargeNews()" direction-links outline
      color="orange" :boundary-numbers="false" active-color="primary" v-ripple />
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
</template>

<script>
import { ref } from 'vue';
import { mapActions } from 'vuex';

let decoder;

export default {
  name: 'newsName',
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
      current: ref(1),
      max: 10,
    };
  },
  methods: {
    // Source: https://github.com/vuejs/vue/blob/v2.6.14/src/compiler/parser/entity-decoder.js
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    ...mapActions('news', ['getNewsAll']),
    chargeNews() {
      this.getNewsAll(this.current);
    },
    countNews: function (data) {
      setTimeout(() => {
        this.countNews(this.listNewsAll.length);
        this.max = parseInt(data);
      }, 300);
    },
  },
  computed: {},
  components: {},
  mounted() {
    this.countNews(this.listNewsAll.length);
    this.showTextLoading();
  },
  props: {
    listNewsAll: Array,
  },
};
</script>
