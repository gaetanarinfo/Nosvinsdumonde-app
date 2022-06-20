const {
    trim,
    replace
} = require("lodash");

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
    post: (req, res) => {

        const email = req.body.email;
        var societe = req.body.societe;
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const phone = req.body.phone;
        var sujet = req.body.sujet;
        const message = req.body.message;
        var sujetRep = "";

        switch (sujet) {
            case "1":
                sujetRep = "Vous recherchez un vin précis";
                break;

            case "2":
                sujetRep = "Fidélité";
                break;

            case "3":
                sujetRep = "Autres demandes";
                break;

            case "4":
                sujetRep = "Droit de modification";
                break;

            case "5":
                sujetRep = "Droit à l’oubli";
                break;

            case "6":
                sujetRep = "Droit d\'accès'";
                break;

            case "7":
                sujetRep = "Droit à la limitation du traitement";
                break;

            case "8":
                sujetRep = "Droit d’opposition";
                break;

            case "9":
                sujetRep = "Droit à la portabilité";
                break;

            case "10":
                sujetRep = "Modification produit sur Nosvinsdumonde";
                break;

            case "11":
                sujetRep = "Ajout d'un produit sur Novinsdumonde.";
                break;

            default:
                break;
        }

        if (societe == null) {
            societe = 'Non';
        }

        const content = 'Bonjour Gaëtan,<br/><br>';
        const content2 = 'Récapitulatif des informations :<br/><br>';
        const content3 = 'Société : ' + societe + '<br/>';
        const content4 = 'Prénom : ' + prenom + '<br/>';
        const content5 = 'Nom : ' + nom + '<br/>';
        const content6 = 'Email : ' + email + '<br/>';
        const content7 = 'Téléphone : ' + phone + '<br/>';
        const content8 = 'Sujet : ' + sujetRep + '<br/>';
        const content9 = '<br/>Message : <br/>' + message + '<br/><br/>';
        const content10 = 'Nous vous remercions de votre confiance.<br/><br/>';
        const content11 = '<img style="width: 30px;" width="30" src="https://nosvinsdumonde.com/assets/img/logo.png"/><br/><br/>';
        const content12 = '<a href="https://nosvinsdumonde.com/fr/">Nosvinsdumonde.com</a>';

        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: prenom + ' ' + nom + ' <' + email + '>',
            to: 'Nosvinsdumonde.com <contact@nosvinsdumonde.fr>',
            subject: 'Demande de contact sur Nosvinsdumonde',
            html: content + content2 + content3 + content4 + content5 + content6 + content7 + content8 + content9 + content10 + content11 + content12
        }

        const contentd = 'Bonjour Gaëtan,<br/><br>';
        const content2d = 'Voici le récapitulatif de vos informations :<br/><br>';
        const content3d = 'Société : ' + societe + '<br/>';
        const content4d = 'Prénom : ' + prenom + '<br/>';
        const content5d = 'Nom : ' + nom + '<br/>';
        const content6d = 'Email : ' + email + '<br/>';
        const content7d = 'Téléphone : ' + phone + '<br/>';
        const content8d = 'Sujet : ' + sujetRep + '<br/>';
        const content9d = '<br/>Message : <br/>' + message + '<br/><br/>';
        const content10d = 'Nous vous remercions de votre confiance.<br/><br/>';
        const content11d = '<img style="width: 30px;" width="30" src="https://nosvinsdumonde.com/assets/img/logo.png"/><br/><br/>';
        const content12d = '<a href="https://nosvinsdumonde.com/fr/">Nosvinsdumonde.com</a>';

        const mailOptions2 = {
            from: 'Nosvinsdumonde.com ' + '<contact@nosvinsdumonde.fr>',
            to: prenom + ' ' + nom + '<' + email + '>',
            subject: 'Demande de contact sur Nosvinsdumonde',
            html: contentd + content2d + content3d + content4d + content5d + content6d + content7d + content8d + content9d + content10d + content11d + content12d
        }

        if (email != "" && nom != "" && prenom != "" && phone != "" && sujet != "" && message != "") {

            transporter.sendMail(mailOptions, (err, info) => {

                transporter.sendMail(mailOptions2, (err, info) => {


                    let sql = `INSERT INTO contacts_history 
                (societe,prenom,nom,email,phone,sujet,message) 
                VALUES 
                ("${email}","${prenom}","${nom}","${email}", "${phone}", "${sujet}", "${message}")`;


                    db.query(sql, (err2, result) => {

                        if (err2) {
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

                })

            })

        } else {

            let error = true
            res.json({
                error
            })

        }
    },
}