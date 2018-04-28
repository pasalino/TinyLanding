
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const debug_info = require('debug')('TinyLanding:info');
const debug_error = require('debug')('TinyLanding:error');

module.exports = {
  Logger: app => {
    if (app.get('env') === 'production') {
      app.use(morgan('common', {
        skip: function(req, res, next) {
          return res.statusCode < 400;
        },
        stream: fs.createWriteStream(path.join(__dirname, '/../data/logs/app.log'), {flags: 'a'}),
      }));
    } else {
      app.use(morgan('dev'));
    }
  },

  debug_info: (message) => {
    debug_info(message);
  },

  debug_error: (message) => {
    debug_error(message);
  },
};


