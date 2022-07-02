<template>
  <q-page class="body_page q-mt-lg">

    <div class="q-pa-md q-mb-lg" style="padding: 0 5vw;width: 100%">
      <q-expansion-item class="shadow-1 overflow-hidden" style="border-radius: 12px" icon="fa-solid fa-magnifying-glass"
        :label="$t('RECHERCHE')" header-class="bg-primary text-white" expand-icon-class="text-white">
        <q-card>
          <q-card-section>
            <q-input bottom-slots v-model="searchInput" :loading="loadingState" ref="inputRef"
              :label="$t('SEARCH_PLACEHOLER')" :hint="$t('CARA_MAX')" :error-message="$t('CARA_MAXS')" :error="!isValid"
              :rules="[searchRule]">
              <template v-slot:append>
                <q-icon v-if="searchInput !== ''" name="close" @click="searchInput = ''" class="cursor-pointer" />
                <q-icon name="search" />
              </template>

              <template v-slot:hint> {{ $t('CARA_MAX') }} </template>
            </q-input>
          </q-card-section>

          <q-card-section v-if="listNewsSearch != '' || listNewsSearch2 != ''">
            <ul style="list-style-type: none" class="q-pa-none q-mt-none">
              <li class="list-group-item q-mb-lg text-bold" style="font-size: 18px">
                {{ $t('VIN_CHAMP') }}
              </li>

              <li class="list-group-item q-mb-lg" v-for="search in listNewsSearch" :key="search.id">
                <a class="text-decoration-none text-dark text-bold" clickable :href="
                  '/#/' + search.typeBoisson + '/' + search.idBoisson + ''
                "><i class="fa-solid fa-magnifying-glass-arrow-right"></i>
                  {{ decode(search.nomBoisson) }}
                  <span v-if="search.millesimeBoisson != ''">
                    - {{ search.millesimeBoisson }} -
                  </span>
                  {{ search.apellationBoisson }}</a>
              </li>

              <q-separator class="q-mb-lg" />

              <li class="list-group-item q-mb-lg text-bold" style="font-size: 18px">
                {{ $t('TITLE_PAGE_ACTUALITES') }}
              </li>

              <li class="list-group-item q-mb-lg" v-for="search in listNewsSearch2" :key="search.id">
                <a class="text-decoration-none text-dark text-bold" clickable
                  :href="'/#/actualite/' + search.url + ''"><i class="fa-solid fa-magnifying-glass-arrow-right"></i>
                  {{ decode(search.title) }}</a>
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <div class="container-md" id="bloc_vin_jour">
      <q-item class="text-h5 text-white bloc_vin_title q-mb-lg" style="font-size: 500; display: flex;">
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon size="15px" name="fa-solid fa-chevron-right" style="margin: 0.5rem !important" />
        </q-item>

        <q-item style="padding: 0 0; padding-bottom: 13px; text-transform: uppercase">{{ $t('VIN_JOUR') }}</q-item>
      </q-item>

      <vins-one-component :listVinsOne="listVinsOne"></vins-one-component>

      <q-item class="text-h5 text-white bloc_vin_title q-mb-lg q-mt-lg"
        style="font-size: 500; display: flex; margin-top: 3rem">
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon size="15px" name="fa-solid fa-chevron-right" style="margin: 0.5rem !important" />
        </q-item>

        <q-item style="padding: 0 0">{{ $t('SELECTION') }}</q-item>
      </q-item>

      <div class="row items-start" style="padding: 0 5vw">
        <vins-component :listVins="listVins"></vins-component>
      </div>

      <div style="justify-content: center; padding: 0 5vw" class="q-mb-lg">
        <q-item class="q-my-md q-mx-none" style="justify-content: center; padding: 1em 0">
          <q-btn push to="/produits" color="warning" size="18px">
            <q-item-section avatar style="min-width: 20px; padding-right: 10px">
              <q-icon size="15px" name="fa-solid fa-list" />
            </q-item-section>
            Tous nos produits
          </q-btn>
        </q-item>
      </div>

      <div class="text-white text-center">
        <div class="q-mb-lg">
          <div class="q-mb-md">
            <i class="fa-solid fa-euro-sign shadow" style="
                font-size: 40px;
                transform: rotate(320deg);
                text-shadow: 0 0 3px #ffffff33;
              "></i>
          </div>
          <p>{{ $t('BLOC_SEMI_FOOT_1') }} <br /><span class="fw-bold">{{ $t('BLOC_SEMI_FOOT_1_1') }}</span></p>
        </div>

        <div class="q-mb-lg">
          <div class="q-mb-md">
            <i class="fa-solid fa-truck shadow" style="font-size: 40px; text-shadow: 0 0 3px #ffffff33"></i>
          </div>
          <p>{{ $t('BLOC_SEMI_FOOT_2') }} <br /><span class="fw-bold">{{ $t('BLOC_SEMI_FOOT_2_2') }}*</span></p>
        </div>

        <div class="q-mb-lg">
          <div class="q-mb-md">
            <i class="fa-solid fa-lock shadow" style="font-size: 40px; text-shadow: 0 0 3px #ffffff33"></i>
          </div>
          <p>{{ $t('BLOC_SEMI_FOOT_3') }} <br /><span class="fw-bold">{{ $t('BLOC_SEMI_FOOT_3_3') }}</span></p>
        </div>

        <div>
          <div class="q-mb-md">
            <i class="fa-solid fa-wine-bottle shadow" style="
                font-size: 40px;
                transform: rotate(0);
                text-shadow: 0 0 3px #ffffff33;
              "></i>
          </div>
          <p>
            {{ $t('BLOC_SEMI_FOOT_4') }} <br /><span class="fw-bold">{{ $t('BLOC_SEMI_FOOT_4_4') }}</span>
          </p>
        </div>
      </div>

      <q-item class="text-h5 text-white bloc_vin_title q-mb-lg q-mt-lg"
        style="font-size: 500; display: flex; margin-top: 3rem">
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon size="15px" name="fa-solid fa-chevron-right" style="margin: 0.5rem !important" />
        </q-item>

        <q-item style="padding: 0 0">{{ $t('MOMENT') }}</q-item>
      </q-item>

      <div class="container-md q-my-lg" style="padding: 0 5vw" id="bloc_vin_selection">
        <div class="justify-content-center">
          <div class="q-mb-lg">
            <div class="card card1 mb-4 shadow">
              <q-item clickable to="/bon-plans" class="text-decoration-none q-pa-none q-ma-none"
                style="display: block; width: 100%">
                <div class="g-0">
                  <div class="col-md-12">
                    <div class="card-body text-center q-px-lg">
                      <h3 class="card-title text-white">{{ $t('CARD_1') }}</h3>
                    </div>
                  </div>
                </div>
              </q-item>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="card card2 mb-4 shadow">
              <a href="#" class="text-decoration-none">
                <div class="g-0">
                  <div class="col-md-12">
                    <div class="card-body text-center q-px-lg">
                      <h3 class="card-title text-white">
                        {{ $t('CARD_2') }}
                      </h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <q-item class="text-h5 text-white bloc_vin_title q-mb-lg q-mt-lg"
        style="font-size: 500; display: flex; margin-top: 3rem">
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon size="15px" name="fa-solid fa-chevron-right" style="margin: 0.5rem !important" />
        </q-item>

        <q-item style="padding: 0 0 5vw 0">{{ $t('TITLE_PRESENTATION') }}</q-item>
      </q-item>

      <div class="container-md q-my-lg q-mx-lg">
        <p class="text-white" v-html="$t('WELCOME')">

        </p>
      </div>

      <div class="container-md q-my-lg q-mx-lg">
        <div class="separator" style="padding: 0 5vw"></div>
      </div>

      <div class="container-md q-my-lg q-mx-lg">
        <div class="text-center">
          <h4 class="text-white" style="font-size: calc(1.075rem + 0.3vw)">
            {{ $t('DESCRIPTION_VIN_2') }}
          </h4>
          <h4 class="text-white" style="font-size: calc(1.075rem + 0.3vw)">
            {{ $t('DESCRIPTION_VIN') }}
          </h4>
        </div>

        <q-item to="/contact/suggest" class="text-decoration-none text-center q-mt-lg q-mb-lg q-pa-none"
          style="display: block">
          <img src="https://nosvinsdumonde.com/assets/img/add_vin.png" alt="" />
        </q-item>
      </div>

      <q-item id="vitisphere" class="text-h5 text-white bloc_vin_title q-mb-lg" style="font-size: 500; display: flex">
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon size="15px" name="fa-solid fa-chevron-right" style="margin: 0.5rem !important" />
        </q-item>

        <q-item style="padding: 0 0 5vw 0">{{ $t('TITLE_PAGE_ACTUALITES') }}</q-item>
      </q-item>

      <div class="row items-start" style="padding: 0 5vw">
        <news-component :listNews="listNews"></news-component>
      </div>

      <div style="justify-content: center; padding: 0 5vw" class="q-mb-lg">
        <q-item class="q-my-md q-mx-none" style="justify-content: center; padding: 1em 0">
          <q-btn push clickable to="/actualites" color="warning" size="18px">
            <q-item-section avatar style="min-width: 20px; padding-right: 10px">
              <q-icon size="15px" name="fa-solid fa-bars" />
            </q-item-section>
            {{ $t('PLUS_ACTU') }}
          </q-btn>
        </q-item>
      </div>

      <q-item id="livraison" class="text-h5 text-white bloc_vin_title" style="font-size: 500; display: flex">
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon size="15px" name="fa-solid fa-chevron-right" style="margin: 0.5rem !important" />
        </q-item>

        <q-item style="padding: 0 0 5vw 0">{{ $t('TITLE_LIVRAISON') }}</q-item>
      </q-item>

      <div class="container-md q-mb-lg q-mx-lg">
        <div class="text-left m-auto">
          <div class="row" style="display: flex; align-items: flex-start">
            <div>
              <img class="w-100" src="https://nosvinsdumonde.com/assets/img/livraison.png" alt="" />
            </div>

            <div class="q-mt-sm">
              <h6 class="text-white" style="font-weight: normal">
                {{ $t('LIVRAISON_PHRASE_1') }}
              </h6>

              <h6 class="q-mt-lg text-white" style="font-weight: normal">
                {{ $t('LIVRAISON_PHRASE_2') }}
              </h6>

              <h6 class="q-mt-lg q-mb-md text-white fw-bold" style="line-height: 26px">
                <i class="fa-solid fa-truck-fast q-mr-sm"></i>{{ $t('LIVRAISON_PHRASE_3') }}
              </h6>

              <h6 class="text-white fw-bold q-mb-lg" style="line-height: 26px">
                <i class="fa-brands fa-usps q-mr-sm"></i>{{ $t('LIVRAISON_PHRASE_4') }}
              </h6>
            </div>
          </div>

          <div style="justify-content: center; padding: 0 5vw" class="q-mb-lg q-mt-none">
            <q-item class="q-mb-md q-mx-none q-mt-none" style="justify-content: center">
              <q-btn to="/livraison" push color="warning" size="18px">
                <q-item-section avatar style="min-width: 20px; padding-right: 10px">
                  <q-icon size="15px" name="fa-solid fa-shoe-prints" />
                </q-item-section>
                {{ $t('SAVOIR') }}
              </q-btn>
            </q-item>
          </div>
        </div>
      </div>

      <q-item id="appellationRegions" class="text-h5 text-white bloc_vin_title" style="font-size: 500; display: flex">
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon size="15px" name="fa-solid fa-chevron-right" style="margin: 0.5rem !important" />
        </q-item>

        <q-item style="padding: 0 0 5vw 0">{{ $t('APPELLATION_REGION') }}</q-item>
      </q-item>

      <div class="container-md q-mb-lg q-mx-lg">
        <div class="text-left m-auto">
          <appellations-component :listAppellations="listAppellations"></appellations-component>

          <regions-component :listRegions="listRegions"></regions-component>

          <div style="justify-content: center; padding: 0 5vw" class="q-mb-lg">
            <q-item class="q-my-md q-mx-none" style="justify-content: center; padding: 1em 0">
              <q-btn push color="warning" size="18px">
                <q-item-section avatar style="min-width: 20px; padding-right: 10px">
                  <q-icon size="15px" name="fa-solid fa-bars" />
                </q-item-section>
                Voir plus
              </q-btn>
            </q-item>
          </div>
        </div>
      </div>

      <div class="container-md q-my-lg q-mx-lg">
        <div class="separator" style="padding: 0 5vw"></div>
      </div>

      <div class="container-md q-mb-lg q-mx-lg">
        <div class="text-left m-auto">
          <div class="row text-center text-white">
            <div class="">
              <h5 class="fw-bold">{{ $t('BLOC_DEFINITION_1') }}</h5>

              <p v-html="$t('BLOC_DEFINITION_1_1')"></p>

            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">{{ $t('BLOC_DEFINITION_2') }}</h5>

              <p v-html="$t('BLOC_DEFINITION_2_2')"></p>

            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">{{ $t('BLOC_DEFINITION_3') }}</h5>

              <p v-html="$t('BLOC_DEFINITION_3_3')"></p>

            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">{{ $t('BLOC_DEFINITION_4') }}</h5>

              <p v-html="$t('BLOC_DEFINITION_4_4')"></p>

            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">{{ $t('BLOC_DEFINITION_5') }}</h5>

              <p v-html="$t('BLOC_DEFINITION_5_5')"></p>

            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">{{ $t('BLOC_DEFINITION_6') }}</h5>

              <p v-html="$t('BLOC_DEFINITION_6_6')"></p>

            </div>
          </div>
        </div>
      </div>

      <q-item id="appellationRegions" class="text-h5 text-white bloc_vin_title" style="font-size: 500; display: flex">
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon size="15px" name="fa-solid fa-chevron-right" style="margin: 0.5rem !important" />
        </q-item>

        <q-item style="padding: 0 0 5vw 0">🍷{{ $t('DEGUSTATION') }}</q-item>
      </q-item>

      <div class="q-pa-md">
        <q-video :ratio="16 / 9"
          src="https://player.vimeo.com/video/715112452?h=c5ee1f0f21&badge=0&autopause=0&player_id=0&app_id=58479" />
      </div>

    </div>
  </q-page>
</template>

<script>
import NewsComponent from 'components/NewsComponent.vue';
import VinsComponent from 'components/VinsComponent.vue';
import VinsOneComponent from 'components/VinSelectionComponent.vue';
import AppellationsComponent from 'components/AppellationsComponent.vue';
import RegionsComponent from 'components/RegionsComponent.vue';
import { mapActions, mapState } from 'vuex';
import { ref, computed } from 'vue';

let decoder;

export default {
  name: 'PageIndex',
  setup() {
    const searchInput = ref('');
    const inputRef = ref(null);

    return {
      loadingState: ref(false),
      searchInput,
      isValid: computed(() => searchInput.value.length <= 100),

      reset() {
        inputRef.value.resetValidation();
      },
    };
  },
  components: {
    NewsComponent,
    VinsComponent,
    VinsOneComponent,
    AppellationsComponent,
    RegionsComponent,
  },
  methods: {
    // Source: https://github.com/vuejs/vue/blob/v2.6.14/src/compiler/parser/entity-decoder.js
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    searchRule(val) {
      // simulating a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          // call
          resolve(true);
          this.getNewsSearch(val);
          resolve(false);
          resolve(!!val || '* Required');
        }, 1000);
      });
    },
    ...mapActions('news', ['getNews']),
    ...mapActions('news', ['getNewsSearch']),
    ...mapActions('vins', ['getVins']),
    ...mapActions('vins', ['getOneVins']),
    ...mapActions('appellations', ['getAppellations']),
    ...mapActions('regions', ['getRegions']),
  },
  computed: {
    ...mapState('news', ['listNews']),
    ...mapState('news', ['listNewsSearch']),
    ...mapState('news', ['listNewsSearch2']),
    ...mapState('vins', ['listVins']),
    ...mapState('vins', ['listVinsOne']),
    ...mapState('appellations', ['listAppellations']),
    ...mapState('regions', ['listRegions']),
  },
  mounted() {
    this.getNews();
    this.getVins();
    this.getOneVins();
    this.getAppellations();
    this.getRegions();
  },
};
</script>
