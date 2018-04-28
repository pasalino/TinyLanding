

const index = async(req, res, next) => {
  try {
    const context = {csrfToken: req.csrfToken(), product_hash: '4870de00-3512-11e8-a612-5b7cd30edbfc'};
    res.render('index', context);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
};
