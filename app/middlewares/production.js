
const Minifier = require('html-minifier');
const helmet = require('helmet');
const compression = require('compression');
const minify = require('express-minify');
const path = require('path');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.oldRender = res.render;
    res.render = (view, options) => {
      this.oldRender(view, options, (err, html) => {
        if (err) throw err;
        const newHtml = Minifier.minify(html, {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
        });
        res.send(newHtml);
      });
    };
    next();
  });
  app.use(helmet());
  app.use(compression());
  app.use(minify({
    cache: path.join(__dirname, '/../data/cache'),
    js_match: /javascript/,
    css_match: /css/,
    sass_match: /scss/,
    less_match: /less/,
    stylus_match: /stylus/,
    coffee_match: /coffeescript/,
    blacklist: [/\.min\.(css|js)$/],
    whitelist: null,
  }));
};
