
const nodeMailer = require('nodemailer');
const mustache = require('mustache');
const fs = require('mz/fs');

const debug_error = require('../middlewares/logs').debug_error;
const debug_info = require('../middlewares/logs').debug_info;

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/email.json')[env];

let transporter = nodeMailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.auth.user,
    pass: config.auth.pass,
  },
});


const sendMail = async(to, subject, text, html) => {
  let mailOptions = {
    from: `"${config.from_name}" <${config.from_mail}>`,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    debug_info('Message %s sent: %s', info.messageId, info.response);
  } catch (err) {
    debug_error(err);
    throw err;
  }
};


const sendMailFromTemplate = async(to, subject, template, context) => {
  try {
    const content = await fs.readFile(`${__dirname}/templates/${template}.mustache`);
    const html = mustache.to_html(content.toString(), context);
    await sendMail(to, subject, null, html);
  } catch (err) {
    debug_error(err);
    throw err;
  }
};

module.exports = {
  sendMail,
  sendMailFromTemplate,
};
