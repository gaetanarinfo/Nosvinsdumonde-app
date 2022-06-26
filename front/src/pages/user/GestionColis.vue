<template>

  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">

    <div class="text-h4 text-white bloc_vin_title" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
      <q-item class="title">Gestion de mes livraisons</q-item>
    </div>

    <!-- BreadCrump -->
    <div class="q-pa-none q-gutter-sm">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el clickable to="/" label="Accueil" style="color: #ffc107" />

        <q-breadcrumbs-el label="Gestion des livraisons" style="color: white" />
      </q-breadcrumbs>
    </div>

    <q-item v-show="showSimulatedReturnData" class="q-pa-none q-ma-none q-mt-md q-mb-md"
      style="width: 100%; justify-content: center;">
      <img src="../../assets/img/Delivery-Scooter-PNG-Cutout.png" style="width: 70%;" alt="">
    </q-item>

    <div class="q-mt-md" style="margin-bottom: 0px;padding: 0px;width: 100%;margin: 1em auto;padding: 0;"
      v-show="showSimulatedReturnData">

      <q-item class="q-ma-none q-pa-none" v-if="listColisHistorique.length < 1">
        <h6 class="text-white q-ma-none q-mt-none"><i class="fa-solid fa-triangle-exclamation q-mr-sm"
            style="color: #ffec02;"></i> Aucune
          commande n'a été passer au
          cours des 12 derniers mois.</h6>
      </q-item>

      <q-item class="q-ma-none q-pa-none" style="display: block;" v-else>

        <q-table hide-pagination grid card-class="bg-primary text-white" :rows="rows" :loading="loading"
          :pagination="pagination" :columns="columns" :filter="filter" row-key="id" :dense="$q.screen.lt.md" dark
          color="amber">

          <template v-slot:top>
            <img style="height: 40px; width: 40px" src="../../assets/img/logo.png">
            <q-space />
            <q-input borderless dense debounce="300" dark color="primary" v-model="filter">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body="props">

            <q-tr :props="props">

              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>

              <q-td key="transaction" :props="props">
                {{ props.row.transaction }}
              </q-td>

              <q-td key="status" :props="props">
                {{ props.row.status }}
              </q-td>

            </q-tr>

          </template>

        </q-table>

        <div class="row justify-center q-mt-md q-mb-md" v-if="listColisHistorique">
          <q-pagination v-model="pagination.page" color="primary"
            :max="Math.ceil(listColisHistorique.length / pagination.rowsPerPage)" size="md" :boundary-links="false"
            :direction-links="false" :max-pages="6" />
        </div>

      </q-item>

    </div>

    <!-- Loader -->
    <div :showing="visible" v-show="visible" style="position: relative; min-height: 5vw; width: 100%">
      <div class="container-md q-mt-lg q-mb-lg" style="padding: 0 5vw">
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

import { mapActions, mapGetters, mapState } from 'vuex';
import { defineComponent } from 'vue';
// import { useQuasar } from 'quasar';
import { Cookies } from 'quasar';
import { ref } from 'vue';
import moment from 'moment';

var counter = 1;
let decoder;

const columns = [
  { name: 'id', align: 'left', label: 'Numéro de commande ', field: 'id', sortable: true },
  { name: 'status', align: 'left', label: 'Status du colis', field: 'status', sortable: true },
  { name: 'transaction', align: 'left', label: 'Numéro de transaction', field: 'transaction', sortable: true },
]

moment.locale('fr');

export default defineComponent({
  name: 'GestionColis',
  setup() {
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);
    const filter = ref('');
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 6,
      // rowsNumber: 10,
      color: 'white'
    })

    return {
      loading: ref(false),
      pagination,
      dense: ref(null),
      filter,
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
      columns,
      rows: [],
      user: {
        id: null,
        point: 0,
        email: null,
        livraison: null,
        civilite: null,
      },
    };
  },
  computed: {
    ...mapGetters('users', ['setListUser']),
    ...mapGetters('users', ['setLoggedIn']),
    ...mapState('users', ['listColisHistorique']),
  },
  methods: {
    ...mapActions('vins', ['getMultiplesId']),
    ...mapActions('users', ['handleAuthStateChange']),
    checkAuth() {
      this.handleAuthStateChange();
      if (Cookies.has('setLoggedIn') && Cookies.get('setLoggedIn') != 'true') {
        location.href = '/';
      }
      setTimeout(this.checkAuth, 300);
    },
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    ...mapActions('users', ['handleAuthStateChange']),
    mountedData() {

      this.user.id = this.setListUser.id;
      this.user.email = this.setListUser.email;
      this.user.livraison = this.setListUser.livraison;
      this.user.point = this.setListUser.point;

      if (counter <= 2) {
        counter++;
        setTimeout(this.mountedData, 100);
      }
    },
    replaceVirgule(html) {
      return (html + '').replace('.', ',');
    },
    updateCivilite() {
      this.formUpdates.civilite = this.user.civilite;
    },
    ...mapActions('users', ['loggedDataUser']),
    ...mapActions('users', ['loggedAuth']),
    ...mapActions('users', ['getHistoriqueColis']),
    replaceGuillemet(value) {
      return value.replaceAll('"', '');
    },
    loadTable() {

      if (this.listColisHistorique.length !== false) {

        this.listColisHistorique.forEach(e => {

          // var transaction;

          // switch (e.id_status_commande) {
          //   case 1:
          //     transaction = 'Paiement en attente'
          //     break;

          //   case 2:
          //     transaction = 'Paiement réussi'
          //     break;

          //   case 3:
          //     transaction = 'Paiement Annuler'
          //     break;

          //   case 4:
          //     transaction = 'Paiement remboursé'
          //     break;
          // }

          this.rows.push({
            id: e.id,
            status: e.name,
            transaction: e.transaction_id,
          });

        });

      }

    },
  },
  mounted() {
    setTimeout(() => {
      this.getHistoriqueColis(this.user.id);
    }, 600);

    setTimeout(() => {
      this.loadTable();
    }, 1000);
    this.mountedData();
    this.mountedData();
    this.showTextLoading();
    this.loggedAuth();
    this.checkAuth();
    this.loggedDataUser();
  },
  props: {},
});

</script>
