'use strict';
const fs = require('fs');
const morgan = require('morgan');

module.exports = app => {
    if (app.get('env') === 'production') {
        app.use(morgan('common', {
            skip: function (req, res, next) {
                return res.statusCode < 400
            },
            stream: fs.createWriteStream('./logs/app.log', {flags: 'a'})
        }));
    } else {
        app.use(morgan('dev'));
    }
};


