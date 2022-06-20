<template>
  <!-- BreadCrump -->
  <div class="q-pa-md q-mt-lg q-gutter-sm">
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
      <q-breadcrumbs-el
        clickable
        href="/#/actualites"
        label="Actualités"
        style="color: #ffc107"
      />
      <q-breadcrumbs-el
        :label="decode(listNewsId.title)"
        style="color: white"
      />
    </q-breadcrumbs>
  </div>

  <div
    class="container-md q-mt-lg q-mb-lg"
    style="padding: 0 5vw"
    v-show="showSimulatedReturnData"
  >
    <div class="col-lg-12">
      <div class="col-md-6">
        <div>
          <img
            style="border-radius: 10px; width: 100%"
            :src="
              'https://nosvinsdumonde.com/assets/img/contents/' +
              listNewsId.image +
              ''
            "
            :alt="decode(listNewsId.title)"
          />

          <div>
            <span
              class="text-secondary"
              style="
                font-size: 12px;
                font-weight: 600;
                padding-right: 20px;
                display: block;
                margin-top: 0.5em;
              "
            >
              {{ decode(listNewsId.textGray) }}
            </span>
          </div>
        </div>

        <div class="q-mt-md">
          <h1 class="text-white">
            {{ decode(listNewsId.title) }}
          </h1>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <div
            style="
              position: relative;
              display: inline-flex;
              vertical-align: middle;
            "
          >
            <div class="groupe_article">
              {{ decode(listNewsId.groupeName) }}
            </div>
          </div>
        </div>

        <div class="text-white q-mt-sm">
          <p>
            {{ decode2(listNewsId.subtitle) }}
          </p>
          <div
            style="
              flex-direction: row;
              justify-content: space-between;
              display: flex;
            "
          >
            <div>Par {{ listNewsId.author }}</div>
            <div>
              <span class="text-muted" style="font-size: inherit"
                >Le {{ listNewsId.date }}</span
              >
            </div>
          </div>
        </div>

        <hr />

        <div
          class="text-white q-mt-md"
          style="display: flex; gap: 16px; justify-content: flex-end"
        >
          <div>Partage</div>
          <div>
            <a
              :href="
                'https://www.facebook.com/sharer/sharer.php?u=https://nosvinsdumonde.com/fr/actualite/' +
                listNewsId.url +
                ''
              "
              style="color: #dc3e72; text-decoration: none"
              ><i class="fa-brands fa-facebook-f"></i
            ></a>
          </div>
          <div>
            <a
              :href="
                'https://twitter.com/share?url=https://nosvinsdumonde.com/fr/actualite/' +
                listNewsId.url +
                '&amp;text=' +
                decode(listNewsId.title) +
                '&amp;via=novinsdumonde'
              "
              onclick="window.open(this.href);return false;"
              style="color: #dc3e72; text-decoration: none"
              ><i class="fa-brands fa-twitter"></i
            ></a>
          </div>
        </div>

        <div
          class="text-white q-mt-md"
          v-html="decode(listNewsId.contentDescription)"
        ></div>

        <hr />

        <div class="text-white q-py-sm" style="display: flex; gap: 16px">
          <div>Partage</div>
          <div>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://nosvinsdumonde.com/fr/actualite/les-grands-crus-classes-en-1855-ouvrent-leurs-portes-et-leur-carnet-d-experiences"
              style="color: #dc3e72; text-decoration: none"
              ><i class="fa-brands fa-facebook-f"></i
            ></a>
          </div>
          <div>
            <a
              href="https://twitter.com/share?url=https://nosvinsdumonde.com/fr/actualite/les-grands-crus-classes-en-1855-ouvrent-leurs-portes-et-leur-carnet-d-experiences&amp;text=Les grands crus classés en 1855 ouvrent leurs portes et leur carnet d'expériences&amp;via=novinsdumonde"
              onclick="window.open(this.href);return false;"
              style="color: #dc3e72; text-decoration: none"
              ><i class="fa-brands fa-twitter"></i
            ></a>
          </div>
        </div>

        <hr />

        <p class="text-white fw-bold q-mt-md">Tags :</p>

        <div class="tags q-mb-md" v-html="decode(listNewsId.tags)"></div>

        <div class="q-mb-md text-center">
          <q-btn @click="toggle = !toggle" outline color="info" size="md">
            <i class="fa-solid fa-comment"></i>
            <div class="q-pl-sm">Laisser un commentaire</div></q-btn
          >
        </div>

        <div class="q-mb-md q-mt-lg">
          <h3 class="text-white">
            Tous les commentaires ({{ listNewsCommentsCount }})
          </h3>
        </div>

        <div class="comments" v-show="toggle">
          <div class="row">
            <q-form
              ref="myForm2"
              class="q-mt-md q-mb-md text-white"
              style="width: 100%"
            >
              <q-input
                v-model="form2.c_mail"
                label="Votre email *"
                lazy-rules
                filled
                dark
                type="email"
                :dense="dense"
                :rules="[
                  (val) =>
                    (val && val.length > 2) || 'Veuillez taper quelque chose',
                ]"
              />

              <q-input
                v-model="form2.c_nom"
                label="Votre nom/pseudo *"
                lazy-rules
                filled
                dark
                type="text"
                :dense="dense"
                :rules="[
                  (val) =>
                    (val && val.length > 2) || 'Veuillez taper quelque chose',
                ]"
              />

              <q-input
                v-model="form2.c_message"
                lazy-rules
                type="textarea"
                filled
                dark
                label="Votre commentaire *"
                :dense="dense"
                :rules="[
                  (val) =>
                    (val && val.length > 2) || 'Veuillez taper quelque chose',
                ]"
              />

              <div>
                <q-btn
                  label="Valider"
                  @click="onSubmit2(listNewsId.id)"
                  type="submit"
                  color="positive"
                  :disabled="submitted2"
                  v-close-popup
                />
              </div>
            </q-form>
          </div>
          <hr />
        </div>

        <div class="comments_show q-mt-md" v-if="listNewsCommentsCount < 1">
          <p class="fw-bold text-white" style="font-size: 15px">
            Pas encore de commentaire à cet article.
          </p>
        </div>

        <div class="q-mt-md" v-if="listNewsCommentsCount >= 1">
          <div class="plm mtm">
            <div
              v-for="comments in listNewsCommentsId"
              v-bind:key="comments.id"
              class="py-3 text-white"
            >
              <span
                style="
                  font-weight: bold;
                  font-size: 16px;
                  color: burlywood;
                  text-transform: uppercase;
                "
                ><i class="fa-solid fa-comment-dots q-mr-sm"></i
                >{{ comments.nom }}</span
              >

              <span style="font-weight: normal; font-size: 14px" class="q-ml-md"
                >Le
                {{ moment(comments.created_at).format('Do MMMM YYYY à H:mm') }}
              </span>

              <p class="q-mt-md q-mb-sm" v-html="comments.content"></p>

              <div class="q-my-lg">
                <a
                  role="button"
                  class="text-start text-warning text-decoration-none abuse"
                  @click="(modal = true), recupInfo(comments.id, listNewsId.id)"
                >
                  <i class="fa-solid fa-triangle-exclamation q-mr-sm"></i
                  >Signaler le commentaire
                </a>
              </div>

              <hr class="q-mb-lg" />
            </div>
          </div>
        </div>

        <div
          class="text-h5 text-white bloc_vin_title"
          style="
            font-size: 500;
            display: flex;
            margin: auto 0;
            margin-top: 2rem;
          "
        >
          <q-item avatar style="padding: 0 0">
            <q-icon
              size="15px"
              name="fa-solid fa-chevron-right"
              style="margin: 0.5rem !important"
            />
          </q-item>

          <q-item style="padding: 0 0">A LIRE AUSSI</q-item>
        </div>

        <div class="q-mt-lg">
          <q-card
            class="card_actus q-mb-lg"
            v-for="news in listNewsReadMore"
            :key="news.id"
            flat
          >
            <q-item class="q-pa-none">
              <div
                :style="
                  'background-repeat: no-repeat;background: url(https://nosvinsdumonde.com/assets/img/contents/' +
                  news.image +
                  '); background-size: cover;width: 100%;height: 250px;border: none;border-top-left-radius: 16px;border-top-right-radius: 16px;'
                "
              ></div>
            </q-item>

            <q-card-section>
              <div class="text-h6 q-mt-sm q-mb-xs text-bold">
                <q-item
                  :to="'/actualite/' + news.url"
                  @click="actuBtn(news.url)"
                  style="text-decoration: none; color: black; padding: 0 0"
                  >{{ decode(news.title) }}</q-item
                >
              </div>

              <div class="groupe_article">{{ news.groupeName }}</div>

              <div class="q-mt-sm">{{ news.content }}</div>

              <q-item
                class="q-mt-md q-mx-none"
                style="
                  justify-content: space-between;
                  padding: 0 0;
                  align-items: center;
                "
              >
                <q-btn
                  :to="'/actualite/' + news.url"
                  @click="actuBtn(news.url)"
                  push
                  color="info"
                >
                  Lire la suite
                </q-btn>

                <div>{{ news.date }}</div>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>

  <!-- Loader -->
  <div
    :showing="visible"
    v-show="visible"
    class="container-md q-mt-lg q-mb-lg"
    style="padding: 0 5vw"
  >
    <div id="load" class="col text-center">
      <div id="loaderComment" class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>

  <!-- Modal Signal Comment -->
  <template>
    <q-dialog
      v-model="modal"
      persistent
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card style="max-height: 50vh" class="scroll">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6" style="font-size: 15px">
            SIGNALER UN COMMENTAIRE
          </div>
          <q-space />
          <q-btn icon="close" size="sm" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <p>
            Vous avez repéré un commentaire avec un contenu illégal ou portant
            atteinte à vos droits ?
          </p>
          <p>
            Afin de nous aider à traiter votre alerte, merci de nous décrire
            précisément ce qui vous paraît illégal dans ce message.
          </p>

          <q-form ref="myForm" class="q-gutter-md q-mt-md">
            <q-input
              v-model="form.email_comm"
              label="Veuillez saisir votre mail *"
              lazy-rules
              type="email"
              :rules="[
                (val) =>
                  (val && val.length > 2) || 'Veuillez taper quelque chose',
              ]"
            />

            <q-input
              v-model="form.title_comm"
              label="Titre de votre signalement *"
              lazy-rules
              type="text"
              :rules="[
                (val) =>
                  (val && val.length > 2) || 'Veuillez taper quelque chose',
              ]"
            />

            <q-input
              v-model="form.message_comm"
              lazy-rules
              type="textarea"
              label="Expliquez ici pourquoi le message vous parait illégal *"
              :rules="[
                (val) =>
                  (val && val.length > 2) || 'Veuillez taper quelque chose',
              ]"
            />

            <div>
              <q-btn
                label="Valider"
                @click="onSubmit()"
                type="submit"
                color="positive"
                :disabled="submitted"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

moment.locale('fr');

let decoder;
let decoder2;

export default {
  name: 'articleId',
  setup() {
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);
    const $q = useQuasar();
    return {
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
      dense: ref(false),
      showNotif() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: 'Votre signalement a bien été pris en compte.',
          timeout: 2500,
        });
      },
      showNotifError() {
        $q.notify({
          position: 'top-left',
          type: 'negative',
          message: 'Une erreur est survenue !',
          timeout: 2500,
        });
      },
      showNotifComment() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: 'Merci pour votre commentaire.',
          timeout: 2500,
        });
      },
      showNotifCommentError() {
        $q.notify({
          position: 'top-left',
          type: 'negative',
          message: 'Vous avez déjà commenté cette actualité.',
          timeout: 2500,
        });
      },
    };
  },
  data() {
    return {
      submitted: false,
      submitted2: false,
      form: {
        email_comm: null,
        message_comm: null,
        title_comm: null,
        id_comment: this.id_comment,
        id_actu: this.id_actu,
        url_comm: this.$route.params.url,
      },
      form2: {
        c_mail: null,
        c_message: null,
        c_nom: null,
        id_actu: this.id_actu,
      },
      modal: ref(false),
      dateGet: '',
      toggle: false,
      // Source: https://github.com/vuejs/vue/blob/v2.6.14/src/compiler/parser/entity-decoder.js
      decode(html) {
        decoder = decoder || document.createElement('div');
        decoder.innerHTML = html;
        return decoder.innerHTML;
      },
      decode2(html) {
        decoder2 = decoder2 || document.createElement('div');
        decoder2.innerHTML = html;
        return decoder2.textContent;
      },
    };
  },
  computed: {
    ...mapState('news', ['listNewsReadMore']),
    ...mapState('news', ['listNewsId']),
    ...mapState('news', ['listNewsCommentsId']),
    ...mapState('news', ['listNewsCommentsCount']),
    isComplete() {
      return this.email_comm && this.message_comm && this.title_comm;
    },
    isComplete2() {
      return this.c_mail && this.c_nom && this.c_message;
    },
  },
  methods: {
    ...mapActions('news', ['getNewsId']),
    ...mapActions('news', ['getNewsCommentsId']),
    ...mapActions('news', ['sendCommentAbuse']),
    ...mapActions('news', ['sendComment']),
    moment: moment,
    checkComments() {
      var datas = this.$route.params.url;
      this.getNewsCommentsId(datas);
      setTimeout(() => {
        this.checkComments(datas);
      }, 60000);
    },
    recupInfo(id_comment, id_actu) {
      // console.log('Id commentaire : ', id_comment);
      // console.log('Id actu : ', id_actu);
      this.form.id_comment = id_comment;
      this.form.id_actu = id_actu;
    },
    onSubmit() {
      if (this.submitted) return;
      this.$refs.myForm.validate().then(() => {
        this.sendCommentAbuse(this.form);
        this.sendCommentAbuse(this.form).then(() => {
          this.showNotif();
          this.modal = false;
        });
        this.sendCommentAbuse(this.form).catch(() => {
          this.showNotifError();
        });
      });

      this.submitted = true;

      setTimeout(() => {
        this.submitted = false;
      }, 2500);
    },
    onSubmit2(data) {
      this.form2.id_actu = data;
      if (this.submitted2) return;
      this.$refs.myForm2.validate().then(() => {
        this.sendComment(this.form2);
        this.sendComment(this.form2).then(() => {
          this.showNotifComment();
        });
        this.sendComment(this.form2).catch(() => {
          this.showNotifCommentError();
        });
      });

      this.submitted2 = true;

      setTimeout(() => {
        this.submitted2 = false;
      }, 2500);
    },
    actuBtn(url) {
      this.getNewsId(url);
      this.getNewsCommentsId(url);
      this.checkComments();
      this.showTextLoading();
    },
  },
  components: {},
  mounted() {
    this.getNewsId(this.$route.params.url);
    this.getNewsCommentsId(this.$route.params.url);
    this.checkComments();
    this.showTextLoading();
  },
  props: {},
};
</script>
