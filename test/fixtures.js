/* eslint-env mocha */

const { execSync } = require('child_process');
const { test } = require('../app/config/database.json');
const fs = require('fs');
const path = require('path');
const db = require('../app/db/models');


before((done) => {
  const pathDb = path.resolve(test.storage);
  if (fs.existsSync(pathDb)) {
    fs.unlinkSync(pathDb);
  }
  process.env.NODE_ENV = 'test';
  execSync('NODE_ENV=test ./node_modules/.bin/sequelize db:migrate');

  db.Product.create({
    name: 'TinyLanding',
    slug: 'tiny-landing',
    hash: '4870de00-3512-11e8-a612-5b7cd30edbfc',
  });
  done();
});

after((done) => {
  const pathDb = path.resolve(test.storage);
  if (fs.existsSync(pathDb)) {
    fs.unlinkSync(pathDb);
  }
  done();
});
