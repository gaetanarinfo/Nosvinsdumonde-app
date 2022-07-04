<template>
  <div class="row items-start q-gutter-md justify-center" style="margin-bottom: 0; padding: 0 0">
    <q-card class="card_vin q-mb-lg" flat v-for="vins in listVins" :key="vins.idBoisson">
      <q-item class="card_imgs_vin">
        <q-img class="card_image_vin q-ma-sm" :src="
          'https://nosvinsdumonde.com/assets/img/' +
          vins.typeBoisson +
          '/' +
          vins.imageBoisson +
          ''
        ">
        </q-img>
      </q-item>

      <q-card-section>
        <q-item clickable :to="'/' + vins.typeBoisson + '/' + vins.idBoisson"
          class="text-h6 q-mt-sm q-mb-xs text-bold text-black" style="padding: 0 0">
          {{ decode(vins.nomBoisson) }} {{ vins.millesimeBoisson }}
        </q-item>
        <div class="q-mt-lg">
          <span class="badge_region">{{ vins.regionBoisson }}</span>
        </div>

        <q-item class="q-my-md q-mx-none" style="justify-content: start; padding: 1em 0;text-transform: uppercase;">
          <q-btn :to="'/' + vins.typeBoisson + '/' + vins.idBoisson" push color="warning">
            {{ $t('DECOUVRIR_BTN') }}
          </q-btn>
        </q-item>

        <div>
          <span class="text-caption">{{ vins.apellationBoisson }}</span>
        </div>
        <div class="q-mt-sm prix">
          <span><span class="chiffre">{{ replaceVirgule(vins.prixBoisson) }}</span>
            €</span>
        </div>
        <div class="contenance text-subtitle1">
          <span>{{ $t('CONTENANCE') }} {{ vins.contenanceBoisson }}</span>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
let decoder;

export default {
  name: 'vinsName',
  methods: {
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
  components: {},
  props: {
    listVins: Array,
  },
};
</script>
