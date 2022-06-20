<template>
  <div class="row items-start" style="padding: 0 5vw; flex-direction: column">
    <news-component-all :listNewsAll="listNewsAll"></news-component-all>
  </div>
</template>

<script>
import NewsComponentAll from 'components/NewsComponentAll.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'actualitesAll',
  components: {
    NewsComponentAll,
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
