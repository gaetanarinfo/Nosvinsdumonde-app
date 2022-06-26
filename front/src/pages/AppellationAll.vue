<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <div class="text-h4 text-white bloc_vin_title" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
      <q-item class="title">{{ listAppellationsTitle.nom_fr_fr }}</q-item>
    </div>

    <!-- BreadCrump -->
    <div class="q-pa-none q-gutter-sm">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el clickable to="/" label="Accueil" style="color: #ffc107" />

        <q-breadcrumbs-el clickable :to="'/' + typeBoisson + ''" :label="typeBoisson"
          style="color: #ffc107; text-transform: capitalize" />
        <q-breadcrumbs-el :label="listAppellationsTitle.nom_fr_fr" style="color: white" />
      </q-breadcrumbs>
    </div>

    <div class="q-mb-lg q-mt-lg" v-show="showSimulatedReturnData"
      style="justify-content: center; display: flex; width: 100%">
      <q-pagination v-model="current" :max="max" :max-pages="7" @click="chargeAppellations()" direction-links outline
        color="orange" :boundary-numbers="false" active-color="primary" v-ripple />
    </div>

    <div class="items-start q-gutter-md justify-center" style="margin-bottom: 0; padding: 0 0; width: 100%"
      v-show="showSimulatedReturnData">
      <q-card class="card_vin q-mb-lg" flat v-for="champagnes_vins in listAppellationsAll"
        :key="champagnes_vins.idBoisson">
        <q-item class="card_imgs_vin">
          <q-img class="card_image_vin q-ma-sm" :src="
            'https://nosvinsdumonde.com/assets/img/' +
            champagnes_vins.typeBoisson +
            '/' +
            champagnes_vins.imageBoisson +
            ''
          ">
          </q-img>
        </q-item>

        <q-card-section>
          <q-item clickable :to="
            '/' +
            champagnes_vins.typeBoisson +
            '/' +
            champagnes_vins.idBoisson
          " class="text-h6 q-mt-sm q-mb-xs text-bold text-black">
            {{ decode(champagnes_vins.nomBoisson) }}
            {{ champagnes_vins.millesimeBoisson }}
          </q-item>
          <div class="q-mt-lg">
            <span class="badge_region" style="margin: 0 auto">{{
            champagnes_vins.regionBoisson
            }}</span>
          </div>

          <q-item class="q-my-md q-mx-none" style="justify-content: start; padding: 1em 0">
            <q-btn :to="
              '/' +
              champagnes_vins.typeBoisson +
              '/' +
              champagnes_vins.idBoisson
            " push color="warning">
              Découvrir
            </q-btn>
          </q-item>

          <div>
            <span class="text-caption">{{
            champagnes_vins.apellationBoisson
            }}</span>
          </div>
          <div class="q-mt-sm prix">
            <span><span class="chiffre">{{
            replaceVirgule(champagnes_vins.prixBoisson)
            }}</span>
              €</span>
          </div>
          <div class="contenance text-subtitle1">
            <span>Bouteille de {{ champagnes_vins.contenanceBoisson }}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-mb-lg q-mt-lg" style="justify-content: center; display: flex; width: 100%"
      v-show="showSimulatedReturnData">
      <q-pagination v-model="current" :max="max" :max-pages="7" @click="chargeAppellations()" direction-links outline
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
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapActions, mapState } from 'vuex';

let decoder;

var counter = 1;

export default {
  name: 'appellationsName',
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
      max: 1,
      typeBoisson: 'vins',
    };
  },
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
    ...mapActions('appellations', ['getAppellationsAll']),
    ...mapActions('appellations', ['getAppellationsTitle']),
    ...mapActions('appellations', ['getAppellationsCount']),
    chargeAppellations() {
      this.getAppellationsAll({
        page: this.current,
        id: this.$route.params.id,
      });
    },
    countVins() {
      if (counter <= 1) {
        setTimeout(() => {
          if (this.listAppellationsCount <= 19) this.max = 1;
          else this.max = parseInt(this.listAppellationsCount);
          counter++;
        }, 300);
      }
    },
  },
  computed: {},
  components: {},
  mounted() {
    this.showTextLoading();
    this.getAppellationsAll({ page: this.current, id: this.$route.params.id });
    this.getAppellationsTitle(this.$route.params.id);
    this.getAppellationsCount(this.$route.params.id);
    this.countVins();

    if (this.$route.params.typeBoisson == 1) {
      this.typeBoisson = 'vins';
    } else if (this.$route.params.typeBoisson == 2) {
      this.typeBoisson = 'champagnes';
    }
  },
  computed: {
    ...mapState('appellations', ['listAppellationsAll']),
    ...mapState('appellations', ['listAppellationsTitle']),
    ...mapState('appellations', ['listAppellationsCount']),
  },
};
</script>
