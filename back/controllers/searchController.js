/*
 * Import Module
 ****************/

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    getNewsSearch: (req, res) => {

        const search = req.params.search;

        let sql = `SELECT V.id AS idBoisson,
        V.boisson_id AS boissonId,
        V.nom AS nomBoisson,
        V.millesime AS millesimeBoisson,
        V.image AS imageBoisson, 
        V.prix AS prixBoisson,
        LOWER(B.nom) AS typeBoisson,
        AP.nom_fr_fr AS apellationBoisson,
        CN.nom AS contenanceBoisson,
        R.nom_fr_fr AS regionBoisson,
        C.nom AS couleurBoisson FROM vins AS V
        LEFT JOIN alliance AS A ON A.id = V.alliance_id
        LEFT JOIN appellation AS AP ON AP.id = V.appellation_id
        LEFT JOIN boissons AS B ON B.id = V.boisson_id
        LEFT JOIN contenance AS CN ON CN.id = V.contenance_id
        LEFT JOIN couleur AS C ON C.id = V.couleur_id
        LEFT JOIN gout AS G ON G.id = V.gout_id
        LEFT JOIN pays AS P ON P.id = V.pays_id
        LEFT JOIN regions AS R ON R.id = V.region_id WHERE V.nom COLLATE utf8mb4_0900_ai_ci LIKE "%${search}%" ORDER BY V.nom LIMIT 10`;

        db.query(sql, (error, data, fields) => {

            res.json({
                status: 200,
                listNewsSearch: data,
                message: "articles lists retrieved successfully"
            })

        })
    },
    getNewsSearch2: (req, res) => {

        const search2 = req.params.search2;

        let sql = `SELECT C.title, C.url FROM contents AS C WHERE C.title COLLATE utf8mb4_0900_ai_ci LIKE "%${search2}%" ORDER BY C.title LIMIT 10`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);

            res.json({
                status: 200,
                listNewsSearch2: data,
                message: "articles lists retrieved successfully"
            })
        })

    }
}