const { CsrfToken } = require('./middlewares/express');
const landingController = require('./controllers/landingController');
const landingApiController = require('./controllers/landingApiController');

module.exports = (app) => {
  const csrf = CsrfToken(app);
  app.route('/').get(csrf, landingController.index);
  app.route('/leads').post(csrf, landingApiController.leadsPost);
};
