<template>
  <!-- BreadCrump -->
  <div class="q-pa-none q-mt-lg q-gutter-sm">
    <q-breadcrumbs class="text-brown">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="white" />
      </template>

      <q-breadcrumbs-el clickable to="/" label="Accueil" style="color: #ffc107" />
      <q-breadcrumbs-el clickable label="Carte de fidélité, carte cadeau : points, avantages - Nosvinsdumonde"
        style="color: white" />
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
      <q-item class="title">Ma carte Privilège</q-item>
    </div>
  </div>

  <div class="container-md q-mt-lg q-mb-lg text-white" style="padding: 0 5vw">
    <div class="col-md-4">
      <div class="carte">
        <p class="text-center text-white fw-bold no_border">
          <i class="fa-solid fa-gift" style="font-size: 50px"></i>
        </p>
      </div>
    </div>

    <div class="col-md-8 text-white q-mt-lg">
      <p class="fw-bold">Une carte gratuite !</p>

      <p>
        Un moyen simple pour faire le plein de cadeaux. Vous cumulez des points
        lors de vos achats et vous pouvez par la suite les convertir en cadeaux.
      </p>

      <p class="fw-bold">Disponible sur mobile</p>

      <p>
        Pratique, elle est toujours sur vous et vous informe de vos avantages !
      </p>

      <p class="fw-bold">Des avantages toute l'année</p>

      <ul>
        <li>Convertissez vos points en cadeaux.</li>
        <li>
          Bénéficiez d'invitation à des évènements NOSVINSDUMONDE et de ses
          partenaires
        </li>
        <li>Profitez des offres de nos partenaires</li>
        <li>
          Recevez régulièrement nos actualités, conseils personalisés et bonnes
          affaires
        </li>
        <li>Bénéficiez de l'accès à nos ventes privées</li>
      </ul>

      <p class="fw-bold">Le programme privilèges</p>

      <p class="fw-bold">Comment ça marche ?</p>

      <ul>
        <li>Activation automatique de votre carte</li>
        <li>Cumulez des points</li>
        <li>
          1 Point tous les 5€ d'achat sur présentation de votre carte. Plus
          d'informations ici
        </li>
      </ul>

      <p class="fw-bold">Comment utiliser vos points ?</p>

      <p>
        Vous pouvez maintenant échanger vos points contre ce qui vous intéresse
        dans le magasin
      </p>

      <p>Comment connaître la valeur de vos points ?</p>
      <p>
        Pour connaitre la valeur de vos points en Euros, il suffit de diviser
        votre nombre de point par 10.
      </p>

      <p class="fw-bold">Exemple : 150 pts = 15€</p>
    </div>
  </div>
</template>
