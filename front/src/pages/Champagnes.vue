<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <div
      class="text-h4 text-white bloc_vin_title"
      style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      "
    >
      <q-item class="title">CHAMPAGNES</q-item>
    </div>

    <q-item class="q-pa-none text-white">
      Bruts, rosés, millésimés, cuvées de prestige, Nosvinsdumonde propose plus
      de 80 marques de Champagnes pour célébrer la Saint-Valentin, sans compter
      les demi-bouteilles, magnums et autres grands contenants.
    </q-item>

    <!-- BreadCrump -->
    <div class="q-pa-none q-mt-lg q-gutter-sm">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el
          clickable
          to="/"
          label="Accueil"
          style="color: #ffc107"
        />
        <q-breadcrumbs-el label="Champagnes" style="color: white" />
      </q-breadcrumbs>
    </div>

    <div
      class="q-mb-lg q-mt-lg"
      v-show="showSimulatedReturnData"
      style="
        justify-content: center;
        display: flex;
        width: 100%;
        flex-direction: column;
      "
    >
      <div class="col-md-12">
        <div>
          <h3 class="text-white">FILTRER PAR</h3>
        </div>

        <div class="q-mt-md w-100">
          <form>
            <div style="justify-content: center">
              <div class="q-mb-md col-md-2">
                <label
                  @click="millesimeShowing = !millesimeShowing"
                  class="form-label text-white millesime"
                  ><i
                    class="fa-solid q-mr-sm"
                    v-bind:class="
                      millesimeShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "
                  ></i
                  >Millésime</label
                >

                <div v-show="millesimeShowing">
                  <q-select
                    :options="stringOptions"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    v-model="form.millesime"
                    :dense="dense"
                    emit-value
                    map-options
                    dark
                    text-color="white"
                    style="max-height: 100px"
                    behavior="menu"
                    @update:model-value="changeForm()"
                  >
                  </q-select>
                </div>
              </div>

              <div class="q-mb-md col-md-2">
                <label
                  class="form-label text-white couleur"
                  @click="couleurShowing = !couleurShowing"
                  ><i
                    class="fa-solid q-mr-sm"
                    v-bind:class="
                      couleurShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "
                  ></i
                  >Couleur</label
                >
                <div v-show="couleurShowing">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.couleur"
                        class="bottle"
                        @click="changeFormCouleur(1), changeForm()"
                      >
                        <span class="bottle_wine" style="background: #f2d785"
                          ><i class="fas fa-wine-bottle" aria-hidden="true"></i
                        ></span>
                        <span class="bottle_wine_text">Blanc</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        class="bottle"
                        clickable
                        v-model="form.couleur"
                        @click="changeFormCouleur(2), changeForm()"
                      >
                        <span class="bottle_wine" style="background: #fe7162"
                          ><i class="fas fa-wine-bottle" aria-hidden="true"></i
                        ></span>
                        <span class="bottle_wine_text">Rosé</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.couleur"
                        class="bottle"
                        @click="changeFormCouleur(3), changeForm()"
                      >
                        <span class="bottle_wine" style="background: #7a0201"
                          ><i class="fas fa-wine-bottle" aria-hidden="true"></i
                        ></span>
                        <span class="bottle_wine_text">Rouge</span>
                      </q-item>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="q-mb-md col-md-2">
                <label
                  class="form-label text-white prix"
                  @click="prixShowing = !prixShowing"
                  ><i
                    class="fa-solid q-mr-sm"
                    v-bind:class="
                      prixShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "
                  ></i
                  >Prix <span class="ms-1 text-warning">(</span
                  ><span class="text-warning rangePrix"
                    >{{ form.prix.min }} à {{ form.prix.max }}</span
                  ><span class="text-warning"> €)</span></label
                >
                <div v-show="prixShowing">
                  <q-range
                    v-model="form.prix"
                    :step="15"
                    label
                    :min="0"
                    :max="2200"
                    dark
                    color="deep-orange"
                    @update:model-value="changeForm()"
                  />
                </div>
              </div>

              <div class="q-mb-md col-md-2">
                <label
                  class="form-label text-white pays"
                  @click="paysShowing = !paysShowing"
                  ><i
                    class="fa-solid q-mr-sm"
                    v-bind:class="
                      paysShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "
                  ></i
                  >Pays</label
                >
                <q-select
                  :options="stringOptions2"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.pays"
                  :dense="dense"
                  dark
                  emit-value
                  map-options
                  text-color="white"
                  style="max-height: 100px"
                  behavior="menu"
                  v-show="paysShowing"
                  @update:model-value="changeForm()"
                />
              </div>

              <div class="q-mb-md col-md-2">
                <label
                  @click="regionShowing = !regionShowing"
                  class="form-label text-white region"
                  ><i
                    class="fa-solid q-mr-sm"
                    v-bind:class="
                      regionShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "
                  ></i
                  >Region</label
                >
                <q-select
                  v-show="regionShowing"
                  :options="stringOptions4"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.region"
                  :dense="dense"
                  dark
                  emit-value
                  map-options
                  text-color="white"
                  style="max-height: 100px"
                  behavior="menu"
                  @update:model-value="changeForm()"
                >
                </q-select>
              </div>

              <div class="q-mb-md col-md-2">
                <label
                  class="form-label text-white appellation"
                  @click="apellationShowing = !apellationShowing"
                  ><i
                    class="fa-solid q-mr-sm"
                    v-bind:class="
                      apellationShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "
                  ></i
                  >Appellation</label
                >
                <q-select
                  v-show="apellationShowing"
                  :options="stringOptions3"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.appellation"
                  :dense="dense"
                  dark
                  emit-value
                  map-options
                  text-color="white"
                  style="max-height: 100px"
                  behavior="menu"
                  @update:model-value="changeForm()"
                >
                </q-select>
              </div>

              <div class="q-mb-md col-md-3">
                <label
                  class="form-label text-white gout"
                  @click="goutShowing = !goutShowing"
                  ><i
                    class="fa-solid q-mr-sm"
                    v-bind:class="
                      goutShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "
                  ></i
                  >Goût</label
                >
                <div v-show="goutShowing">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.couleur"
                        class="gout_item"
                        @click="changeFormGout(1), changeForm()"
                      >
                        <span class="gout_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_1.png"
                        /></span>
                        <span class="gout_text">Fruité et charnu</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.couleur"
                        class="gout_item"
                        @click="changeFormGout(2), changeForm()"
                      >
                        <span class="gout_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_2.png"
                        /></span>
                        <span class="gout_text">Fruité et frais</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.couleur"
                        class="gout_item"
                        @click="changeFormGout(3), changeForm()"
                      >
                        <span class="gout_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_3.png"
                        /></span>
                        <span class="gout_text">Fruité et léger</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.couleur"
                        class="gout_item"
                        @click="changeFormGout(4), changeForm()"
                      >
                        <span class="gout_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_4.png"
                        /></span>
                        <span class="gout_text"
                          >Puissant avec du potentiel</span
                        >
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.couleur"
                        class="gout_item"
                        @click="changeFormGout(5), changeForm()"
                      >
                        <span class="gout_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_5.png"
                        /></span>
                        <span class="gout_text">Riche et puissant</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.couleur"
                        class="gout_item"
                        @click="changeFormGout(6), changeForm()"
                      >
                        <span class="gout_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/gout/gout_6.png"
                        /></span>
                        <span class="gout_text">Riche et rond</span>
                      </q-item>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="q-mb-md col-md-2">
                <label
                  class="form-label text-white alliance"
                  @click="allianceShowing = !allianceShowing"
                  ><i
                    class="fa-solid q-mr-sm"
                    v-bind:class="
                      allianceShowing ? 'fa-chevron-down' : 'fa-chevron-right'
                    "
                  ></i
                  >Alliance</label
                >
                <div v-show="allianceShowing">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(1), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_1.png"
                        /></span>
                        <span class="alliance_text">Agneau</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(2), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_2.png"
                        /></span>
                        <span class="alliance_text">Charcuterie</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(3), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_3.png"
                        /></span>
                        <span class="alliance_text"
                          >Coquillages et crustacés</span
                        >
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(4), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_4.png"
                        /></span>
                        <span class="alliance_text">Foie gras</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(5), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_5.png"
                        /></span>
                        <span class="alliance_text">Fromage corsé</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(6), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_5.png"
                        /></span>
                        <span class="alliance_text">Fromage doux</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(7), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_7.png"
                        /></span>
                        <span class="alliance_text">Gibier</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(8), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_8.png"
                        /></span>
                        <span class="alliance_text">Glace et sorbet</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(9), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_9.png"
                        /></span>
                        <span class="alliance_text">Gâteau</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(10), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_10.png"
                        /></span>
                        <span class="alliance_text">Poisson en sauce</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(11), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_11.png"
                        /></span>
                        <span class="alliance_text">Poisson grillé</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(12), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_12.png"
                        /></span>
                        <span class="alliance_text">Tarte</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(13), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_13.png"
                        /></span>
                        <span class="alliance_text">Viande blanche</span>
                      </q-item>
                    </li>
                    <li class="list-group-item">
                      <q-item
                        clickable
                        v-model="form.alliance"
                        class="alliance_item"
                        @click="changeFormAlliance(14), changeForm()"
                      >
                        <span class="alliance_icon"
                          ><img
                            src="https://nosvinsdumonde.com/assets/img/alliances/alliance_14.png"
                        /></span>
                        <span class="alliance_text">Viande rouge</span>
                      </q-item>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="q-mb-md col-md-2 filter" style="display: none">
                <q-btn push color="warning"
                  ><i class="fa-solid fa-eraser q-mr-sm"></i
                  ><b>Effacer les filtres</b></q-btn
                >
              </div>
            </div>
          </form>
        </div>
      </div>

      <div style="justify-content: center; display: flex">
        <q-pagination
          v-model="current"
          :max="maxs"
          :max-pages="7"
          @click="chargeChampagnes()"
          direction-links
          outline
          color="orange"
          :boundary-numbers="false"
          active-color="primary"
          v-ripple
          class="q-mt-md"
        />
      </div>
    </div>

    <div
      class="items-start q-gutter-md justify-center"
      style="margin-bottom: 0; padding: 0 0; width: 100%"
      v-show="showSimulatedReturnData"
    >
      <q-card
        class="card_vin q-mb-lg"
        flat
        v-for="champagnes in listChampagnesAll"
        :key="champagnes.idBoisson"
      >
        <q-item class="card_imgs_vin">
          <q-img
            class="card_image_vin q-ma-sm"
            :src="
              'https://nosvinsdumonde.com/assets/img/' +
              champagnes.typeBoisson +
              '/' +
              champagnes.imageBoisson +
              ''
            "
          >
          </q-img>
        </q-item>

        <q-card-section>
          <q-item
            clickable
            :to="'/' + champagnes.typeBoisson + '/' + champagnes.idBoisson"
            class="text-h6 q-mt-sm q-mb-xs text-bold text-black"
            style="padding: 0 0"
          >
            {{ decode(champagnes.nomBoisson) }}
            {{ champagnes.millesimeBoisson }}
          </q-item>
          <div class="q-mt-lg">
            <span class="badge_region" style="margin: 0 auto">{{
              champagnes.regionBoisson
            }}</span>
          </div>

          <q-item
            class="q-my-md q-mx-none"
            style="justify-content: start; padding: 1em 0"
          >
            <q-btn
              :to="'/' + champagnes.typeBoisson + '/' + champagnes.idBoisson"
              push
              color="warning"
            >
              Découvrir
            </q-btn>
          </q-item>

          <div>
            <span class="text-caption">{{ champagnes.apellationBoisson }}</span>
          </div>
          <div class="q-mt-sm prix">
            <span
              ><span class="chiffre">{{
                replaceVirgule(champagnes.prixBoisson)
              }}</span>
              €</span
            >
          </div>
          <div class="contenance text-subtitle1">
            <span>Bouteille de {{ champagnes.contenanceBoisson }}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      class="q-mb-lg q-mt-lg"
      style="justify-content: center; display: flex; width: 100%"
      v-show="showSimulatedReturnData"
    >
      <q-pagination
        v-model="current"
        :max="maxs"
        :max-pages="7"
        @click="chargeChampagnes()"
        direction-links
        outline
        color="orange"
        :boundary-numbers="false"
        active-color="primary"
        v-ripple
      />
    </div>

    <!-- Loader -->
    <div style="position: relative; min-height: 5vw; width: 100%">
      <div
        :showing="visible"
        v-show="visible"
        class="container-md q-mt-lg q-mb-lg"
        style="padding: 0 5vw"
      >
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
    value: 208,
    label: 'Champagne',
  },
];

var stringOptions4 = [
  {
    value: 36,
    label: 'Champagne',
  },
];

for (let i = 2009; i <= new Date().getFullYear(); i++) {
  stringOptions.push({ label: i, value: i });
}

export default {
  name: 'champagnesAll',
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
      millesimeShowing: false,
      couleurShowing: false,
      apellationShowing: false,
      regionShowing: false,
      prixShowing: false,
      paysShowing: false,
      goutShowing: false,
      allianceShowing: false,
      dense: ref(null),
      current: ref(1),
      maxs: 5,
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
        page: 1,
      },
    };
  },
  components: {},
  methods: {
    ...mapActions('champagnes', ['getChampagnesAll']),
    ...mapActions('champagnes', ['getPays']),
    ...mapActions('champagnes', ['getApellation']),
    ...mapActions('champagnes', ['getRegion']),
    // Source: https://github.com/vuejs/vue/blob/v2.6.14/src/compiler/parser/entity-decoder.js
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    replaceVirgule(html) {
      return (html + '').replace('.', ',');
    },
    chargeChampagnes() {
      this.form.page = this.current;
      this.getChampagnesAll(this.form);
    },
    changeForm() {
      this.getChampagnesAll(this.form);
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
    ...mapState('champagnes', ['listChampagnesAll']),
    ...mapState('champagnes', ['listPays']),
    ...mapState('champagnes', ['listApellation']),
    ...mapState('champagnes', ['listRegion']),
  },
  mounted() {
    this.getChampagnesAll(this.form);
    this.showTextLoading();
  },
};
</script>
