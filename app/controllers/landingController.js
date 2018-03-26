'use strict';
const {sendMailFromTemplate} = require("../emails");
const db = require("../db/models");

const index = async (req, res, next) => {
    try {
        const context = {csrfToken: req.csrfToken()};
        // db.Product.create({name: 'foo'}).then(task => {
        //     console.log("created");
        //
        // }).catch(err => {
        //     next(err);
        // });
        res.render("index", context);
    } catch (err) {
        next(err);
    }
};

const em = async (req, res, next) => {
    try {
        await sendMailFromTemplate("pasalino@gmail.com", "test", "lead", {name: "Pasqualino", subject: "Soggetto"});
        res.render("index");
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    sendMail: em
};
