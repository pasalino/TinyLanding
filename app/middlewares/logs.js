const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const debugInfo = require('debug')('TinyLanding:info');
const debugError = require('debug')('TinyLanding:error');

module.exports = {
  Logger: (app) => {
    if (app.get('env') === 'production') {
      app.use(morgan('common', {
        skip: (req, res) => res.statusCode < 400,
        stream: fs.createWriteStream(path.join(__dirname, '/../data/logs/app.log'), { flags: 'a' }),
      }));
    } else {
      app.use(morgan('dev'));
    }
  },

  debugInfo: (message) => {
    debugInfo(message);
  },

  debugError: (message) => {
    debugError(message);
  },
};
