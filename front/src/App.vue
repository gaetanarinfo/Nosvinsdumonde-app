<template>
  <router-view v-if="show === true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QSpinnerBall } from 'quasar';

export default defineComponent({
  name: 'App',
  data() {
    return {
      user: null,
      show: false,
    };
  },

  methods: {
    showLoading() {
      this.$q.loading.show({
        spinner: QSpinnerBall,
        spinnerColor: 'orange',
        spinnerSize: 70,
      });

      // hiding in 2s
      setTimeout(() => {
        this.$q.loading.hide();
        this.show = true;
      }, 2000);
    },
  },
  beforeUnmount() {
    setTimeout(() => {
      this.$q.loading.hide();
    }, 2000);
  },
  computed: {},
  mounted() {
    this.showLoading();
  },
});
</script>
