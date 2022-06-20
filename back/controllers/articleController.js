const { trim } = require("lodash");

/*
 * Import Module
 ****************/
const extIP = require("ext-ip")(),
    nodemailer = require('nodemailer');

// Déclaration de notre transporter
// C'est en quelque sorte notre connexion à notre boite mail
transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_MAILER, // Env utilisateur
        pass: process.env.PASSWORD_MAILER, // Env password
    }
})

/*
 * Controller
 *************/
module.exports = {

    // Method Get
    get: async (req, res) => {
        // Variable de récupération de tout les users
        let sql = `SELECT C.*, CONCAT(U.prenom, " ", U.nom) AS author, CG.name AS groupeName FROM contents AS C LEFT JOIN users AS U ON U.id = C.user_id LEFT JOIN contents_groupes AS CG ON CG.id = C.groupe WHERE 1 ORDER BY C.created_at DESC LIMIT 12`;
        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                status: 200,
                listNews: data,
                message: "articles lists retrieved successfully"
            })
        })
    },
    getId: (req, res) => {

        language = "fr";

        let sql = `SELECT C.*, CONCAT(U.prenom, " ", U.nom) AS author, CG.name AS groupeName FROM contents AS C LEFT JOIN users AS U ON U.id = C.user_id LEFT JOIN contents_groupes AS CG ON CG.id = C.groupe WHERE C.url = "${req.params.url}"`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);

            if (data[0] != undefined) {
                let sql2 = `SELECT * FROM contents_comments WHERE id_content = "${data[0].id}" ORDER BY created_at DESC`;

                db.query(sql2, (error2, data2, fields2) => {
                    if (error2) console.log(error2);

                    // Variable de récupération de tout les users
                    let sql3 = `SELECT C.*, CONCAT(U.prenom, " ", U.nom) AS author, CG.name AS groupeName FROM contents AS C LEFT JOIN users AS U ON U.id = C.user_id LEFT JOIN contents_groupes AS CG ON CG.id = C.groupe WHERE C.id != '${data[0].id}' ORDER BY C.created_at DESC LIMIT 3 OFFSET 21`;
                    db.query(sql3, (error3, data3, fields) => {
                        if (error3) console.log(error2);

                        res.json({
                            status: 200,
                            articleId: data,
                            articleCommentsId: data2,
                            listNewsReadMore: data3,
                            message: "articles lists retrieved successfully"
                        })
                    })
                })
            } else {
                res.send({
                    articleId: 0
                })
            }
        })
    },
    post: (req, res) => {

        const email = req.body.email_comm;
        const title = req.body.title_comm;
        const message = req.body.message_comm;
        const idComm = req.body.id_comm;
        const idActu = req.body.id_actu;
        const url = req.body.url_comm;
        const content = 'Bonjour Gaëtan,<br/><br>';
        const content2 = 'Un commentaire à été signaler sur Nosvinsdumonde.<br/><br>';
        const content3 = 'Titre : ' + title + '<br/>';
        const content4 = '<br/>Message : <br/>' + message + '<br/><br/>';
        const content5 = 'Article concernée <a href="https://nosvinsdumonde.com/fr/actualite/' + url + '">ici</a><br/><br/>';
        const content6 = '<img style="width: 30px;" width="30" src="https://nosvinsdumonde.com/assets/img/logo.png"/><br/><br/>';
        const content7 = '<a href="https://nosvinsdumonde.com/fr/">Nosvinsdumonde.com</a>';

        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: 'Utilisateur' + ' <' + email + '>',
            to: 'Gaëtan Seigneur <contact@nosvinsdumonde.fr>',
            subject: 'Commentaire inapproprié concernant Nosvinsdumonde.',
            html: content + content2 + content3 + content4 + content5 + content6 + content7
        }

        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, info) => {

            extIP.get((err, ip) => {
                if (err) {
                    //console.error("callback error: " + err);
                } else {

                    if (email != "" && title != "" && message != "") {

                        let sql = `INSERT INTO contents_comments_abuses (id_content,id_comment,email,titre,message, ip) VALUES ("${idActu}","${idComm}","${email}","${title}","${message}", "${ip}")`;

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

                }

            })

        })

    },
    postComment: (req, res) => {

        const email = req.body.c_mail;
        const nom = req.body.c_nom;
        const message = req.body.c_message;
        const idActu = req.body.id_actu;

        extIP.get((err, ip) => {
            if (err) {
                //console.error("callback error: " + err);
            } else {

                if (email != "" && nom != "" && message != "") {

                    let sql = `INSERT INTO contents_comments (id_content,nom,mail,content,ip) VALUES ("${idActu}","${nom}","${email}","${message}", "${ip}")`;

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

            }

        })

    },
    getPage: (req, res) => {

        let reqPage = parseInt(req.params.page) - 1;
        let page = parseInt(20);
        let final = page * reqPage;

        let sql = `SELECT C.*, CONCAT(U.prenom, " ", U.nom) AS author, CG.name AS groupeName FROM contents AS C LEFT JOIN users AS U ON U.id = C.user_id LEFT JOIN contents_groupes AS CG ON CG.id = C.groupe WHERE 1 ORDER BY C.created_at DESC LIMIT 20 OFFSET ${final}`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);

            res.json({
                status: 200,
                listNewsAll: data,
                message: "articles lists retrieved successfully"
            })
        })
    },

}