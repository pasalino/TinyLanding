const path = require('path');
const mustacheExpress = require('mustache-express');

module.exports = (app) => {
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', path.join(app.get('appPath'), './views'));
};

