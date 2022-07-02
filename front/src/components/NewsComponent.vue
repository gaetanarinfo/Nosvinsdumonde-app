<template>
  <div class="row items-start q-gutter-md justify-center" style="margin-bottom: 0; padding: 0 0">
    <q-card class="card_actus q-mb-lg" v-for="news in listNews" :key="news.id" flat>
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
          <q-btn :href="'#/actualite/' + news.url" push color="info">
            {{ $t('SUITE') }}
          </q-btn>

          <div>{{ news.date }}</div>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
let decoder;

export default {
  name: 'newsName',
  methods: {
    // Source: https://github.com/vuejs/vue/blob/v2.6.14/src/compiler/parser/entity-decoder.js
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
  },
  components: {},
  props: {
    listNews: Array,
  },
};
</script>
