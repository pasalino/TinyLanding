const nodeMailer = require('nodemailer');
const mustache = require('mustache');
const fs = require('mz/fs');

const { debugError, debugInfo } = require('../middlewares/logs');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/email.json')[env];

const transporter = nodeMailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.auth.user,
    pass: config.auth.pass,
  },
});


const sendMail = async (to, subject, text, html) => {
  const mailOptions = {
    from: `"${config.from_name}" <${config.from_mail}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    debugInfo('Message %s sent: %s', info.messageId, info.response);
  } catch (err) {
    debugError(err);
    throw err;
  }
};


const sendMailFromTemplate = async (to, subject, template, context) => {
  try {
    const content = await fs.readFile(`${__dirname}/templates/${template}.mustache`);
    const html = mustache.to_html(content.toString(), context);
    await sendMail(to, subject, null, html);
  } catch (err) {
    debugError(err);
    throw err;
  }
};

module.exports = {
  sendMail,
  sendMailFromTemplate,
};
