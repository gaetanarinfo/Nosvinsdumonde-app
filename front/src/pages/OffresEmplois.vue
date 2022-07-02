<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <offres-emplois-component :listEmplois="listEmplois"></offres-emplois-component>
  </div>
</template>


<script>
import OffresEmploisComponent from 'components/OffresEmploisComponent.vue';
import { mapActions, mapState } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'OffresEmplois',
  data() {

    return {
      formSearch: {
        search_emplois: null,
        checkEntreprises: ref('1'),
        domaine: null,
        vendanges: null,
        contrat: null,
        experience: null,
        region: null,
      }
    }
  },
  components: {
    OffresEmploisComponent,
  },
  methods: {
    ...mapActions('offres_emplois', ['getEmplois']),
  },
  computed: {
    ...mapState('offres_emplois', ['listEmplois']),
  },
  mounted() {
    this.getEmplois(this.formSearch);
  },
};
</script>
