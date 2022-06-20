const jwt = require('jsonwebtoken');

module.exports = {
    get: async (req, res) => {

        jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {

            res.send({
                tokens: 'ok'
            })

        })
    }

}