<template>
  <div class="text-center" style="align-items: center">
    <div class="border_center">
      <div v-for="appellation in listAppellations" :key="appellation.id">
        <q-btn
          push
          :to="
            '/appellation/' + appellation.id_boisson + '/' + appellation.id + ''
          "
          class="q-ma-sm"
          text-color="white"
          style="border-radius: 16px; background: #d8707d !important"
        >
          <span>{{ decode(appellation.nom_fr_fr) }}</span>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
let decoder;

export default {
  name: 'appellationsName',
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
    listAppellations: Array,
  },
};
</script>
