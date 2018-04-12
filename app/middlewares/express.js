'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const csrf = require('csurf');

const debug_info = require('debug')('TinyLanding:info');
const debug_error = require('debug')('TinyLanding:error');

module.exports = {
    CsrfToken: app => {
        return csrf({cookie: true});
    },

    HeaderMiddleware: app => {
        const is_production = app.get('env') === 'production';

        if (!is_production) {
            app.use(function (req, res, next) {
                req.headers['if-none-match'] = 'no-match-for-this';
                next();
            });
        }
        app.use(cookieParser());
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
    },

    FooterMiddleware: app => {
        const is_production = app.get('env') === 'production';

        app.use((req, res, next) => {
            next(createError(404, 'Error 404 not found'));
        });

        app.use((err, req, res, next) => {
            const status = err.status || 500;
            const cont_type = req.headers['content-type'];

            if (err.code === 'EBADCSRFTOKEN') {
                err.status = 403;
                err.message = 'form tampered with';
            }

            debug_error(`${status} - ${err.message}\n ${err.stack}`);

            res.status(status);

            if (req.accepts('json') && cont_type && cont_type.indexOf('application/json') === 0) {
                const content = {message: err.message, status: status};
                if (!is_production) {
                    content['error_stack'] = err.stack;
                }
                console.error(err);
                debug_error(`Error api ${JSON.stringify(content)}`);
                res.json(content);
                return;
            }

            debug_error(`Error in request ${err.message}`);
            res.locals.message = err.message;
            res.locals.error = !is_production ? err : {};
            res.render('error');
        });
    },
};
