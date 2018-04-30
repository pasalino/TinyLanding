const fs = require('fs');

if (!fs.existsSync('./app/config/email.json')) {
  fs.copyFileSync('./app/config/email_dist.json', './app/config/email.json');
  console.log('File email config copied');
}
