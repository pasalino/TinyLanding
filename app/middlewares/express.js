const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const csrf = require('csurf');
const { debugError } = require('../middlewares/logs');

module.exports = {
  CsrfToken: () => csrf({ cookie: true }),

  HeaderMiddleware: (app) => {
    const isProduction = app.get('env') === 'production';

    if (!isProduction) {
      app.use((req, res, next) => {
        req.headers['if-none-match'] = 'no-match-for-this';
        next();
      });
    }
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
  },

  FooterMiddleware: (app) => {
    const isProduction = app.get('env') === 'production';

    app.use((req, res, next) => {
      next(createError(404, 'Error 404 not found'));
    });

    app.use((err, req, res, next) => {
      const contType = req.headers['content-type'];

      let errP = {};
      if (err.code === 'EBADCSRFTOKEN') {
        errP.status = 403;
        errP.message = 'form tampered with';
      } else {
        errP = err;
        errP.status = err.status || 500;
      }

      debugError(`${errP.status} - ${errP.message}\n ${errP.stack}`);

      res.status(errP.status);

      if (req.accepts('json') && contType && contType.indexOf('application/json') === 0) {
        const content = { message: errP.message, status: errP.status };
        if (!isProduction) {
          content.error_stack = errP.stack;
        }
        debugError(`Error api ${JSON.stringify(content)}`);
        res.json(content);
        return;
      }

      debugError(`Error in request ${errP.message}`);
      res.locals.message = errP.message;
      res.locals.error = !isProduction ? errP : {};
      res.render('error');
      next();
    });
  },
};
