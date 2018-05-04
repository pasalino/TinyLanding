const { CsrfToken } = require('./middlewares/express');
const landingController = require('./controllers/landingController');
const landingApiController = require('./controllers/landingApiController');

module.exports = (app) => {
  const csrf = CsrfToken(app);
  app.route('/').get(csrf, landingController.index);
  app.route('/:slug').get(csrf, landingController.index);
  app.route('/api/v1/leads').post(csrf, landingApiController.leadsPost);
};
