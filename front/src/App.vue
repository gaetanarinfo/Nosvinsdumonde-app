<template>
  <router-view v-if="show === true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QSpinnerBall } from 'quasar';
import { LocalNotifications } from '@capacitor/local-notifications';

export default defineComponent({
  name: 'App',
  data() {
    return {
      user: null,
      show: false,
    };
  },

  methods: {
    getCurrentPosition() {
      // 2.
      LocalNotifications.requestPermissions();

      // 3.
      LocalNotifications.registerActionTypes({
        types: [
          {
            id: '1',
            actions: [
              {
                id: 'dismiss',
                title: 'Dismiss',
                destructive: true
              },
              {
                id: 'open',
                title: 'Open app'
              },
              {
                id: 'respond',
                title: 'Respond',
                input: true
              }
            ]
          }
        ]
      });

      // 4.
      LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'Sample title',
            body: 'Sample body',
            actionTypeId: 'your_choice'
          }
        ]
      });

      // 5.
      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        console.log(`Notification ${notification.notification.title} was ${notification.actionId}ed.`);
      });
    },
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
    this.getCurrentPosition();
    this.showLoading();
  },
});
</script>
