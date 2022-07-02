<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <offres-stage-component :listEmplois="listEmplois"></offres-stage-component>
  </div>
</template>


<script>
import OffresStageComponent from 'components/OffresStageComponent.vue';
import { mapActions, mapState } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'OffresStage',
  data() {

    return {
      formSearch: {
        search_emplois: null,
        checkEntreprises: ref('1'),
        domaine: null,
        vendanges: null,
        contrat: 'Stage',
        experience: null,
        region: null,
      }
    }
  },
  components: {
    OffresStageComponent,
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
