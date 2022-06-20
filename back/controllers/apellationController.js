/*
 * Import Module
 ****************/

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {
        // Variable de récupération de tout les users
        let sql = `SELECT id_region, nom_fr_fr FROM appellation WHERE id_boisson = 1 ORDER BY id ASC`;
        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                status: 200,
                listApellation: data,
                message: "appellation lists retrieved successfully"
            })
        })
    },
}