<template>
  <q-page class="body_page q-mt-lg">
    <div class="q-pa-md q-mb-lg" style="width: 100%">
      <q-expansion-item
        class="shadow-1 overflow-hidden"
        style="border-radius: 12px"
        icon="fa-solid fa-magnifying-glass"
        label="Faite votre recherche"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section>
            <q-input
              bottom-slots
              v-model="searchInput"
              :loading="loadingState"
              ref="inputRef"
              label="Recherchez un produit, une actu ..."
              hint="100 caractère max"
              error-message="Veuillez utiliser maximum 100 caractères"
              :error="!isValid"
              :rules="[searchRule]"
            >
              <template v-slot:append>
                <q-icon
                  v-if="searchInput !== ''"
                  name="close"
                  @click="searchInput = ''"
                  class="cursor-pointer"
                />
                <q-icon name="search" />
              </template>

              <template v-slot:hint> 120 caractères max </template>
            </q-input>
          </q-card-section>

          <q-card-section v-if="listNewsSearch != '' || listNewsSearch2 != ''">
            <ul style="list-style-type: none" class="q-pa-none q-mt-none">
              <li
                class="list-group-item q-mb-lg text-bold"
                style="font-size: 18px"
              >
                Nos vins et Champagnes
              </li>

              <li
                class="list-group-item q-mb-lg"
                v-for="search in listNewsSearch"
                :key="search.id"
              >
                <a
                  class="text-decoration-none text-dark text-bold"
                  clickable
                  :href="
                    '/#/' + search.typeBoisson + '/' + search.idBoisson + ''
                  "
                  ><i class="fa-solid fa-magnifying-glass-arrow-right"></i>
                  {{ decode(search.nomBoisson) }}
                  <span v-if="search.millesimeBoisson != ''">
                    - {{ search.millesimeBoisson }} -
                  </span>
                  {{ search.apellationBoisson }}</a
                >
              </li>

              <q-separator class="q-mb-lg" />

              <li
                class="list-group-item q-mb-lg text-bold"
                style="font-size: 18px"
              >
                Nos actualités
              </li>

              <li
                class="list-group-item q-mb-lg"
                v-for="search in listNewsSearch2"
                :key="search.id"
              >
                <a
                  class="text-decoration-none text-dark text-bold"
                  clickable
                  :href="'/#/actualite/' + search.url + ''"
                  ><i class="fa-solid fa-magnifying-glass-arrow-right"></i>
                  {{ decode(search.title) }}</a
                >
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <div class="container-md" id="bloc_vin_jour">
      <q-item
        class="text-h5 text-white bloc_vin_title q-mb-lg"
        style="font-size: 500; display: flex"
      >
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon
            size="15px"
            name="fa-solid fa-chevron-right"
            style="margin: 0.5rem !important"
          />
        </q-item>

        <q-item style="padding: 0 0; padding-bottom: 13px"
          >NOTRE SÉLECTION DU JOUR</q-item
        >
      </q-item>

      <vins-one-component :listVinsOne="listVinsOne"></vins-one-component>

      <q-item
        class="text-h5 text-white bloc_vin_title q-mb-lg q-mt-lg"
        style="font-size: 500; display: flex; margin-top: 3rem"
      >
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon
            size="15px"
            name="fa-solid fa-chevron-right"
            style="margin: 0.5rem !important"
          />
        </q-item>

        <q-item style="padding: 0 0">LES IMMANQUABLES</q-item>
      </q-item>

      <div class="row items-start" style="padding: 0 5vw">
        <vins-component :listVins="listVins"></vins-component>
      </div>

      <div style="justify-content: center; padding: 0 5vw" class="q-mb-lg">
        <q-item
          class="q-my-md q-mx-none"
          style="justify-content: center; padding: 1em 0"
        >
          <q-btn push to="/produits" color="warning" size="lg">
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
            <i
              class="fa-solid fa-euro-sign shadow"
              style="
                font-size: 40px;
                transform: rotate(320deg);
                text-shadow: 0 0 3px #ffffff33;
              "
            ></i>
          </div>
          <p>MEILLEUR PRIX <br /><span class="fw-bold">GARANTI</span></p>
        </div>

        <div class="q-mb-lg">
          <div class="q-mb-md">
            <i
              class="fa-solid fa-truck shadow"
              style="font-size: 40px; text-shadow: 0 0 3px #ffffff33"
            ></i>
          </div>
          <p>DISPONIBLE <br /><span class="fw-bold">EN 48H CHEZ VOUS*</span></p>
        </div>

        <div class="q-mb-lg">
          <div class="q-mb-md">
            <i
              class="fa-solid fa-lock shadow"
              style="font-size: 40px; text-shadow: 0 0 3px #ffffff33"
            ></i>
          </div>
          <p>PAIEMENT <br /><span class="fw-bold">SÉCURISÉ</span></p>
        </div>

        <div>
          <div class="q-mb-md">
            <i
              class="fa-solid fa-wine-bottle shadow"
              style="
                font-size: 40px;
                transform: rotate(0);
                text-shadow: 0 0 3px #ffffff33;
              "
            ></i>
          </div>
          <p>
            100% DES VINS <br /><span class="fw-bold"
              >DÉGUSTÉS ET APPROUVÉS</span
            >
          </p>
        </div>
      </div>

      <q-item
        class="text-h5 text-white bloc_vin_title q-mb-lg q-mt-lg"
        style="font-size: 500; display: flex; margin-top: 3rem"
      >
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon
            size="15px"
            name="fa-solid fa-chevron-right"
            style="margin: 0.5rem !important"
          />
        </q-item>

        <q-item style="padding: 0 0">EN CE MOMENT</q-item>
      </q-item>

      <div
        class="container-md q-my-lg"
        style="padding: 0 5vw"
        id="bloc_vin_selection"
      >
        <div class="justify-content-center">
          <div class="q-mb-lg">
            <div class="card card1 mb-4 shadow">
              <a href="/fr/bons-plans" class="text-decoration-none">
                <div class="g-0">
                  <div class="col-md-12">
                    <div class="card-body text-center q-px-lg">
                      <h3 class="card-title text-white">Bons Plans</h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="card card2 mb-4 shadow">
              <a href="#" class="text-decoration-none">
                <div class="g-0">
                  <div class="col-md-12">
                    <div class="card-body text-center q-px-lg">
                      <h3 class="card-title text-white">
                        Promotions Privilège
                      </h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <q-item
        class="text-h5 text-white bloc_vin_title q-mb-lg q-mt-lg"
        style="font-size: 500; display: flex; margin-top: 3rem"
      >
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon
            size="15px"
            name="fa-solid fa-chevron-right"
            style="margin: 0.5rem !important"
          />
        </q-item>

        <q-item style="padding: 0 0 5vw 0"
          >NOSVINSDUMONDE: MISE EN RELATION DES VINS, CHAMPAGNE DEPUIS
          2022</q-item
        >
      </q-item>

      <div class="container-md q-my-lg q-mx-lg">
        <p class="text-white">
          Bienvenue chez Nosvinsdumonde ! Votre caviste vous propose les
          meilleurs millésimes et bien entendu toutes les bouteilles de vins,
          champagnes qui ont marqués l’année. Seules ou en coffrets cadeau elles
          sont disponibles sur
          <a class="text-warning text-decoration-none" href="/"
            >nosvinsdumonde.com</a
          >. Et qui de mieux placé que votre caviste pour délivrer des messages
          simples, clairs et positifs en matière bonnes pratiques de
          consommation
        </p>

        <p class="text-white">
          Chez Nosvinsdumonde, il y en a pour tous les goûts et toutes les
          envies. Le défi est de vous permettre de trouver la meilleure
          bouteille pour chaque occasion. Que ce soit pour un mariage, un dîner
          entre amis ou simplement pour le plaisir d’offrir, nous vous aidons à
          choisir le champagne, ou le vin idéal en ligne.
        </p>

        <p class="text-white">
          Découvrez notre large choix de vins rouges, vins blancs, et vins rosés
          sans oublier notre sélection de champagnes et crémants.
        </p>

        <p class="text-white">
          Les régions viticoles les plus emblématiques sont représentées. Vous y
          retrouverez tous les vins de votre domaine préféré. Soif de découverte
          ? Faites voyager vos papilles avec notre sélection de vins étrangers :
          Australie, Argentine, Afrique du Sud, Nouvelle-Zélande… les
          destinations proposées vous réservent de jolies surprises pour élargir
          vos horizons.
        </p>
      </div>

      <div class="container-md q-my-lg q-mx-lg">
        <div class="separator" style="padding: 0 5vw"></div>
      </div>

      <div class="container-md q-my-lg q-mx-lg">
        <div class="text-center">
          <h4 class="text-white" style="font-size: calc(1.075rem + 0.3vw)">
            Plateforme gratuite et réputée.
          </h4>
          <h4 class="text-white" style="font-size: calc(1.075rem + 0.3vw)">
            Votre vin ou votre champagne n'est pas encore listé ?
          </h4>
        </div>

        <q-item
          to="/contact/suggest"
          class="text-decoration-none text-center q-mt-lg q-mb-lg q-pa-none"
          style="display: block"
        >
          <img src="https://nosvinsdumonde.com/assets/img/add_vin.png" alt="" />
        </q-item>
      </div>

      <q-item
        id="vitisphere"
        class="text-h5 text-white bloc_vin_title q-mb-lg"
        style="font-size: 500; display: flex"
      >
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon
            size="15px"
            name="fa-solid fa-chevron-right"
            style="margin: 0.5rem !important"
          />
        </q-item>

        <q-item style="padding: 0 0 5vw 0">NOS ACTUALITÉS</q-item>
      </q-item>

      <div class="row items-start" style="padding: 0 5vw">
        <news-component :listNews="listNews"></news-component>
      </div>

      <div style="justify-content: center; padding: 0 5vw" class="q-mb-lg">
        <q-item
          class="q-my-md q-mx-none"
          style="justify-content: center; padding: 1em 0"
        >
          <q-btn push clickable to="/actualites" color="warning" size="lg">
            <q-item-section avatar style="min-width: 20px; padding-right: 10px">
              <q-icon size="15px" name="fa-solid fa-bars" />
            </q-item-section>
            Plus d'actualités
          </q-btn>
        </q-item>
      </div>

      <q-item
        id="livraison"
        class="text-h5 text-white bloc_vin_title"
        style="font-size: 500; display: flex"
      >
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon
            size="15px"
            name="fa-solid fa-chevron-right"
            style="margin: 0.5rem !important"
          />
        </q-item>

        <q-item style="padding: 0 0 5vw 0">LIVRAISON FRANCE - EUROPE</q-item>
      </q-item>

      <div class="container-md q-mb-lg q-mx-lg">
        <div class="text-left m-auto">
          <div class="row" style="display: flex; align-items: flex-start">
            <div>
              <img
                class="w-100"
                src="https://nosvinsdumonde.com/assets/img/livraison.png"
                alt=""
              />
            </div>

            <div class="q-mt-sm">
              <h6 class="text-white" style="font-weight: normal">
                VOUS SOUHAITEZ COMMANDER DU VIN OU DU CHAMPAGNE ET VOUS FAIRE
                LIVRER À DOMICILE OU ENVOYER UN CADEAU À UN PROCHE ?
              </h6>

              <h6 class="q-mt-lg text-white" style="font-weight: normal">
                NOSVINSDUMONDE POSSÈDE UNE LOGISTIQUE TRÈS COMPÉTITIVE ET VOUS
                PERMET D'EXPÉDIER VOS BOUTEILLES DANS LES MEILLEURS DÉLAIS.
              </h6>

              <h6
                class="q-mt-lg q-mb-md text-white fw-bold"
                style="line-height: 26px"
              >
                <i class="fa-solid fa-truck-fast q-mr-sm"></i>Livraison France
                Métropolitaine Standard sous 72 heures au départ du colis
              </h6>

              <h6 class="text-white fw-bold q-mb-lg" style="line-height: 26px">
                <i class="fa-brands fa-usps q-mr-sm"></i>Du lundi au vendredi
                (aucune livraison les samedis, dimanches et jours fériés).
              </h6>
            </div>
          </div>

          <div
            style="justify-content: center; padding: 0 5vw"
            class="q-mb-lg q-mt-none"
          >
            <q-item
              class="q-mb-md q-mx-none q-mt-none"
              style="justify-content: center"
            >
              <q-btn push color="warning" size="lg">
                <q-item-section
                  avatar
                  style="min-width: 20px; padding-right: 10px"
                >
                  <q-icon size="15px" name="fa-solid fa-shoe-prints" />
                </q-item-section>
                En savoir plus
              </q-btn>
            </q-item>
          </div>
        </div>
      </div>

      <q-item
        id="appellationRegions"
        class="text-h5 text-white bloc_vin_title"
        style="font-size: 500; display: flex"
      >
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon
            size="15px"
            name="fa-solid fa-chevron-right"
            style="margin: 0.5rem !important"
          />
        </q-item>

        <q-item style="padding: 0 0 5vw 0"
          >NOS APPELLATIONS ET NOS RÉGIONS</q-item
        >
      </q-item>

      <div class="container-md q-mb-lg q-mx-lg">
        <div class="text-left m-auto">
          <appellations-component
            :listAppellations="listAppellations"
          ></appellations-component>

          <regions-component :listRegions="listRegions"></regions-component>

          <div style="justify-content: center; padding: 0 5vw" class="q-mb-lg">
            <q-item
              class="q-my-md q-mx-none"
              style="justify-content: center; padding: 1em 0"
            >
              <q-btn push color="warning" size="lg">
                <q-item-section
                  avatar
                  style="min-width: 20px; padding-right: 10px"
                >
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
              <h5 class="fw-bold">Les vins français par région</h5>

              <p>
                Célèbre dans le monde entier pour ses vins, la France est divisé
                en 17 régions viticoles aux cépages différents qui offre une
                grande diversité de vins. Les vins de Bordeaux sont avec les
                vins de la vallée du Rhône les deux plus grosses régions en
                terme de production. Les vins de Loire, de Provence et du
                Languedoc proposent aussi des volumes importants. Les vins de
                Bourgogne, d’ Alsace, du Sud-Ouest et du Beaujolais ferment la
                liste des grandes régions françaises.
                <a class="text-white fw-bold" title="En savoir plus" href=""
                  >En savoir plus ›</a
                >
              </p>
            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">Les cépages des vins</h5>

              <p>
                A chaque région ses cépages. dans certaines régions les vins
                proviennent d’un seul cépage (chardonnay et pinot noir pour la
                Bourgogne par exemple). Découvrez notre guide des cépages pour
                vous permettre de les associer à vos goûts... Alors vous êtes
                plutôt Syrah, Merlot, Cabernet ou Gamay ?
              </p>
            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">Les guides des vins</h5>

              <p>
                Le monde du vin est un univers complexe, par conséquence les
                guides de vin sont nombreux. Comment s’y retrouver, qui est ce
                fameux Parker ? Gault &amp; Millau (à part le viaduc je ne vois
                pas !), La RVF (c’est quoi ? Retour Vers le Futur ? Non pas
                possible) ! Découvrez notre synthèse sur les Guides des vins
                pour bien vous orienter : bon voyage au pays du vin !
              </p>
            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">Les vins du monde</h5>

              <p>
                Découvrez notre gamme de vins du monde. nos sommeliers ont
                sélectionné pour vous les meilleurs vins espagnols et italiens.
                Vins d’ Afrique du sud, d’ Australie ou de Nouvelle- Zélande,
                nous vous offrons un voyage en 1ère classe sur tous les
                continents...
              </p>
            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">Les goûts et les couleurs du vin</h5>

              <p>
                Vous recherchez un vin blanc sec ou un vin rouge puissant ?
                Quelle est la différence entre un vin blanc sucré ou un vin
                blanc liquoreux ? Retrouvez notre guide conseil sur les goûts et
                les couleurs du vin.
              </p>
            </div>

            <div class="q-mt-lg">
              <h5 class="fw-bold">Champagne</h5>

              <p>
                Nosvinsdumonde vous propose une des offres les plus complète de
                champagnes sur Internet. Vous recherchez un champagne blanc de
                blancs ou un magnum de champagne ? Ruinart, Dom Pérignon, Veuve
                Clicquot ou Moet et Chandon. Retrouvez toutes les plus grandes
                maisons de champagne sur Internet. A découvrir également notre
                offre Prosecco, Moscato, Lambrusco, Crémant, Cava, Cerdon,
                Clairette de Die.
                <a class="text-white fw-bold" href="" title="En savoir plus"
                  >En savoir plus ›</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <q-item
        id="appellationRegions"
        class="text-h5 text-white bloc_vin_title"
        style="font-size: 500; display: flex"
      >
        <q-item avatar style="min-width: 30px; padding: 0 0">
          <q-icon
            size="15px"
            name="fa-solid fa-chevron-right"
            style="margin: 0.5rem !important"
          />
        </q-item>

        <q-item style="padding: 0 0 5vw 0"
          >🍷Chaque jour est un instant de dégustation</q-item
        >
      </q-item>

      <div class="q-pa-md">
        <q-video
          :ratio="16 / 9"
          src="https://player.vimeo.com/video/715112452?h=c5ee1f0f21&badge=0&autopause=0&player_id=0&app_id=58479"
        />
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
