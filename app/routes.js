'use strict';
const {CsrfToken} = require('./middlewares/express');
const landingController = require('./controllers/landingController');
const landingApiController = require('./controllers/landingApiController');

module.exports = function (app) {
    const csrf = CsrfToken(app);
    app.route('/').get(csrf, landingController.index);
    app.route('/leads').post(csrf, landingApiController.leads_post);
};
