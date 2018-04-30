const db = require('../db/models');
const validator = require('email-validator');
const { sendMailFromTemplate } = require('../emails');
const { debugError, debugInfo } = require('../middlewares/logs');

const leadsPost = async (req, res, next) => {
  const data = req.body;
  debugInfo(data);

  if (!data.name || !data.name.trim()) {
    return next(new Error('Name is required'));
  }

  if (!data.email || !data.email.trim()) {
    return next(new Error('Email is required'));
  }

  if (!validator.validate(data.email)) {
    return next(new Error('Email is invalid'));
  }

  let product = null;
  try {
    product = await db.Product.findOne({ where: { hash: data.product } });
    debugInfo(`Product id ${product.id}`);
  } catch (e) {
    debugError(e);
    return next(new Error('Product is not exists'));
  }

  try {
    delete data.product;
    data.ProductId = product.id;
    await db.Lead.create(data);
  } catch (e) {
    debugError(e);
    return next(new Error('error in create lead'));
  }

  sendMailFromTemplate(data.email, `Lead from ${product.name} landing`, 'lead', data).catch(e => debugError(e));


  const response = { status: 200, success: 'Lead created correctly' };
  res.status(response.status);
  return res.json(response);
};

module.exports = {
  leadsPost,
};
