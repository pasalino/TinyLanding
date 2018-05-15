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

  let landing = null;
  try {
    landing = await db.LandingPage.findOne({ where: { hash: data.landing } });
    debugInfo(`Landing page id ${landing.id}`);
  } catch (e) {
    debugError(e);
    return next(new Error('Landing does not exists'));
  }

  try {
    delete data.landing;
    data.LandingPageId = landing.id;
    await db.Lead.create(data);
  } catch (e) {
    debugError(e);
    return next(new Error('Error in create lead'));
  }

  sendMailFromTemplate(data.email, `Lead from ${landing.name} landing`, landing.slug, data).catch(e => debugError(e));


  const response = { status: 200, success: 'Lead created correctly' };
  res.status(response.status);
  return res.json(response);
};

module.exports = {
  leadsPost,
};
