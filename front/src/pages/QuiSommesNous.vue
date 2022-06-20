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
        label="Qui sommes nous"
        style="color: white"
      />
    </q-breadcrumbs>
  </div>

  <div class="container-md q-mt-lg q-mb-lg" style="padding: 0 5vw">
    <div
      class="text-h4 text-white bloc_vin_title q-mb-lg q-mt-lg"
      style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      "
    >
      <q-item class="title">Qui sommes nous ?</q-item>
    </div>

    <div
      class="text-white q-mb-lg q-mt-lg"
      style="
        font-size: 500;
        justify-content: center;
        width: 100%;
        margin: 24px 0;
      "
    >
      <div class="container-md q-pa-none">
        <h6
          class="text-center text-white q-pa-none"
          style="
            border-bottom: 3px solid #ffc107;
            padding-bottom: 13px;
            font-size: 19px;
          "
        >
          NOUS PRENONS SOIN DE VOS VINS
        </h6>

        <q-item class="text-white q-pa-none q-mb-lg">
          L’histoire commence à l’époque où le vin se buvait sur place, dans les
          cabarets ou les boutiques à vins.
        </q-item>

        <q-item class="text-white q-pa-none q-mb-lg">
          Et si l’envie prenait d’en consommer chez soi, il fallait se rendre
          chez un marchand de vin ou directement chez le producteur pour acheter
          un fût !
        </q-item>

        <q-item class="text-white q-pa-none q-mb-lg">
          C’est à partir de ce constat que Nosvinsdumonde inventa un nouveau
          concept de vente du vin qui allait révolutionner toutes les habitudes
          de consommation et de négoce : le vin en bouteille.
        </q-item>

        <h6
          class="text-center text-white q-pa-none"
          style="
            border-bottom: 3px solid #ffc107;
            padding-bottom: 13px;
            font-size: 19px;
          "
        >
          NOTRE MISSION, FACILITER L’ACCÈS AU VIN NOTRE VISION, VOUS PERMETTRE
          DE TROUVER LE VIN QUI VOUS CONVIENT
        </h6>

        <div class="row justify-content-center">
          <div class="col-md-4 text-center">
            <img
              style="width: 60%"
              src="https://nosvinsdumonde.com/assets/img/gold-cup-with-laurel-leaves-png-clipart-image-5a1d43eae89be9.1769932315118673709528.png"
            />
            <q-item
              class="text-white text-center q-mt-md"
              style="width: 100%; margin: 0 auto"
            >
              <b>N°1 de la distribution de vin en France en centre-ville</b>
            </q-item>
          </div>

          <div class="col-md-4 text-center bloc_mobile q-mt-lg">
            <img
              style="width: 100%"
              src="https://nosvinsdumonde.com/assets/img/png-transparent-black-glass-bottle-and-three-clear-wine-glasses-red-wine-cabernet-franc-distilled-beverage-cabernet-sauvignon-red-wine-red-wine-background-taobao-material-glass-wine-glass-champagne.png"
              alt=""
            />
            <q-item
              class="text-white text-center"
              style="width: 100%; margin: 0 auto"
            >
              <b>+ de 1500 références en vins, champagnes et spiritueux</b>
            </q-item>
          </div>
        </div>

        <h6
          class="text-center text-white q-pa-none"
          style="
            border-bottom: 3px solid #ffc107;
            padding-bottom: 13px;
            font-size: 19px;
          "
        >
          UN SAVOIR-FAIRE AU SERVICE DU VIN
        </h6>

        <p class="text-white">
          Experts en qualité et conseil depuis 1822, les cavistes Nosvinsdumonde
          sont de véritables professionnels du vin détenant une excellente
          connaissance des produits.
        </p>
        <p class="text-white">
          En effet, chez Nosvinsdumonde, vendre des vins ne se résume pas à un
          simple rôle d’intermédiaire entre le producteur et le consommateur.
          Pour assurer cette qualité de conseil, Nosvinsdumonde apporte à tous
          ses cavistes une formation complète d’une durée de 5 semaines. Grâce à
          l’Ecole intégrée Nosvinsdumonde (centre de formation agréé), chaque
          futur caviste découvre non seulement les produits mais s’initie au
          conseil et à la gestion optimale d’un magasin.
        </p>
        <p class="text-white">
          Chez Nosvinsdumonde, toutes les questions trouvent réponses, que ce
          soit sur le vin, son service ou sur l’art de l’harmoniser avec les
          plats ! Et qui de mieux placé que votre caviste pour délivrer des
          messages simples, clairs et positifs en matière de bonnes pratiques de
          consommation ?
        </p>

        <h6
          class="text-center text-white q-pa-none"
          style="
            border-bottom: 3px solid #ffc107;
            padding-bottom: 13px;
            font-size: 19px;
          "
        >
          CULTURE FORTE DE L’INNOVATION
        </h6>

        <p class="text-white">
          Premier à vendre du vin en bouteilles, Nosvinsdumonde a toujours su
          s’affirmer comme précurseur en créant une gamme de services toujours
          plus innovants : la livraison à domicile en 1840, la disponibilité de
          vins au frais en 1988, le service glaçons en 2012…
        </p>
        <p class="text-white">
          Et comme l’innovation passe aussi par l’offre, Nosvinsdumonde fut le
          premier à proposer le Beaujolais Nouveau à grande échelle en 1966. En
          1995, il met à l’honneur les Vins de Pays de France avec la gamme des
          Petites Récoltes, suivi des Grains de Cépage en 2003.
        </p>

        <div class="mt-5 mb-5 mobile text-white text-center">
          <h6
            class="text-center text-white q-pa-none"
            style="
              border-bottom: 3px solid #ffc107;
              padding-bottom: 13px;
              font-size: 19px;
            "
          >
            LES TRIBULATIONS DE NECTAR
          </h6>

          <div class="row text-left">
            <div class="col-md-8">
              <p>
                La notoriété de Nosvinsdumonde s’est affirmée grâce à une
                communication publicitaire intense, tant au cinéma (premiers
                dessins animés publicitaires en 1921), que sur les murs avec
                l’apparition de Nectar en 1922. Né du crayon de Dransy et
                inspiré d’un livreur de la maison nommé Le Paven, le frêle
                livreur moustachu aux yeux en soucoupe, chargé de bouteilles
                dans chaque main, connu un succès populaire immédiat et
                indiscuté.
              </p>
              <p>
                En 2012, à l’occasion du 190ème anniversaire de Nosvinsdumonde,
                le livreur emblématique de la maison s’est modernisé et nous a
                fait découvrir un nouveau visage.
              </p>
              <p>
                <b
                  >Aujourd’hui, le caviste est à l’honneur de la communication
                  publicitaire de Nosvinsdumonde.</b
                >
              </p>
            </div>

            <div class="col-md-4 q-mt-lg mb-5 item_img">
              <img
                style="width: 100%"
                src="https://nosvinsdumonde.com/assets/img/bouteille-blanc-vermentino-decor.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
