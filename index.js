/**
 * Module dependencies.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const APP_STATE = process.env.NODE_ENV;
const helmet = require('helmet');

const passport = require('passport');
const {
    passportConfig: { jwtStrategy },
} = require('./config');

const app = express();

/**
 * Set `views` directory for module
 */

app.set('views', path.join(__dirname, 'views'));

/**
 * Set `view engine` to `pug`.
 */

app.set('view engine', 'pug');

/**
 * middleware for favicon
 */

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: 52428800, extended: true }));
app.use(cookieParser());
app.options('*', cors());
app.use(cors());

// protect against vulnerability
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            'img-src': ["'self'", 'https: data:'],
        },
    }),
);

/**
 * routes application
 */

app.use('/api', require('./src'));

/**
 * Load auth routes and
 * login strategies with
 * passport
 */
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

/**
 * GET index page.
 */

app.get('*', function (req, res) {
    res.render('index', {
        title: 'Backend API',
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    const isProduction = APP_STATE === 'production';
    // console.log(isProduction);
    res.status(err.status || 500).json({
        statusCode: 500,
        status: false,
        message: 'App Crashed',
        data: err.message,
        ...(isProduction ? {} : { error: err }),
    });
});

module.exports = app;
