const express = require('express');
const path = require('path');

module.exports = (app) => {
  app.use('/jquery', express.static(path.join(app.get('appPath'), '/../node_modules/jquery/dist/')));
  app.use(express.static(path.join(app.get('appPath'), app.get('publicFolder'))));
};
