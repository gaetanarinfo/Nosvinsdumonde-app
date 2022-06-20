/*
 * Import Module
 ****************/

const {
    now,
    replace
} = require("lodash");
const e = require("method-override");
const moment = require('moment');


/*
 * Controller
 *************/
module.exports = {
    // Method Get
    getChampagnesFavorisId: (req, res) => {

        language = "fr";

        var id = req.params.id.replace('-', ',');

        let sql = `SELECT V.id AS idBoisson,
        V.nom AS nomBoisson, 
        V.millesime AS millesimeBoisson,
        V.image AS imageBoisson, 
        V.prix AS prixBoisson,
        V.soit AS soitBoisson,
        V.niveau_garde AS gardeBoisson,
        V.service_temperature As temperatureBoisson,
        V.degree AS degreeBoisson,
        V.alliance_id AS allianceBoisson,
        V.domaineImage AS domaineImageBoisson,
        V.cepages AS cepagesBoisson,
        V.stock AS stockBoisson,
        V.plan AS planBoisson,
        V.plan_pourcent AS planPourcentBoisson,
        V.remise_plan AS remiseBoisson,
        V.sticker AS stickerBoisson,
    
        CP.content AS contentCepagesBoisson,
        CP.niveau AS niveauCepagesBoisson,
        CP.chart_content AS chartContentCepagesBoisson,
        CP.chart_number AS chartNumberCepagesBoisson,
    
        LOWER(B.nom) AS typeBoisson,
        AP.nom_fr_fr AS apellationBoisson,
        AP.id AS apellationIdBoisson,
        CN.nom AS contenanceBoisson,
        R.nom_fr_fr AS regionBoisson,
        C.nom AS couleurBoisson,
    
        G.fr AS nomGoutBoisson,
        G.image AS imageGoutBoisson,
    
        D.titre AS titreCaracteristiqueBoisson,
        D.content AS contentCaracteristiqueBoisson,
    
        DF.content AS contentDefinitionBoisson,
    
        VSV.description AS vinSaviezVousBoisson FROM vins AS V
        LEFT JOIN alliance AS A ON A.id = V.alliance_id
        LEFT JOIN appellation AS AP ON AP.id = V.appellation_id
        LEFT JOIN boissons AS B ON B.id = V.boisson_id
        LEFT JOIN contenance AS CN ON CN.id = V.contenance_id
        LEFT JOIN couleur AS C ON C.id = V.couleur_id
        LEFT JOIN gout AS G ON G.id = V.gout_id
        LEFT JOIN pays AS P ON P.id = V.pays_id
        LEFT JOIN regions AS R ON R.id = V.region_id
        LEFT JOIN cepages AS CP ON CP.vin_id = V.id
        LEFT JOIN degustations AS D ON D.vin_id = V.id AND D.lang = "${language}"
        LEFT JOIN vins_saviez_vous AS VSV ON VSV.vin_id = V.id AND VSV.lang = "${language}"
        LEFT JOIN definitions AS DF ON DF.vin_id = V.id AND DF.lang = "${language}" WHERE V.active = 1 AND V.id IN (${id})`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);

            if (data) {

                res.json({
                    status: 200,
                    champagnesFavorisId: data,
                    message: "articles lists retrieved successfully"
                })

            } else {
                res.send({
                    champagnesId: 0
                })
            }
        })

    },
    getId: (req, res) => {

        language = "fr";

        let sql = `SELECT V.id AS idBoisson,
        V.nom AS nomBoisson, 
        V.millesime AS millesimeBoisson,
        V.image AS imageBoisson, 
        V.prix AS prixBoisson,
        V.soit AS soitBoisson,
        V.niveau_garde AS gardeBoisson,
        V.service_temperature As temperatureBoisson,
        V.degree AS degreeBoisson,
        V.alliance_id AS allianceBoisson,
        V.domaineImage AS domaineImageBoisson,
        V.cepages AS cepagesBoisson,
        V.stock AS stockBoisson,
        V.plan AS planBoisson,
        V.plan_pourcent AS planPourcentBoisson,
        V.remise_plan AS remiseBoisson,
        V.sticker AS stickerBoisson,
    
        CP.content AS contentCepagesBoisson,
        CP.niveau AS niveauCepagesBoisson,
        CP.chart_content AS chartContentCepagesBoisson,
        CP.chart_number AS chartNumberCepagesBoisson,
    
        LOWER(B.nom) AS typeBoisson,
        AP.nom_fr_fr AS apellationBoisson,
        AP.id AS apellationIdBoisson,
        CN.nom AS contenanceBoisson,
        R.nom_fr_fr AS regionBoisson,
        C.nom AS couleurBoisson,
    
        G.fr AS nomGoutBoisson,
        G.image AS imageGoutBoisson,
    
        D.titre AS titreCaracteristiqueBoisson,
        D.content AS contentCaracteristiqueBoisson,
    
        DF.content AS contentDefinitionBoisson,
    
        VSV.description AS vinSaviezVousBoisson FROM vins AS V
        LEFT JOIN alliance AS A ON A.id = V.alliance_id
        LEFT JOIN appellation AS AP ON AP.id = V.appellation_id
        LEFT JOIN boissons AS B ON B.id = V.boisson_id
        LEFT JOIN contenance AS CN ON CN.id = V.contenance_id
        LEFT JOIN couleur AS C ON C.id = V.couleur_id
        LEFT JOIN gout AS G ON G.id = V.gout_id
        LEFT JOIN pays AS P ON P.id = V.pays_id
        LEFT JOIN regions AS R ON R.id = V.region_id
        LEFT JOIN cepages AS CP ON CP.vin_id = V.id
        LEFT JOIN degustations AS D ON D.vin_id = V.id AND D.lang = "${language}"
        LEFT JOIN vins_saviez_vous AS VSV ON VSV.vin_id = V.id AND VSV.lang = "${language}"
        LEFT JOIN definitions AS DF ON DF.vin_id = V.id AND DF.lang = "${language}" WHERE V.boisson_id = 2 AND V.active = 1 AND V.id = "${req.params.id}"`;

        if (req.params.id != undefined) {

            db.query(sql, (error, data, fields) => {
                if (error) console.log(error);

                if (data[0] != undefined) {

                    let sql2 = `SELECT V.nom AS nomBoisson, 
            V.id AS idBoisson,
            V.boisson_id AS boissonId,
            V.millesime AS millesimeBoisson,
            V.image AS imageBoisson, 
            V.prix AS prixBoisson,
            LOWER(B.nom) AS typeBoisson,
            AP.nom_fr_fr AS apellationBoisson,
            CN.nom AS contenanceBoisson,
            R.nom_fr_fr AS regionBoisson,
            V.created_at AS dateBoisson,
            V.plan AS planBoisson,
            V.plan_pourcent AS planPourcentBoisson,
            V.remise_plan AS remiseBoisson FROM vins AS V
            LEFT JOIN alliance AS A ON A.id = V.alliance_id
            LEFT JOIN appellation AS AP ON AP.id = V.appellation_id
            LEFT JOIN boissons AS B ON B.id = V.boisson_id
            LEFT JOIN contenance AS CN ON CN.id = V.contenance_id
            LEFT JOIN couleur AS C ON C.id = V.couleur_id
            LEFT JOIN gout AS G ON G.id = V.gout_id
            LEFT JOIN pays AS P ON P.id = V.pays_id
            LEFT JOIN regions AS R ON R.id = V.region_id WHERE V.appellation_id = "${data[0].apellationIdBoisson}" AND V.id != "${req.params.id}" AND V.boisson_id = 2 AND V.active = 1 ORDER BY V.created_at DESC LIMIT 3`;

                    db.query(sql2, (error2, data2, fields) => {
                        if (error2) console.log(error2);

                        if (data[0]) {

                            res.json({
                                status: 200,
                                champagnesId: data,
                                listChampagnesSuggest: data2,
                                message: "articles lists retrieved successfully"
                            })

                        } else {
                            res.send({
                                champagnesId: 0
                            })
                        }

                    })

                } else {
                    res.send({
                        champagnesId: 0
                    })
                }
            })
        } else {
            res.send({
                champagnesId: 0
            })
        }
    },
    getIdAlliances: (req, res) => {

        language = "fr";

        let sql = `SELECT image, fr FROM  alliance WHERE id IN (${req.params.id}) ORDER BY id DESC`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);

            if (data) {

                res.json({
                    status: 200,
                    champagnesIdAlliances: data,
                    message: "articles lists retrieved successfully"
                })

            } else {
                res.send({
                    champagnesId: 0
                })
            }
        })
    },
    getVenteChampagnes: (req, res) => {

        moment.locale('en-ca');
        moment().format('L');

        language = "fr";

        let sql = `SELECT COUNT(id) AS idCount FROM sites_commandes WHERE vin_id IN (${req.params.id}) AND id_status_commande = 2 AND created_at LIKE "%${moment().subtract(1, 'd').format('L')}%" ORDER BY id DESC`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);

            if (data) {

                res.json({
                    status: 200,
                    champagnesIdVente: data,
                    message: "articles lists retrieved successfully"
                })

            } else {
                res.send({
                    champagnesId: 0
                })
            }
        })
    },
    postAvisChampagnes: (req, res) => {

        const note = req.body.avis_note;
        const prenom = req.body.avis_prenom;
        const email = req.body.avis_email;
        const content = req.body.avis_content;
        const id = req.body.id_champagnes;

        if (email != "" && prenom != "" && content != "" && note != "") {

            let sql = `INSERT INTO avis_vins (vin_id,note,email,prenom,content) VALUES ("${id}","${note}","${email}","${prenom}","${content}")`;

            db.query(sql, (err, result) => {

                if (err) {
                    let error = true
                    res.json({
                        error
                    })
                };

                let success = true

                res.send({
                    success
                })

            })

        } else {

            let error = true
            res.json({
                error
            })

        }


    },
    getQuery: (req, res) => {

        const page = req.body.page;
        const prix = req.body.prix;
        const millesime = req.body.millesime;
        const couleur = req.body.couleur;
        const pays = req.body.pays;
        const appellation = req.body.appellation;
        const region = req.body.region;
        const gout = req.body.gout;
        const alliance = req.body.alliance;

        let reqPage = parseInt(page) - 1;
        let pages = parseInt(20);
        let final = pages * reqPage;

        var select = `V.nom AS nomBoisson, V.millesime AS millesimeBoisson, V.image AS imageBoisson, V.prix AS prixBoisson,V.id AS idBoisson, LOWER(B.nom) AS typeBoisson,AP.nom_fr_fr AS apellationBoisson,CN.nom AS contenanceBoisson,R.nom_fr_fr AS regionBoisson,V.plan AS planBoisson,V.plan_pourcent AS planPourcentBoisson,V.remise_plan AS remiseBoisson`;

        var table = `vins AS V LEFT JOIN alliance AS A ON A.id = V.alliance_id LEFT JOIN appellation AS AP ON AP.id = V.appellation_id LEFT JOIN boissons AS B ON B.id = V.boisson_id LEFT JOIN contenance AS CN ON CN.id = V.contenance_id LEFT JOIN couleur AS C ON C.id = V.couleur_id LEFT JOIN gout AS G ON G.id = V.gout_id LEFT JOIN pays AS P ON P.id = V.pays_id LEFT JOIN regions AS R ON R.id = V.region_id`;

        var where = `V.boisson_id = 2`;

        if(prix != null){
            where += ` AND V.prix >= ${prix['min']} AND V.prix <= ${prix['max']}`;
        }

        if(millesime != null){
            where += ` AND V.millesime = ${millesime}`;
        }

        if(pays != null){
            where += ` AND V.pays_id = ${pays}`;
        }

        if(couleur != null){
            where += ` AND V.couleur_id = ${couleur}`;
        }

        if(appellation != null){
            where += ` AND V.appellation_id = ${appellation}`;
        }

        if(region != null){
            where += ` AND V.region_id = ${region}`;
        }

        if(gout != null){
            where += ` AND V.gout_id = ${gout}`;
        }

        if(alliance != null){
            where += ` AND V.alliance_id IN (${alliance})`;
        }

        let sql = `SELECT ${select} FROM ${table} WHERE ${where} ORDER BY V.created_at DESC LIMIT 20 OFFSET ${final}`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);

            res.json({
                status: 200,
                listChampagnesAll: data,
                message: "champagnes lists retrieved successfully"
            })
        })

    }
}