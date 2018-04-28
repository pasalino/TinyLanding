

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

module.exports = app => {
  app.use('/jquery', express.static(path.join(app.get('appPath'), '/../node_modules/jquery/dist/')));
  app.use(favicon(path.join(app.get('appPath'), app.get('publicFolder'), '/img/favicon.png')));
  app.use(express.static(path.join(app.get('appPath'), app.get('publicFolder'))));
};
