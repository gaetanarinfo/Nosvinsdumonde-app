<template>
  <!-- BreadCrump -->
  <div class="q-pa-none q-mt-lg q-gutter-sm">
    <q-breadcrumbs class="text-brown">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="white" />
      </template>

      <q-breadcrumbs-el clickable to="/" label="Accueil" style="color: #ffc107" />
      <q-breadcrumbs-el clickable label="Livraison" style="color: white" />
    </q-breadcrumbs>
  </div>

  <div class="container-md q-mt-lg q-mb-lg" style="padding: 0 5vw">
    <div class="text-h4 text-white bloc_vin_title q-mb-lg q-mt-lg" style="
        font-size: 500;
        justify-content: center;
        display: flex;
        width: 100%;
        margin: 24px 0;
      ">
      <q-item class="title">Livraison</q-item>
    </div>
  </div>

  <div class="container-md q-mt-lg q-mb-lg text-white" style="padding: 0 5vw">
    <div class="text-white">
      <div class="text-center mb-5">
        <h6 class="text-center text-white q-pa-none" style="font-size: 19px">
          VOUS SOUHAITEZ COMMANDER DU VIN OU DU CHAMPAGNE ET VOUS FAIRE LIVRER À
          DOMICILE OU ENVOYER UN CADEAU À UN PROCHE ?
        </h6>
        <h6 class="text-center text-white q-pa-none" style="font-size: 19px">
          NOSVINSDUMONDE POSSÈDE UNE LOGISTIQUE TRÈS COMPÉTITIVE ET VOUS PERMET
          D'EXPÉDIER VOS BOUTEILLES DANS LES MEILLEURS DÉLAIS.
        </h6>
      </div>

      <p class="text-warning fw-bold">
        Livraison France Métropolitaine Standard sous 72 heures au départ du
        colis
      </p>

      <p>
        Du lundi au vendredi (aucune livraison les samedis, dimanches et jours
        fériés).
      </p>

      <p>
        Pour la Corse et toute les îles du littoral français comptez un délai
        supplémentaire de 24 heures.
      </p>
      <p>
        Du 01/12 au 15/01, le délai de livraison standard est de 5 jours maximum
        en raison de la forte activité
      </p>
      <p></p>
      <p>due aux fêtes de fin d’année.</p>
      <p>
        Comptez un délai supplémentaire de 24h lors des inventaires réalisés le
        vendredi (5/6 par an).
      </p>

      <p>De 1 à 12 bouteilles : 14 € TTC</p>
      <p>De 13 à 24 bouteilles : 23 € TTC</p>
      <p>De 25 à 36 bouteilles : 29 € TTC</p>
      <p>De 37 à 48 bouteilles : 34 € TTC</p>
      <p>De 49 à 60 bouteilles : 40 € TTC</p>

      <p>
        Exemple : Une commande passée vendredi avant 12h00, est préparée le
        lundi et livrée à partir de mercredi. Une commande passée le lundi à
        partir de 16h00, est expédiée le mercredi et livrée qu'à partir de
        vendredi.
      </p>

      <p>
        Livraison France Métropolitaine Express 24-48 heures au départ du colis
      </p>

      <p>
        Du lundi au vendredi (aucune livraison les samedis, dimanches et jours
        fériés).
      </p>

      <p>
        Pour la Corse et toute les îles du littoral français comptez un délai
        supplémentaire de 24 heures.
      </p>

      <p>De 1 à 12 bouteilles : 22 € TTC</p>
      <p>De 13 à 24 bouteilles : 28 € TTC</p>
      <p>De 25 à 36 bouteilles : 34 € TTC</p>
      <p>Maximum 36 bouteilles par envoi.</p>

      <p>
        Toute commande express doit être validée avant 12h00 pour être traitée
        et expédiée le jour même.
      </p>

      <p>
        Exemple : Une commande en express passée le vendredi avant 12h00, est
        préparée le vendredi et livrée lundi. Une commande en express passée le
        vendredi après 12h00, part en préparation le lundi et livrée le mardi.
        Une commande passée le lundi après 12h00, est préparée le mardi et
        expédiée le mercredi.
      </p>

      <p>Informations importantes sur nos livraisons</p>

      <p>
        Tous les tarifs sont exprimés en Euros / TTC et s'entendent pour chaque
        destinataire (nominativement) par adresse.
      </p>
      <p>1 destinataire = 1 forfait de livraison</p>

      <p>
        Toutes les adresses avec les seules mentions suivantes ne seront pas
        prises en compte :
      </p>
      <p>BP - PO BOX - POSTFACH - POST BUS - APPARTADO</p>

      <p>Nous ne livrons pas les hôpitaux et les centres médicalisés.</p>
    </div>
  </div>
</template>
