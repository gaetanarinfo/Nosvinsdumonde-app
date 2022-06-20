<template>
  <div
    class="fullscreen text-white text-center q-pa-md flex flex-center"
    style="
      background: url('https://nosvinsdumonde.com/assets/img/underwater-1400x788.jpg');
      background-position: center;
    "
  >
    <div>
      <div style="font-size: 15vh">404</div>

      <div class="text-h6" style="opacity: 0.6">
        IL SEMBLE QUE CETTE PAGE SOIT TOMBE DANS L'ABÎME…
      </div>

      <q-btn
        class="q-mt-xl"
        color="warning"
        push
        to="/"
        label="Revenir en arrière"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound',
});
</script>
