const fs = require('fs');
const db = require('../app/db/models');
const { landingAdd } = require('./landing');

if (!fs.existsSync('./app/config/email.json')) {
  fs.copyFileSync('./app/config/email_dist.json', './app/config/email.json');
  console.log('File email config copied');
}
const name = 'Tiny Landing';
const slug = 'tiny-landing';

db.LandingPage.findOne({ where: { slug } }).then((data) => {
  if (!data) {
    landingAdd({ name, slug });
  }
});
