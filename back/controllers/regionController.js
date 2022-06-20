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
        let sql = `SELECT id, nom_fr_fr FROM regions WHERE id_boisson = 1 ORDER BY id ASC`;
        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                status: 200,
                listRegion: data,
                message: "region lists retrieved successfully"
            })
        })
    },
}