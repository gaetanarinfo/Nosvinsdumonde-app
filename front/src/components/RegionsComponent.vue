<template>
  <div class="text-center" style="align-items: center">
    <div>
      <div v-for="region in listRegions" :key="region.id">
        <q-btn
          push
          :to="'/regions/' + region.id_boisson + '/' + region.id + ''"
          class="q-ma-sm"
          text-color="white"
          style="border-radius: 16px; background: #d8707d !important"
        >
          <span>{{ decode(region.nom_fr_fr) }}</span>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
let decoder;

export default {
  name: 'regionsName',
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
    listRegions: Array,
  },
};
</script>
