/* eslint-env mocha */
process.env.NODE_ENV = 'test';

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

  const product = db.Product.create({
    name: 'TinyLanding',
    slug: 'tiny-landing',
    hash: '4870de00-3512-11e8-a612-5b7cd30edbfc',
  });
  db.Lead.create({
    product_id: product.id,
    name: 'Pinco',
    surname: 'Pallino',
    email: 'pasalino@gmail.com',
    phone: '33333',
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    company: 'BeeInnovative',
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
