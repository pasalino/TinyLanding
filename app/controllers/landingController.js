const db = require('../db/models');

const index = async (req, res, next) => {
  try {
    let { slug } = req.params;
    if (!slug) {
      slug = 'tiny-landing';
    }
    const landing = await db.LandingPage.findOne({ where: { slug } });
    if (!landing) {
      const error = new Error('Landing not found');
      error.status = 404;
      next(error);
      return;
    }
    const context = {
      csrfToken: req.csrfToken(),
      landingHash: landing.hash,
      landingSlug: landing.slug,
    };
    res.render(`${slug}/index`, context);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  index,
};
