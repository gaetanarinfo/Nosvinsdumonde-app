<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <contact-component></contact-component>
  </div>
</template>

<script>
import ContactComponent from 'components/ContactComponent.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'actualitesAll',
  components: {
    ContactComponent,
  },
  methods: {
    ...mapActions('news', ['getNewsAll']),
  },
  computed: {
    ...mapState('news', ['listNewsAll']),
  },
  mounted() {
    this.getNewsAll(1);
  },
};
</script>
