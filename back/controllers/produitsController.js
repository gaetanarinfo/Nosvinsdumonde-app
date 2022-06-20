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
    get: (req, res) => {

        const page = req.params.page;

        let reqPage = parseInt(page) - 1;
        let pages = parseInt(20);
        let final = pages * reqPage;

        var select = `V.nom AS nomBoisson, V.millesime AS millesimeBoisson, V.image AS imageBoisson, V.prix AS prixBoisson,V.id AS idBoisson, LOWER(B.nom) AS typeBoisson,AP.nom_fr_fr AS apellationBoisson,CN.nom AS contenanceBoisson,R.nom_fr_fr AS regionBoisson,V.plan AS planBoisson,V.plan_pourcent AS planPourcentBoisson,V.remise_plan AS remiseBoisson`;

        var table = `vins AS V LEFT JOIN alliance AS A ON A.id = V.alliance_id LEFT JOIN appellation AS AP ON AP.id = V.appellation_id LEFT JOIN boissons AS B ON B.id = V.boisson_id LEFT JOIN contenance AS CN ON CN.id = V.contenance_id LEFT JOIN couleur AS C ON C.id = V.couleur_id LEFT JOIN gout AS G ON G.id = V.gout_id LEFT JOIN pays AS P ON P.id = V.pays_id LEFT JOIN regions AS R ON R.id = V.region_id`;

        var where = `1`;

        let sql = `SELECT ${select} FROM ${table} WHERE ${where} ORDER BY V.created_at DESC LIMIT 20 OFFSET ${final}`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);

            res.json({
                status: 200,
                listProduitsAll: data,
                message: "vins lists retrieved successfully"
            })
        })

    }
}