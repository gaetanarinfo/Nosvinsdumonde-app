<template>
  <div class="items-start" style="padding: 0 5vw; flex-direction: column">
    <div class="text-h4 text-white bloc_vin_title q-mb-lg q-mt-lg" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
      <q-item class="title">Mes favoris</q-item>
    </div>

    <!-- BreadCrump -->
    <div class="q-pa-none q-gutter-sm q-mb-lg">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el clickable to="/" :label="$t('NAVBAR_ITEM_1')" style="color: #ffc107" />
        <q-breadcrumbs-el label="Favoris" style="color: white" />
      </q-breadcrumbs>
    </div>

    <div class="items-start q-mt-lg" v-show="showSimulatedReturnData">
      <q-card class="card_vin q-mb-lg" flat v-for="vins in listVinsFavorisId" :key="vins.idBoisson">
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
            class="text-h6 q-pa-none q-mt-sm q-mb-xs text-bold text-black">
            {{ decode(vins.nomBoisson) }} {{ vins.millesimeBoisson }}
          </q-item>
          <div class="q-mt-lg">
            <span class="badge_region">{{ vins.apellationBoisson }}</span>
          </div>

          <q-item class="q-my-md q-mx-none" style="justify-content: start; padding: 1em 0">
            <q-btn :to="'/' + vins.typeBoisson + '/' + vins.idBoisson" color="warning" push>
              Découvrir
            </q-btn>

            <q-btn @click="removeFavoris(vins.idBoisson)" push color="red" class="q-ml-md remove_favoris favoris_i"><i
                class="fa-solid fa-trash-can" style="color: white"></i>
            </q-btn>
          </q-item>

          <div class="text-left">
            <span class="text-caption">{{ vins.regionBoisson }}</span>
          </div>

          <div class="q-mt-sm prix text-left">
            <span><span class="chiffre">{{
            replaceVirgule(vins.prixBoisson)
            }}</span>
              €</span>
          </div>

          <div class="contenance text-subtitle1 text-left">
            <span>Bouteille de {{ vins.contenanceBoisson }}</span>
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
// import moment from 'moment';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { Cookies } from 'quasar';

let decoder;

export default {
  name: 'FavorisData',
  setup() {
    const $q = useQuasar();
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);
    return {
      showNotifCookie() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: 'Votre vin a bien été supprimer de vos favoris.',
          timeout: 2500,
        });
      },
      showNotifCookieError() {
        $q.notify({
          position: 'top-left',
          type: 'warning',
          message: "Votre vin n'a pas été supprimer de vos favoris !",
          timeout: 2500,
        });
      },
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
  //  data() {}
  components: {},
  computed: {
    ...mapState('vins', ['listVinsFavorisId']),
  },
  methods: {
    ...mapActions('vins', ['getVinsFavorisId']),
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    replaceVirgule(html) {
      return (html + '').replace('.', ',');
    },
    removeFavoris(id) {
      if (Cookies.has('favoris')) {
        var cookie = Cookies.get('favoris');
        var input = id;

        if (cookie.indexOf(input + '-') != -1) {
          var total = cookie.replace(input + '-', '');
          Cookies.set('favoris', total, {
            secure: true,
            sameSite: 'None'
          });
        } else if (cookie.indexOf('-' + input) != -1) {
          var total = cookie.replace('-' + input, '');
          Cookies.set('favoris', total, {
            secure: true,
            sameSite: 'None'
          });
        }

        if (cookie.split('-').length === 1) {
          Cookies.remove('favoris');
        }

        this.verifCookie = false;
        this.showNotifCookie();
        setTimeout(() => {
          this.getVinsFavorisId(Cookies.get('favoris'));
        }, 1200);
      }
    },
  },
  components: {},
  mounted() {
    this.getVinsFavorisId(Cookies.get('favoris'));
    this.showTextLoading();
  },
  props: {},
};
</script>
