const express = require('express');
const { Logger } = require('./middlewares/logs');
const ProductionMiddleware = require('./middlewares/production');
const { HeaderMiddleware, FooterMiddleware } = require('./middlewares/express');
const Static = require('./middlewares/staticAsset');
const ViewsEngine = require('./middlewares/viewsEngine');
const Routes = require('./routes');

const app = express();

app.set('appPath', __dirname);
app.set('publicFolder', 'public');
app.set('env', process.env.NODE_ENV || 'development');

ViewsEngine(app);
Logger(app);
HeaderMiddleware(app);
if (process.env.NODE_ENV === 'production') {
  ProductionMiddleware(app);
}
Static(app);
Routes(app);
FooterMiddleware(app);

module.exports = app;
