<template>

  <div style="padding: 0 5vw">
    <!-- BreadCrump -->
    <div class="q-pa-none q-mt-lg q-gutter-sm">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el clickable to="/" :label="$t('NAVBAR_ITEM_1')" style="color: #ffc107" />
        <q-breadcrumbs-el clickable :label="$t('LINK_23')" style="color: white" />
      </q-breadcrumbs>
    </div>

    <div class="container-md q-mt-lg q-mb-lg">
      <div class="text-h4 text-white bloc_vin_title q-mb-lg q-mt-lg" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
        <q-item class="title">{{ $t('TITLE_PAGE_SOLDES') }}</q-item>
      </div>
    </div>

    <div>
      <q-img src="https://nosvinsdumonde.com/assets/img/soldes.jpg"></q-img>
    </div>

    <div class="text-white q-mt-lg">

      <div v-html="$t('PAGE_SOLDE')"></div>

      <div>
        <q-btn to="/bon-plans" push color="warning" size="lg" class="q-mb-sm q-mt-sm">{{ $t('DECOUVRIR_BTN') }}</q-btn>
      </div>

      <div v-html="$t('PAGE_SOLDE_2')"></div>

      <div class="col-md-6">


        <q-btn push to="/regions/1/1" class="q-ma-sm" text-color="white"
          style="border-radius: 16px; background: #d8707d !important">
          <span>Alsace</span>
        </q-btn>

        <q-btn push to="/regions/1/4" class="q-ma-sm" text-color="white"
          style="border-radius: 16px; background: #d8707d !important">
          <span>Beaujolais-Mâconnais</span>
        </q-btn>

        <q-btn push to="/regions/1/5" class="q-ma-sm" text-color="white"
          style="border-radius: 16px; background: #d8707d !important">
          <span>Bordeaux</span>
        </q-btn>

        <q-btn push to="/regions/1/6" class="q-ma-sm" text-color="white"
          style="border-radius: 16px; background: #d8707d !important">
          <span>Bourgogne</span>
        </q-btn>

        <q-btn push to="/regions/1/7" class="q-ma-sm" text-color="white"
          style="border-radius: 16px; background: #d8707d !important">
          <span>Champagne</span>
        </q-btn>

        <q-btn push to="/regions/1/8" class="q-ma-sm" text-color="white"
          style="border-radius: 16px; background: #d8707d !important">
          <span>Jura-Savoie</span>
        </q-btn>

        <q-btn push to="/regions/1/12" class="q-ma-sm" text-color="white"
          style="border-radius: 16px; background: #d8707d !important">
          <span>Languedoc-Roussillon</span>
        </q-btn>

        <q-btn push to="/regions/1/13" class="q-ma-sm" text-color="white"
          style="border-radius: 16px; background: #d8707d !important">
          <span>Loire et Centre</span>
        </q-btn>

        <q-btn push to="/regions/1/17" class="q-ma-sm" text-color="white"
          style="border-radius: 16px; background: #d8707d !important">
          <span>Normandie</span>
        </q-btn>

      </div>

      <div v-html="$t('PAGE_SOLDE_3')"></div>

    </div>

  </div>

</template>

