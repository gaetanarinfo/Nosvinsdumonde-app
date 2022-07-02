<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <div class="text-h4 text-white bloc_vin_title" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
      <q-item class="title">{{ $t('TITLE_PAGE_VINS') }}</q-item>
    </div>

    <q-item class="q-pa-none text-white">
      {{ $t('SUBTITLE_PAGE_VINS') }}
    </q-item>

    <!-- BreadCrump -->
    <div class="q-pa-none q-mt-md q-gutter-sm">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el clickable to="/" :label="$t('NAVBAR_ITEM_1')" style="color: #ffc107" />
        <q-breadcrumbs-el :label="$t('NAVBAR_ITEM_2')" style="color: white" />
      </q-breadcrumbs>
    </div>

    <div class="q-mb-lg q-mt-lg" v-show="showSimulatedReturnData" style="
        justify-content: center;
        display: flex;
        width: 100%;
        flex-direction: column;
      ">
      <div class="col-md-12">
        <div>
          <h3 class="text-white">{{ $t('FILTER_BY') }}</h3>
        </div>

        <div class="q-mt-md w-100">
          <form>
            <div style="justify-content: center">
              <div class="q-mb-md col-md-2">
                <label @click="millesimeShowing = !millesimeShowing" class="form-label text-white millesime"><i
                    class="fa-solid q-mr-sm" v-bind:class="
                      millesimeShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "></i>{{ $t('MILLESIME') }}</label>

                <div v-show="millesimeShowing">
                  <q-select :options="stringOptions" transition-show="flip-up" transition-hide="flip-down"
                    v-model="form.millesime" :dense="dense" emit-value map-options dark text-color="white"
                    style="max-height: 100px" behavior="menu" @update:model-value="changeForm()">
                  </q-select>
                </div>
              </div>

              <div class="q-mb-md col-md-2">
                <label class="form-label text-white couleur" @click="couleurShowing = !couleurShowing"><i
                    class="fa-solid q-mr-sm" v-bind:class="
                      couleurShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "></i>{{ $t('COULEUR') }}</label>
                <div v-show="couleurShowing">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <q-item clickable v-model="form.couleur" class="bottle"
                        @click="changeFormCouleur(1), changeForm()">
                        <span class="bottle_wine" style="background: #f2d785"><i class="fas fa-wine-bottle"
                            aria-hidden="true"></i></span>
                        <span class="bottle_wine_text">{{ $t('BLANC') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item class="bottle" clickable v-model="form.couleur"
                        @click="changeFormCouleur(2), changeForm()">
                        <span class="bottle_wine" style="background: #fe7162"><i class="fas fa-wine-bottle"
                            aria-hidden="true"></i></span>
                        <span class="bottle_wine_text">{{ $t('ROSE') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.couleur" class="bottle"
                        @click="changeFormCouleur(3), changeForm()">
                        <span class="bottle_wine" style="background: #7a0201"><i class="fas fa-wine-bottle"
                            aria-hidden="true"></i></span>
                        <span class="bottle_wine_text">{{ $t('ROUGE') }}</span>
                      </q-item>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="q-mb-md col-md-2">
                <label class="form-label text-white prix" @click="prixShowing = !prixShowing"><i
                    class="fa-solid q-mr-sm" v-bind:class="
                      prixShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "></i>{{ $t('PRIX') }} <span class="ms-1 text-warning">(</span><span
                    class="text-warning rangePrix">{{
                        form.prix.min
                    }} à {{ form.prix.max }}</span><span class="text-warning"> €)</span></label>
                <div v-show="prixShowing">
                  <q-range v-model="form.prix" :step="15" label :min="0" :max="2200" dark color="deep-orange"
                    @update:model-value="changeForm()" />
                </div>
              </div>

              <div class="q-mb-md col-md-2">
                <label class="form-label text-white pays" @click="paysShowing = !paysShowing"><i
                    class="fa-solid q-mr-sm" v-bind:class="
                      paysShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "></i>{{ $t('PAYS') }}</label>
                <q-select :options="stringOptions2" transition-show="flip-up" transition-hide="flip-down"
                  v-model="form.pays" :dense="dense" dark emit-value map-options text-color="white"
                  style="max-height: 100px" behavior="menu" v-show="paysShowing" @update:model-value="changeForm()" />
              </div>

              <div class="q-mb-md col-md-2">
                <label @click="regionShowing = !regionShowing" class="form-label text-white region"><i
                    class="fa-solid q-mr-sm" v-bind:class="
                      regionShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "></i>{{ $t('REGION') }}</label>
                <q-select v-show="regionShowing" :options="stringOptions4" transition-show="flip-up"
                  transition-hide="flip-down" v-model="form.region" :dense="dense" dark emit-value map-options
                  text-color="white" style="max-height: 100px" behavior="menu" @update:model-value="changeForm()">
                </q-select>
              </div>

              <div class="q-mb-md col-md-2">
                <label class="form-label text-white appellation" @click="apellationShowing = !apellationShowing"><i
                    class="fa-solid q-mr-sm" v-bind:class="
                      apellationShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "></i>{{ $t('APPELLATION') }}</label>
                <q-select v-show="apellationShowing" :options="stringOptions3" transition-show="flip-up"
                  transition-hide="flip-down" v-model="form.appellation" :dense="dense" dark emit-value map-options
                  text-color="white" style="max-height: 100px" behavior="menu" @update:model-value="changeForm()">
                </q-select>
              </div>

              <div class="q-mb-md col-md-3">
                <label class="form-label text-white gout" @click="goutShowing = !goutShowing"><i
                    class="fa-solid q-mr-sm" v-bind:class="
                      goutShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "></i>{{ $t('GOUT') }}</label>
                <div v-show="goutShowing">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <q-item clickable v-model="form.couleur" class="gout_item"
                        @click="changeFormGout(1), changeForm()">
                        <span class="gout_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_1.png" /></span>
                        <span class="gout_text">{{ $t('GOUT_1') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.couleur" class="gout_item"
                        @click="changeFormGout(2), changeForm()">
                        <span class="gout_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_2.png" /></span>
                        <span class="gout_text">{{ $t('GOUT_2') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.couleur" class="gout_item"
                        @click="changeFormGout(3), changeForm()">
                        <span class="gout_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_3.png" /></span>
                        <span class="gout_text">{{ $t('GOUT_3') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.couleur" class="gout_item"
                        @click="changeFormGout(4), changeForm()">
                        <span class="gout_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_4.png" /></span>
                        <span class="gout_text">{{ $t('GOUT_4') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.couleur" class="gout_item"
                        @click="changeFormGout(5), changeForm()">
                        <span class="gout_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_5.png" /></span>
                        <span class="gout_text">{{ $t('GOUT_5') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.couleur" class="gout_item"
                        @click="changeFormGout(6), changeForm()">
                        <span class="gout_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_6.png" /></span>
                        <span class="gout_text">{{ $t('GOUT_6') }}</span>
                      </q-item>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="q-mb-md col-md-2">
                <label class="form-label text-white alliance" @click="allianceShowing = !allianceShowing"><i
                    class="fa-solid q-mr-sm" v-bind:class="
                      allianceShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "></i>{{ $t('ALLIANCE') }}</label>
                <div v-show="allianceShowing">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(1), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_1.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_1') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(2), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_2.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_2') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(3), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_3.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_3') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(4), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_4.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_4') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(5), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_5.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_5') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(6), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_5.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_6') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(7), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_7.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_7') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(8), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_8.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_8') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(9), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_9.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_9') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(10), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_10.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_10') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(11), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_11.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_11') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(12), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_12.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_12') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(13), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_13.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_13') }}</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item clickable v-model="form.alliance" class="alliance_item"
                        @click="changeFormAlliance(14), changeForm()">
                        <span class="alliance_icon"><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_14.png" /></span>
                        <span class="alliance_text">{{ $t('ALLIANCE_14') }}</span>
                      </q-item>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="q-mb-md col-md-2 filter" style="display: none">
                <q-btn push color="warning"><i class="fa-solid fa-eraser q-mr-sm"></i><b>Effacer les filtres</b></q-btn>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div v-if="listVinsAll.length !== 0" style="justify-content: center; display: flex; width: 100%"
        v-show="showSimulatedReturnData">

        <q-pagination v-model="page" :input="true" input-class="text-info" :min="currentPage"
          :max="Math.ceil(listVinsAll.length / totalPages)" direction-links outline color="orange"
          :boundary-numbers="false" active-color="primary" v-ripple />
      </div>
    </div>

    <q-item v-if="listVinsAll.length === 0" v-show="showSimulatedReturnData" class="q-ma-none q-pa-none text-white"
      style="text-align: center;margin: 0px auto;display: flex;justify-content: center;flex-direction: column;align-content: center;">
      <span style="font-size: 18px;" v-show="showSimulatedReturnData">{{ $t('EMPTY_search') }}</span>
      <img style="margin: 0 auto;max-width: 180px;" v-show="showSimulatedReturnData"
        src="https://nosvinsdumonde.fr/assets/img/empty_search.png" alt="" />
    </q-item>

    <div class="items-start q-gutter-md justify-center" style="margin-bottom: 0; padding: 0 0; width: 100%"
      v-show="showSimulatedReturnData">

      <q-card id="my-table" class="card_vin q-mb-lg" flat v-for="(vins, index) in getData" :key="index">
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
            <span class="badge_region" style="margin: 0 auto">{{
                vins.regionBoisson
            }}</span>
          </div>

          <q-item class="q-my-md q-mx-none" style="justify-content: start; padding: 1em 0; text-transform: uppercase;">
            <q-btn :to="'/' + vins.typeBoisson + '/' + vins.idBoisson" push color="warning">
              {{ $t('DECOUVRIR_BTN') }}
            </q-btn>
          </q-item>

          <div>
            <span class="text-caption">{{ vins.apellationBoisson }}</span>
          </div>
          <div class="q-mt-sm prix">
            <span><span class="chiffre">{{
                replaceVirgule(vins.prixBoisson)
            }}</span>
              €</span>
          </div>
          <div class="contenance text-subtitle1">
            <span>{{ $t('CONTENANCE') }} {{ vins.contenanceBoisson }}</span>
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

var stringOptions = [];

var stringOptions2 = [
  {
    value: 1,
    label: 'Afghanistan',
  },
  {
    value: 2,
    label: 'Albanie',
  },
  {
    value: 3,
    label: 'Antarctique',
  },
  {
    value: 4,
    label: 'Algérie',
  },
  {
    value: 5,
    label: 'Samoa Américaines',
  },
  {
    value: 6,
    label: 'Andorre',
  },
  {
    value: 7,
    label: 'Angola',
  },
  {
    value: 8,
    label: 'Antigua-et-Barbuda',
  },
  {
    value: 9,
    label: 'Azerbaïdjan',
  },
  {
    value: 10,
    label: 'Argentine',
  },
  {
    value: 11,
    label: 'Australie',
  },
  {
    value: 12,
    label: 'Autriche',
  },
  {
    value: 13,
    label: 'Bahamas',
  },
  {
    value: 14,
    label: 'Bahreïn',
  },
  {
    value: 15,
    label: 'Bangladesh',
  },
  {
    value: 16,
    label: 'Arménie',
  },
  {
    value: 17,
    label: 'Barbade',
  },
  {
    value: 18,
    label: 'Belgique',
  },
  {
    value: 19,
    label: 'Bermudes',
  },
  {
    value: 20,
    label: 'Bhoutan',
  },
  {
    value: 21,
    label: 'Bolivie',
  },
  {
    value: 22,
    label: 'Bosnie-Herzégovine',
  },
  {
    value: 23,
    label: 'Botswana',
  },
  {
    value: 24,
    label: 'Île Bouvet',
  },
  {
    value: 25,
    label: 'Brésil',
  },
  {
    value: 26,
    label: 'Belize',
  },
  {
    value: 27,
    label: "Territoire Britannique de l'Océan Indien",
  },
  {
    value: 28,
    label: 'Îles Salomon',
  },
  {
    value: 29,
    label: 'Îles Vierges Britanniques',
  },
  {
    value: 30,
    label: 'Brunéi Darussalam',
  },
  {
    value: 31,
    label: 'Bulgarie',
  },
  {
    value: 32,
    label: 'Myanmar',
  },
  {
    value: 33,
    label: 'Burundi',
  },
  {
    value: 34,
    label: 'Bélarus',
  },
  {
    value: 35,
    label: 'Cambodge',
  },
  {
    value: 36,
    label: 'Cameroun',
  },
  {
    value: 37,
    label: 'Canada',
  },
  {
    value: 38,
    label: 'Cap-vert',
  },
  {
    value: 39,
    label: 'Îles Caïmanes',
  },
  {
    value: 40,
    label: 'République Centrafricaine',
  },
  {
    value: 41,
    label: 'Sri Lanka',
  },
  {
    value: 42,
    label: 'Tchad',
  },
  {
    value: 43,
    label: 'Chili',
  },
  {
    value: 44,
    label: 'Chine',
  },
  {
    value: 45,
    label: 'Taïwan',
  },
  {
    value: 46,
    label: 'Île Christmas',
  },
  {
    value: 47,
    label: 'Îles Cocos (Keeling)',
  },
  {
    value: 48,
    label: 'Colombie',
  },
  {
    value: 49,
    label: 'Comores',
  },
  {
    value: 50,
    label: 'Mayotte',
  },
  {
    value: 51,
    label: 'République du Congo',
  },
  {
    value: 52,
    label: 'République Démocratique du Congo',
  },
  {
    value: 53,
    label: 'Îles Cook',
  },
  {
    value: 54,
    label: 'Costa Rica',
  },
  {
    value: 55,
    label: 'Croatie',
  },
  {
    value: 56,
    label: 'Cuba',
  },
  {
    value: 57,
    label: 'Chypre',
  },
  {
    value: 58,
    label: 'République Tchèque',
  },
  {
    value: 59,
    label: 'Bénin',
  },
  {
    value: 60,
    label: 'Danemark',
  },
  {
    value: 61,
    label: 'Dominique',
  },
  {
    value: 62,
    label: 'République Dominicaine',
  },
  {
    value: 63,
    label: 'Équateur',
  },
  {
    value: 64,
    label: 'El Salvador',
  },
  {
    value: 65,
    label: 'Guinée Équatoriale',
  },
  {
    value: 66,
    label: 'Éthiopie',
  },
  {
    value: 67,
    label: 'Érythrée',
  },
  {
    value: 68,
    label: 'Estonie',
  },
  {
    value: 69,
    label: 'Îles Féroé',
  },
  {
    value: 70,
    label: 'Îles (malvinas) Falkland',
  },
  {
    value: 71,
    label: 'Géorgie du Sud et les Îles Sandwich du Sud',
  },
  {
    value: 72,
    label: 'Fidji',
  },
  {
    value: 73,
    label: 'Finlande',
  },
  {
    value: 74,
    label: 'Îles Åland',
  },
  {
    value: 75,
    label: 'France',
  },
  {
    value: 76,
    label: 'Guyane Française',
  },
  {
    value: 77,
    label: 'Polynésie Française',
  },
  {
    value: 78,
    label: 'Terres Australes Françaises',
  },
  {
    value: 79,
    label: 'Djibouti',
  },
  {
    value: 80,
    label: 'Gabon',
  },
  {
    value: 81,
    label: 'Géorgie',
  },
  {
    value: 82,
    label: 'Gambie',
  },
  {
    value: 83,
    label: 'Territoire Palestinien Occupé',
  },
  {
    value: 84,
    label: 'Allemagne',
  },
  {
    value: 85,
    label: 'Ghana',
  },
  {
    value: 86,
    label: 'Gibraltar',
  },
  {
    value: 87,
    label: 'Kiribati',
  },
  {
    value: 88,
    label: 'Grèce',
  },
  {
    value: 89,
    label: 'Groenland',
  },
  {
    value: 90,
    label: 'Grenade',
  },
  {
    value: 91,
    label: 'Guadeloupe',
  },
  {
    value: 92,
    label: 'Guam',
  },
  {
    value: 93,
    label: 'Guatemala',
  },
  {
    value: 94,
    label: 'Guinée',
  },
  {
    value: 95,
    label: 'Guyana',
  },
  {
    value: 96,
    label: 'Haïti',
  },
  {
    value: 97,
    label: 'Îles Heard et Mcdonald',
  },
  {
    value: 98,
    label: 'Saint-Siège (état de la Cité du Vatican)',
  },
  {
    value: 99,
    label: 'Honduras',
  },
  {
    value: 100,
    label: 'Hong-Kong',
  },
  {
    value: 101,
    label: 'Hongrie',
  },
  {
    value: 102,
    label: 'Islande',
  },
  {
    value: 103,
    label: 'Inde',
  },
  {
    value: 104,
    label: 'Indonésie',
  },
  {
    value: 105,
    label: "République Islamique d'Iran",
  },
  {
    value: 106,
    label: 'Iraq',
  },
  {
    value: 107,
    label: 'Irlande',
  },
  {
    value: 108,
    label: 'Israël',
  },
  {
    value: 109,
    label: 'Italie',
  },
  {
    value: 110,
    label: "Côte d'Ivoire",
  },
  {
    value: 111,
    label: 'Jamaïque',
  },
  {
    value: 112,
    label: 'Japon',
  },
  {
    value: 113,
    label: 'Kazakhstan',
  },
  {
    value: 114,
    label: 'Jordanie',
  },
  {
    value: 115,
    label: 'Kenya',
  },
  {
    value: 116,
    label: 'République Populaire Démocratique de Corée',
  },
  {
    value: 117,
    label: 'République de Corée',
  },
  {
    value: 118,
    label: 'Koweït',
  },
  {
    value: 119,
    label: 'Kirghizistan',
  },
  {
    value: 120,
    label: 'République Démocratique Populaire Lao',
  },
  {
    value: 121,
    label: 'Liban',
  },
  {
    value: 122,
    label: 'Lesotho',
  },
  {
    value: 123,
    label: 'Lettonie',
  },
  {
    value: 124,
    label: 'Libéria',
  },
  {
    value: 125,
    label: 'Jamahiriya Arabe Libyenne',
  },
  {
    value: 126,
    label: 'Liechtenstein',
  },
  {
    value: 127,
    label: 'Lituanie',
  },
  {
    value: 128,
    label: 'Luxembourg',
  },
  {
    value: 129,
    label: 'Macao',
  },
  {
    value: 130,
    label: 'Madagascar',
  },
  {
    value: 131,
    label: 'Malawi',
  },
  {
    value: 132,
    label: 'Malaisie',
  },
  {
    value: 133,
    label: 'Maldives',
  },
  {
    value: 134,
    label: 'Mali',
  },
  {
    value: 135,
    label: 'Malte',
  },
  {
    value: 136,
    label: 'Martinique',
  },
  {
    value: 137,
    label: 'Mauritanie',
  },
  {
    value: 138,
    label: 'Maurice',
  },
  {
    value: 139,
    label: 'Mexique',
  },
  {
    value: 140,
    label: 'Monaco',
  },
  {
    value: 141,
    label: 'Mongolie',
  },
  {
    value: 142,
    label: 'République de Moldova',
  },
  {
    value: 143,
    label: 'Montserrat',
  },
  {
    value: 144,
    label: 'Maroc',
  },
  {
    value: 145,
    label: 'Mozambique',
  },
  {
    value: 146,
    label: 'Oman',
  },
  {
    value: 147,
    label: 'Namibie',
  },
  {
    value: 148,
    label: 'Nauru',
  },
  {
    value: 149,
    label: 'Népal',
  },
  {
    value: 150,
    label: 'Pays-Bas',
  },
  {
    value: 151,
    label: 'Antilles Néerlandaises',
  },
  {
    value: 152,
    label: 'Aruba',
  },
  {
    value: 153,
    label: 'Nouvelle-Calédonie',
  },
  {
    value: 154,
    label: 'Vanuatu',
  },
  {
    value: 155,
    label: 'Nouvelle-Zélande',
  },
  {
    value: 156,
    label: 'Nicaragua',
  },
  {
    value: 157,
    label: 'Niger',
  },
  {
    value: 158,
    label: 'Nigéria',
  },
  {
    value: 159,
    label: 'Niué',
  },
  {
    value: 160,
    label: 'Île Norfolk',
  },
  {
    value: 161,
    label: 'Norvège',
  },
  {
    value: 162,
    label: 'Îles Mariannes du Nord',
  },
  {
    value: 163,
    label: 'Îles Mineures Éloignées des États-Unis',
  },
  {
    value: 164,
    label: 'États Fédérés de Micronésie',
  },
  {
    value: 165,
    label: 'Îles Marshall',
  },
  {
    value: 166,
    label: 'Palaos',
  },
  {
    value: 167,
    label: 'Pakistan',
  },
  {
    value: 168,
    label: 'Panama',
  },
  {
    value: 169,
    label: 'Papouasie-Nouvelle-Guinée',
  },
  {
    value: 170,
    label: 'Paraguay',
  },
  {
    value: 171,
    label: 'Pérou',
  },
  {
    value: 172,
    label: 'Philippines',
  },
  {
    value: 173,
    label: 'Pitcairn',
  },
  {
    value: 174,
    label: 'Pologne',
  },
  {
    value: 175,
    label: 'Portugal',
  },
  {
    value: 176,
    label: 'Guinée-Bissau',
  },
  {
    value: 177,
    label: 'Timor-Leste',
  },
  {
    value: 178,
    label: 'Porto Rico',
  },
  {
    value: 179,
    label: 'Qatar',
  },
  {
    value: 180,
    label: 'Réunion',
  },
  {
    value: 181,
    label: 'Roumanie',
  },
  {
    value: 182,
    label: 'Fédération de Russie',
  },
  {
    value: 183,
    label: 'Rwanda',
  },
  {
    value: 184,
    label: 'Sainte-Hélène',
  },
  {
    value: 185,
    label: 'Saint-Kitts-et-Nevis',
  },
  {
    value: 186,
    label: 'Anguilla',
  },
  {
    value: 187,
    label: 'Sainte-Lucie',
  },
  {
    value: 188,
    label: 'Saint-Pierre-et-Miquelon',
  },
  {
    value: 189,
    label: 'Saint-Vincent-et-les Grenadines',
  },
  {
    value: 190,
    label: 'Saint-Marin',
  },
  {
    value: 191,
    label: 'Sao Tomé-et-Principe',
  },
  {
    value: 192,
    label: 'Arabie Saoudite',
  },
  {
    value: 193,
    label: 'Sénégal',
  },
  {
    value: 194,
    label: 'Seychelles',
  },
  {
    value: 195,
    label: 'Sierra Leone',
  },
  {
    value: 196,
    label: 'Singapour',
  },
  {
    value: 197,
    label: 'Slovaquie',
  },
  {
    value: 198,
    label: 'Viet Nam',
  },
  {
    value: 199,
    label: 'Slovénie',
  },
  {
    value: 200,
    label: 'Somalie',
  },
  {
    value: 201,
    label: 'Afrique du Sud',
  },
  {
    value: 202,
    label: 'Zimbabwe',
  },
  {
    value: 203,
    label: 'Espagne',
  },
  {
    value: 204,
    label: 'Sahara Occidental',
  },
  {
    value: 205,
    label: 'Soudan',
  },
  {
    value: 206,
    label: 'Suriname',
  },
  {
    value: 207,
    label: 'Svalbard etÎle Jan Mayen',
  },
  {
    value: 208,
    label: 'Swaziland',
  },
  {
    value: 209,
    label: 'Suède',
  },
  {
    value: 210,
    label: 'Suisse',
  },
  {
    value: 211,
    label: 'République Arabe Syrienne',
  },
  {
    value: 212,
    label: 'Tadjikistan',
  },
  {
    value: 213,
    label: 'Thaïlande',
  },
  {
    value: 214,
    label: 'Togo',
  },
  {
    value: 215,
    label: 'Tokelau',
  },
  {
    value: 216,
    label: 'Tonga',
  },
  {
    value: 217,
    label: 'Trinité-et-Tobago',
  },
  {
    value: 218,
    label: 'Émirats Arabes Unis',
  },
  {
    value: 219,
    label: 'Tunisie',
  },
  {
    value: 220,
    label: 'Turquie',
  },
  {
    value: 221,
    label: 'Turkménistan',
  },
  {
    value: 222,
    label: 'Îles Turks et Caïques',
  },
  {
    value: 223,
    label: 'Tuvalu',
  },
  {
    value: 224,
    label: 'Ouganda',
  },
  {
    value: 225,
    label: 'Ukraine',
  },
  {
    value: 226,
    label: "L'ex-République Yougoslave de Macédoine",
  },
  {
    value: 227,
    label: 'Égypte',
  },
  {
    value: 228,
    label: 'Royaume-Uni',
  },
  {
    value: 229,
    label: 'Île de Man',
  },
  {
    value: 230,
    label: 'République-Unie de Tanzanie',
  },
  {
    value: 231,
    label: 'États-Unis',
  },
  {
    value: 232,
    label: 'Îles Vierges des États-Unis',
  },
  {
    value: 233,
    label: 'Burkina Faso',
  },
  {
    value: 234,
    label: 'Uruguay',
  },
  {
    value: 235,
    label: 'Ouzbékistan',
  },
  {
    value: 236,
    label: 'Venezuela',
  },
  {
    value: 237,
    label: 'Wallis et Futuna',
  },
  {
    value: 238,
    label: 'Samoa',
  },
  {
    value: 239,
    label: 'Yémen',
  },
  {
    value: 240,
    label: 'Serbie-et-Monténégro',
  },
  {
    value: 241,
    label: 'Zambie',
  },
];

const stringOptions3 = [
  {
    value: 5,
    label: '1ères Ctes Bordeaux/Ctes Bordx',
  },
  {
    value: 1,
    label: 'Alsace',
  },
  {
    value: 13,
    label: 'Anjou Rouge Et Blanc',
  },
  {
    value: 11,
    label: 'Arbois',
  },
  {
    value: 37,
    label: 'Bandol',
  },
  {
    value: 4,
    label: 'Beaujolais',
  },
  {
    value: 5,
    label: 'Bordeaux',
  },
  {
    value: 5,
    label: 'Bordeaux Superieur',
  },
  {
    value: 6,
    label: 'Bourgogne',
  },
  {
    value: 21,
    label: 'Buzet',
  },
  {
    value: 21,
    label: 'Cahors',
  },
  {
    value: 20,
    label: 'Cdr Vilg Cair/Laudun/Raste Etc',
  },
  {
    value: 6,
    label: 'Chablis',
  },
  {
    value: 6,
    label: 'Chablis 1er & Gd Cru',
  },
  {
    value: 13,
    label: 'Chinon',
  },
  {
    value: 20,
    label: 'Châteauneuf Du Pape',
  },
  {
    value: 20,
    label: 'Crozes Hermitage',
  },
  {
    value: 21,
    label: 'Ctes Saint Mont & St Mont',
  },
  {
    value: 20,
    label: 'Côte Rôtie',
  },
  {
    value: 37,
    label: 'Côtes De Provence',
  },
  {
    value: 20,
    label: 'Côtes Du Rhône',
  },
  {
    value: 5,
    label: 'Graves',
  },
  {
    value: 5,
    label: 'Haut Medoc',
  },
  {
    value: 21,
    label: 'IGP Des Côtes De Gascogne',
  },
  {
    value: 12,
    label: 'Languedoc/Terraslarzac/Pic/Gre',
  },
  {
    value: 6,
    label: 'Macon Villages/Macon Peronne',
  },
  {
    value: 5,
    label: 'Margaux',
  },
  {
    value: 5,
    label: 'Medoc',
  },
  {
    value: 6,
    label: 'Mercurey',
  },
  {
    value: 6,
    label: 'Meursault',
  },
  {
    value: 12,
    label: 'Minervois/Minervois Liviniere',
  },
  {
    value: 13,
    label: 'Muscadet',
  },
  {
    value: 5,
    label: 'Pauillac',
  },
  {
    value: 5,
    label: 'Pessac Leognan',
  },
  {
    value: 13,
    label: 'Pouilly Fumé',
  },
  {
    value: 5,
    label: 'Saint-Emilion',
  },
  {
    value: 5,
    label: 'Saint-Julien',
  },
  {
    value: 13,
    label: 'Sancerre',
  },
  {
    value: 13,
    label: 'Saumur et Saumur Mousseux',
  },
  {
    value: 12,
    label: 'VDP Côteaux De Peyriac',
  },
  {
    value: 12,
    label: "VDP D'Oc",
  },
  {
    value: 37,
    label: "VDP De L'Ile De Beauté",
  },
  {
    value: 12,
    label: 'VDP Des Côtes Catalanes',
  },
  {
    value: 12,
    label: 'VDP Du Comte Tolosan',
  },
  {
    value: 12,
    label: 'VDP Herault/IGP Hte Val Gassac',
  },
  {
    value: 37,
    label: 'VDP Portes Méditerranée Ou Med',
  },
  {
    value: 12,
    label: 'Vin De France',
  },
  {
    value: 24,
    label: 'Afrique Du Sud',
  },
  {
    value: 40,
    label: 'Argentine',
  },
  {
    value: 25,
    label: 'Australie',
  },
  {
    value: 26,
    label: 'Chili',
  },
  {
    value: 27,
    label: 'Espagne',
  },
  {
    value: 29,
    label: 'Hongrie',
  },
  {
    value: 30,
    label: 'Italie',
  },
  {
    value: 30,
    label: 'Mousseux - Vin Mousseux Qualite',
  },
  {
    value: 32,
    label: 'Liban',
  },
  {
    value: 33,
    label: 'Maroc',
  },
  {
    value: 39,
    label: 'Nouvelle Zelande',
  },
  {
    value: 34,
    label: 'Porto',
  },
  {
    value: 35,
    label: 'Portugal',
  },
  {
    value: 4,
    label: 'Beaujolais Villages',
  },
  {
    value: 4,
    label: 'Brouilly',
  },
  {
    value: 4,
    label: 'Chenas',
  },
  {
    value: 4,
    label: 'Chiroubles',
  },
  {
    value: 4,
    label: 'Côteaux Lyonnais',
  },
  {
    value: 4,
    label: 'Côtes De Brouilly',
  },
  {
    value: 4,
    label: 'Julienas',
  },
  {
    value: 4,
    label: 'Macon Blanc',
  },
  {
    value: 4,
    label: 'Macon Rouge',
  },
  {
    value: 4,
    label: 'Morgon',
  },
  {
    value: 4,
    label: 'Moulin A Vent',
  },
  {
    value: 4,
    label: 'Pouilly Fuisse/Pouilly Loche',
  },
  {
    value: 4,
    label: 'Saint Amour',
  },
  {
    value: 4,
    label: 'Saint-Veran',
  },
  {
    value: 4,
    label: 'Vire Clesse',
  },
  {
    value: 5,
    label: 'Barsac',
  },
  {
    value: 5,
    label: 'Cerons',
  },
  {
    value: 5,
    label: 'Côtes De Blaye',
  },
  {
    value: 5,
    label: 'Côtes De Bourg',
  },
  {
    value: 5,
    label: 'Côtes De Canon Fronsac',
  },
  {
    value: 5,
    label: 'Côtes De Francs',
  },
  {
    value: 5,
    label: 'Côtes Du Castillon',
  },
  {
    value: 5,
    label: 'Entre Deux Mers',
  },
  {
    value: 5,
    label: 'Fronsac',
  },
  {
    value: 5,
    label: 'Graves',
  },
  {
    value: 5,
    label: 'Lalande De Pomerol',
  },
  {
    value: 5,
    label: 'Listrac',
  },
  {
    value: 5,
    label: 'Loupiac',
  },
  {
    value: 5,
    label: 'Lussac Saint Emilion',
  },
  {
    value: 5,
    label: 'Montagne Saint Emilion',
  },
  {
    value: 5,
    label: 'Moulis',
  },
  {
    value: 5,
    label: 'Pomerol',
  },
  {
    value: 5,
    label: 'Puisseguin-Saint-Emilion',
  },
  {
    value: 5,
    label: 'Saint-Estèphe',
  },
  {
    value: 5,
    label: 'Sainte-Croix Du Mont',
  },
  {
    value: 5,
    label: 'Sauternes',
  },
  {
    value: 6,
    label: 'Aloxe Corton',
  },
  {
    value: 6,
    label: 'Beaune',
  },
  {
    value: 6,
    label: 'Bourgogne Aligote/Chardonnay',
  },
  {
    value: 6,
    label: 'Bourgogne Coulange La Vineuse',
  },
  {
    value: 6,
    label: 'Bourgogne Hautes Côtes Nuits',
  },
  {
    value: 6,
    label: 'Chambolle Musigny',
  },
  {
    value: 6,
    label: 'Chassagne Montrachet',
  },
  {
    value: 6,
    label: 'Clos De La Roche',
  },
  {
    value: 6,
    label: 'Corton',
  },
  {
    value: 6,
    label: 'Côte De Nuits Villages',
  },
  {
    value: 6,
    label: 'Gevrey Chambertin',
  },
  {
    value: 6,
    label: 'Givry',
  },
  {
    value: 6,
    label: 'Irancy',
  },
  {
    value: 6,
    label: 'Marsannay',
  },
  {
    value: 6,
    label: 'Monthelie',
  },
  {
    value: 6,
    label: 'Morey Saint Denis',
  },
  {
    value: 6,
    label: 'Nuits Ou Nuits Saint Georges',
  },
  {
    value: 6,
    label: 'Pernand-Vergelesses',
  },
  {
    value: 6,
    label: 'Rully',
  },
  {
    value: 6,
    label: 'Saint Romain',
  },
  {
    value: 6,
    label: 'Santenay',
  },
  {
    value: 6,
    label: 'Sauvignon Saint Bris',
  },
  {
    value: 6,
    label: 'Savigny Ou Savigny Les Beaune',
  },
  {
    value: 6,
    label: 'Volnay',
  },
  {
    value: 6,
    label: 'Vosne Romanée',
  },
  {
    value: 6,
    label: 'Vougeot',
  },
  {
    value: 11,
    label: 'Apremont',
  },
  {
    value: 11,
    label: 'Château Chalon',
  },
  {
    value: 11,
    label: 'Côtes Du Jura',
  },
  {
    value: 11,
    label: 'Roussette De Savoie',
  },
  {
    value: 11,
    label: 'Savoie',
  },
  {
    value: 11,
    label: 'Vin De Savoie',
  },
  {
    value: 12,
    label: 'Cabardes',
  },
  {
    value: 12,
    label: 'Clairette Du Languedoc',
  },
  {
    value: 12,
    label: 'Collioure',
  },
  {
    value: 12,
    label: 'Corbieres & Corbières Boutenac',
  },
  {
    value: 12,
    label: 'Côtes De Malepere/Malepere',
  },
  {
    value: 12,
    label: 'Côtes Du Roussillon',
  },
  {
    value: 12,
    label: 'Côtes Du Roussillon Villages',
  },
  {
    value: 12,
    label: 'Faugeres',
  },
  {
    value: 12,
    label: 'Fitou',
  },
  {
    value: 12,
    label: 'IGP Sables de Camargue',
  },
  {
    value: 12,
    label: 'Limoux',
  },
  {
    value: 12,
    label: 'Picpoul De Pinet',
  },
  {
    value: 12,
    label: 'Saint Chinian',
  },
  {
    value: 12,
    label: 'VDP De Aude/IGP Aude Hauterive',
  },
  {
    value: 12,
    label: 'VDP De La Haute Vallee Aude',
  },
  {
    value: 13,
    label: 'Bourgueil',
  },
  {
    value: 13,
    label: "Cabernet D'Anjou",
  },
  {
    value: 13,
    label: 'Cheverny Ac',
  },
  {
    value: 13,
    label: 'Châteaumeillant',
  },
  {
    value: 13,
    label: 'Crémant De Loire',
  },
  {
    value: 13,
    label: 'Côteaux Du Layon',
  },
  {
    value: 13,
    label: 'Côteaux Giennois',
  },
  {
    value: 13,
    label: "Côtes D'Auvergne Vdqs/Aoc",
  },
  {
    value: 13,
    label: 'Haut Poitou',
  },
  {
    value: 13,
    label: 'Menetou Salon',
  },
  {
    value: 13,
    label: 'Montlouis',
  },
  {
    value: 13,
    label: 'Pouilly Sur Loire',
  },
  {
    value: 13,
    label: 'Quarts De Chaume',
  },
  {
    value: 13,
    label: 'Quincy',
  },
  {
    value: 13,
    label: 'Reuilly',
  },
  {
    value: 13,
    label: 'Rosé De Loire',
  },
  {
    value: 13,
    label: 'Saint Pourcain Vdqs/Ac',
  },
  {
    value: 13,
    label: 'Saint-Nicolas-De-Bourgueil',
  },
  {
    value: 13,
    label: 'Saumur Champigny',
  },
  {
    value: 13,
    label: 'Savennieres',
  },
  {
    value: 13,
    label: 'Touraine',
  },
  {
    value: 13,
    label: 'Touraine Sauvignon/Chenonceaux',
  },
  {
    value: 13,
    label: 'Valencay',
  },
  {
    value: 13,
    label: 'Vouvray',
  },
  {
    value: 13,
    label: 'Vouvray Mousseux',
  },
  {
    value: 37,
    label: 'Cassis Blanc',
  },
  {
    value: 37,
    label: 'Cassis Rose',
  },
  {
    value: 37,
    label: "Côteaux D'Aix Ac",
  },
  {
    value: 37,
    label: 'Côteaux Varois',
  },
  {
    value: 37,
    label: 'Côtes Du Luberon Ac/Luberon Ac',
  },
  {
    value: 37,
    label: 'Les Baux De Provence',
  },
  {
    value: 37,
    label: 'Patrimonio',
  },
  {
    value: 37,
    label: 'Vin De Corse',
  },
  {
    value: 20,
    label: 'Beaumes De Venise',
  },
  {
    value: 20,
    label: 'Clairette De Die/Crémant Die',
  },
  {
    value: 20,
    label: 'Condrieu',
  },
  {
    value: 20,
    label: 'Cornas',
  },
  {
    value: 20,
    label: "Ctx De L'Ardeche/Ardeche",
  },
  {
    value: 20,
    label: 'Côtes Du Luberon Ac/Luberon Ac',
  },
  {
    value: 20,
    label: 'Duché d’Uzès',
  },
  {
    value: 20,
    label: 'Gigondas',
  },
  {
    value: 20,
    label: 'Hermitage',
  },
  {
    value: 20,
    label: 'Lirac',
  },
  {
    value: 20,
    label: 'Saint Peray',
  },
  {
    value: 20,
    label: 'Saint-Joseph',
  },
  {
    value: 20,
    label: 'VDP Des Collines Rhodaniennes',
  },
  {
    value: 20,
    label: 'VDP Portes Méditerranée Ou Med',
  },
  {
    value: 21,
    label: 'Bergerac',
  },
  {
    value: 21,
    label: 'Côtes De Duras',
  },
  {
    value: 21,
    label: 'Fronton',
  },
  {
    value: 21,
    label: 'Gaillac',
  },
  {
    value: 21,
    label: 'Jurançon Moelleux',
  },
  {
    value: 21,
    label: 'Jurançon Sec',
  },
  {
    value: 21,
    label: 'Madiran',
  },
  {
    value: 21,
    label: 'Monbazillac',
  },
  {
    value: 21,
    label: 'Pacherenc',
  },
  {
    value: 21,
    label: 'Pécharmant',
  },
  {
    value: 30,
    label: 'Apéritifs',
  },
  {
    value: 31,
    label: 'Mousseux - Vin Mousseux Qualite',
  },
  {
    value: 6,
    label: 'Bourgogne Hautes Côtes Beaune',
  },
];

var stringOptions4 = [
  {
    value: 1,
    label: 'Alsace',
  },
  {
    value: 4,
    label: 'Beaujolais-Mâconnais',
  },
  {
    value: 5,
    label: 'Bordeaux',
  },
  {
    value: 6,
    label: 'Bourgogne',
  },
  {
    value: 7,
    label: 'Champagne',
  },
  {
    value: 9,
    label: 'France',
  },
  {
    value: 11,
    label: 'Jura-Savoie',
  },
  {
    value: 12,
    label: 'Languedoc-Roussillon',
  },
  {
    value: 13,
    label: 'Loire et Centre',
  },
  {
    value: 17,
    label: 'Normandie',
  },
  {
    value: 20,
    label: 'Rhône',
  },
  {
    value: 21,
    label: 'Sud-Ouest',
  },
  {
    value: 24,
    label: 'Western Cape',
  },
  {
    value: 25,
    label: 'Australie',
  },
  {
    value: 26,
    label: 'Vallée de Maïpo',
  },
  {
    value: 27,
    label: 'Espagne',
  },
  {
    value: 28,
    label: 'Martinique',
  },
  {
    value: 29,
    label: 'Autres',
  },
  {
    value: 30,
    label: 'Italie',
  },
  {
    value: 31,
    label: 'Vénétie',
  },
  {
    value: 32,
    label: 'Autres',
  },
  {
    value: 33,
    label: 'Meknes',
  },
  {
    value: 34,
    label: 'Porto',
  },
  {
    value: 35,
    label: 'Portugal',
  },
  {
    value: 37,
    label: 'Méditerranée',
  },
  {
    value: 39,
    label: 'Nouvelle Zelande',
  },
  {
    value: 40,
    label: 'Argentine',
  },
];

for (let i = 2009; i <= new Date().getFullYear(); i++) {
  stringOptions.push({ label: i, value: i });
}

export default {
  name: 'vinsAll',
  setup() {
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);
    return {
      stringOptions,
      stringOptions2,
      stringOptions3,
      stringOptions4,
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
      page: 1,
      nextPage: null,
      totalPages: 20,
      filter: '',
      loading: false,
      mode: true,
      perPage: 20,
      currentPage: 1,
      millesimeShowing: false,
      couleurShowing: false,
      apellationShowing: false,
      regionShowing: false,
      prixShowing: false,
      paysShowing: false,
      goutShowing: false,
      allianceShowing: false,
      dense: ref(null),
      form: {
        prix: ref({
          min: 0,
          max: 2200,
        }),
        millesime: null,
        couleur: null,
        pays: null,
        appellation: null,
        region: null,
        gout: null,
        alliance: null,
      },
    };
  },
  components: {},
  methods: {
    ...mapActions('vins', ['getVinsAll']),
    ...mapActions('vins', ['getPays']),
    ...mapActions('vins', ['getApellation']),
    ...mapActions('vins', ['getRegion']),
    // Source: https://github.com/vuejs/vue/blob/v2.6.14/src/compiler/parser/entity-decoder.js
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    replaceVirgule(html) {
      return (html + '').replace('.', ',');
    },
    changeForm() {
      this.getVinsAll(this.form);
      this.showTextLoading();
    },
    changeFormCouleur(data) {
      this.form.couleur = data;
    },
    changeFormAlliance(data) {
      this.form.alliance = data;
    },
    changeFormGout(data) {
      this.form.gout = data;
    },
  },
  computed: {
    ...mapState('vins', ['listVinsAll']),
    ...mapState('vins', ['listPays']),
    ...mapState('vins', ['listApellation']),
    ...mapState('vins', ['listRegion']),
    getData() {
      return this.listVinsAll.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
    },
  },
  mounted() {
    this.getVinsAll(this.form);
    this.showTextLoading();
  },
};
</script>
