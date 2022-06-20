/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router()

/*
 * Controller
 *************/
const articleController = require('./articleController')
const searchController = require('./searchController')
const vinsController = require('./vinsController')
const champagnesController = require('./champagnesController')
const produitsController = require('./produitsController')
const appellationsControler = require('./appellationsControler')
const regionsControler = require('./regionsControler')
const paysController = require('./paysController')
const apellationController = require('./apellationController')
const regionController = require('./regionController')
const contactController = require('./contactController')
const SessionController = require('./users/SessionController')
const userController = require('./users/userController')

/*
 * Router
 ***********/

// User
router.route('/session')
    .get(SessionController.get)

router.route('/login')
    .post(userController.post)

// Article
router.route('/actualites')
    .get(articleController.get)

router.route('/actualitesAll/:page')
    .get(articleController.getPage)

router.route('/actualite/:url')
    .get(articleController.getId)

router.route('/postCommentActualite')
    .post(articleController.post)

router.route('/postCommentActualiteSend')
    .post(articleController.postComment)

// Search
router.route('/searchPage/:search')
    .get(searchController.getNewsSearch)

router.route('/searchPage2/:search2')
    .get(searchController.getNewsSearch2)

// Vins
router.route('/vins')
    .get(vinsController.get)
router.route('/vinsOne')
    .get(vinsController.getOneVins)
router.route('/vins/:id')
    .get(vinsController.getId)
router.route('/postAvisVins')
    .post(vinsController.postAvisVins)
router.route('/vinsAlliances/:id')
    .get(vinsController.getIdAlliances)
router.route('/vinsVente/:id')
    .get(vinsController.getVenteVin)
router.route('/vinsFavoris/:id')
    .get(vinsController.getVinsFavorisId)
router.route('/vinsAll')
    .post(vinsController.getQuery)

// Champagnes
router.route('/champagnes/:id')
    .get(champagnesController.getId)
router.route('/postAvisChampagnes')
    .post(champagnesController.postAvisChampagnes)
router.route('/champagnesAlliances/:id')
    .get(champagnesController.getIdAlliances)
router.route('/champagnesVente/:id')
    .get(champagnesController.getVenteChampagnes)
router.route('/champagnesFavoris/:id')
    .get(champagnesController.getChampagnesFavorisId)
router.route('/champagnesAll')
    .post(champagnesController.getQuery)

// Produits
router.route('/produitsAll/:page')
    .get(produitsController.get)

router.route('/pays')
    .get(paysController.get)
router.route('/apellation')
    .get(apellationController.get)
router.route('/region')
    .get(regionController.get)

//Appellations
router.route('/appellations')
    .get(appellationsControler.get)
router.route('/appellationsAll/:page/:id')
    .get(appellationsControler.getAppellationsAll)
router.route('/appellationsTitle/:id')
    .get(appellationsControler.getAppellationsTitle)
router.route('/appellationsCount/:id')
    .get(appellationsControler.getAppellationsCount)

//Regions
router.route('/regions')
    .get(regionsControler.get)
router.route('/regionsAll/:page/:id')
    .get(regionsControler.getRegionsAll)
router.route('/regionsTitle/:id')
    .get(regionsControler.getRegionsTitle)
router.route('/regionsCount/:id')
    .get(regionsControler.getRegionsCount)

//Contact
router.route('/postContact')
    .post(contactController.post)

/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;