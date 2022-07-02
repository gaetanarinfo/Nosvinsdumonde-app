<template>

  <div class=" items-start" style="padding: 0 5vw; flex-direction: column">

    <!-- BreadCrump -->
    <div class="q-pa-none q-mt-lg q-gutter-sm">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el clickable to="/" :label="$t('NAVBAR_ITEM_1')" style="color: #ffc107" />
        <q-breadcrumbs-el clickable href="/#/vins" :label="$t('LINK_7')" style="color: #ffc107" />
        <q-breadcrumbs-el :label="decode(listVinsId.nomBoisson)" style="color: white" />
      </q-breadcrumbs>
    </div>

    <div class="container-md q-mt-lg q-mb-lg" id="bloc_vin_jour" v-show="showSimulatedReturnData">
      <div class="align-items-start">
        <div id="presentation_vin" class="col-md-3">
          <div class="text-center"
            :style="(listVinsId.stickerBoisson != '' && listVinsId.stickerBoisson != null) ? 'display: flex;' : ''">
            <div>
              <img :src="
                'https://nosvinsdumonde.com/assets/img/' +
                listVinsId.typeBoisson +
                '/' +
                listVinsId.imageBoisson +
                ''
              " class="img-fluid rounded-start" :alt="decode(listVinsId.nomBoisson)" />
            </div>

            <div v-if="listVinsId.stickerBoisson != '' && listVinsId.stickerBoisson != null">
              <img :src="
                'https://nosvinsdumonde.com/assets/img/stickers/' +
                listVinsId.stickerBoisson +
                ''
              " class="img-fluid rounded-start" />
            </div>
          </div>

          <div class="text-center q-mt-lg">
            <q-btn :to="'/contact/claim/' + listVinsId.idBoisson + ''" push size="20px" text-color="white"
              style="text-transform: initial; background: #d8707d">{{ $t('VIN_ME') }}</q-btn>
          </div>

          <div class="text-center q-mt-lg">
            <h5 class="text-white" style="font-size: 1.25rem; font-weight: 400">
              {{ $t('PARTAGER') }}
            </h5>

            <section class="q-mt-lg">
              <!-- Facebook -->
              <a class="btn-floating m-1" :href="
                'https://www.facebook.com/sharer/sharer.php?u=https://nosvinsdumonde.com/fr/' +
                listVinsId.typeBoisson +
                '/' +
                listVinsId.idBoisson +
                ''
              " onclick="window.open(this.href);return false;" role="button"><img
                  src="https://nosvinsdumonde.com/assets/img/socials/facebook-Icon.png" alt="Facebook" /></a>

              <!-- Twitter -->
              <a class="btn-floating q-ml-md" :href="
                'https://twitter.com/share?url=https://nosvinsdumonde.com/fr/' +
                listVinsId.typeBoisson +
                '/' +
                listVinsId.idBoisson +
                '&amp;text=' +
                decode(listVinsId.nomBoisson) +
                '&amp;via=novinsdumonde'
              " onclick="window.open(this.href);return false;" role="button"><img
                  src="https://nosvinsdumonde.com/assets/img/socials/Twitter-Icon.png" alt="Twitter" /></a>
            </section>
          </div>
        </div>

        <div class="col q-mt-lg">
          <div class="bloc_mobile align-items-start">
            <div id="bloc_descriptif" class="col pb-3 text-left">
              <h1 class="text-white">
                {{ decode(listVinsId.nomBoisson) }}
                {{ listVinsId.millesimeBoisson }}
              </h1>

              <div class="m-auto q-mb-lg text-left">
                <span class="badge_region" style="margin-left: 0; margin-right: 0">{{ listVinsId.regionBoisson }}</span>
              </div>

              <div class="m-auto text-white">
                <span>{{ listVinsId.apellationBoisson }}</span>
              </div>

              <div class="m-auto text-white q-mb-md">
                <span>{{ listVinsId.couleurBoisson }}</span><span> | </span><span>{{ listVinsId.degreeBoisson
                }}</span><span>°</span>
              </div>

              <hr v-if="listVinsId.niveauCepagesBoisson" />

              <div v-if="listVinsId.niveauCepagesBoisson" class="note_cepages q-mt-md q-mb-md">
                <i v-for="note in 5" :key="note" class="fa-solid fa-leaf" v-bind:class="
                  note > listVinsId.niveauCepagesBoisson ? 'empty' : ''
                "></i>
              </div>

              <hr />

              <div class="q-mt-md q-mb-md">
                <div>
                  <a class="text-white" @click="modal = true"><i
                      class="fa-brands fa-affiliatetheme q-mr-sm"></i><span>{{ $t('AVIS') }}</span></a>
                </div>
                <div v-show="verifCookie" @click="removeLike()" role="button"
                  class="q-mb-md q-mt-md add_favoris_unclick remove_favoris text-white favoris_i">
                  <i class="fa-solid fa-heart-circle-minus q-mr-sm"></i>{{ $t('REMOVE_FAVORIS') }}
                </div>
                <div v-show="!verifCookie" role="button" @click="addLike(), verifCookieBtn()"
                  class="q-mb-md q-mt-md add_favoris text-white favoris_i">
                  <i class="fa-solid fa-heart q-mr-sm"></i>{{ $t('ADD_FAVORIS') }}
                </div>
              </div>

              <hr />

              <div class="q-mt-md q-mb-md">
                <span class="text-white">Réf : </span><span class="text-white">0{{ listVinsId.idBoisson }}</span>
              </div>
            </div>

            <div class="col">
              <h3 class="text-white text-end no-border q-pa-none q-ma-none">
                {{ replaceVirgule(listVinsId.prixBoisson) }}<span> €</span>
              </h3>

              <div class="text-end">
                <span class="text-white no_border" style="font-size: 1rem">{{ $t('CONTENANCE') }} {{
                    listVinsId.contenanceBoisson
                }}</span><br />
                <span class="text-white" style="font-size: 1rem">{{ $t('SOIT') }} {{
                    replaceVirgule(listVinsId.soitBoisson)
                }} € /
                  {{ $t('LITRE') }}</span>
              </div>

              <div class="text-end q-mt-md">
                <q-btn v-if="listVinsId.stockBoisson == '1'" color="warning" style="text-transform: uppercase" size="lg"
                  class="add_cart" @click="addCart()"><i class="fa-solid fa-bag-shopping q-mr-sm"></i>{{ $t('ADD_CART')
                  }}</q-btn>
                <q-btn size="lg" color="info" outline v-if="listVinsId.stockBoisson != '1'"
                  class="btn btn-outline-info btn-lg disabled q-mb-md"><i
                    class="fa-solid fa-bag-shopping q-mr-sm"></i>{{ $t('ERROR_CART') }}</q-btn>
                <p v-if="listVinsId.stockBoisson != '1'" style="color: #ffc107">
                  {{ $t('EMPTY_PRODUIT') }}
                </p>
                <p class="text-white q-mt-md">
                  {{ listIdVente.idCount }} {{ $t('COUNT_PRODUITS') }}
                </p>
              </div>

              <div class="text-end q-mt-lg mini_bloc">
                <h5 class="text-white fw-bold">{{ $t('GARDE') }}</h5>
                <span class="text-white">{{ listVinsId.gardeBoisson }}</span>
              </div>

              <div class="text-end q-mt-lg mini_bloc">
                <h5 class="text-white fw-bold">{{ $t('SERVICE') }}</h5>
                <span class="text-white">{{ listVinsId.temperatureBoisson }}</span><span class="text-white">°</span>
              </div>

              <div class="text-end q-mt-lg mini_bloc" v-show="listVinsId.contentCepagesBoisson != undefined">
                <h5 class="text-white fw-bold">{{ $t('GRAPES') }}</h5>
                <span class="text-white" v-html="listVinsId.contentCepagesBoisson"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center q-mt-lg q-mt-lg" v-if="listIdAlliance.length != 0">
        <div class="q-mb-lg">
          <h2 class="text-white title_alliances title_domaine">
            {{ $t('ALLIANCE_METS') }}
          </h2>
        </div>
      </div>

      <div class="align-items-start q-mt-lg">
        <div style="text-align: center">
          <ul class="list-group groupe_alliances q-mt-lg q-pa-none">
            <li class="list-group-item" v-for="alliance in listIdAlliance" :key="alliance">
              <span class="alliance_mini_icon">
                <img :src="
                  'https://nosvinsdumonde.com/assets/img/alliances/' +
                  alliance.image +
                  ''
                " alt="" />
              </span>

              <div class="q-mt-md">
                <span class="alliance_mini_text" v-if="locale == 'en-US'">{{ alliance.en }}</span>
                <span class="alliance_mini_text" v-else-if="locale == 'fr-FR'">{{ alliance.fr }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="text-center q-mt-lg q-mt-lg" v-if="listVinsId.vinSaviezVousBoisson">
        <div class="q-mb-lg">
          <h2 class="text-white title_alliances title_domaine">
            {{ $t('SAVEZ_VOUS') }}
          </h2>
        </div>
      </div>

      <div class="align-items-start q-mt-lg">
        <div class="justify-content-center">
          <p class="card-title text-white">
            {{ decode(listVinsId.vinSaviezVousBoisson) }}
          </p>
        </div>
      </div>

      <div class="text-center q-mt-lg q-mt-lg">
        <div class="q-mb-lg">
          <h2 style="text-transform: uppercase;" class="text-white title_alliances title_domaine">
            {{ $t('CARACTERISTIQUES') }}
          </h2>
        </div>

        <div class="align-items-start q-mt-xl" id="bloc_vin_selection">
          <div class="justify-content-center">
            <div class="col-lg-5">
              <div class="card card1 mb-4 shadow">
                <div class="g-0">
                  <div class="col-md-12">
                    <div class="card-body text-center flex-column q-px-md" style="min-height: 284px">
                      <div class="text-center q-mt-md q-mb-md">
                        <img :src="
                          'https://nosvinsdumonde.com/assets/img/gout/' +
                          listVinsId.imageGoutBoisson +
                          ''
                        " :autocapitalize="listVinsId.nomGoutBoisson2" />
                      </div>
                      <div>
                        <h3 class="card-title text-white" v-if="listVinsId.nomGoutBoisson2">
                          {{ $t(listVinsId.nomGoutBoisson2) }}
                        </h3>
                        <h3 v-else class="card-title text-white">
                          {{ listVinsId.nomGoutBoisson }}
                        </h3>
                      </div>

                      <div>
                        <p class="text-white" v-if="listVinsId.contentCaracteristiqueBoisson2 && locale == 'en-US'">
                          {{ $t(listVinsId.contentCaracteristiqueBoisson2) }}
                        </p>

                        <p class="text-white" v-else>
                          {{ listVinsId.contentCaracteristiqueBoisson }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-5 q-mt-lg" v-if="listVinsId.titreCaracteristiqueBoisson != ''">
              <div class="card card2 mb-4 shadow">
                <div class="g-0">
                  <div class="col-md-12">
                    <div class="card-body q-px-md text-center">
                      <h3 class="card-title text-dark"
                        v-if="listVinsId.titreCaracteristiqueBoisson2 && locale == 'en-US'">
                        {{ $t(listVinsId.titreCaracteristiqueBoisson2) }}
                      </h3>

                      <h3 class="card-title text-dark" v-else>
                        {{ listVinsId.titreCaracteristiqueBoisson }}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center q-mb-lg q-mt-lg">
        <div class="q-mb-lg">
          <h2 style="text-transform: uppercase;" class="text-white title_alliances title_domaine title_domaine_mobile">
            {{ $t('DOMAINE') }}
          </h2>
        </div>

        <div id="bloc_desc" class="align-items-start">
          <div class="col text-white">
            <h3 class="text-white text-bold no-border">
              {{ decode(listVinsId.nomBoisson) }}
            </h3>

            <!--<div>{{ listVinsId.contentDefinitionBoisson }}</div>-->
          </div>

          <div class="col q-mt-lg q-mb-lg">
            <img style="max-width: 100%" :src="
              'https://nosvinsdumonde.com/assets/img/domaine_images/' +
              listVinsId.domaineImageBoisson +
              ''
            " />
          </div>
        </div>

        <div class="align-items-start">
          <div class="col q-mt-lg" style="
            background: #fcb714;
            min-height: 314px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          " v-show="listVinsId.contentCepagesBoisson != undefined"
            v-if="listVinsId.contentCepagesBoisson != undefined">
            <h3 class="text-white no-border">{{ $t('GRAPES') }}</h3>

            <p class="text-white q-mt-md fw-bold" v-html="listVinsId.contentCepagesBoisson"></p>
          </div>

          <div v-if="listVinsId.contentCepagesBoisson != undefined" class="q-mt-lg"
            style="width: 100%;justify-content: center; align-items: center;">
            <DoughnutChart :chartId="'vins_' + listVinsId.idBoisson" v-if="showSimulatedReturnData"
              :listChampagnesId="listVinsId.chartContentCepagesBoisson"
              :listChampagnesId2="listVinsId.chartNumberCepagesBoisson" />
          </div>
        </div>

        <div id="produits" class="container-md q-mt-lg q-mb-lg">
          <h2 class="text-white title_alliances title_domaine title_domaine_mobile">
            <span>{{ $t('RELATION_VIN') }}</span>
          </h2>
        </div>

        <div class="items-start q-mt-lg">
          <q-card class="card_vin q-mb-lg" flat v-for="vins in listVinsSuggest" :key="vins.idBoisson">
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
              <q-item clickable :to="'/' + vins.typeBoisson + '/' + vins.idBoisson" @click="actuBtn(vins.idBoisson)"
                class="text-h6 q-pa-none q-mt-sm q-mb-xs text-bold text-black">
                {{ decode(vins.nomBoisson) }} {{ vins.millesimeBoisson }}
              </q-item>
              <div class="q-mt-lg">
                <span class="badge_region">{{ vins.apellationBoisson }}</span>
              </div>

              <q-item class="q-my-md q-mx-none"
                style="justify-content: start; padding: 1em 0; text-transform: uppercase;">
                <q-btn :to="'/' + vins.typeBoisson + '/' + vins.idBoisson" @click="actuBtn(vins.idBoisson)"
                  color="warning" push>
                  {{ $t('DECOUVRIR_BTN') }}
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
                <span>{{ $t('CONTENANCE') }} {{ vins.contenanceBoisson }}</span>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Modal Signal Comment -->
    <template>
      <q-dialog v-model="modal" id="avisModal" persistent transition-show="rotate" transition-hide="rotate">
        <q-card style="max-height: 50vh" class="scroll">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6" style="font-size: 17px">{{ $t('AVIS') }}</div>
            <q-space />
            <q-btn icon="close" size="sm" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <p>{{ $t('MODAL_AVIS_SUBTITLE') }}</p>

            <div class="text-center">
              <q-rating v-model="ratingModel" icon="wine_bar" size="3em" color="#d29f05" @click="changeRating()">
              </q-rating>
            </div>

            <q-form ref="myForm" class="q-gutter-md q-mt-md">
              <q-input v-model="form.avis_prenom" :label="$t('COND_PRENOM')" lazy-rules type="text" :rules="[
                (val) =>
                  (val && val.length > 2) || $('VEUILLEZ_TAPEZ'),
              ]" />

              <q-input v-model="form.avis_email" :label="$t('COND_EMAIL')" lazy-rules type="email" :rules="[
                (val) =>
                  (val && val.length > 2) || $('VEUILLEZ_TAPEZ'),
              ]" />

              <q-input v-model="form.avis_content" lazy-rules type="text" :label="$t('COND_AVIS')" :rules="[
                (val) =>
                  (val && val.length > 2) || $('VEUILLEZ_TAPEZ'),
              ]" />

              <div>
                <q-btn :label="$t('VALIDER')" @click="onSubmit()" type="submit" color="positive"
                  :disabled="submitted" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </template>

    <!-- Loader -->
    <div :showing="visible" v-show="visible" class="container-md q-mt-lg q-mb-lg" style="width: 100%;">
      <div id="load" class="col text-center">
        <div id="loaderComment" class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#bloc_vin_selection .card.card1 .card-body {
  background: #213156;
}
</style>

<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { Cookies } from 'quasar';
import { useI18n } from 'vue-i18n'

import DoughnutChart from '../components/doughnutChart'

moment.locale('fr');

let decoder;
var counter = 1;

export default {
  name: 'articleId',
  components: { DoughnutChart },
  setup() {
    const $q = useQuasar();
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);

    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
      showNotif() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: this.$t('MESSAGE_1'),
          timeout: 2500,
        });
      },
      showNotifCookie() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: this.$t('MESSAGE_FAV'),
          timeout: 2500,
        });
      },
      showNotifError() {
        $q.notify({
          position: 'top-left',
          type: 'negative',
          message: this.$t('MESSAGE_2'),
          timeout: 2500,
        });
      },
      showNotifCookieError() {
        $q.notify({
          position: 'top-left',
          type: 'warning',
          message: this.$t('MESSAGE_FAV2'),
          timeout: 2500,
        });
      },
      showNotifRemoveCookie() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: this.$t('MESSAGE_FAV_REMOVE'),
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
      showNotifCart() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: this.$t('VIN_ADD_CART'),
          timeout: 2500,
        });
      },
    };
  },
  data() {
    return {
      verifCookie: false,
      ratingModel: ref(1),
      submitted: false,
      alliances: [],
      form: {
        avis_note: null,
        avis_prenom: null,
        avis_email: null,
        avis_content: null,
        id_vins: this.$route.params.id,
      },
      // Source: https://github.com/vuejs/vue/blob/v2.6.14/src/compiler/parser/entity-decoder.js
      decode(html) {
        decoder = decoder || document.createElement('div');
        decoder.innerHTML = html;
        return decoder.innerHTML;
      },
      replaceVirgule(html) {
        return (html + '').replace('.', ',');
      },
      modal: ref(false),
    };
  },
  computed: {
    ...mapState('vins', ['listVinsId']),
    ...mapState('vins', ['listIdAlliance']),
    ...mapState('vins', ['listIdVente']),
    ...mapState('vins', ['listVinsSuggest']),
    isComplete() {
      return this.avis_content && this.avis_email && this.avis_prenom;
    },
  },
  methods: {
    ...mapActions('vins', ['getVinsId']),
    ...mapActions('vins', ['getAllianceId']),
    ...mapActions('vins', ['getVenteId']),
    ...mapActions('vins', ['sendAvisVins']),
    changeRating() {
      this.form.avis_note = this.ratingModel;
    },
    onSubmit() {
      if (
        this.form.avis_content != null &&
        this.form.avis_email != null &&
        this.form.avis_prenom != null
      ) {
        if (this.submitted) return;
        this.$refs.myForm.validate().then(() => {
          this.sendAvisVins(this.form);
          this.sendAvisVins(this.form).then(() => {
            this.showNotif();
            this.modal = false;
          });
          this.sendAvisVins(this.form).catch(() => {
            this.showNotifError();
          });
        });

        this.submitted = true;

        setTimeout(() => {
          this.submitted = false;
        }, 2500);
      } else {
        this.showNotifError();
      }
    },
    addLike() {
      if (Cookies.has('favoris')) {
        const value = Cookies.get('favoris');
        if (value.indexOf(this.$route.params.id) === -1) {
          Cookies.set('favoris', value + '-' + this.$route.params.id, {
            secure: true,
            sameSite: 'None'
          });
          this.showNotifCookie();
        } else {
          this.showNotifCookieError();
        }
      } else {
        Cookies.set('favoris', this.$route.params.id, {
          secure: true,
          sameSite: 'None'
        });
        this.showNotifCookie();
      }
    },
    removeLike() {
      if (Cookies.has('favoris')) {
        var cookie = Cookies.get('favoris');
        var input = this.$route.params.id;

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
        this.showNotifRemoveCookie();
      }
    },
    verifCookieBtn() {
      const value = Cookies.get('favoris');
      if (value.indexOf(this.$route.params.id) !== -1) {
        this.verifCookie = true;
      }
    },
    addCart() {
      if (Cookies.has('cart')) {
        const value = Cookies.get('cart');
        Cookies.set('cart', value + '-' + this.$route.params.id, {
          secure: true,
          sameSite: 'None'
        });
        this.showNotifCart();
        setTimeout(() => {
          this.$router.push('/cart/1');
        }, 200);
      } else {
        Cookies.set('cart', this.$route.params.id, {
          secure: true,
          sameSite: 'None'
        });
        this.showNotifCart();
        setTimeout(() => {
          this.$router.push('/cart/1');
        }, 200);
      }
    },
    alliance() {
      if (counter <= 1) {
        counter++;

        setTimeout(() => {
          // Alliances
          var alliances = this.listVinsId.allianceBoisson;

          if (alliances != undefined) {
            alliances = alliances.split(',');

            this.alliances = alliances;

            this.getAllianceId(alliances);

            this.alliance();
          }
        }, 500);
      }
    },
    actuBtn(id) {
      this.showTextLoading();
      this.getVinsId(id);
      this.getVenteId(id);
      this.alliance();
    },
  },
  mounted() {
    const value = Cookies.get('favoris');
    if (Cookies.has('favoris') && value.indexOf(this.$route.params.id) !== -1) {
      this.verifCookie = true;
    }
    this.getVinsId(this.$route.params.id);
    this.getVenteId(this.$route.params.id);
    this.showTextLoading();
    this.alliance();
  },
  props: {},
};
</script>
