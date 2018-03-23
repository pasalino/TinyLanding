'use strict';
const nodeMailer = require('nodemailer');
const pug = require('pug');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/email.json')[env];

let transporter = nodeMailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
        user: config.auth.user,
        pass: config.auth.pass
    }
});


const sendMail = async (to, subject, text, html) => {
    let mailOptions = {
        from: `"${config.from_name}" <${config.from_mail}>`,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    const is_debug = env === 'development';
    try {
        const info = await transporter.sendMail(mailOptions)
        if (is_debug) console.log('Message %s sent: %s', info.messageId, info.response);
    } catch (err) {
        if (is_debug) console.error(err);
        throw err;
    }
};


const sendMailFromTemplate = async (to, subject, template, context) => {
    const is_debug = env === 'development';
    try {
        const html = pug.renderFile(`${__dirname}/templates/${template}.pug`, context);
        await sendMail(to, subject, null, html);
    } catch (err) {
        if (is_debug) console.error(err);
        throw err;
    }
};

module.exports = {
    sendMail,
    sendMailFromTemplate
};
