<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <div
      class="text-h4 text-white bloc_vin_title"
      style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0 0 0;
      "
    >
      <q-item class="title" v-if="this.$route.params.page != 'suggest'"
        >CONTACTEZ-NOUS</q-item
      >
      <q-item class="title" v-else-if="this.$route.params.page == 'suggest'"
        >Un vin ou un champagne à proposer ?</q-item
      >
      <q-item class="title" v-else-if="this.$route.params.id"
        >J'aimerais modifier mon vin ou mon champagne</q-item
      >
    </div>

    <q-item
      v-if="this.$route.params.page == 'suggest'"
      class="text-white q-pa-none q-mt-lg q-mb-lg text-center"
      style="font-size: 18px; font-weight: 400"
    >
      Vous voulez que votre vin ou votre champagne apparaisse sur Nosvinsdumonde
      ?<br /><br />Vous pouvez nous envoyer votre suggestion via le formulaire
      ci-dessous.
    </q-item>

    <q-item
      v-if="this.$route.params.id"
      class="text-white q-pa-none q-mt-lg q-mb-lg text-center"
      style="font-size: 18px; font-weight: 400"
    >
      Une modification à apporter à notre fiche de vin ou de champagne ?
      <br /><br />Une erreur c'est glisser sur notre fiche n'hésiter pas et
      contactez-nous.
    </q-item>

    <q-item
      class="q-pa-none q-mt-md text-white text-center"
      style="width: 100%; display: block; font-size: 18px; font-weight: 400"
    >
      Lundi au Vendredi 9h/18h<br />
      Samedi 10h/13h - 14h/17h<br />
      ou par mail : contact@novinsdumonde.fr
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
        <q-breadcrumbs-el label="Contact" style="color: white" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-none q-mt-lg text-white">
      <q-form @submit="onSubmit()" class="q-gutter-md" ref="myForm">
        <q-input v-model="form.societe" label="Société" dark />

        <q-input
          v-model="form.prenom"
          label="Prénom *"
          lazy-rules
          type="text"
          dark
          :rules="[
            (val) => (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]"
        />

        <q-input
          v-model="form.nom"
          label="Nom *"
          lazy-rules
          dark
          type="text"
          :rules="[
            (val) => (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]"
        />

        <q-input
          v-model="form.email"
          label="Email *"
          lazy-rules
          dark
          type="email"
          :rules="[
            (val) => (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]"
        />

        <q-input
          v-model="form.phone"
          label="Téléphone fixe / mobile *"
          lazy-rules
          type="phone"
          dark
          :rules="[
            (val) => (val && val.length > 5) || 'Veuillez taper quelque chose',
          ]"
        />

        <q-select
          v-if="this.$route.params.page != 'suggest' && !this.$route.params.id"
          dark
          v-model="form.sujet"
          :options="options"
          label="Sujet*"
          emit-value
          map-options
        />

        <q-input
          v-else-if="
            this.$route.params.page == 'suggest' &&
            this.$route.params.page &&
            !this.$route.params.id
          "
          v-show="this.$route.params.page != 'suggest'"
          dark
          v-model="form.sujet"
          type="text"
          label="Sujet*"
          model-value="11"
          emit-value
          map-options
        />

        <q-input
          v-if="this.$route.params.id"
          v-show="false"
          dark
          v-model="form.sujet"
          type="text"
          label="Sujet*"
          model-value="10"
          emit-value
          map-options
        />

        <q-input
          v-if="this.$route.params.page != 'suggest'"
          v-model="form.message"
          type="textarea"
          lazy-rules
          label="Message (250 caractères max)*"
          dark
          :rules="[
            (val) => (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]"
        />

        <q-input
          v-else-if="this.$route.params.page == 'suggest'"
          v-model="form.message"
          type="textarea"
          lazy-rules
          label="Message (250 caractères max)*"
          dark
          model-value="Bonjour,

J'aimerais avoir plus d'information pour ajouter mon produit sur votre site internet.

Cordialement."
          :rules="[
            (val) => (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]"
        />

        <q-checkbox
          ref="toggle"
          v-model="accept"
          dark
          label="En soumettant ce formulaire, j'accepte que les données saisies soient utilisées dans le cadre de ma demande d'informations. Les données personnelles que vous nous confiez ne sont pas transmises, louées ou commercialisées à des tier."
          color="orange"
          class="q-mt-lg q-mb-sm q-pa-none q-ml-none"
          :rules="[myRule]"
        />

        <q-item class="text-white text-end q-mb-lg" color="red">
          Les champs suivis d'une * sont obligatoires
        </q-item>

        <div class="text-end">
          <q-btn label="Envoyer" push type="submit" color="info" />
        </div>
      </q-form>

      <div class="q-mt-lg">
        <img
          class="image_vigne"
          style="width: 100%"
          role="button"
          src="https://nosvinsdumonde.com/assets/img/vigne.jpg"
          alt=""
        />
        <div class="q-mt-lg">
          <iframe
            class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.801849913395!2d0.20670651549920388!3d47.97888897921108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e28ee050a8bd4d%3A0xcfbd863c3c58f11a!2s125%20Av.%20F%C3%A9lix%20Geneslay%2C%2072100%20Le%20Mans!5e0!3m2!1sfr!2sfr!4v1651932543473!5m2!1sfr!2sfr"
            width="100%"
            height="340"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { useQuasar } from 'quasar';

let decoder;

var compteur = 1;

export default {
  name: 'contactName',
  setup() {
    const $q = useQuasar();

    return {
      showNotif() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: 'Votre message à bien été envoyer.',
          timeout: 2500,
        });
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: 'Vous recevrez une réponse dans les plus brefs délais.',
          timeout: 2500,
        });
      },
      showNotifError() {
        $q.notify({
          position: 'top-left',
          type: 'negative',
          message: "Merci d'accepter les conditions !",
          timeout: 2500,
        });
      },
    };
  },
  data() {
    return {
      submitted: false,
      accept: false,
      form: {
        societe: null,
        prenom: null,
        nom: null,
        email: null,
        phone: null,
        sujet: null,
        message: null,
      },
      options: [
        {
          label: 'Vous recherchez un vin précis',
          value: '1',
        },
        {
          label: 'Fidélité',
          value: '2',
        },
        {
          label: 'Autres demandes',
          value: '3',
        },
        {
          label: 'Droit de modification',
          value: '4',
        },
        {
          label: 'Droit à l’oubli',
          value: '5',
        },
        {
          label: "Droit d'accès",
          value: '6',
        },
        {
          label: 'Droit à la limitation du traitement',
          value: '7',
        },
        {
          label: 'Droit d’opposition',
          value: '8',
        },
        {
          label: 'Droit à la portabilité',
          value: '9',
        },
        {
          label: "Ajout d'un produit sur Novinsdumonde.",
          value: '11',
        },
      ],
    };
  },
  methods: {
    myRule(val) {
      return val || 'You must acknowledge the Privacy Policy.';
    },
    ...mapActions('contact', ['sendContact']),
    ...mapActions('contact', ['getVinsId']),
    // Source: https://github.com/vuejs/vue/blob/v2.6.14/src/compiler/parser/entity-decoder.js
    decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    },
    replaceVirgule(html) {
      return (html + '').replace('.', ',');
    },
    onSubmit() {
      if (this.accept !== true) {
        this.showNotifError();
      } else {
        if (this.submitted) return;
        this.$refs.myForm.validate().then(() => {
          this.sendContact(this.form);
          this.sendContact(this.form).then(() => {
            this.showNotif();
          });
          this.sendContact(this.form).catch(() => {
            this.showNotifError();
          });
        });
        this.submitted = true;
        setTimeout(() => {
          this.submitted = false;
        }, 2500);
      }
    },
    showTextArea() {
      if (this.$route.params.page == 'suggest') {
        this.form.message =
          "Bonjour,\n\nJ'aimerais avoir plus d'information pour ajouter mon produit sur votre site internet.\n\nCordialement.";
        this.form.sujet = '11';
      }

      if (this.$route.params.id) {
        if (compteur <= 1) {
          setTimeout(() => {
            this.getVinsId(this.$route.params.id);

            compteur++;

            this.form.message =
              "Bonjour,\n\nJ'aimerais avoir plus d'information pour modifier mon produit sur votre site internet.\n\nDétail du produit :\n\nNom du produit : " +
              this.listVinsId.nomBoisson +
              '\n\nAppellation : ' +
              this.listVinsId.apellationBoisson +
              '\n\nPrix : ' +
              this.replaceVirgule(this.listVinsId.prixBoisson) +
              ' €\n\nSoit : ' +
              this.replaceVirgule(this.listVinsId.soitBoisson) +
              ' €\n\nCordialement.';
            this.form.sujet = '10';
          }, 500);
        }
      }
    },
  },
  computed: {
    ...mapState('contact', ['listVinsId']),
  },
  mounted() {
    this.showTextArea();
    if (this.$route.params.id) {
      this.getVinsId(this.$route.params.id);
    }
  },
  components: {},
  props: {},
};
</script>
