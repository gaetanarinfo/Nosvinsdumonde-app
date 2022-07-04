<template>
  <router-view v-if="show === true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QSpinnerBall } from 'quasar';
import { LocalNotifications } from '@capacitor/local-notifications';
import { mapActions, mapState } from 'vuex';

export default defineComponent({
  name: 'App',
  data() {
    return {
      user: null,
      show: false,
    };
  },

  methods: {
    ...mapActions('news', ['getNewsAllNotification']),
    getCurrentPosition(newsNotification: [{ id: 0, ids: '', title: '', subtitle: '', image: '', groupeName: '', url: '' }]) {

      newsNotification.forEach(e => {

        var ids = e.id.toString();

        LocalNotifications.requestPermissions();

        LocalNotifications.registerActionTypes({
          types: [
            {
              id: 'CHAT_MSG',
              actions: [
                {
                  id: 'Oui',
                  title: 'Oui',
                  destructive: false,
                  input: true,
                  inputButtonTitle: 'Ouvrir',
                  inputPlaceholder: 'Ouvrir'
                },
              ]
            }
          ]
        });

        LocalNotifications.schedule({
          notifications: [
            {
              id: e.id,
              title: e.title,
              body: e.subtitle,
              smallIcon: 'res/drawable/ic_stat_logo_764a4fe2',
              largeIcon: 'res/drawable/ic_launcher_foreground',
              sound: 'res/raw/beep.wav',
              actionTypeId: 'CHAT_MSG',
              channelId: ids,
              group: e.groupeName,
              attachments: [
                { id: ids, url: 'https://nosvinsdumonde.com/assets/img/contents/' + e.image }
              ],
            }
          ]
        });

        // 5.
        LocalNotifications.addListener('localNotificationActionPerformed', () => {
          this.$router.push('/actualite/' + e.url);
        });

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
        this.getNewsAllNotification();
        this.getCurrentPosition(this.listNewsAllNotification);
      }, 2000);
    },
  },
  beforeUnmount() {
    setTimeout(() => {
      this.$q.loading.hide();
    }, 2000);
  },
  computed: {
    ...mapState('news', ['listNewsAllNotification']),
  },
  mounted() {

    this.showLoading();
    this.getNewsAllNotification();

  },
});
</script>
