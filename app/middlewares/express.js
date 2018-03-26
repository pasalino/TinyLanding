'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const csrf = require('csurf');



module.exports = {
    CsrfToken: app => {
        return csrf({cookie: true});
    },

    HeaderMiddleware: app => {
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
            const conttype = req.headers['content-type'];

            if (err.code === 'EBADCSRFTOKEN') {
                err.status = 403;
                err.message = 'form tampered with';
            }

            if (!is_production) {
                console.error(`${status} - ${err.message}\n ${err.stack}`)
            }
            res.status(status);

            if (req.accepts('json') && conttype && conttype.indexOf('application/json') === 0) {
                const content = {message: err.message, status: status};
                if (!is_production) {
                    content['error_stack'] = err.stack;
                }
                res.json(content);
                return;
            }

            res.locals.message = err.message;
            res.locals.error = !is_production ? err : {};
            res.render('error');
        });
    },
};
