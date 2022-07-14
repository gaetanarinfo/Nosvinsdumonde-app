<template>
  <div class="items-start" style="padding: 0 5vw; flex-direction: column">
    <div class="text-h4 text-white bloc_vin_title q-mb-lg q-mt-lg" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
      <q-item class="title">{{ $t('TITLE_PAGE_CART') }}</q-item>
    </div>

    <!-- BreadCrump -->
    <div class="q-pa-none q-gutter-sm">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el clickable to="/" :label="$t('NAVBAR_ITEM_1')" style="color: #ffc107" />
        <q-breadcrumbs-el :label="$t('LINK_16')" style="color: white" />
      </q-breadcrumbs>
    </div>

    <div class="items-start" v-show="showSimulatedReturnData">

      <div height="auto" class="stepper text-white" id="stepper2" style="height: auto">

        <div class="steps-container">
          <div class="steps">
            <q-item :class="
              this.$route.params.etape == 1 || this.$route.params.etape == 2 || this.$route.params.etape == 3 || this.$route.params.etape == 4 || this.$route.params.etape == 5
                ? 'step active q-pa-none'
                : 'step ' + ' disabled q-pa-none'
            " icon="fa fa-bag-shopping" id="1">
              <div class="step-title">
                <span class="step-number">01</span>
                <div class="step-text">{{ $t('TITLE_PAGE_CARTE') }}</div>
              </div>
              <div class="step-indicator">
                <div class="step-node">
                  <i class="fa fa-bag-shopping" aria-hidden="true"></i>
                </div>
                <div class="step-divider"><span></span><span></span></div>
              </div>
            </q-item>

            <q-item :class="
              this.$route.params.etape == 2 || this.$route.params.etape == 3 || this.$route.params.etape == 4 || this.$route.params.etape == 5
                ? 'step active q-pa-none'
                : 'step ' + ' disabled  q-pa-none'
            " icon="fa fa-user-clock" id="2">
              <div class="step-title">
                <span class="step-number">02</span>
                <div class="step-text">{{ $t('STEP_1') }}</div>
              </div>
              <div class="step-indicator">
                <div class="step-node">
                  <i class="fa fa-user-clock" aria-hidden="true"></i>
                </div>
                <div class="step-divider"><span></span><span></span></div>
              </div>
            </q-item>

            <q-item :class="
              this.$route.params.etape == 3 || this.$route.params.etape == 4 || this.$route.params.etape == 5
                ? 'step active  q-pa-none'
                : 'step ' + ' disabled  q-pa-none'
            " icon="fa fa-map-location-dot" id="3">
              <div class="step-title">
                <span class="step-number">03</span>
                <div class="step-text">{{ $t('STEP_2') }}</div>
              </div>
              <div class="step-indicator">
                <div class="step-node">
                  <i class="fa fa-map-location-dot" aria-hidden="true"></i>
                </div>
                <div class="step-divider"><span></span><span></span></div>
              </div>
            </q-item>

            <q-item :class="
              this.$route.params.etape == 4 || this.$route.params.etape == 5
                ? 'step active  q-pa-none'
                : 'step ' + ' disabled  q-pa-none'
            " icon="fa fa-credit-card" id="4">
              <div class="step-title">
                <span class="step-number">04</span>
                <div class="step-text">{{ $t('STEP_3') }}</div>
              </div>
              <div class="step-indicator">
                <div class="step-node">
                  <i class="fa fa-credit-card" aria-hidden="true"></i>
                </div>
                <div class="step-divider"><span></span><span></span></div>
              </div>
            </q-item>

            <q-item :class="
              this.$route.params.etape == 5
                ? 'step active  q-pa-none'
                : 'step ' + ' disabled  q-pa-none'
            " icon="fa fa-check" id="5">
              <div class="step-title">
                <span class="step-number">05</span>
                <div class="step-text">{{ $t('STEP_4') }}</div>
              </div>
              <div class="step-indicator">
                <div class="step-node">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </div>
              </div>
            </q-item>
          </div>
        </div>

        <div class="stepper-content-container q-mt-xl" style="overflow: hidden">

          <div :loading="loading" :key="versionTable"
            :class="this.$route.params.etape == 1 ? 'stepper-content fade-in active show q-pa-none' : 'stepper-content q-pa-none'"
            v-if="this.$route.params.etape == 1" stepper-label="1">
            <div class="row q-mb-md" style="border: 1px solid #ccc; padding: 24px"
              v-for="item in orderBy(carts, 'idBoisson', -1)" :key="item">
              <div class="col-md-2 img_produit" style="justify-content: center; width: 100%">
                <img :src="
                  'https://nosvinsdumonde.com/assets/img/' +
                  item.typeBoisson +
                  '/' +
                  item.imageBoisson +
                  ''
                " :alt="decode(item.nomBoisson)" />
              </div>

              <div class="col-md-7" style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                ">
                <div class="col">
                  <h5>
                    <q-item clickable style="padding: 0 0" class="text-white text-decoration-none"
                      :to="'/' + item.typeBoisson + '/' + item.idBoisson + ''"><b>{{ decode(item.nomBoisson) }} {{
                          item.milessimeBoisson
                      }}</b></q-item>
                  </h5>
                  <q-item clickable style="padding: 0 0" class="text-white text-decoration-none"
                    :to="'/' + item.typeBoisson + '/' + item.idBoisson + ''">{{ $t('CONTENANCE') }} {{
                        item.contenanceBoisson
                    }}
                  </q-item>
                </div>

                <div class="col mt-4">
                  <div class="row">
                    <q-item @click="removeCart(item.idBoisson)" style="padding: 0 0" clickable class="q-mr-sm"><i
                        class="fa-solid fa-minus"></i></q-item>
                    <q-item style="
                        padding: 0px;
                        font-size: 16px;
                        position: relative;
                        top: -4px;
                        left: 1px;
                      ">{{ item.quantityBoisson }}</q-item>
                    <q-item clickable class="q-ml-sm" style="padding: 0 0" @click="addCart(item.idBoisson)"><i
                        class="fa-solid fa-plus"></i></q-item>
                  </div>
                  <q-item clickable @click="removeCart(item.idBoisson)" class="text-white" style="
                      text-decoration: underline;
                      padding: 0 0;
                      display: block;
                      position: relative;
                      top: -7px;
                    ">{{ $t('SUPPRIMER') }}</q-item>
                </div>
              </div>

              <div class="col-md-3" style="
                  text-align: right;
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-end;
                ">
                <span class="total" :class="item.planBoisson == 1 ? 'text-warning' : ''"
                  :style="item.planBoisson == 1 ? 'text-decoration: line-through!important; font-size: 18px;' : ''">{{
                      replaceVirgule(item.prixBoisson)
                  }} €</span>
                <span class="total" v-if="item.planBoisson == 1">{{ replaceVirgule(item.remiseBoisson) }} €</span>
              </div>
            </div>

            <div class="text-center q-mt-lg">
              <p>
                <q-item-section v-if="!user.id && !user.email" class="text-white" style="
                    text-decoration: underline;
                    padding: 0 0;
                    margin: 0 0;
                    display: inline-block;
                  " clickable @click="register = true"><span style="
                      padding: 0 0;
                      margin: 0 5px 0 0;
                      display: inline-block;
                    ">
                    {{ $t('CUMULE_POINTS') }}</span>
                </q-item-section>

                <q-item-section v-if="user.id && user.email">{{ $t('POINTS') }}
                  {{ points }} PTS</q-item-section>
              </p>
            </div>
          </div>

          <q-item
            :class="!user.id && !user.email && this.$route.params.etape == 2 ? 'stepper-content fade-in active show q-pa-none' : 'stepper-content q-pa-none'"
            v-if="this.$route.params.etape == 2">
            <q-card-section class="text-bold" style="font-size: 18px; text-align: center">
              {{ $t('SUBTITLE_PAGE_LOGIN') }}
            </q-card-section>

            <q-form @submit="submitForm" class="q-mb-lg text-white" v-if="!forgot">
              <q-input v-model="form.email" dark :label="$t('EMAIL_INPUT')"
                :rules="[(val) => validateEmail(val) || $t('EMAIL_VALIDE')]" lazy-rules :hint="$t('LABEL_1')" />

              <q-input type="password" dark v-model="form.password" :label="$t('PASSWORD_INPUT')" lazy-rules
                :hint="$t('LABEL_2')" />

              <q-item class="q-pa-none q-mb-none q-mt-lg text-center" clickable @click="forgot = true">{{
                  $t('FORGOT_PASSWORD')
              }}
              </q-item>

              <q-btn type="submit" color="warning" push :label="$t('SIGNIN')" />

            </q-form>

            <q-form @submit="submitFormForgot" class="q-mb-lg" v-if="forgot">

              <q-card-section class="text-bold" style="font-size: 18px; text-align: center">
                {{ $t('TITLE_MODAL_FORGOT') }}
              </q-card-section>

              <q-input dark class="q-mb-lg" v-model="formForgot.email" label="E-mail"
                :rules="[(val) => validateEmail(val) || $t('EMAIL_VALIDE')]" lazy-rules :hint="$t('LABEL_1')" />

              <q-btn type="submit" color="warning" push :label="$t('VALIDER')" />
              <q-btn class="q-ml-md" color="info" @click="forgot = false" push :label="$t('BACK')" />

            </q-form>

          </q-item>

          <q-item
            :class="user.id && user.email && this.$route.params.etape == 3 ? 'stepper-content fade-in active show q-pa-none' : 'stepper-content q-pa-none'"
            v-if="this.$route.params.etape == 3">

            <div class="col-lg-12">

              <div class="m-auto">

                <div class="container-md">

                  <div>

                    <div class="col-lg-12 m-auto text-left">

                      <div class="m-auto text-center w-100">
                        <h4 class="text-white">{{ $t('MODE_LIVRAISON') }}</h4>
                      </div>

                    </div>

                  </div>

                </div>

                <div class="container-md q-mt-lg">

                  <div class="col-lg-12">

                    <div class="row">

                      <div class="col-md-6">

                        <q-radio size="sm" dark name="livraisonMode1" v-model="formLivraison.livraisonMode1"
                          :dense="dense" @click="addPort(1)" val="1" color="orange" :label="$t('RETRAIT')" />
                        <span class="small">{{ $t('RETRAIT_2') }}</span>

                        <h6 class="no-border q-pa-none q-ma-none q-mt-sm">0,00
                          €</h6>

                        <div class="q-mt-lg q-mb-sm">

                          <q-radio @click="addPort(2)" size="sm" dark name="livraisonMode1"
                            v-model="formLivraison.livraisonMode1" :dense="dense" val="2" color="orange"
                            :label="$t('DOMICILE')" />
                          <span class="small"> {{ $t('RETRAIT_2') }}</span>

                          <h6 class="no-border q-pa-none q-ma-none q-mt-sm">
                            {{ port_definitif }} €</h6>

                        </div>
                      </div>

                    </div>

                  </div>

                  <hr>

                  <div class="col-md-12 q-mt-lg">

                    <h4 class="no-border">{{ $t('COLIS') }}</h4>
                    <span>({{ $t('CHAR') }})</span>

                    <q-input @change="addGiftMessage()" class="q-mt-md" color="white" dark :dense="dense"
                      v-model="formLivraison.giftMessage" filled type="textarea" lazy-rules
                      :rules="[val => val && val.length <= 360 || $t('CARA_360')]" />

                    <div class="row d-flex q-mt-md q-mb-lg" style="align-items: center;">

                      <div class="text-start col">
                        <q-btn @click="showTextLoading()" to="/cart/1" size="md" push color="warning"><i
                            class="fa-solid fa-angle-left q-mr-sm"></i>
                          {{ $t('BACK_PAIEMENT') }}</q-btn>
                      </div>

                      <div class="text-end col">
                        <q-btn @click="showTextLoading()" to="/cart/4" size="md" push color="warning"><i
                            class="fa-solid fa-angle-right q-mr-sm"></i>
                          {{ $t('CONTINUER_PAIEMENT') }}</q-btn>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </q-item>

          <q-item
            :class="user.id && user.email && this.$route.params.etape == 4 ? 'stepper-content fade-in active show q-pa-none' : 'stepper-content q-pa-none'"
            v-if="this.$route.params.etape == 4">
            <div class="col-lg-12">

              <div class="m-auto">

                <div class="container-md">

                  <div>

                    <div class="col-lg-12 m-auto text-left">

                      <div class="m-auto text-center w-100">
                        <h4 class="text-white">{{ $t('MODE_PAIEMENT') }}</h4>
                      </div>

                    </div>

                  </div>

                </div>

                <div class="container-md q-mt-lg">

                  <div class="col-lg-12">

                    <div class="row">

                      <div class="col-md-6" v-if="!getCookiePaiementToken()">

                        <q-radio size="sm" @click="showPaiement(1)" dark name="paiementMethod"
                          v-model="formLivraison.paiementMethod" :dense="dense" val="1" color="orange"
                          :label="$t('METHODE_1')" />

                        <q-item class="q-pa-none q-ma-none" v-show="card" v-model="card">
                          <q-btn color="warning" :class="disabled == true ? 'q-mt-md disabled' : 'q-mt-md'" push
                            @click="addPaiementIntentCard()" :label="$t('PAY_NOW')" />
                        </q-item>

                        <div class="q-mt-lg q-mb-sm">

                          <q-radio size="sm" dark @click="showPaiement(2)" name="paiementMethod"
                            v-model="formLivraison.paiementMethod" :dense="dense" val="2" color="info" label="Paypal" />

                          <q-item class="q-pa-none q-ma-none" v-model="paypal" v-show="paypal">
                            <q-btn color="info" :class="disabled == true ? 'q-mt-md disabled' : 'q-mt-md'" push
                              @click="addPaiementIntentPaypal()" :label="$t('PAY_NOW')" />
                          </q-item>

                        </div>

                        <div class="p-0 text-start q-mt-lg" v-if="user.cashback >= 1">
                          <h6 class="no-border text-white q-ma-none q-pa-none">{{ $t('CASHBACK_DIV') }}</h6>
                          <h6 class="no-border text-info q-ma-none q-pa-none">
                            {{ replaceVirgule(user.cashback) }} € </h6>
                          <q-btn @click="useCashBack()" v-if="user.cashBackActive == 0" size="md" class="q-mt-lg"
                            color="info" push>{{ $t('UTILISE_CASH') }}</q-btn>

                          <q-btn @click="removeCashBack()" v-if="user.cashBackActive == 1" size="md" class="q-mt-lg"
                            color="info" push>{{ $t('REMOVE_CASH') }}</q-btn>
                        </div>

                      </div>

                      <div class="col-md-6" v-if="getCookiePaiementToken()">

                        <div class="doc-note doc-note--tip">
                          <p class="doc-note__title text-dark">{{ $t('VALIDE_PAY') }}</p>
                          <p class="text-dark">{{ $t('VALIDE_PAIEMENT') }} <a
                              :href="'https://nosvinsdumonde.com/fr/paiement/' + getCookiePaiementToken()">{{
                                  $t('CLICK_HERE')
                              }}</a>
                          </p>
                        </div>

                      </div>

                      <div class="p-0 text-start q-mt-lg q-mb-lg">
                        <span>{{ $t('COMMANDE_LEGALE') }}</span>
                      </div>

                      <div class="text-start col q-mb-lg">
                        <q-btn @click="showTextLoading()" to="/cart/3" size="md" push color="warning"><i
                            class="fa-solid fa-angle-left q-mr-sm"></i>
                          {{ $t('BACK_PAIEMENT') }}</q-btn>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </q-item>

          <q-item
            :class="user.id && user.email && this.$route.params.etape == 5 ? 'stepper-content fade-in active show q-pa-none' : 'stepper-content q-pa-none'"
            v-if="this.$route.params.etape == 5 && !getCookiePaiementToken()">
            <div class="col-lg-12">

              <div class="m-auto">

                <div class="container-md">

                  <div>

                    <div class="col-lg-12 m-auto text-left">

                      <div class="m-auto text-center w-100">
                        <h4 class="text-white">{{ $t('MESSAGE_PAY_VALIDE') }}</h4>
                      </div>

                    </div>

                  </div>

                </div>

                <div class="container-md q-mt-lg">

                  <div class="col-lg-12">

                    <div class="row">

                      <div class="col-md-6">

                        <div class="doc-note doc-note--tip">
                          <p class="text-dark"><span class="text-bold text-dark">{{ $t('MESSAGE_PAY_VALIDE')
                          }}</span><br /><br />{{ $t('MESSAGE_PAY_VALIDE_2')
}}<br /><br />{{ $t('MESSAGE_PAY_VALIDE_3') }}
                          </p><br />
                          <p class="text-dark"><a href="/" style="text-decoration: none;">{{ $t('BACK') }}</a></p>
                        </div>

                      </div>

                      <div class="p-0 text-start q-mt-lg q-mb-lg">
                        <span>{{ $t('COMMANDE_LEGALE') }}</span>
                      </div>

                      <div class="text-start col q-mb-lg">
                        <q-btn @click="showTextLoading()" to="/cart/3" size="md" push color="warning"><i
                            class="fa-solid fa-angle-left q-mr-sm"></i>
                          {{ $t('BACK_PAIEMENT') }}</q-btn>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </q-item>

          <div class="col-md-4 m-0 q-mt-md">

            <div class="col text-white" style="
              border: 1px solid #ccc;
              padding: 12px;
              background: darkslategrey;
            ">

              <div class="col-sm-3 service_assistance_img" style="align-self: center">
                <img style="width: 80px" src="https://nosvinsdumonde.com/assets/img/assistance.png" alt="" />
              </div>

              <div class="col ps-0 service_assistance" v-html="$t('INFO_ENTREPRISE')"></div>

            </div>

            <q-item id="bloc_paiement_recap" v-if="this.$route.params.etape == 1"
              class="col text-white q-mt-md q-pa-none" style="
              border: 1px solid #ccc;
              padding: 12px;
              background: darkslategrey;
              display: block;
            ">
              <h5 style="font-size: 22px;"><b>{{ $t('TOTAL') }}</b></h5>

              <span class="total">{{ replaceVirgule(total) }} €</span>

              <div class="text-center q-mt-md q-mb-md">
                <q-btn :to="(!user.id && !user.email) ? '/cart/2' : '/cart/3'" @click="showTextLoading()" size="md" push
                  color="warning"><i class="fa-solid fa-angle-right q-mr-sm"></i> {{ $t('VALIDER_CART') }}</q-btn>
              </div>

              <div class="text-center q-mt-md q-mb-md">
                <span><i class="fa-solid fa-lock"></i></span>
                <span class="q-ml-sm">{{ $t('PAIEMENT_SECUR') }}</span>
              </div>

              <div class="text-center">
                <img style="width: 250px" src="https://nosvinsdumonde.com/assets/img/paiement-securise.png" alt="" />
              </div>
            </q-item>

            <q-item id="bloc_paiement_final" v-if="this.$route.params.etape == 3 || this.$route.params.etape == 4"
              class="col text-white q-mt-md q-pa-none"
              style="display: block; border: 1px solid rgb(204, 204, 204); padding: 12px; background: darkslategrey;">

              <div>

                <h5 style="font-size: 22px;"><b>{{ $t('RECAP_COMMANDE') }}</b></h5>

                <div class="col-md-12 q-mt-lg" v-if="user.premium == 1">

                  <div style="display: flex;align-items: center;justify-content: space-between;">

                    <div class="col-md-6" style="display: flex;align-items: center;justify-content: space-between;">
                      <h6 class="no-border q-pa-none q-ma-none" style="font-size: 16px;text-transform: uppercase;"><b>{{
                          $t('PREMIUM')
                      }}</b>
                      </h6>
                    </div>

                    <div class="col-md-6 text-end">
                      <span>-10 %</span>
                    </div>

                  </div>

                </div>

                <div class="col-md-12 q-mt-sm" v-if="user.cashBackActive == 1">

                  <div style="display: flex;align-items: center;justify-content: space-between;">

                    <div class="col-md-6" style="display: flex;align-items: center;justify-content: space-between;">
                      <h6 class="no-border q-pa-none q-ma-none" style="font-size: 16px;"><b>{{ $t('CASHBACK') }}</b>
                      </h6>
                    </div>

                    <div class="col-md-6 text-end">
                      <span>{{ replaceVirgule(user.cashback) }} €</span>
                    </div>

                  </div>

                </div>

                <div class="col-md-12 q-mt-sm">

                  <div style="display: flex;align-items: center;justify-content: space-between;">

                    <div class="col-md-6" style="display: flex;align-items: center;justify-content: space-between;">
                      <h6 class="no-border q-pa-none q-ma-none" style="font-size: 16px;"><b>{{ $t('TOTAL_1') }}</b></h6>
                    </div>

                    <div class="col-md-6 text-end">
                      <span>{{ replaceVirgule(total) }} €</span>
                    </div>

                  </div>

                </div>

                <div class="col-md-12 q-mt-sm">

                  <div style="display: flex;align-items: center;justify-content: space-between;">

                    <div class="col-md-6">
                      <h6 class="no-border q-pa-none q-ma-none" style="font-size: 16px;"><b>{{ $t('FDP') }}</b></h6>
                    </div>

                    <div class="col-md-6 text-end">
                      <span>{{ port }} €</span>
                    </div>

                  </div>

                </div>

                <div class="col-md-12 q-mt-sm">

                  <div style="display: flex;align-items: center;justify-content: space-between;">

                    <div class="col-md-6">
                      <h6 class="no-border q-pa-none q-ma-none" style="font-size: 16px;text-transform: uppercase;"><b>{{
                          $t('TOTALS_HT')
                      }}</b></h6>
                    </div>

                    <div class="col-md-6 text-end">
                      <span>
                        {{ replaceVirgule(totalHT.toFixed(2)) }} €
                      </span>
                    </div>

                  </div>

                </div>

                <div class="col-md-12 q-mt-sm">

                  <div style="display: flex;align-items: center;justify-content: space-between;">

                    <div class="col-md-6">
                      <h6 class="no-border q-pa-none q-ma-none" style="font-size: 16px;text-transform: uppercase;"><b>{{
                          $t('TOTALS')
                      }}</b></h6>
                    </div>

                    <div class="col-md-6 text-end">
                      <span>
                        {{ replaceVirgule(totalFDP.toFixed(2)) }} €
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </q-item>

            <div id="bloc_adresse_final" class="col text-white q-mt-md"
              style="border: 1px solid rgb(204, 204, 204); padding: 12px; background: darkslategrey;display: block;"
              v-if="this.$route.params.etape == 3 || this.$route.params.etape == 4">

              <div>

                <h5 style="font-size: 22px;"><b>{{
                    $t('ADRESSE_1')
                }}</b></h5>

                <div class="col-md-12 q-mt-md">

                  <span>{{ (user.civilite == 1) ? 'Mme' : 'Mr' }}</span><br>
                  <span v-if="user.societe != ''">{{ user.societe }}</span><br v-if="user.societe != ''">
                  <span>{{ user.prenom }} {{ user.nom }}</span><br>
                  <span>{{ user.adresse }}</span><br>
                  <span>{{ user.code_postal }} {{ user.ville }}</span><br>
                  <span>{{ user.pays }}</span>

                </div>

              </div>

              <div class="q-mt-md">

                <h5 style="font-size: 22px;"><b>{{
                    $t('ADRESSE_2')
                }}</b></h5>

                <div class="col-md-12 q-mt-md" v-if="user.livraison == 1">

                  <span>{{ (user.civilite_livraison == 1) ? 'Mme' : 'Mr' }}</span><br>
                  <span v-if="user.societe != ''">{{ user.societe }}</span><br v-if="user.societe != ''">
                  <span>{{ user.prenom_livraison }} {{ user.nom_livraison }}</span><br>
                  <span>{{ user.adresse_livraison }}</span><br>
                  <span>{{ user.code_postal_livraison }} {{ user.ville_livraison }}</span><br>
                  <span>{{ user.pays_livraison }}</span>

                </div>

                <div class="col-md-12 q-mt-md" v-else>

                  <span>{{ (user.civilite == 1) ? 'Mme' : 'Mr' }}</span><br>
                  <span>{{ user.prenom }} {{ user.nom }}</span><br>
                  <span>{{ user.adresse }}</span><br>
                  <span>{{ user.code_postal }} {{ user.ville }}</span><br>
                  <span>{{ user.pays }}</span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

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

<style>
.disabled {
  pointer-events: none;
  opacity: 0.7;
}

.stepper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  padding: 10px;
}

.stepper .steps-container {
  height: 100%;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.stepper .steps-container .steps {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
  overflow-x: auto;
  -webkit-box-pack: justify !important;
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}

.stepper .steps-container .steps .step {
  display: table-cell;
  text-align: center;
  position: relative;
  min-width: 150px;
  max-width: 150px;
}

.stepper .steps-container .steps .step .step-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 5px;
  padding: 10px 0;
  opacity: 0.8;
}

.stepper .steps-container .steps .step .step-title .step-number {
  font-size: 30px;
  font-weight: 600;
}

.stepper .steps-container .steps .step .step-title .step-text {
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  margin-left: 10px;
  text-align: start;
  max-width: 150px;
  word-wrap: break-word;
}

.stepper .steps-container .steps .step .step-indicator {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}

.stepper .steps-container .steps .step .step-indicator .step-divider {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 10px;
}

.stepper .steps-container .steps .step .step-indicator .step-divider span {
  margin: 0 2px;
  border-radius: 6px;
  -webkit-transition: 0.4;
  transition: 0.4;
  opacity: 0.8;
  background-color: #9f9d9d;
}

.stepper .steps-container .steps .step .step-indicator .step-divider span:nth-child(1) {
  width: 6px;
  height: 6px;
}

.stepper .steps-container .steps .step .step-indicator .step-divider span:nth-child(2) {
  width: 50px;
  height: 6px;
}

.stepper .steps-container .steps .step .step-indicator .step-node {
  position: relative;
  cursor: pointer;
  width: 45px;
  height: 45px;
  font-size: 16px;
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: width 0.3;
  transition: width 0.3;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #fff;
  background-color: #9f9d9d;
}

.stepper .steps-container .steps .step.prev .step-node {
  background-color: #333333;
  color: #fff;
  border: 2px solid #cccccc;
}

.stepper .steps-container .steps .step.prev .step-title {
  opacity: 1 !important;
}

.stepper .steps-container .steps .step.prev .step-divider span:nth-child(1) {
  background: #333333 !important;
}

.stepper .steps-container .steps .step.prev .step-divider span:nth-child(2) {
  background: #333333 !important;
}

.stepper .steps-container .steps .step.active .step-node {
  background-color: #fff;
  border: 2px solid #333333;
  color: #333;
}

.stepper .steps-container .steps .step.active .step-title {
  opacity: 1 !important;
}

.stepper .steps-container .steps .step.active .step-divider span:nth-child(1) {
  background: #333333 !important;
}

.stepper .stepper-content-container {
  display: -webkit-box;
  flex-direction: column;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
}

.stepper .stepper-content-container .stepper-content {
  width: 100%;
  display: none;
}

.stepper .stepper-content-container .stepper-content.show {
  display: block;
}

.fade-in {
  -webkit-animation: fadeIn 0.5s;
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    margin-top: 50px;
  }

  100% {
    opacity: 1;
    margin-top: 0px;
  }
}

.custom-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.total {
  font-size: 24px;
  white-space: nowrap;
  margin-left: auto;
  font-weight: bold;
}

@media all and (max-width: 480px) {
  .img_produit {
    text-align: center;
    margin: 0 0 20px 0;
  }

  .img_produit img {
    max-width: 160px;
  }

  .service_assistance {
    text-align: center;
    padding-left: calc(var(--bs-gutter-x) * 0.5) !important;
    margin-top: 1rem;
  }

  #bloc_paiement_recap {
    text-align: center;
  }

  .service_assistance_img {
    text-align: center;
  }
}

.stepper-content textarea {
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.575rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #ffffff;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #ced4da !important;
  border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.stepper-content textarea:focus {
  box-shadow: none;
  color: white;
  border-top: none;
  border-left: none;
  border-right: none;
  background: transparent;
  border-bottom: 1px solid #ced4da !important;
}

.doc-note {
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin: 16px auto;
  padding: 16px 24px;
  font-size: 1em;
  line-height: 1.35em;
  border-width: 0 5px;
  width: 100%;
  border-style: solid;
  border-color: #eee;
  letter-spacing: .5px;
}

.doc-note--tip {
  background-color: #daf8e1;
  border-color: #9cedaf;
}

.doc-note>p,
.doc-note>ul {
  margin-bottom: 0;
}

.doc-note__title {
  font-weight: 500;
  padding-bottom: 8px;
}

#message_forgot {
  display: none !important;
}

#message_forgot .message_icone {
  display: inline-block;
  font-size: 20px;
}

#message_forgot .message_content {
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
}

/* LOADER */
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

.livraison {
  display: none;
}

.societeBloc {
  display: none;
}

.active {
  opacity: 1 !important;
  transform: scale(1) translateZ(0px) !important;
}

.disabled {
  pointer-events: none !important;
}
</style>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
// import moment from 'moment';
import Vue2Filters from 'vue2-filters';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { Cookies } from 'quasar';

let decoder;

var compteur = 1;

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

var stringOptions = [
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

export default {
  mixins: [Vue2Filters.mixin],
  name: 'CartData',
  setup() {
    const $q = useQuasar();
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);

    return {
      card: true,
      paypal: null,
      dense: ref(null),
      carts: [],
      showNotifErrorForgot() {
        $q.notify({
          position: 'top-left',
          type: 'negative',
          message: this.$t('MESSAGE_LOGIN_6'),
          timeout: 2500,
        });
      },
      showNotifCart() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: this.$t('VIN_ADD_CART'),
          timeout: 2500,
        });
      },
      showNotifCartDelete() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: this.$t('REMOVE_CART'),
          timeout: 2500,
        });
      },
      showNotifCartError() {
        $q.notify({
          position: 'top-left',
          type: 'warning',
          message: this.$t('ERROR_REMOVE_CART'),
          timeout: 2500,
        });
      },
      showNotifPaiementIntent() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: this.$t('REDIRECTION'),
          timeout: 2000,
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
  data() {

    return {
      totalHT: 0.00,
      forgot: false,
      loading: ref(false),
      versionTable: 1,
      disabled: false,
      total: null,
      port: 0.00,
      port_definitif: 14.00,
      totalFDP: 0.00,
      nomBoisson: null,
      formForgot: {
        email: null
      },
      form: {
        email: null,
        password: null,
        page: 'cart'
      },
      formLivraison: {
        livraisonMode1: ref('2'),
        giftMessage: null,
        paiementMethod: ref('1'),
      },
      points: 0,
      user: {
        cashBackActive: 0,
        point: null,
        premium: 0,
        cashback: 0.00,
        id: null,
        email: null,
        avatar: null,
        nom: null,
        prenom: null,
        adresse: null,
        pays: null,
        ville: null,
        code_postal: null,
        civilite: null,
        adresse_livraison: null,
        pays_livraison: null,
        ville_livraison: null,
        code_postal_livraison: null,
        civilite_livraison: null,
        livraison: null,
        societe: null,
      },
    };
  },
  computed: {
    ...mapState('carts', ['listCartId']),
    ...mapGetters('users', ['setListUser']),
    ...mapState('users', ['loggedIn']),
  },
  methods: {
    getCookiePaiementToken() {
      const paiementToken = Cookies.get('paiementToken');
      return paiementToken;
    },
    ...mapActions('paiements', ['sendPaiementWithcard']),
    addPaiementIntentCard() {
      this.sendPaiementWithcard({ user: this.user, formLivraison: this.formLivraison, paiement: { nomBoisson: this.nomBoisson, total: this.port_definitif, port: this.port, totalFDP: this.totalFDP, vin_id: Cookies.get('cart') } });
      this.showNotifPaiementIntent();
      this.disabled = true;
    },
    addPaiementIntentPaypal() {
      this.sendPaiementWithcard({ user: this.user, formLivraison: this.formLivraison, paiement: { nomBoisson: this.nomBoisson, total: this.port_definitif, port: this.port, totalFDP: this.totalFDP, vin_id: Cookies.get('cart') } });
      this.showNotifPaiementIntent();
      this.disabled = true;
    },
    showPaiement(value) {
      if (value == 1) {
        this.card = true;
        this.paypal = false;
      } else {
        this.paypal = true;
        this.card = false;
      }
    },
    showNotif() {
      $q.notify({
        position: 'top-left',
        type: 'positive',
        message: this.$t('MESSAGE_LOGIN_1'),
        timeout: 2500,
      });
    },
    showNotifError() {
      $q.notify({
        position: 'top-left',
        type: 'negative',
        message: this.$t('MESSAGE_LOGIN_4'),
        timeout: 2500,
      });
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      if (this.form.email == null || this.form.password == null) {
        this.showNotifError();
      } else if (this.form.password.length < 7) {
        this.showNotifErrorPassword();
      } else {
        this.loginUser(this.form);
      }
    },
    ...mapActions('users', ['handleAuthStateChange']),
    ...mapActions('paiements', ['getPaiementWithPay']),
    ...mapMutations('users', ['setLoggedIn']),
    ...mapActions('users', ['convertPointCash']),
    checkAuth() {
      this.handleAuthStateChange();
      this.setListUser;
      this.mountedData();
      setTimeout(this.checkAuth, 300);
    },
    ...mapActions('users', ['handleAuthStateChange']),
    mountedData() {
      if (this.user) {
        this.user.id = this.setListUser.id;
        this.user.email = this.setListUser.email;
        this.user.avatar = this.setListUser.user_profil_image;
        this.user.nom = this.setListUser.nom;
        this.user.prenom = this.setListUser.prenom;
        this.user.livraison = this.setListUser.livraison;

        this.user.premium = this.setListUser.premium;

        this.user.adresse = this.setListUser.adresse;
        this.user.code_postal = this.setListUser.code_postal;
        this.user.ville = this.setListUser.ville;
        this.user.pays = this.setListUser.pays;

        this.user.societe = this.setListUser.societe;

        this.user.adresse_livraison = this.setListUser.adresse_livraison;
        this.user.code_postal_livraison = this.setListUser.code_postal_livraison;
        this.user.ville_livraison = this.setListUser.ville_livraison;
        this.user.pays_livraison = this.setListUser.pays_livraison;

        stringOptions.forEach(e => {

          if (e.value == this.setListUser.pays) {
            this.user.pays = e.label;
          }

          if (e.value == this.setListUser.pays_livraison) {
            this.user.pays_livraison = e.label;
          }

        });

        this.user.civilite = this.setListUser.civilite;
      }
    },
    ...mapActions('users', ['loggedDataUser']),
    ...mapActions('carts', ['getCartId']),
    ...mapActions('users', ['forgotUser']),
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    replaceVirgule(html) {
      return (html + '').replace('.', ',');
    },
    countCart() {

      if (compteur <= 1) {

        setTimeout(() => {

          this.getCartId(Cookies.get('cart'));

          if (Cookies.has('cart')) {
            var cookies = Cookies.get('cart');
            var arr = [];
            var res = cookies.split('-');

            arr.push(res);

            // Ici on déclare les points les quantité etc..
            for (let i = 0; i <= this.listCartId.length - 1; i++) {
              var id = 0;
              var nomBoisson = 0;
              var millesimeBoisson = 0;
              var imageBoisson = 0;
              var prixBoisson = 0;
              var typeBoisson = '';
              var contenanceBoisson = '';
              var planBoisson = 0;
              var remiseBoisson = 0;

              id = this.listCartId[i].idBoisson;
              planBoisson = this.listCartId[i].planBoisson;
              remiseBoisson = this.listCartId[i].remiseBoisson;
              nomBoisson = this.listCartId[i].nomBoisson;
              millesimeBoisson = this.listCartId[i].millesimeBoisson;
              imageBoisson = this.listCartId[i].imageBoisson;
              prixBoisson = this.listCartId[i].prixBoisson;
              typeBoisson = this.listCartId[i].typeBoisson;
              contenanceBoisson = this.listCartId[i].contenanceBoisson;

              var quantitys = parseInt(res.filter((e) => e == id).length);

              this.carts.push({
                idBoisson: id,
                nomBoisson: nomBoisson,
                planBoisson: planBoisson,
                remiseBoisson: remiseBoisson,
                millesimeBoisson: millesimeBoisson,
                imageBoisson: imageBoisson,
                prixBoisson: prixBoisson,
                typeBoisson: typeBoisson,
                quantityBoisson: quantitys,
                contenanceBoisson: contenanceBoisson,
              });

              if (planBoisson == 1) {
                this.total += round(
                  this.listCartId[i].remiseBoisson *
                  Cookies.get('cart').split('-').filter((e) => e == id).length
                );
              } else {
                this.total += round(
                  this.listCartId[i].prixBoisson *
                  Cookies.get('cart').split('-').filter((e) => e == id).length
                );
              }

              var point = 0;

              for (var a = 0; a <= parseInt(this.total); a += 5) {
                point += 1;
              }

              this.points = point;

            }

            this.total = new Intl.NumberFormat('fr-FR').format(this.total);

            //Frais port
            if (Cookies.has('port') && Cookies.get('port') == '1') {

              this.port = 0.00;
              this.port_definitif = 14.00;

            } else {

              this.port_definitif = 14.00;

              var quantity = res.filter((e) => e == id).length;

              if (quantity <= 12) {
                this.port = 14.00;
                this.port_definitif = 14.00;
              } else if (quantity >= 13 && quantity <= 24) {
                this.port = 23.00;
                this.port_definitif = 23.00;
              } else if (quantity >= 25 && quantity <= 36) {
                this.port = 29.00;
                this.port_definitif = 29.00;
              } else if (quantity >= 37 && quantity <= 48) {
                this.port = 34.00;
                this.port_definitif = 34.00;
              } else if (quantity >= 49 && quantity <= 60) {
                this.port = 40.00;
                this.port_definitif = 40.00;
              }

            }

            // Calcul du total + des FDPS
            if (Cookies.has('port') && Cookies.get('port') == '2') {
              this.totalFDP = parseFloat(this.total) + parseFloat(this.port_definitif);
            } else {
              this.totalFDP = parseFloat(this.total) + parseFloat(this.port);
            }

            var tva = round((this.totalFDP * 20.00) / 100, 2);
            this.totalHT = this.totalFDP;

            if (this.user.cashBackActive == 1) var cashback = parseFloat(this.user.cashback)
            else var cashback = 0.00;

            if (this.user.premium == 1) this.totalFDP = (round(this.totalFDP + tva, 2) - cashback - 11.8);
            else
              this.totalFDP = (round(this.totalFDP + tva, 2) - cashback);

          }

          compteur++;

        }, 600);

        setTimeout(this.countCart, 600);

      }
    },
    addCart(idItem) {

      var input = idItem;

      compteur = 1;

      if (Cookies.has('cart')) {

        const value = Cookies.get('cart');

        Cookies.set('cart', value + '-' + idItem, {
          secure: true,
          sameSite: 'None'
        });

        this.showNotifCart();

        this.getCartId(Cookies.get('cart'));

        var arr = [];

        arr.push(Cookies.get('cart').split('-'));

        // Ici on déclare les points les quantité etc..
        for (let i = 0; i <= this.listCartId.length - 1; i++) {
          var id = 0;
          var nomBoisson = 0;
          var millesimeBoisson = 0;
          var imageBoisson = 0;
          var prixBoisson = 0;
          var typeBoisson = '';
          var contenanceBoisson = '';
          var planBoisson = 0;
          var remiseBoisson = 0;

          id = this.listCartId[i].idBoisson;
          planBoisson = this.listCartId[i].planBoisson;
          remiseBoisson = this.listCartId[i].remiseBoisson;
          nomBoisson = this.listCartId[i].nomBoisson;
          millesimeBoisson = this.listCartId[i].millesimeBoisson;
          imageBoisson = this.listCartId[i].imageBoisson;
          prixBoisson = this.listCartId[i].prixBoisson;
          typeBoisson = this.listCartId[i].typeBoisson;
          contenanceBoisson = this.listCartId[i].contenanceBoisson;

          var cookie = Cookies.get('cart');

          if (cookie.indexOf(input + '-') == -1) {

            this.carts.pop();

            var quantitys = parseInt(Cookies.get('cart').split('-').filter((e) => e == id).length) + 1;

            quantitys--;

            this.carts.push({
              idBoisson: id,
              nomBoisson: nomBoisson,
              millesimeBoisson: millesimeBoisson,
              imageBoisson: imageBoisson,
              prixBoisson: prixBoisson,
              planBoisson: planBoisson,
              remiseBoisson: remiseBoisson,
              typeBoisson: typeBoisson,
              quantityBoisson: quantitys,
              contenanceBoisson: contenanceBoisson,
            });

          } else {

            var quantitys = parseInt(Cookies.get('cart').split('-').filter((e) => e == id).length) + 1;

            quantitys--;

            this.carts[i].quantityBoisson = quantitys;

          }

          this.total = 0;

          if (planBoisson == 1) {
            this.total += round(
              this.listCartId[i].remiseBoisson *
              Cookies.get('cart').split('-').filter((e) => e == id).length
            );
          } else {
            this.total += round(
              this.listCartId[i].prixBoisson *
              Cookies.get('cart').split('-').filter((e) => e == id).length
            );
          }

          var point = 0;

          for (var a = 0; a <= parseInt(this.total); a += 5) {
            point += 1;
          }

          this.points = point;

        }

        this.total = new Intl.NumberFormat('fr-FR').format(this.total);

        //Frais port
        if (Cookies.has('port') && Cookies.get('port') == '1') {

          this.port = 0.00;
          this.port_definitif = 14.00;

        } else {

          this.port_definitif = 14.00;

          var quantity = Cookies.get('cart').split('-').filter((e) => e == id).length;

          if (quantity <= 12) {
            this.port = 14.00;
            this.port_definitif = 14.00;
          } else if (quantity >= 13 && quantity <= 24) {
            this.port = 23.00;
            this.port_definitif = 23.00;
          } else if (quantity >= 25 && quantity <= 36) {
            this.port = 29.00;
            this.port_definitif = 29.00;
          } else if (quantity >= 37 && quantity <= 48) {
            this.port = 34.00;
            this.port_definitif = 34.00;
          } else if (quantity >= 49 && quantity <= 60) {
            this.port = 40.00;
            this.port_definitif = 40.00;
          }

        }

        // Calcul du total + des FDPS
        if (Cookies.has('port') && Cookies.get('port') == '2') {
          this.totalFDP = parseFloat(this.total) + parseFloat(this.port_definitif);
        } else {
          this.totalFDP = parseFloat(this.total) + parseFloat(this.port);
        }

        var tva = round((this.totalFDP * 20.00) / 100, 2);
        this.totalHT = this.totalFDP;

        if (this.user.cashBackActive == 1) var cashback = parseFloat(this.user.cashback)
        else var cashback = 0.00;

        if (this.user.premium == 1) this.totalFDP = (round(this.totalFDP + tva, 2) - cashback - 11.8);
        else
          this.totalFDP = (round(this.totalFDP + tva, 2) - cashback);

        this.versionTable++;

      }

    },
    submitFormForgot() {
      if (this.formForgot.email == null) {
        this.showNotifError();
      } else {
        this.forgotUser(this.formForgot);
      }
    },
    removeCart(idItem) {
      if (Cookies.has('cart')) {

        var input = idItem;

        var cookie = Cookies.get('cart');

        if (cookie.indexOf(input + '-') != -1) {
          var newCookie = Cookies.get('cart');
          Cookies.set('cart', newCookie.replace(input + '-', ''));
        } else if (cookie.indexOf('-' + input) != -1) {
          var newCookie = Cookies.get('cart');
          Cookies.set('cart', newCookie.replace('-', input, ''));
        }

        if (cookie.split('-').length === 1) {
          Cookies.remove('cart');
        }

        compteur = 1;

        this.getCartId(Cookies.get('cart'));

        if (compteur <= 1) {

          var arr = [];

          arr.push(Cookies.get('cart').split('-'));

          // Ici on déclare les points les quantité etc..
          for (let i = 0; i <= this.listCartId.length - 1; i++) {
            var id = 0;
            var nomBoisson = 0;
            var millesimeBoisson = 0;
            var imageBoisson = 0;
            var prixBoisson = 0;
            var typeBoisson = '';
            var contenanceBoisson = '';
            var planBoisson = 0;
            var remiseBoisson = 0;

            id = this.listCartId[i].idBoisson;
            nomBoisson = this.listCartId[i].nomBoisson;
            millesimeBoisson = this.listCartId[i].millesimeBoisson;
            imageBoisson = this.listCartId[i].imageBoisson;
            prixBoisson = this.listCartId[i].prixBoisson;
            planBoisson = this.listCartId[i].planBoisson;
            remiseBoisson = this.listCartId[i].remiseBoisson;
            typeBoisson = this.listCartId[i].typeBoisson;
            contenanceBoisson = this.listCartId[i].contenanceBoisson;

            if (cookie.indexOf(input + '-') == -1) {

              this.carts.pop();

              var quantitys = parseInt(Cookies.get('cart').split('-').filter((e) => e == id).length) + 1;

              quantitys--;

              var quantitys = parseInt(Cookies.get('cart').split('-').filter((e) => e == id).length) + 1;

              quantitys--;

              this.carts.push({
                idBoisson: id,
                nomBoisson: nomBoisson,
                planBoisson: planBoisson,
                remiseBoisson: remiseBoisson,
                millesimeBoisson: millesimeBoisson,
                imageBoisson: imageBoisson,
                prixBoisson: prixBoisson,
                typeBoisson: typeBoisson,
                quantityBoisson: quantitys,
                contenanceBoisson: contenanceBoisson,
              });

            } else {

              var quantitys = parseInt(Cookies.get('cart').split('-').filter((e) => e == id).length) + 1;

              quantitys--;

              this.carts[i].quantityBoisson = quantitys;

            }
            this.total = 0;

            if (planBoisson == 1) {
              this.total += round(
                this.listCartId[i].remiseBoisson *
                Cookies.get('cart').split('-').filter((e) => e == id).length
              );
            } else {
              this.total += round(
                this.listCartId[i].prixBoisson *
                Cookies.get('cart').split('-').filter((e) => e == id).length
              );
            }

            var point = 0;

            for (var a = 0; a <= parseInt(this.total); a += 5) {
              point += 1;
            }

            this.points = point;

          }

          this.total = new Intl.NumberFormat('fr-FR').format(this.total)

          //Frais port
          if (Cookies.has('port') && Cookies.get('port') == '1') {

            this.port = 0.00;
            this.port_definitif = 14.00;

          } else {

            this.port_definitif = 14.00;

            var quantity = Cookies.get('cart').split('-').filter((e) => e == id).length;

            if (quantity <= 12) {
              this.port = 14.00;
              this.port_definitif = 14.00;
            } else if (quantity >= 13 && quantity <= 24) {
              this.port = 23.00;
              this.port_definitif = 23.00;
            } else if (quantity >= 25 && quantity <= 36) {
              this.port = 29.00;
              this.port_definitif = 29.00;
            } else if (quantity >= 37 && quantity <= 48) {
              this.port = 34.00;
              this.port_definitif = 34.00;
            } else if (quantity >= 49 && quantity <= 60) {
              this.port = 40.00;
              this.port_definitif = 40.00;
            }

          }

          // Calcul du total + des FDPS
          if (Cookies.has('port') && Cookies.get('port') == '2') {
            this.totalFDP = parseFloat(this.total) + parseFloat(this.port_definitif);
          } else {
            this.totalFDP = parseFloat(this.total) + parseFloat(this.port);
          }

          var tva = round((this.totalFDP * 20.00) / 100, 2);
          this.totalHT = this.totalFDP;

          if (this.user.cashBackActive == 1) var cashback = parseFloat(this.user.cashback)
          else var cashback = 0.00;

          if (this.user.premium == 1) this.totalFDP = (round(this.totalFDP + tva, 2) - cashback - 11.8);
          else
            this.totalFDP = (round(this.totalFDP + tva, 2) - cashback);

          this.versionTable++;

        }

      }
    },
    ...mapActions('users', ['loginUser']),
    addPort(id) {
      if (Cookies.has('port')) {
        Cookies.set('port', id, {
          secure: true,
          sameSite: 'None'
        });
        this.$router.go();
      } else {
        Cookies.set('port', id, {
          secure: true,
          sameSite: 'None'
        });
        this.$router.go();
      }
    },
    addGiftMessage() {
      if (Cookies.has('giftMessage')) {
        Cookies.set('giftMessage', this.formLivraison.giftMessage, {
          secure: true,
          sameSite: 'None'
        });
      } else {
        Cookies.set('giftMessage', this.formLivraison.giftMessage, {
          secure: true,
          sameSite: 'None'
        });
      }
    },
    checkPaiementWithToken() {
      this.getPaiementWithPay(Cookies.get('paiementToken'));
      setTimeout(this.checkPaiementWithToken, 1000);
    },
    ...mapActions('users', ['verifPointCash']),
    reloadGift() {
      this.verifPointCash(this.user.id);
      this.user.point = Cookies.get('point');
      this.user.cashback = Cookies.get('cashback');
      setTimeout(this.reloadGift, 200);
    },
    useCashBack() {
      Cookies.set('cashBackActive', 1, {
        secure: true,
        sameSite: 'None'
      });
      this.user.cashBackActive = Cookies.get('cashBackActive');
      this.$router.go();
    },
    removeCashBack() {
      Cookies.set('cashBackActive', 0, {
        secure: true,
        sameSite: 'None'
      });
      this.user.cashBackActive = Cookies.get('cashBackActive');
      this.$router.go();
    }
  },
  mounted() {

    if (this.$route.params.etape == 1 || this.$route.params.etape == 2 || this.$route.params.etape == 3) {
      Cookies.remove('paiementToken');
    }

    this.user.cashBackActive = Cookies.get('cashBackActive');
    this.verifPointCash(this.user.id);
    this.reloadGift();
    this.getPaiementWithPay(Cookies.get('paiementToken'));
    this.getCookiePaiementToken();
    this.checkPaiementWithToken();
    this.checkAuth();
    this.loggedDataUser();
    this.getCartId(Cookies.get('cart'));
    this.showTextLoading();
    this.countCart();
    if (!Cookies.has('port')) {
      Cookies.set('port', 2, {
        secure: true,
        sameSite: 'None'
      });
    } else {
      this.formLivraison.livraisonMode1 = Cookies.get('port');
    }
    if (Cookies.has('giftMessage')) {
      this.formLivraison.giftMessage = Cookies.get('giftMessage');
    }

    if (!Cookies.has('cashBackActive')) {
      Cookies.set('cashBackActive', 0, {
        secure: true,
        sameSite: 'None'
      });
      this.user.cashBackActive = Cookies.get('cashBackActive');
    }
  },
  props: {
  },
};
</script>
