/*
 * Server.js
 ******************************/

// Package nodemon pour le relancement des fichiers views et js avec npm start
const livereload = require('livereload'),
    reload = livereload.createServer()

const
    express = require('express'),
    app = express(),
    mysql = require('mysql2'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    throttle = require('express-throttle-bandwidth'),
    port = process.env.PORT || 4000;

// Helmet aide à sécuriser les applications Express.js en définissant divers en-têtes HTTP. Ce n'est pas un argent
const helmet = require("helmet")

require('dotenv').config()

// Method-Override
app.use(methodOverride('_method'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.header('origin'))
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// Cors
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(throttle(1024 * 128)) // throttling bandwidth

// Mysql
db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

db.connect((err) => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('Connecté avec l\'id ' + db.threadId);
});

// Express Static (Permet de pointer un dossier static sur une URL)
// Exemple: le chemin /assets nous donnera accès au dossier public
app.use(express.static('public'));

// Body Parser qui nous permet de parser des data d'une req a une autre
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Module App gestion des cookies
app.use(expressSession({
    secret: 'labelleauboisdormanssursonarbreperché',
    name: 'nosvinsdumonde',
    saveUninitialized: false,
    secure: false,
    resave: false,
    cookie: {
        path: '/',
        maxAge: 1000000
    }
}))

// cookieParser should be above session
app.use(cookieParser())

// App.use * est un middleware pour proteger la partie Administration ou bien cacher un bouton pour le visiteur
// app.use('*', (req, res, next) => {
//     res.locals.users = req.session.userId
//     next()
// })


// Router
const ROUTER = require('./controllers/router')
app.use(ROUTER)

// Page Err 404
app.use((req, res) => {
    res.send('err404')
})

// Helmet security pour les failles XSS etc...
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// Permet de reload le dossier public des ressources
reload.watch(__dirname + "/public")

// Ecoute de notre app
app.listen(port, () => {
    console.log(`Ecoute le port ${port}, lancé le : ${new Date().toLocaleString()}`)
})