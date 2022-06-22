<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background: #212529 !important">
      <q-toolbar class="glossy text-white q-my-sm" style="background: #212529 !important">
        <q-btn to="/" flat dense class="transparent btn_home">
          <q-avatar>
            <img src="../assets/img/logo.png" />
          </q-avatar>
        </q-btn>

        <q-space />

        <q-btn v-if="this.user.id && this.user.email && this.user.carte == 1" round dense size="md"
          @click="giftmodal = true" text-color="pink-6" icon="fa-solid fa-gift" class="q-mr-sm q-ml-sm q-py-sm q-px-sm"
          style="border-radius: 12px">
        </q-btn>

        <q-btn v-if="params.appVersionOnline != params.appVersion" round dense size="md" @click="showNotifUpdate()"
          icon="notifications" class="q-mr-sm q-ml-sm q-py-sm q-px-sm" style="border-radius: 12px">
          <q-badge floating color="info" rounded size="md" />
        </q-btn>

        <q-btn flat round dense size="lg" class="q-mr-sm q-ml-sm q-py-sm q-px-sm" style="border-radius: 12px">
          <img class="langs" src="../assets/img/langs/fr.png" />

          <q-menu class="bg-dark text-white" style="min-width: 170px">
            <q-list>
              <q-item active clickable>
                <q-item-section class="relative-position" style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  "><img class="langs" src="../assets/img/langs/fr.png" />
                  <div class="q-ml-sm text-bold">Français</div>
                </q-item-section>
              </q-item>
              <q-item disabled clickable>
                <q-item-section style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  "><img class="langs" src="../assets/img/langs/en.png" />
                  <div class="q-ml-sm text-bold">English</div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn flat dense v-ripple size="lg" class="q-mr-sm q-ml-sm q-py-sm q-px-sm" style="border-radius: 12px">

          <img class="users" src="https://nosvinsdumonde.com/assets/img/user_empty.png"
            v-if="!this.user.id && !this.user.email" />

          <img class="users" style="border-radius: 50%" :src="
            'https://nosvinsdumonde.com/assets/img/avatars/' +
            this.user.avatar +
            ''
          " v-if="this.user.id && this.user.email" />


          <q-menu class="bg-dark text-white" style="min-width: 190px" v-if="!this.user.id && !this.user.email">
            <q-list>
              <q-item clickable @click="login = true">
                <q-item-section avatar style="min-width: 20px;padding: 0 10px 0 0;">
                  <q-icon size="15px" name="fa-solid fa-right-to-bracket" />
                </q-item-section>
                <q-item-section class="text-bold">Se connecter</q-item-section>
              </q-item>

              <q-item clickable @click="register = true">
                <q-item-section avatar style="min-width: 20px;padding: 0 10px 0 0;">
                  <q-icon size="15px" name="fa-solid fa-circle-plus" />
                </q-item-section>
                <q-item-section class="text-bold">Créez votre compte</q-item-section>
              </q-item>
            </q-list>
          </q-menu>

          <q-menu class="bg-dark text-white" style="min-width: 190px" v-if="this.user.id && this.user.email">
            <div class="no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="
                    'https://nosvinsdumonde.com/assets/img/avatars/' +
                    this.user.avatar +
                    ''
                  " v-if="logged && this.user.avatar != 'undefined'" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs text-center q-mb-md" style="font-weight: 500">
                  {{ user.prenom }} {{ user.nom }}
                </div>

                <q-btn color="red-5" label="Déconnexion" push @click="logout()" size="md" v-close-popup />
              </div>

              <q-separator horizontal inset class="q-mx-md q-mt-lg q-mb-sm" style="background: #949494" />

              <div class="column">
                <q-item clickable to="/gestion-utilisateur">
                  <q-item-section avatar style="min-width: 30px">
                    <q-icon size="15px" name="fa-solid fa-user-gear" />
                  </q-item-section>
                  <q-item-section>Gestion de mon compte</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar style="min-width: 30px">
                    <q-icon size="15px" name="fa-solid fa-cart-shopping" />
                  </q-item-section>
                  <q-item-section>Historique des commandes</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar style="min-width: 30px">
                    <q-icon size="15px" name="fa-solid fa-gift" />
                  </q-item-section>
                  <q-item-section>Ma carte privilège</q-item-section>
                </q-item>
              </div>

              <q-separator horizontal inset class="q-mx-lg q-mt-sm q-mb-md" style="background: #949494" />

              <q-item class="q-pa-none q-ma-none text-center q-mb-sm" style="display: block;min-height: auto;">
                {{
                    replaceGuillemet(params.appVersion)
                }} - <span>FR</span> - <span style="text-transform:capitalize;">{{ platform.platform }}</span></q-item>
            </div>
          </q-menu>
        </q-btn>

        <q-btn @click="verifCookieHeads(), verifCartHeads()" flat dense v-ripple icon="menu" size="lg"
          class="q-ml-sm q-py-sm q-px-sm show-mobile" style="border-radius: 12px">
          <q-menu class="bg-dark text-white" style="min-width: 190px">
            <q-list>
              <q-item clickable to="/vins">
                <q-item-section avatar style="min-width: 30px">
                  <q-icon size="15px" name="fa-solid fa-wine-glass" />
                </q-item-section>
                <q-item-section class="text-bold">Vins</q-item-section>
              </q-item>

              <q-item clickable to="/champagnes">
                <q-item-section avatar style="min-width: 30px">
                  <q-icon size="15px" name="fa-solid fa-wine-glass-empty" />
                </q-item-section>
                <q-item-section class="text-bold">Champagnes</q-item-section>
              </q-item>

              <q-item clickable to="/contact/suggest">
                <q-item-section avatar style="min-width: 30px">
                  <q-icon size="15px" name="fa-solid fa-location-arrow" />
                </q-item-section>
                <q-item-section class="text-bold">Ajouter un produit</q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section avatar style="min-width: 30px">
                  <q-icon size="15px" name="fa-solid fa-suitcase" />
                </q-item-section>

                <q-item-section class="text-bold">Nos offres</q-item-section>
                <q-menu class="bg-dark text-white" auto-close>
                  <q-list>
                    <q-item clickable href="/">
                      <q-item-section avatar style="min-width: 25px; padding: 0 5px 0 0">
                        <q-icon size="15px" name="fa-solid fa-arrow-right" />
                      </q-item-section>
                      <q-item-section class="text-bold">Offres d'emploi</q-item-section>
                    </q-item>
                    <q-item clickable href="/">
                      <q-item-section avatar style="min-width: 25px; padding: 0 5px 0 0">
                        <q-icon size="15px" name="fa-solid fa-arrow-right" />
                      </q-item-section>
                      <q-item-section class="text-bold">Offres de stage</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>

              <q-item clickable to="/cart/1" v-if="verifCartHead">
                <q-item-section avatar style="
                    min-width: 30px;
                    border-radius: 12px;
                    color: rgb(255 193 7);
                  ">
                  <q-icon size="15px" name="fa-solid fa-bag-shopping" />
                </q-item-section>
                <q-item-section class="text-bold">Panier</q-item-section>
                <q-item-section name="tab4" v-ripple size="12px" disabled class="q-py-md q-mr-sm" />
                <q-badge v-show="verifCartHead" style="
                    padding: 6px 9px;
                    height: 23px;
                    font-weight: 500;
                    line-height: 13px;
                    background: rgb(255 193 7);
                    color: black;
                    position: relative;
                    top: 4px;
                  " rounded :label="countCart" />
              </q-item>

              <q-item v-if="!verifCartHead">
                <q-item-section avatar style="
                    min-width: 30px;
                    border-radius: 12px;
                    color: rgb(255 193 7);
                  ">
                  <q-icon size="15px" name="fa-solid fa-bag-shopping" />
                </q-item-section>
                <q-item-section class="text-bold">Panier</q-item-section>
                <q-item-section name="tab4" v-ripple size="12px" disabled class="q-py-md q-mr-sm" />
              </q-item>

              <q-item clickable v-if="verifCookieHead" to="/favoris" style="align-items: center">
                <q-item-section avatar style="min-width: 30px; border-radius: 12px; color: #cc4242">
                  <q-icon size="15px" name="fa-solid fa-heart" />
                </q-item-section>

                <q-item-section class="text-bold" style="color: white">Favoris </q-item-section>
                <q-item-section name="tab5" v-ripple size="12px" disabled class="q-py-md q-mr-sm" />
                <q-badge v-show="verifCookieHead"
                  style="padding: 6px 9px;height: 23px;font-weight: 500;line-height: 13px;position: relative;top: 0px;"
                  rounded color="red" :label="countCookie" />
              </q-item>

              <q-item v-if="!verifCookieHead" style="align-items: center">
                <q-item-section avatar style="min-width: 30px; border-radius: 12px; color: #cc4242">
                  <q-icon size="15px" name="fa-solid fa-heart" />
                </q-item-section>

                <q-item-section class="text-bold" style="color: white">Favoris </q-item-section>
                <q-item-section name="tab5" v-ripple size="12px" disabled class="q-py-md q-mr-sm" />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container style="padding-top: 66px; padding-bottom: 20px">
      <router-view />
    </q-page-container>

    <q-footer>

      <q-item class="q-pa-none q-ma-none" style="display: block; padding: 1em;"><span
          style="font-size: 18px;text-align: center;margin: 0 auto;display: block;font-weight: 500;">Inscrivez-vous
          à notre
          newsletter</span>
        <q-form @submit="submitNewsLetter()">
          <q-input v-model="formNewsLetter.email" :rules="[(val) => validateEmail(val) || 'Adresse email invalide']"
            dark lazy-rules hint="Nous ne divulguons jamais votre adresse e-mail." label="Adresse email" stack-label
            :dense="dense" />
          <q-btn class="q-mt-md" type="submit" size="md" push color="info">S'abonner</q-btn>
        </q-form>
      </q-item>

      <q-item class="text-white text-center" style="flex-direction: column">
        <div style="font-size: 0.9rem" class="q-py-sm">
          Nosvinsdumonde, N°1 de la mise en relation en France est élu marque
          préférée des français.
        </div>
        <div style="font-size: 0.8rem">
          L'ABUS D'ALCOOL EST DANGEREUX POUR LA SANTÉ, À CONSOMMER AVEC
          MODÉRATION.
        </div>
      </q-item>

      <q-item class="text-white q-mb-sm text-center footer_items">
        <q-item-section>
          <q-item class="q-mb-md links">NOSVINSDUMONDE</q-item>
          <div class="q-mb-sm">
            <q-btn to="/qui-sommes-nous" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Qui sommes nous ?</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/contact" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Nous contacter</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Nos services</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Nos valeurs</q-btn>
          </div>
          <div>
            <q-btn to="/nos-engagements" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Nos engagements</q-btn>
          </div>
        </q-item-section>

        <q-item-section>
          <q-item class="q-mb-md links">NOS PRODUITS</q-item>
          <div class="q-mb-sm">
            <q-btn to="/vins" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Vins</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/champagnes" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Champagnes</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Plan site</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/livraison" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Livraison</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Api</q-btn>
          </div>
        </q-item-section>

        <q-item-section>
          <q-item class="q-mb-md links">AIDES</q-item>
          <div class="q-mb-sm">
            <q-btn to="/faq" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">FAQ</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/programme-privilege" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Programme privilège</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/cgv" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">CGV</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/cgu" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">CGU</q-btn>
          </div>
          <div class="q-mb-sm">
            <q-btn to="/politique-confidentialite" flat dense style="
                font-size: 14px;
                font-weight: normal;
                padding: 0 0;
                margin: 0 0;
                text-transform: initial;
              " class="transparentbtn_home">Politique de confidentialité</q-btn>
          </div>
        </q-item-section>
      </q-item>

      <q-item class="text-white q-py-md footer_sub">
        <div class="text-center" style="font-size: 1rem; margin: 0 auto">
          © 2022 Copyright -
          <a style="font-size: 1rem; text-decoration: none" href="/"
            class="text-warning btn_footer q-my-none q-px-none q-py-none q-px-none">
            nosvinsdumonde.com
          </a>
        </div>
      </q-item>
    </q-footer>

    <!-- Login Modal -->
    <q-dialog v-model="login" persistent transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://nosvinsdumonde.com/assets/img/logo.png" />
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Connexion</span>
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="text-bold" style="font-size: 18px; text-align: center">
          Accéder à votre compte Nosvinsdumonde
        </q-card-section>

        <q-form @submit="submitForm" class="q-mb-lg" style="padding: 0 5vw">
          <q-input v-model="form.email" label="E-mail"
            :rules="[(val) => validateEmail(val) || 'Adresse email invalide']" lazy-rules
            hint="Nous ne divulguons jamais votre adresse e-mail." />

          <q-input type="password" v-model="form.password" label="Mot de passe" lazy-rules
            hint="Nous ne divulguons jamais votre mot de passe." />

          <q-item class="q-pa-none q-mb-none q-mt-lg text-center" clickable to="">Mot de passe oublié ?</q-item>

          <q-btn type="submit" color="warning" push label="Se connecter" />
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Register Modal -->
    <q-dialog v-model="register" persistent transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://nosvinsdumonde.com/assets/img/logo.png" />
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Création de compte</span>
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="text-bold" style="font-size: 18px; text-align: center">
          Crée votre compte Nosvinsdumonde
        </q-card-section>

        <q-form @submit="submitForm2" class="q-mb-lg scroll" style="padding: 0 5vw; max-height: 40vh">
          <q-radio @click="hideSociete()" name="societe" v-model="form2.societe" :dense="dense" val="1" color="orange"
            label="Un particulier" />

          <q-radio @click="showSociete()" name="societe" v-model="form2.societe" :dense="dense" val="2" color="orange"
            label="Une société" />

          <q-input v-show="societeValue" v-model="form2.societeName" label="Société" />

          <q-input v-model="form2.email2" :dense="dense" type="email" label="E-mail*"
            :rules="[(val) => validateEmail(val) || 'Adresse email invalide']" lazy-rules
            hint="Nous ne divulguons jamais votre adresse e-mail." />

          <q-input type="password" :dense="dense" v-model="form2.password2" label="Mot de passe*" lazy-rules
            hint="Nous ne divulguons jamais votre mot de passe." :rules="[
              (val) =>
                (val && val.length >= 8) || 'Veuillez taper quelque chose',
            ]" />

          <q-card-section class="text-bold q-mt-md" style="font-size: 18px; text-align: center">
            MES INFORMATIONS PERSONNELLES
          </q-card-section>

          <q-radio :dense="dense" name="civilite" v-model="form2.civilite" val="1" color="orange" label="Mme" />

          <q-radio :dense="dense" name="civilite" v-model="form2.civilite" val="2" color="orange" label="Mr" />

          <q-input type="text" v-model="form2.prenom" :dense="dense" label="Prénom*" lazy-rules :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

          <q-input type="text" v-model="form2.nom" :dense="dense" label="Nom*" lazy-rules :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

          <q-input type="text" v-model="form2.adresse" :dense="dense" label="Adresse*" lazy-rules :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

          <q-select :options="stringOptions" transition-show="flip-up" transition-hide="flip-down" v-model="form2.pays"
            :dense="dense" emit-value map-options text-color="white" style="max-height: 100px" behavior="menu">
          </q-select>

          <q-input :dense="dense" type="number" v-model="form2.code_postal" label="Code postal*" lazy-rules :rules="[
            (val) =>
              (val && val.length > 4) ||
              'Veuillez saisir un code postal valide',
          ]" />

          <q-input :dense="dense" type="text" v-model="form2.ville" label="Ville*" lazy-rules :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

          <q-input type="phone" :dense="dense" v-model="form2.phone" label="Téléphone*" lazy-rules :rules="[
            (val) =>
              (val && val.length > 2) || 'Veuillez taper quelque chose',
          ]" />

          <q-checkbox name="livraison" :dense="dense" @click="showLivraison()" class="q-mb-sm" v-model="form2.livraison"
            node-value="0" color="orange" label="Mon adresse de livraison est différente ?" true-value="1"
            false-value="0" />

          <div v-show="livraisonValue">
            <q-card-section class="text-bold q-mt-sm" style="font-size: 18px; text-align: center">
              MES INFORMATIONS DE LIVRAISON
            </q-card-section>

            <q-input type="text" :dense="dense" v-model="form2.prenom_livraison" label="Prénom*" />

            <q-input type="text" :dense="dense" v-model="form2.nom_livraison" label="Nom*" />

            <q-input type="text" :dense="dense" v-model="form2.adresse_livraison" label="Adresse*" />

            <q-select :options="stringOptions" transition-show="flip-up" transition-hide="flip-down"
              v-model="form2.pays_livraison" :dense="dense" emit-value map-options text-color="white"
              style="max-height: 100px" behavior="menu">
            </q-select>

            <q-input :dense="dense" type="number" v-model="form2.code_postal_livraison" label="Code postal*" />

            <q-input :dense="dense" type="text" v-model="form2.ville_livraison" label="Ville*" />
          </div>

          <q-card-section class="text-bold q-mt-sm" style="font-size: 18px; text-align: center">
            MA CARTE PRIVILÈGE
          </q-card-section>

          <q-radio name="carte" :dense="dense" v-model="form2.carte" val="1" color="orange"
            label="Je n'ai pas de carte, je souhaite la créer en ligne" />

          <q-radio name="carte" :dense="dense" v-model="form2.carte" val="2" color="orange"
            label="Je ne veux pas de carte privilège" />

          <q-item style="justify-content: center" class="q-mt-sm">
            <q-btn type="submit" color="warning" push label="Continuer" />
          </q-item>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Gift Modal -->
    <q-dialog v-if="this.user.id && this.user.email && this.user.carte == 1" v-model="giftmodal" persistent
      transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://nosvinsdumonde.com/assets/img/logo.png" />
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold"></span>
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="text-bold" style="font-size: 18px; text-align: center">
          MA CARTE PRIVILÈGE
        </q-card-section>

        <div class="carte">
          <p class="text-center text-white fw-bold no-border q-mt-md"><i class="fa-solid fa-gift"
              style="font-size: 50px;"></i>
          </p>
          <h3 class="text-center text-white fw-bold no-border">N° de carte {{ this.user.numero_carte }} </h3>
          <h4 class="text-center text-white fw-bold no-border">{{ this.user.point }} point(s)</h4>
          <div class="mt-3">
            <img alt="testing"
              :src="'https://nosvinsdumonde.com/modules/barcode.php?codetype=code39&amp;size=50&amp;text=' + this.user.numero_carte + '&amp;print=true'">

          </div>
        </div>

        <div class="text-center q-mb-md q-mt-md postition-relative">

          <q-btn @click="convertPoint()" v-if="this.user.point >= 15" size="md" push color="info"><i
              class="fa-solid fa-money-bill-transfer q-mr-sm"></i>Convertir
            mes points</q-btn>

          <q-btn v-if="this.user.point < 14" class="disabled" size="md" push color="info"><i
              class="fa-solid fa-money-bill-transfer q-mr-sm"></i>Convertir
            mes points</q-btn>

          <h6 class="q-mt-md q-mb-sm text-bold">Mon solde actuel : </h6><span class="text-info"
            style="font-size: 20px;">{{ replaceVirgule(this.user.cashback) }}
            €</span>

        </div>

      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';
import { Cookies } from 'quasar';
import { ref } from 'vue';

var stringOptions = [
  {
    value: 1,
    label: 'Afghanistan',
  },
  {
    value: 2,
    label: 'Albanie',
  },
  {
    value: 3,
    label: 'Antarctique',
  },
  {
    value: 4,
    label: 'Algérie',
  },
  {
    value: 5,
    label: 'Samoa Américaines',
  },
  {
    value: 6,
    label: 'Andorre',
  },
  {
    value: 7,
    label: 'Angola',
  },
  {
    value: 8,
    label: 'Antigua-et-Barbuda',
  },
  {
    value: 9,
    label: 'Azerbaïdjan',
  },
  {
    value: 10,
    label: 'Argentine',
  },
  {
    value: 11,
    label: 'Australie',
  },
  {
    value: 12,
    label: 'Autriche',
  },
  {
    value: 13,
    label: 'Bahamas',
  },
  {
    value: 14,
    label: 'Bahreïn',
  },
  {
    value: 15,
    label: 'Bangladesh',
  },
  {
    value: 16,
    label: 'Arménie',
  },
  {
    value: 17,
    label: 'Barbade',
  },
  {
    value: 18,
    label: 'Belgique',
  },
  {
    value: 19,
    label: 'Bermudes',
  },
  {
    value: 20,
    label: 'Bhoutan',
  },
  {
    value: 21,
    label: 'Bolivie',
  },
  {
    value: 22,
    label: 'Bosnie-Herzégovine',
  },
  {
    value: 23,
    label: 'Botswana',
  },
  {
    value: 24,
    label: 'Île Bouvet',
  },
  {
    value: 25,
    label: 'Brésil',
  },
  {
    value: 26,
    label: 'Belize',
  },
  {
    value: 27,
    label: "Territoire Britannique de l'Océan Indien",
  },
  {
    value: 28,
    label: 'Îles Salomon',
  },
  {
    value: 29,
    label: 'Îles Vierges Britanniques',
  },
  {
    value: 30,
    label: 'Brunéi Darussalam',
  },
  {
    value: 31,
    label: 'Bulgarie',
  },
  {
    value: 32,
    label: 'Myanmar',
  },
  {
    value: 33,
    label: 'Burundi',
  },
  {
    value: 34,
    label: 'Bélarus',
  },
  {
    value: 35,
    label: 'Cambodge',
  },
  {
    value: 36,
    label: 'Cameroun',
  },
  {
    value: 37,
    label: 'Canada',
  },
  {
    value: 38,
    label: 'Cap-vert',
  },
  {
    value: 39,
    label: 'Îles Caïmanes',
  },
  {
    value: 40,
    label: 'République Centrafricaine',
  },
  {
    value: 41,
    label: 'Sri Lanka',
  },
  {
    value: 42,
    label: 'Tchad',
  },
  {
    value: 43,
    label: 'Chili',
  },
  {
    value: 44,
    label: 'Chine',
  },
  {
    value: 45,
    label: 'Taïwan',
  },
  {
    value: 46,
    label: 'Île Christmas',
  },
  {
    value: 47,
    label: 'Îles Cocos (Keeling)',
  },
  {
    value: 48,
    label: 'Colombie',
  },
  {
    value: 49,
    label: 'Comores',
  },
  {
    value: 50,
    label: 'Mayotte',
  },
  {
    value: 51,
    label: 'République du Congo',
  },
  {
    value: 52,
    label: 'République Démocratique du Congo',
  },
  {
    value: 53,
    label: 'Îles Cook',
  },
  {
    value: 54,
    label: 'Costa Rica',
  },
  {
    value: 55,
    label: 'Croatie',
  },
  {
    value: 56,
    label: 'Cuba',
  },
  {
    value: 57,
    label: 'Chypre',
  },
  {
    value: 58,
    label: 'République Tchèque',
  },
  {
    value: 59,
    label: 'Bénin',
  },
  {
    value: 60,
    label: 'Danemark',
  },
  {
    value: 61,
    label: 'Dominique',
  },
  {
    value: 62,
    label: 'République Dominicaine',
  },
  {
    value: 63,
    label: 'Équateur',
  },
  {
    value: 64,
    label: 'El Salvador',
  },
  {
    value: 65,
    label: 'Guinée Équatoriale',
  },
  {
    value: 66,
    label: 'Éthiopie',
  },
  {
    value: 67,
    label: 'Érythrée',
  },
  {
    value: 68,
    label: 'Estonie',
  },
  {
    value: 69,
    label: 'Îles Féroé',
  },
  {
    value: 70,
    label: 'Îles (malvinas) Falkland',
  },
  {
    value: 71,
    label: 'Géorgie du Sud et les Îles Sandwich du Sud',
  },
  {
    value: 72,
    label: 'Fidji',
  },
  {
    value: 73,
    label: 'Finlande',
  },
  {
    value: 74,
    label: 'Îles Åland',
  },
  {
    value: 75,
    label: 'France',
  },
  {
    value: 76,
    label: 'Guyane Française',
  },
  {
    value: 77,
    label: 'Polynésie Française',
  },
  {
    value: 78,
    label: 'Terres Australes Françaises',
  },
  {
    value: 79,
    label: 'Djibouti',
  },
  {
    value: 80,
    label: 'Gabon',
  },
  {
    value: 81,
    label: 'Géorgie',
  },
  {
    value: 82,
    label: 'Gambie',
  },
  {
    value: 83,
    label: 'Territoire Palestinien Occupé',
  },
  {
    value: 84,
    label: 'Allemagne',
  },
  {
    value: 85,
    label: 'Ghana',
  },
  {
    value: 86,
    label: 'Gibraltar',
  },
  {
    value: 87,
    label: 'Kiribati',
  },
  {
    value: 88,
    label: 'Grèce',
  },
  {
    value: 89,
    label: 'Groenland',
  },
  {
    value: 90,
    label: 'Grenade',
  },
  {
    value: 91,
    label: 'Guadeloupe',
  },
  {
    value: 92,
    label: 'Guam',
  },
  {
    value: 93,
    label: 'Guatemala',
  },
  {
    value: 94,
    label: 'Guinée',
  },
  {
    value: 95,
    label: 'Guyana',
  },
  {
    value: 96,
    label: 'Haïti',
  },
  {
    value: 97,
    label: 'Îles Heard et Mcdonald',
  },
  {
    value: 98,
    label: 'Saint-Siège (état de la Cité du Vatican)',
  },
  {
    value: 99,
    label: 'Honduras',
  },
  {
    value: 100,
    label: 'Hong-Kong',
  },
  {
    value: 101,
    label: 'Hongrie',
  },
  {
    value: 102,
    label: 'Islande',
  },
  {
    value: 103,
    label: 'Inde',
  },
  {
    value: 104,
    label: 'Indonésie',
  },
  {
    value: 105,
    label: "République Islamique d'Iran",
  },
  {
    value: 106,
    label: 'Iraq',
  },
  {
    value: 107,
    label: 'Irlande',
  },
  {
    value: 108,
    label: 'Israël',
  },
  {
    value: 109,
    label: 'Italie',
  },
  {
    value: 110,
    label: "Côte d'Ivoire",
  },
  {
    value: 111,
    label: 'Jamaïque',
  },
  {
    value: 112,
    label: 'Japon',
  },
  {
    value: 113,
    label: 'Kazakhstan',
  },
  {
    value: 114,
    label: 'Jordanie',
  },
  {
    value: 115,
    label: 'Kenya',
  },
  {
    value: 116,
    label: 'République Populaire Démocratique de Corée',
  },
  {
    value: 117,
    label: 'République de Corée',
  },
  {
    value: 118,
    label: 'Koweït',
  },
  {
    value: 119,
    label: 'Kirghizistan',
  },
  {
    value: 120,
    label: 'République Démocratique Populaire Lao',
  },
  {
    value: 121,
    label: 'Liban',
  },
  {
    value: 122,
    label: 'Lesotho',
  },
  {
    value: 123,
    label: 'Lettonie',
  },
  {
    value: 124,
    label: 'Libéria',
  },
  {
    value: 125,
    label: 'Jamahiriya Arabe Libyenne',
  },
  {
    value: 126,
    label: 'Liechtenstein',
  },
  {
    value: 127,
    label: 'Lituanie',
  },
  {
    value: 128,
    label: 'Luxembourg',
  },
  {
    value: 129,
    label: 'Macao',
  },
  {
    value: 130,
    label: 'Madagascar',
  },
  {
    value: 131,
    label: 'Malawi',
  },
  {
    value: 132,
    label: 'Malaisie',
  },
  {
    value: 133,
    label: 'Maldives',
  },
  {
    value: 134,
    label: 'Mali',
  },
  {
    value: 135,
    label: 'Malte',
  },
  {
    value: 136,
    label: 'Martinique',
  },
  {
    value: 137,
    label: 'Mauritanie',
  },
  {
    value: 138,
    label: 'Maurice',
  },
  {
    value: 139,
    label: 'Mexique',
  },
  {
    value: 140,
    label: 'Monaco',
  },
  {
    value: 141,
    label: 'Mongolie',
  },
  {
    value: 142,
    label: 'République de Moldova',
  },
  {
    value: 143,
    label: 'Montserrat',
  },
  {
    value: 144,
    label: 'Maroc',
  },
  {
    value: 145,
    label: 'Mozambique',
  },
  {
    value: 146,
    label: 'Oman',
  },
  {
    value: 147,
    label: 'Namibie',
  },
  {
    value: 148,
    label: 'Nauru',
  },
  {
    value: 149,
    label: 'Népal',
  },
  {
    value: 150,
    label: 'Pays-Bas',
  },
  {
    value: 151,
    label: 'Antilles Néerlandaises',
  },
  {
    value: 152,
    label: 'Aruba',
  },
  {
    value: 153,
    label: 'Nouvelle-Calédonie',
  },
  {
    value: 154,
    label: 'Vanuatu',
  },
  {
    value: 155,
    label: 'Nouvelle-Zélande',
  },
  {
    value: 156,
    label: 'Nicaragua',
  },
  {
    value: 157,
    label: 'Niger',
  },
  {
    value: 158,
    label: 'Nigéria',
  },
  {
    value: 159,
    label: 'Niué',
  },
  {
    value: 160,
    label: 'Île Norfolk',
  },
  {
    value: 161,
    label: 'Norvège',
  },
  {
    value: 162,
    label: 'Îles Mariannes du Nord',
  },
  {
    value: 163,
    label: 'Îles Mineures Éloignées des États-Unis',
  },
  {
    value: 164,
    label: 'États Fédérés de Micronésie',
  },
  {
    value: 165,
    label: 'Îles Marshall',
  },
  {
    value: 166,
    label: 'Palaos',
  },
  {
    value: 167,
    label: 'Pakistan',
  },
  {
    value: 168,
    label: 'Panama',
  },
  {
    value: 169,
    label: 'Papouasie-Nouvelle-Guinée',
  },
  {
    value: 170,
    label: 'Paraguay',
  },
  {
    value: 171,
    label: 'Pérou',
  },
  {
    value: 172,
    label: 'Philippines',
  },
  {
    value: 173,
    label: 'Pitcairn',
  },
  {
    value: 174,
    label: 'Pologne',
  },
  {
    value: 175,
    label: 'Portugal',
  },
  {
    value: 176,
    label: 'Guinée-Bissau',
  },
  {
    value: 177,
    label: 'Timor-Leste',
  },
  {
    value: 178,
    label: 'Porto Rico',
  },
  {
    value: 179,
    label: 'Qatar',
  },
  {
    value: 180,
    label: 'Réunion',
  },
  {
    value: 181,
    label: 'Roumanie',
  },
  {
    value: 182,
    label: 'Fédération de Russie',
  },
  {
    value: 183,
    label: 'Rwanda',
  },
  {
    value: 184,
    label: 'Sainte-Hélène',
  },
  {
    value: 185,
    label: 'Saint-Kitts-et-Nevis',
  },
  {
    value: 186,
    label: 'Anguilla',
  },
  {
    value: 187,
    label: 'Sainte-Lucie',
  },
  {
    value: 188,
    label: 'Saint-Pierre-et-Miquelon',
  },
  {
    value: 189,
    label: 'Saint-Vincent-et-les Grenadines',
  },
  {
    value: 190,
    label: 'Saint-Marin',
  },
  {
    value: 191,
    label: 'Sao Tomé-et-Principe',
  },
  {
    value: 192,
    label: 'Arabie Saoudite',
  },
  {
    value: 193,
    label: 'Sénégal',
  },
  {
    value: 194,
    label: 'Seychelles',
  },
  {
    value: 195,
    label: 'Sierra Leone',
  },
  {
    value: 196,
    label: 'Singapour',
  },
  {
    value: 197,
    label: 'Slovaquie',
  },
  {
    value: 198,
    label: 'Viet Nam',
  },
  {
    value: 199,
    label: 'Slovénie',
  },
  {
    value: 200,
    label: 'Somalie',
  },
  {
    value: 201,
    label: 'Afrique du Sud',
  },
  {
    value: 202,
    label: 'Zimbabwe',
  },
  {
    value: 203,
    label: 'Espagne',
  },
  {
    value: 204,
    label: 'Sahara Occidental',
  },
  {
    value: 205,
    label: 'Soudan',
  },
  {
    value: 206,
    label: 'Suriname',
  },
  {
    value: 207,
    label: 'Svalbard etÎle Jan Mayen',
  },
  {
    value: 208,
    label: 'Swaziland',
  },
  {
    value: 209,
    label: 'Suède',
  },
  {
    value: 210,
    label: 'Suisse',
  },
  {
    value: 211,
    label: 'République Arabe Syrienne',
  },
  {
    value: 212,
    label: 'Tadjikistan',
  },
  {
    value: 213,
    label: 'Thaïlande',
  },
  {
    value: 214,
    label: 'Togo',
  },
  {
    value: 215,
    label: 'Tokelau',
  },
  {
    value: 216,
    label: 'Tonga',
  },
  {
    value: 217,
    label: 'Trinité-et-Tobago',
  },
  {
    value: 218,
    label: 'Émirats Arabes Unis',
  },
  {
    value: 219,
    label: 'Tunisie',
  },
  {
    value: 220,
    label: 'Turquie',
  },
  {
    value: 221,
    label: 'Turkménistan',
  },
  {
    value: 222,
    label: 'Îles Turks et Caïques',
  },
  {
    value: 223,
    label: 'Tuvalu',
  },
  {
    value: 224,
    label: 'Ouganda',
  },
  {
    value: 225,
    label: 'Ukraine',
  },
  {
    value: 226,
    label: "L'ex-République Yougoslave de Macédoine",
  },
  {
    value: 227,
    label: 'Égypte',
  },
  {
    value: 228,
    label: 'Royaume-Uni',
  },
  {
    value: 229,
    label: 'Île de Man',
  },
  {
    value: 230,
    label: 'République-Unie de Tanzanie',
  },
  {
    value: 231,
    label: 'États-Unis',
  },
  {
    value: 232,
    label: 'Îles Vierges des États-Unis',
  },
  {
    value: 233,
    label: 'Burkina Faso',
  },
  {
    value: 234,
    label: 'Uruguay',
  },
  {
    value: 235,
    label: 'Ouzbékistan',
  },
  {
    value: 236,
    label: 'Venezuela',
  },
  {
    value: 237,
    label: 'Wallis et Futuna',
  },
  {
    value: 238,
    label: 'Samoa',
  },
  {
    value: 239,
    label: 'Yémen',
  },
  {
    value: 240,
    label: 'Serbie-et-Monténégro',
  },
  {
    value: 241,
    label: 'Zambie',
  },
];

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const $q = useQuasar();

    $q.notify.registerType('update', {
      icon: 'announcement',
      progress: true,
      color: 'brown',
      textColor: 'white',
      classes: 'glossy'
    })

    return {
      platform: $q.platform.is,

      stringOptions,
      dense: ref(null),
      login: ref(false),
      register: ref(false),
      giftmodal: ref(false),
      showNotif() {
        $q.notify({
          position: 'top-left',
          type: 'positive',
          message: 'Connexion réussi à Nosvinsdumonde !',
          timeout: 2500,
        });
      },
      showNotifUpdate() {

        // Mise à jour de l'app
        if (this.params.appVersionOnline != this.params.appVersion) {

          $q.notify({
            type: 'update',
            position: 'top-left',
            icon: 'contactless',
            message: 'Mise à jour disponible !',
            caption: 'Merci de vous rendre <a style="color: white;" href="https://play.google.com/store/apps/details?id=org.nosvinsdumonde.app">ici</a> sur pour la télécharger',
            color: 'primary',
            html: true,
            timeout: 3500
          })

        }
      },
      showNotifError() {
        $q.notify({
          position: 'top-left',
          type: 'negative',
          message: 'Mauvais email ou mot de passe !',
          timeout: 2500,
        });
      },
      showNotifErrorGeneral() {
        $q.notify({
          position: 'top-left',
          type: 'negative',
          message: 'Une erreur est survenue !',
          timeout: 2500,
        });
      },
      showNotifErrorPassword() {
        $q.notify({
          position: 'top-left',
          type: 'negative',
          message: 'Le mot de passe ne comporte pas 8 caractères !',
          timeout: 2500,
        });
      },
    };
  },
  data() {
    return {
      logged: Cookies.get('setLoggedIn'),
      livraisonValue: false,
      societeValue: false,
      params: {
        appVersion: '3.0.4',
        appVersionOnline: '3.0.4',
      },
      user: {
        id: null,
        email: null,
        avatar: 'user_empty.png',
        nom: null,
        prenom: null,
        numero_carte: null,
        point: null,
        carte: null,
        cashback: 0.00
      },
      form: {
        email: null,
        password: null,
        page: null
      },
      form2: {
        email2: null,
        password2: null,
        societe: ref('1'),
        societeName: null,
        civilite: ref('1'),
        nom: null,
        prenom: null,
        adresse: null,
        ville: null,
        code_postal: null,
        pays: null,
        phone: null,
        livraison: ref('0'),
        nom_livraison: null,
        prenom_livraison: null,
        adresse_livraison: null,
        ville_livraison: null,
        code_postal_livraison: null,
        pays_livraison: null,
        carte: ref('1'),
      },
      formNewsLetter: {
        email: null
      },
      verifCookieHead: false,
      verifCartHead: false,
      countCookie: 0,
    };
  },
  computed: {
    ...mapGetters('users', ['setListUser']),
    ...mapGetters('users', ['setListParams']),
    ...mapState('users', ['loggedIn']),
  },
  methods: {
    ...mapActions('users', ['handleAuthStateChange']),
    ...mapActions('users', ['paramsVerif']),
    ...mapMutations('users', ['setLoggedIn']),
    checkAuth() {
      this.handleAuthStateChange();
      this.mountedData();
      setTimeout(this.checkAuth, 100);
    },
    check() {
      this.params.appVersionOnline = this.setListParams.version;
      setTimeout(this.check, 2500);
    },
    ...mapActions('users', ['handleAuthStateChange']),
    mountedData() {
      this.user.id = this.setListUser.id;
      this.user.email = this.setListUser.email;
      this.user.avatar = this.setListUser.user_profil_image;
      this.user.nom = this.setListUser.nom;
      this.user.prenom = this.setListUser.prenom;
      this.user.carte = this.setListUser.carte;
      this.user.numero_carte = this.setListUser.numero_carte;
    },
    ...mapActions('users', ['loggedDataUser']),
    ...mapActions('users', ['loggedAuth']),
    replaceVirgule(html) {
      return (html + '').replace('.', ',');
    },
    verifCookieHeads() {
      if (Cookies.has('favoris')) {
        this.verifCookieHead = true;
        var cookies = Cookies.get('favoris');
        var arr = [];
        var res = cookies.split('-');

        arr.push(res);

        this.countCookie = arr[0].length;
      }
    },
    verifCartHeads() {
      if (Cookies.has('cart')) {
        this.verifCartHead = true;
        var cookies = Cookies.get('cart');
        var arr = [];
        var res = cookies.split('-');

        arr.push(res);

        this.countCart = arr[0].length;
      }
    },
    submitForm() {
      if (this.form.email == null || this.form.password == null) {
        this.showNotifError();
      } else if (this.form.password.length < 7) {
        this.showNotifErrorPassword();
      } else {
        this.loginUser(this.form);
      }
    },
    submitForm2() {
      if (this.form2.email2 == null || this.form2.password2 == null) {
        this.showNotifError();
      } else if (this.form2.password2.length < 7) {
        this.showNotifErrorPassword();
      } else {
        this.registerUser(this.form2);
      }
    },
    submitNewsLetter() {
      if (this.formNewsLetter.email == null) {
        this.showNotifErrorGeneral();
      } else {
        this.newsLetterUser(this.formNewsLetter);
      }
    },
    replaceGuillemet(value) {
      return value.replaceAll('"', '');
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    ...mapActions('users', ['loginUser']),
    ...mapActions('users', ['registerUser']),
    ...mapActions('users', ['verifPointCash']),
    ...mapActions('users', ['newsLetterUser']),
    ...mapActions('users', ['convertPointCash']),
    logout() {
      this.logoutUser(this.user.prenom + ' ' + this.user.nom);
    },
    ...mapActions('users', ['logoutUser']),
    showSociete() {
      this.societeValue = true;
    },
    hideSociete() {
      this.societeValue = false;
    },
    showLivraison() {
      if (this.livraisonValue == 0) this.livraisonValue = true;
      else this.livraisonValue = false;
    },
    convertPoint() {
      this.convertPointCash({ id: this.user.id, email: this.user.email });
    },
    reloadGift() {
      this.verifPointCash(this.user.id);
      this.user.point = Cookies.get('point');
      this.user.cashback = Cookies.get('cashback');
      setTimeout(this.reloadGift, 200);
    }
  },
  mounted() {
    this.verifPointCash(this.user.id);
    this.reloadGift();
    this.checkAuth();
    this.mountedData();
    this.loggedAuth();
    this.paramsVerif();

    setTimeout(() => {
      this.check();
    }, 500);

    this.loggedDataUser();

    if (Cookies.has('favoris')) {
      this.verifCookieHead = true;
      this.countCookie = Cookies.get('favoris');
    } else {
      this.verifCookieHead = false;
    }

    if (Cookies.has('cart')) {
      this.verifCartHead = true;
      this.countCart = Cookies.get('cart');
    } else {
      this.verifCartHead = false;
    }
  },
  props: {},
});
</script>
