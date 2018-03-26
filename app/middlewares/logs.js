'use strict';
const fs = require('fs');
const morgan = require('morgan');
const path = require("path");

module.exports = app => {
    if (app.get('env') === 'production') {
        app.use(morgan('common', {
            skip: function (req, res, next) {
                return res.statusCode < 400
            },
            stream: fs.createWriteStream(path.join(__dirname, '/../data/logs/app.log'), {flags: 'a'})
        }));
    } else {
        app.use(morgan('dev'));
    }
};


