<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <div class="text-h4 text-white bloc_vin_title" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
      <q-item class="title">{{ $t('TITLE_PAGE_HISTORIQUE') }}</q-item>
    </div>

    <h6 class="text-center text-white q-pa-none q-ma-none" style="display:block; margin: 0 auto;">{{
        $t('SUBTITLE_PAGE_HISTORIQUE')
    }}</h6>

    <!-- BreadCrump -->
    <div class="q-pa-none q-gutter-sm q-mt-sm">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el clickable to="/" :label="$t('NAVBAR_ITEM_1')" style="color: #ffc107" />

        <q-breadcrumbs-el :label="$t('LINK_17')" style="color: white" />
      </q-breadcrumbs>
    </div>

    <q-item v-show="showSimulatedReturnData" class="q-pa-none q-ma-none q-mt-md"
      style="width: 100%; justify-content: center;">
      <img
        src="../../assets/img/kisspng-pallet-terminal-ltd-freight-transport-manufacturin-5af6d189216270.1669839015261249371368.png"
        style="width: 80%;" alt="">
    </q-item>

    <div class="q-mt-md" style="margin-bottom: 0; padding: 0 0; width: 100%;" v-show="showSimulatedReturnData">
      <q-item class="q-ma-none q-pa-none" v-if="!hide">
        <h6 class="text-white q-ma-none q-mt-none"><i class="fa-solid fa-triangle-exclamation q-mr-sm"
            style="color: #ffec02;"></i> {{ $t('EMPTY_COMMANDE') }}</h6>
      </q-item>

      <q-item class="q-ma-none q-pa-none" style="display: block;" v-else>

        <div id="tableTotal" class="col-lg-12 q-mb-lg">

          <div class="row justify-content-center text-white">

            <div class="col-md-3 item shadow q-mt-md q-ml-sm q-mb-md q-mr-sm" style="width: 100%;">

              <div class="text-center">
                <h6 class="q-pa-none q-ma-none"><b>{{ $t('COMMANDE_ITEM_1') }} :</b></h6>
              </div>

              <div class="text-center q-mt-md q-mb-md">
                <i class="fa-solid fa-cart-shopping" style="color: burlywood;font-size: 40px;"></i>
              </div>

              <div class="text-center q-mt-md">
                <h6 class="q-pa-none q-ma-none"><b>{{ replaceVirgule(listCommandesHistorique.data4) }} / {{
                    replaceVirgule(listCommandesHistorique.data3)
                }} €</b></h6>
              </div>

            </div>

            <div class="col-md-3 item shadow q-mt-md q-ml-sm q-mb-md q-mr-sm" style="width: 100%;">

              <div class="text-center">
                <h6 class="q-pa-none q-ma-none"><b>{{ $t('COMMANDE_ITEM_2') }} :</b></h6>
              </div>

              <div class="text-center q-mt-md q-mb-md">
                <i class="fa-solid fa-piggy-bank" style="color: #97f1ff;font-size: 40px;"></i>
              </div>

              <div class="text-center q-mt-md">
                <h6 class="q-pa-none q-ma-none"><b> {{ replaceVirgule(listCommandesHistorique.data2) }}
                    €</b></h6>
              </div>

            </div>

            <div class="col-md-3 item shadow q-mt-md q-ml-sm q-mr-sm" style="width: 100%;">

              <div class="text-center">
                <h6 class="q-pa-none q-ma-none"><b>{{ $t('COMMANDE_ITEM_3') }} :</b></h6>
              </div>

              <div class="text-center q-mt-md q-mb-md">
                <i class="fa-solid fa-gift" style="color: #f1ff7d;font-size: 40px;"></i>
              </div>

              <div class="text-center q-mt-md">
                <h6 class="q-pa-none q-ma-none"><b>{{ this.user.point }}</b></h6>
              </div>

            </div>

          </div>

        </div>

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

              <q-td key="list_product" :props="props">
                <q-item v-for="list_product in props.row.list_product" v-bind:key="list_product"
                  class="q-ma-none q-pa-none" style="min-height: 0;justify-content: start;align-items: center;"> {{
                      decode(list_product)
                  }}</q-item>
              </q-td>

              <q-td key="transaction" :props="props">
                {{ props.row.transaction }}
              </q-td>

              <q-td key="status" :props="props">
                {{ props.row.status }}
              </q-td>

              <q-td key="total" :props="props">
                <q-badge color="info" class="q-pa-sm">
                  {{ props.row.total }}
                </q-badge>
              </q-td>

              <q-td key="port" :props="props">
                <q-badge color="teal" class="q-pa-sm">
                  {{ props.row.port }}
                </q-badge>
              </q-td>

              <q-td key="date_paiement" :props="props">
                {{ props.row.date_paiement }}
              </q-td>

            </q-tr>

          </template>

        </q-table>

        <div class="row justify-center q-mt-md q-mb-md" v-if="listCommandesHistorique.data1">
          <q-pagination v-model="pagination.page" color="primary"
            :max="Math.ceil(listCommandesHistorique.data1.length / pagination.rowsPerPage)" size="md"
            :boundary-links="false" :direction-links="false" :max-pages="6" />
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

<style>
#tableTotal {
  padding-right: var(--bs-gutter-x, .75rem);
  padding-left: var(--bs-gutter-x, .75rem);
}

#tableTotal .item {
  background: #fffaf000;
  padding: 24px;
  border-radius: 16px;
  border: 2px solid #fff;
}
</style>

<script>

import { mapActions, mapGetters, mapState } from 'vuex';
import { defineComponent } from 'vue';
// import { useQuasar } from 'quasar';
import { Cookies } from 'quasar';
import { ref } from 'vue';
import moment from 'moment';

var counter = 1;
let decoder;

moment.locale('fr');

export default defineComponent({
  name: 'HistoriqueCommandes',
  setup() {
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);
    const filter = ref('');
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
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

    const columns = [
      { name: 'id', align: 'left', label: this.$t('NUMERO_COMMANDE'), field: 'id', sortable: true },
      { name: 'list_product', align: 'left', label: this.$t('LISTE_PRODUITS'), field: 'list_product', sortable: true },
      { name: 'transaction', align: 'left', label: this.$t('NUMERO_TRANSACTION'), field: 'transaction', sortable: true },
      { name: 'status', align: 'left', label: this.$t('STATUS_TRANSACTION'), field: 'status' },
      { name: 'total', align: 'left', label: this.$t('TOTALS'), field: 'total' },
      { name: 'port', align: 'left', label: this.$t('FDP'), field: 'port', sortable: true },
      { name: 'date_paiement', align: 'right', label: this.$t('DATE_PAIMENT'), field: 'date_paiement', sortable: true }
    ]

    return {
      columns,
      hide: false,
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
    ...mapState('users', ['listCommandesHistorique']),
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
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    updateCivilite() {
      this.formUpdates.civilite = this.user.civilite;
    },
    ...mapActions('users', ['loggedDataUser']),
    ...mapActions('users', ['loggedAuth']),
    ...mapActions('users', ['getHistoriqueCommandes']),
    replaceGuillemet(value) {
      return value.replaceAll('"', '');
    },
    loadTable() {

      function decode(html) {
        decoder = decoder || document.createElement('div');
        decoder.innerHTML = html;
        return decoder.textContent;
      };

      if (this.listCommandesHistorique.data1.length >= 1) {

        this.hide = true;

        this.listCommandesHistorique.data1.forEach(e => {

          var transaction;

          switch (e.id_status_commande) {
            case 1:
              transaction = $t('TRANSACTION1')
              break;

            case 2:
              transaction = $t('TRANSACTION2')
              break;

            case 3:
              transaction = $t('TRANSACTION3')
              break;

            case 4:
              transaction = $t('TRANSACTION4')
              break;
          }

          this.rows.push({
            id: e.id,
            list_product: decode(e.nomBoisson.replace(',', ' / ')),
            transaction: e.transaction_id,
            status: transaction,
            total: this.replaceVirgule(e.total) + ' €',
            port: this.replaceVirgule(e.port) + ' €',
            date_paiement: moment(e.date_paiement_effectue).format('Do MMMM YYYY à H:mm')
          });

        });

      }

    },
  },
  mounted() {
    setTimeout(() => {
      this.getHistoriqueCommandes(this.user.id);
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
