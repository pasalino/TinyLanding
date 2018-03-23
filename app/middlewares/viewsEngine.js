'use strict';
const path = require("path");

module.exports = (app) => {
    const debug = app.get('env') === 'development';
    const pugConfig = debug ? {debug: true} : {debug: false};
    const pugCached = !debug;
    const prettyOutput = debug;

    app.set('view engine', 'pug');
    app.set('views', path.join(app.get('appPath'), './views'));
    app.set('view options', pugConfig);
    app.set('view cache', pugCached);
    app.locals.pretty = prettyOutput;
};

