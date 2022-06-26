<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <div class="text-h4 text-white bloc_vin_title" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
      <q-item class="title">Gestion de mes informations personnel</q-item>
    </div>

    <!-- BreadCrump -->
    <div class="q-pa-none q-gutter-sm">
      <q-breadcrumbs class="text-brown">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="white" />
        </template>

        <q-breadcrumbs-el clickable to="/" label="Accueil" style="color: #ffc107" />

        <q-breadcrumbs-el label="Gestion du compte" style="color: white" />
      </q-breadcrumbs>
    </div>

    <div class="q-mt-md" style="margin-bottom: 0; padding: 0 0; width: 100%" v-show="showSimulatedReturnData">

      <q-form @submit="submitFormUpdate" style="padding: 0 0;">
        <q-radio dark class="text-white" @click="hideSociete()" name="societe" v-model="formUpdates.societe"
          :dense="dense" val="1" color="orange" label="Un particulier" />

        <q-radio dark class="text-white" @click="showSociete()" name="societe" v-model="formUpdates.societe"
          :dense="dense" val="2" color="orange" label="Une société" />

        <q-input dark class="text-white q-mb-md" v-show="societeValue" v-model="formUpdates.societeName"
          label="Société" />

        <q-input dark class="text-white" disable v-model="formUpdates.email2" :dense="dense" type="email"
          label="E-mail*" />

        <q-card-section class="text-bold q-mt-md text-white" style="font-size: 18px; text-align: center">
          MES INFORMATIONS PERSONNELLES
        </q-card-section>

        <q-radio name="civilite" @click="updateCivilite()" dark :dense="dense" class="q-mb-sm text-white"
          v-model="user.civilite" val="1" color="orange" label="Mme" />

        <q-radio name="civilite" @click="updateCivilite()" dark :dense="dense" class="q-mb-sm text-white"
          v-model="user.civilite" val="2" color="orange" label="Mr" />

        <q-input dark class="text-white" type="text" v-model="formUpdates.prenom" :dense="dense" label="Prénom*"
          lazy-rules :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

        <q-input dark class="text-white" type="text" v-model="formUpdates.nom" :dense="dense" label="Nom*" lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

        <q-input dark class="text-white" type="text" v-model="formUpdates.adresse" :dense="dense" label="Adresse*"
          lazy-rules :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

        <q-select dark class="text-white" :options="stringOptions" transition-show="flip-up" transition-hide="flip-down"
          v-model="formUpdates.pays" :dense="dense" emit-value map-options text-color="white" style="max-height: 100px"
          behavior="menu">
        </q-select>

        <q-input dark class="text-white" :dense="dense" type="number" v-model="formUpdates.code_postal"
          label="Code postal*" lazy-rules :rules="[
            (val) =>
              (val && val.length > 4) ||
              'Veuillez saisir un code postal valide',
          ]" />

        <q-input dark class="text-white" :dense="dense" type="text" v-model="formUpdates.ville" label="Ville*"
          lazy-rules :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

        <q-input dark class="text-white" type="phone" :dense="dense" v-model="formUpdates.phone" label="Téléphone*"
          lazy-rules :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

        <q-checkbox name="livraison" dark v-if="this.user.livraison == 0" :dense="dense" @click="showLivraison()"
          class="q-mb-sm text-white" v-model="formUpdates.livraison" node-value="1" color="orange"
          label="Mon adresse de livraison est différente ?" true-value="1" false-value="0" />

        <q-checkbox name="livraison" dark v-if="this.user.livraison == 1" checked :dense="dense"
          @click="showLivraison()" class="q-mb-sm text-white" v-model="formUpdates.livraison" node-value="0"
          color="orange" label="Mon adresse de livraison est différente ?" true-value="1" false-value="0" />

        <div v-show="livraisonValue">
          <q-card-section class="text-white text-bold q-mt-sm" style="font-size: 18px; text-align: center">
            MES INFORMATIONS DE LIVRAISON
          </q-card-section>

          <q-input dark class="text-white" type="text" :dense="dense" v-model="formUpdates.prenom_livraison"
            label="Prénom*" />

          <q-input dark class="text-white" type="text" :dense="dense" v-model="formUpdates.nom_livraison"
            label="Nom*" />

          <q-input dark class="text-white" type="text" :dense="dense" v-model="formUpdates.adresse_livraison"
            label="Adresse*" />

          <q-select dark class="text-white" :options="stringOptions" transition-show="flip-up"
            transition-hide="flip-down" v-model="formUpdates.pays_livraison" :dense="dense" emit-value map-options
            text-color="white" style="max-height: 100px" behavior="menu">
          </q-select>

          <q-input dark class="text-white" :dense="dense" type="number" v-model="formUpdates.code_postal_livraison"
            label="Code postal*" />

          <q-input dark class="text-white" :dense="dense" type="text" v-model="formUpdates.ville_livraison"
            label="Ville*" />

        </div>

        <q-item style="justify-content: center" class="q-mt-lg">
          <q-btn type="submit" color="warning" push label="Continuer" />
        </q-item>

      </q-form>

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

import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';
// import { useQuasar } from 'quasar';
import { Cookies } from 'quasar';
import { ref } from 'vue';

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

var counter = 1;

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);

    return {
      stringOptions,
      dense: ref(null),
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
      checkedValue: '',
      livraisonValue: false,
      societeValue: false,
      user: {
        id: null,
        email: null,
        livraison: null,
        civilite: null,
      },
      formUpdates: {
        civilite: null,
        livraison: null,
        societe: ref('1'),
        societeName: null,
        nom: null,
        prenom: null,
        adresse: null,
        ville: null,
        code_postal: null,
        pays: null,
        phone: null,
        livraison: ref('0'),
        nom_livraison: null,
        prenom_livraison: null,
        adresse_livraison: null,
        ville_livraison: null,
        code_postal_livraison: null,
        pays_livraison: null,
        carte: ref('1'),
      },
    };
  },
  computed: {
    ...mapGetters('users', ['setListUser']),
    ...mapGetters('users', ['setLoggedIn']),
  },
  methods: {
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    showSociete() {
      this.societeValue = true;
    },
    hideSociete() {
      this.societeValue = false;
    },
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

      if (this.setListUser.civilite == 1) this.user.civilite = ref('1');
      if (this.setListUser.civilite == 2) this.user.civilite = ref('2');

      this.stringOptions.forEach(e => {
        if (e.value == this.setListUser.pays) this.formUpdates.pays = e.label
      });

      this.formUpdates.email2 = this.setListUser.email;
      this.formUpdates.nom = this.setListUser.nom;
      this.formUpdates.prenom = this.setListUser.prenom;
      this.formUpdates.adresse = this.setListUser.adresse;
      this.formUpdates.code_postal = this.setListUser.code_postal;
      this.formUpdates.ville = this.setListUser.ville;
      this.formUpdates.phone = this.setListUser.phone;

      this.formUpdates.prenom_livraison = this.setListUser.prenom_livraison;
      this.formUpdates.nom_livraison = this.setListUser.nom_livraison;
      this.formUpdates.adresse_livraison = this.setListUser.adresse_livraison;
      this.formUpdates.code_postal_livraison = this.setListUser.code_postal_livraison;

      this.stringOptions.forEach(e => {
        if (e.value == this.setListUser.pays_livraison) this.formUpdates.pays_livraison = e.label
      });

      this.formUpdates.ville_livraison = this.setListUser.ville_livraison;

      if (counter <= 1) {
        counter++;
        setTimeout(this.mountedData, 300);
      }
    },
    updateCivilite() {
      this.formUpdates.civilite = this.user.civilite;
    },
    ...mapActions('users', ['loggedDataUser']),
    ...mapActions('users', ['loggedAuth']),
    replaceGuillemet(value) {
      return value.replaceAll('"', '');
    },
    submitFormUpdate() {
      this.updateUser(this.formUpdates);
    },
    ...mapActions('users', ['updateUser']),
    showLivraison() {
      if (this.livraisonValue == 0) this.livraisonValue = true;
      else this.livraisonValue = false;
    },
  },
  mounted() {
    this.mountedData();
    this.showTextLoading();
    this.loggedAuth();
    this.checkAuth();
    this.loggedDataUser();
  },
  props: {},
});
</script>
