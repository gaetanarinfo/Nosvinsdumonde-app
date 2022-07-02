<template>

  <div class="text-h4 text-white bloc_vin_title" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
    <q-item class="title">Offres d'emploi Vigne et Vins</q-item>
  </div>

  <!-- BreadCrump -->
  <div class="q-pa-none q-gutter-sm" style="padding: 0 0;">
    <q-breadcrumbs class="text-brown">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="white" />
      </template>

      <q-breadcrumbs-el clickable to="/" :label="$t('NAVBAR_ITEM_1')" style="color: #ffc107" />
      <q-breadcrumbs-el :label="$t('OFFRE_EMPLOIS')" style="color: white" />
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
        <h6 class="no_border text-white q-mt-md q-mb-md"><i class="fa-solid fa-magnifying-glass"></i> {{
            $t('EMPLOIS_13')
        }}</h6>
      </div>

      <div>

        <h6 class="text-white q-pa-none q-ma-none">{{ $t('EMPLOIS_1') }}</h6>

        <div class="q-mb-md col-md-2">

          <q-input dark v-model="formSearch.search_emplois" class="q-mb-lg q-mt-lg" :label="$t('EMPLOIS_3')" counter
            maxlength="100" :dense="dense">

            <template v-slot:append>
              <q-icon v-if="formSearch.search_emplois !== ''" name="close" @click="formSearch.search_emplois = ''"
                class="cursor-pointer" />
              <q-icon name="search" @click="changeForm()" />
            </template>

            <template v-slot:hint>
              {{ $t('CARA_MAX') }}
            </template>

          </q-input>


          <h6 class="text-white q-pa-none q-ma-none q-mb-lg"> {{ $t('EMPLOIS_4') }}</h6>

          <q-radio class="q-pa-none q-ma-none q-mr-md" v-model="formSearch.checkEntreprises" dark style="color: white;"
            label="Vitijob" val="1" @update:model-value="changeForm()" color="orange" />

          <q-radio v-model="formSearch.checkEntreprises" dark style="color: white;" label="Pôle Emploi" val="2"
            color="orange" @update:model-value="changeForm()" />

          <h6 class="text-white q-pa-none q-ma-none q-mb-md q-mt-lg">{{ $t('EMPLOIS_5') }}</h6>

          <q-select :options="stringOptions" transition-show="flip-up" transition-hide="flip-down"
            v-model="formSearch.domaine" :dense="dense" dark emit-value map-options text-color="white"
            style="max-height: 100px" behavior="menu" @update:model-value="changeForm()" />

          <h6 class="text-white q-pa-none q-ma-none q-mb-md q-mt-lg">{{ $t('EMPLOIS_15') }}</h6>

          <q-checkbox class="q-pa-none q-ma-none q-mr-md" v-model="formSearch.vendanges"
            @update:model-value="changeForm()" dark style="color: white;" true-value="vendanges" false-value=""
            label="Offres vendanges" val="vendanges" color="orange" />

          <h6 class="text-white q-pa-none q-ma-none q-mb-md q-mt-lg">{{ $t('EMPLOIS_6') }}</h6>

          <q-select :options="stringOptions2" transition-show="flip-up" transition-hide="flip-down"
            v-model="formSearch.contrat" :dense="dense" dark emit-value map-options text-color="white"
            style="max-height: 100px" behavior="menu" @update:model-value="changeForm()" />

          <h6 class="text-white q-pa-none q-ma-none q-mb-md q-mt-lg">{{ $t('EMPLOIS_7') }}</h6>

          <q-select :options="stringOptions3" transition-show="flip-up" transition-hide="flip-down"
            v-model="formSearch.experience" :dense="dense" dark emit-value map-options text-color="white"
            style="max-height: 100px" behavior="menu" @update:model-value="changeForm()" />

          <h6 class="text-white q-pa-none q-ma-none q-mb-md q-mt-lg">{{ $t('EMPLOIS_8') }}</h6>

          <q-select :options="stringOptions4" option-value="value" option-label="label" transition-show="flip-up"
            transition-hide="flip-down" v-model="formSearch.region" :dense="dense" dark emit-value map-options
            text-color="white" style="max-height: 100px" behavior="menu" @update:model-value="changeForm()">

            <template v-slot:option="scope">

              <q-item :label="scope.opt.title">
                <q-item-section class="text-warning">{{ scope.opt.title }}</q-item-section>
              </q-item>

              <template v-for="child in scope.opt.children" :key="child.label">
                <q-item clickable v-ripple v-close-popup @click="formSearch.region = child"
                  :class="{ 'bg-light-blue-1': formSearch.region === child.id }">
                  <q-item-section>
                    <q-item-label v-html="child.label" class="q-ml-md"></q-item-label>
                  </q-item-section>
                </q-item>

              </template>

            </template>

          </q-select>

        </div>

      </div>

    </div>

    <div v-if="listEmplois.length !== 0" style="display: flex; flex-direction: column; width: 100%"
      v-show="showSimulatedReturnData">

      <div>
        <h6 class="text-white q-mt-md q-mb-md" style="padding-bottom: 13px;border-bottom: 3px solid #ffc107;"><i
            class="fa-solid fa-square-poll-horizontal"></i> {{ $t('EMPLOIS_1') }}</h6>
      </div>

      <div class="text-end q-mb-md">
        <span class="fw-bold text-white" style="font-size: 13px;">&gt; <span class="count_jobs">{{ listEmplois.length
        }}</span> {{ $t('EMPLOIS_9') }}</span>
      </div>

      <div class="box_jobs">

        <div class="card_jobs text-white" v-for="(jobs, index) in getData" :key="index">

          <div class="q-mt-sm">

            <div class="col-md-2" style="display: flex;flex-direction: column;justify-content: space-around;">
              <img v-if="jobs.sticker != null"
                :src="'https://nosvinsdumonde.fr/assets/img/offres/stickers/' + jobs.sticker" class="shadow"
                :alt="jobs.title"
                style="border-radius: 10px;background: white;padding: 10px;max-height: 110px;max-width: 110px;">

              <img v-else :src="'https://nosvinsdumonde.fr/assets/img/offres/entreprises/' + jobs.entrepriseImage"
                class="shadow" :alt="jobs.title"
                style="border-radius: 10px;background: white;padding: 10px;max-height: 110px;max-width: 110px;">
            </div>

            <div class="col-md-7">

              <h6 class="fw-bold q-ma-none q-pa-none q-mb-md q-mt-md">{{ jobs.title }}</h6>
              <p
                style="font-weight: 600;max-width: 430px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
                <span v-if="jobs.departement">{{ jobs.departement }} - {{ jobs.departementId }} /</span> {{
                    jobs.type_contrat
                }}<span v-if="jobs.type_contrat == 'CDD'"> - {{ jobs.duree }}</span>
              </p>

              <p>{{ jobs.entreprise }}</p>

              <div class="badge_domaine">{{ jobs.domaine }}</div>

            </div>

            <div class="col-md-3"
              style="display: flex;align-items: flex-start;flex-direction: column;justify-content: space-between;">

              <div class="badge_jobs">REF : {{ jobs.ref }}</div>

              <div class="" v-if="jobs.salaire != null" style="margin-top: 1em;"><b>{{ $t('EMPLOIS_10') }} :</b> <span
                  style="color: #77ff09de;">{{ jobs.salaire
                  }}</span></div>

              <div v-if="jobs.experience != ''" class="" style="margin-top: 1em;"><b>{{ $t('EMPLOIS_11') }} :
                </b><br><span style="color: #09d4ffde;">{{ jobs.experience }}</span></div>

              <div style="margin-top: 1em;">{{ $t('EMPLOIS_12') }} {{ moment(jobs.created_at).format('DD/MM/YYYY') }}
              </div>

              <q-btn class="q-mt-md q-mb-sm" push :href="jobs.entrepriseUrl + jobs.url" :title="jobs.title" color="info"
                target="_blank"> {{ $t('POSTULER') }}</q-btn>

            </div>

          </div>

        </div>

      </div>
      <q-pagination class="q-mt-lg" style="justify-content: center;" v-model="page" :input="true"
        input-class="text-info" :min="currentPage" :max="Math.ceil(listEmplois.length / totalPages)" direction-links
        outline color="orange" :boundary-numbers="false" active-color="primary" v-ripple />

    </div>

  </div>

  <q-item v-if="listEmplois.length === 0" v-show="showSimulatedReturnData" class="q-ma-none q-pa-none text-white"
    style="text-align: center;margin: 0px auto;display: flex;justify-content: center;flex-direction: column;align-content: center;">
    <span style="font-size: 18px;" v-show="showSimulatedReturnData">{{ $t('EMPTY_search') }}</span>
  </q-item>

  <!-- Loader -->
  <div :showing="visible" v-show="visible" class="container-md q-mt-lg q-mb-lg" style="padding: 0 0;width: 100%;">
    <div id="load" class="col text-center">
      <div id="loaderComment" class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>

</template>

<style>
.card_jobs {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.badge_jobs {
  background: #419595;
  height: 28px;
  padding: 4px 10px;
  font-weight: bold;
  text-align: left;
  flex: 1 1 auto;
  display: inline-block;
}

.badge_domaine {
  background: #95417a;
  margin-bottom: 0.35em;
  height: 28px;
  padding: 4px 10px;
  font-weight: bold;
  text-align: center;
  flex: 1 1 auto;
  display: inline-block;
}
</style>

<script>
import { ref } from 'vue';
import { mapActions } from 'vuex';
// import { useQuasar } from 'quasar';
import moment from 'moment';

moment.locale('fr');

let decoder;

var stringOptions = [{
  'value': 'Viticulture',
  'label': 'Viticulture',
  'url': 'viticulture'
},
{
  'value': 'Cave / Vinification',
  'label': 'Cave / Vinification',
  'url': 'cave-vinification'
},
{
  'value': 'Commerce',
  'label': 'Commerce',
  'url': 'commerce'
},
{
  'value': 'Marketing / Communication',
  'label': 'Marketing / Communication',
  'url': 'marketing-communication'
},
{
  'value': 'Administration / Finance',
  'label': 'Administration / Finance',
  'url': 'administration-finance'
},
{
  'value': 'Logistique / Achat',
  'label': 'Logistique / Achat',
  'url': 'logistique-achat'
},
{
  'value': 'Direction',
  'label': 'Direction',
  'url': 'direction'
},
{
  'value': 'Export / International',
  'label': 'Export / International',
  'url': 'export-international'
},
{
  'value': 'Qualité / R & D',
  'label': 'Qualité / R & D',
  'url': 'qualite-r-&-d'
},
{
  'value': 'Production / Embouteillage',
  'label': 'Production / Embouteillage',
  'url': 'production-embouteillage'
},
{
  'value': 'Œnotourisme',
  'label': 'Œnotourisme',
  'url': 'oeotourisme'
},
{
  'value': 'Sommellerie',
  'label': 'Sommellerie',
  'url': 'sommellerie'
},
{
  'value': 'Installation et maintenance informatique',
  'label': 'Installation et maintenance informatique',
  'url': 'installation-et-maintenance-informatique'
},
{
  'value': 'Entretien / Maintenance',
  'label': 'Entretien / Maintenance',
  'url': 'entretien-maintenance'
}
];

var stringOptions2 = [{
  'label': 'CDD',
  'value': 'cdd'
},
{
  'label': 'CDI',
  'value': 'cdi'
},
{
  'label': 'Alternance\/Apprentissage',
  'value': 'alternance-apprentissage'
},
{
  'label': 'Stage',
  'value': 'stage'
},
{
  'label': 'VIE (Volontariat International en Entreprise)',
  'value': 'vie'
},
{
  'label': 'VRP\/Agent\/Freelance',
  'value': 'vrp-agent-freelance'
},
{
  'label': "Contrat d'intérim",
  'value': 'contrat-d-interim'
}
];

var stringOptions3 = [
  {
    'label': 'Moins de 2 ans',
    'value': 'Moins de 2 ans'
  }, {
    'label': 'Minimum 2 à 5 ans',
    'value': 'Minimum 2 à 5 ans'
  }, {
    'label': 'Minimum 5 à 10 ans',
    'value': 'Minimum 5 à 10 ans'
  }, {
    'label': 'Plus de 10 ans',
    'value': 'Plus de 10 ans'
  },
];

var stringOptions4 = [
  {
    title: 'Auvergne-Rhône-Alpes',
    children: [
      {
        'value': 'Ain',
        'label': 'Ain'
      },
      {
        'value': 'Allier',
        'label': 'Allier'
      },
      {
        'value': 'Ardèche',
        'label': 'Ardèche'
      },
      {
        'value': 'Cantal',
        'label': 'Cantal'
      },
      {
        'value': 'Drôme',
        'label': 'Drôme'
      },
      {
        'value': 'Isère',
        'label': 'Isère'
      },
      {
        'value': 'Loire',
        'label': 'Loire'
      },
      {
        'value': 'Haute-Loire',
        'label': 'Haute-Loire'
      },
      {
        'value': 'Puy-de-Dôme',
        'label': 'Puy-de-Dôme'
      },
      {
        'value': 'Rhône',
        'label': 'Rhône'
      },
      {
        'value': 'Savoie',
        'label': 'Savoie'
      },
      {
        'value': 'Haute-Savoie',
        'label': 'Haute-Savoie'
      },
    ]
  },
  {
    title: 'Bourgogne-Franche-Comté',
    children: [
      {
        'value': "Côte-d'Or",
        'label': "Côte-d'Or"
      },
      {
        'value': 'Doubs',
        'label': 'Doubs'
      },
      {
        'value': 'Jura',
        'label': 'Jura'
      },
      {
        'value': 'Nièvre',
        'label': 'Nièvre'
      },
      {
        'value': 'Haute-Saône',
        'label': 'Haute-Saône'
      },
      {
        'value': 'Saône-et-Loire',
        'label': 'Saône-et-Loire'
      },
      {
        'value': 'Yonne',
        'label': 'Yonne'
      },
      {
        'value': 'Territoire de Belfort',
        'label': 'Territoire de Belfort'
      },
    ]
  },
  {
    title: 'Bretagne',
    children: [
      {
        'value': "Côtes-d'Armor",
        'label': "Côtes-d'Armor"
      },
      {
        'value': 'Finistère',
        'label': 'Finistère'
      },
      {
        'value': 'Ille-et-Vilaine',
        'label': 'Ille-et-Vilaine'
      },
      {
        'value': 'Morbihan',
        'label': 'Morbihan'
      },
    ]
  },
  {
    title: 'Centre-Val de Loire',
    children: [
      {
        'value': 'Cher',
        'label': 'Cher'
      },
      {
        'value': 'Eure-et-Loir',
        'label': 'Eure-et-Loir'
      },
      {
        'value': 'Indre',
        'label': 'Indre'
      },
      {
        'value': 'Indre-et-Loire',
        'label': 'Indre-et-Loire'
      },
      {
        'value': 'Loir-et-Cher',
        'label': 'Loir-et-Cher'
      },
      {
        'value': 'Loiret',
        'label': 'Loiret'
      },
    ]
  },
  {
    title: 'Corse',
    children: [
      {
        'value': 'Corse-du-Sud',
        'label': 'Corse-du-Sud'
      },
      {
        'value': 'Haute-Corse',
        'label': 'Haute-Corse'
      },
    ]
  },
  {
    title: 'DOM-TOM',
    children: [
      {
        'value': 'Guadeloupe',
        'label': 'Guadeloupe'
      },
      {
        'value': 'Martinique',
        'label': 'Martinique'
      },
      {
        'value': 'Guyane',
        'label': 'Guyane'
      },
      {
        'value': 'La Réunion',
        'label': 'La Réunion'
      },
    ]
  },
  {
    title: 'Grand-Est',
    children: [
      {
        'value': 'Ardennes',
        'label': 'Ardennes'
      },
      {
        'value': 'Aube',
        'label': 'Aube'
      },
      {
        'value': 'Marne',
        'label': 'Marne'
      },
      {
        'value': 'Haute-Marne',
        'label': 'Haute-Marne'
      },
      {
        'value': 'Meurthe-et-Moselle',
        'label': 'Meurthe-et-Moselle'
      },
      {
        'value': 'Meuse',
        'label': 'Meuse'
      },
      {
        'value': 'Moselle',
        'label': 'Moselle'
      },
      {
        'value': 'Bas-Rhin',
        'label': 'Bas-Rhin'
      },
      {
        'value': 'Haut-Rhin',
        'label': 'Haut-Rhin'
      },
      {
        'value': 'Vosges',
        'label': 'Vosges'
      },
    ]
  },
  {
    title: 'Haut-de-France',
    children: [
      {
        'value': 'Aisne',
        'label': 'Aisne'
      },
      {
        'value': 'Nord',
        'label': 'Nord'
      },
      {
        'value': 'Oise',
        'label': 'Oise'
      },
      {
        'value': 'Pas-de-Calais',
        'label': 'Pas-de-Calais'
      },
      {
        'value': 'Somme',
        'label': 'Somme'
      },
    ]
  },
  {
    title: 'ÎLe-France',
    children: [
      {
        'value': 'Paris',
        'label': 'Paris'
      },
      {
        'value': 'Seine-et-Marne',
        'label': 'Seine-et-Marne'
      },
      {
        'value': 'Yvelines',
        'label': 'Yvelines'
      },
      {
        'value': 'Essonne',
        'label': 'Essonne'
      },
      {
        'value': 'Hauts-de-Seine',
        'label': 'Hauts-de-Seine'
      },
      {
        'value': 'Seine-Saint-Denis',
        'label': 'Seine-Saint-Denis'
      },
      {
        'value': 'Val-de-Marne',
        'label': 'Val-de-Marne'
      },
      {
        'value': "Val-d'Oise",
        'label': "Val-d'Oise"
      },
    ]
  },
  {
    title: 'Normandie',
    children: [
      {
        'value': 'Calvados',
        'label': 'Calvados'
      },
      {
        'value': 'Eure',
        'label': 'Eure'
      },
      {
        'value': 'Manche',
        'label': 'Manche'
      },
      {
        'value': 'Orne',
        'label': 'Orne'
      },
      {
        'value': 'Seine-Maritime',
        'label': 'Seine-Maritime'
      },
    ]
  },
  {
    title: 'Nouvelle-Aquitaine',
    children: [
      {
        'value': 'Charente',
        'label': 'Charente'
      },
      {
        'value': 'Charente-Maritime',
        'label': 'Charente-Maritime'
      },
      {
        'value': 'Corrèze',
        'label': 'Corrèze'
      },
      {
        'value': 'Creuse',
        'label': 'Creuse'
      },
      {
        'value': 'Dordogne',
        'label': 'Dordogne'
      },
      {
        'value': 'Gironde',
        'label': 'Gironde'
      },
      {
        'value': 'Landes',
        'label': 'Landes'
      },
      {
        'value': 'Lot-et-Garonne',
        'label': 'Lot-et-Garonne'
      },
      {
        'value': 'Pyrénées-Atlantiques',
        'label': 'Pyrénées-Atlantiques'
      },
      {
        'value': 'Deux-Sèvres',
        'label': 'Deux-Sèvres'
      },
      {
        'value': 'Vienne',
        'label': 'Vienne'
      },
      {
        'value': 'Haute-Vienne',
        'label': 'Haute-Vienne'
      },
    ]
  },
  {
    title: 'Occitanie',
    children: [
      {
        'value': 'Ariège',
        'label': 'Ariège'
      },
      {
        'value': 'Aude',
        'label': 'Aude'
      },
      {
        'value': 'Aveyron',
        'label': 'Aveyron'
      },
      {
        'value': 'Gard',
        'label': 'Gard'
      },
      {
        'value': 'Haute-Garonne',
        'label': 'Haute-Garonne'
      },
      {
        'value': 'Gers',
        'label': 'Gers'
      },
      {
        'value': 'Hérault',
        'label': 'Hérault'
      },
      {
        'value': 'Lot',
        'label': 'Lot'
      },
      {
        'value': 'Lozère',
        'label': 'Lozère'
      },
      {
        'value': 'Hautes-Pyrénées',
        'label': 'Hautes-Pyrénées'
      },
      {
        'value': 'Pyrénées-Orientales',
        'label': 'Pyrénées-Orientales'
      },
      {
        'value': 'Tarn',
        'label': 'Tarn'
      },
      {
        'value': 'Tarn-et-Garonne',
        'label': 'Tarn-et-Garonne'
      },
    ]
  },
  {
    title: 'Pays-de-Loire',
    children: [
      {
        'value': 'Loire-Atlantique',
        'label': 'Loire-Atlantique'
      },
      {
        'value': 'Maine-et-Loire',
        'label': 'Maine-et-Loire'
      },
      {
        'value': 'Mayenne',
        'label': 'Mayenne'
      },
      {
        'value': 'Sarthe',
        'label': 'Sarthe'
      },
      {
        'value': 'Vendée',
        'label': 'Vendée'
      },
    ]
  },
  {
    title: 'Provence-Alpes Côte d\'Azur',
    children: [
      {
        'value': 'Alpes-de-Haute-Provence',
        'label': 'Alpes-de-Haute-Provence'
      },
      {
        'value': 'Hautes-Alpes',
        'label': 'Hautes-Alpes'
      },
      {
        'value': 'Alpes-Maritimes',
        'label': 'Alpes-Maritimes'
      },
      {
        'value': 'Bouches-du-Rhône',
        'label': 'Bouches-du-Rhône'
      },
      {
        'value': 'Var',
        'label': 'Var'
      },
      {
        'value': 'Vaucluse',
        'label': 'Vaucluse'
      }
    ]
  }
];

export default {
  name: 'offresemploisName',
  setup() {
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);
    // const $q = useQuasar();

    return {
      moment: moment,
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
      dense: ref(false),
    }
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
      formSearch: {
        search_emplois: ref(''),
        checkEntreprises: ref('1'),
        domaine: null,
        vendanges: ref(''),
        contrat: null,
        experience: null,
        region: null,
      }
    }
  },
  methods: {
    ...mapActions('offres_emplois', ['getEmplois']),
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    changeForm() {
      this.getEmplois(this.formSearch);
      this.showTextLoading();
    },
  },
  components: {},
  computed: {
    getData() {
      return this.listEmplois.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
    },
  },
  mounted() {
    this.showTextLoading();
  },
  props: {
    listEmplois: Array,
  },
};
</script>
