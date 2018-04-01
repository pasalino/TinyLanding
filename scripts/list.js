if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

require('console.table');
const db = require('../app/db/models/index');
const debug_info = require('../app/middlewares/logs').debug_info;

module.exports = async (args) => {
    debug_info(`Product List`);
    debug_info(`Args list: ${args}`);


    const products = await db.Product.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        attributes: {
            include: [[db.Sequelize.fn('COUNT', db.Sequelize.col('leads.id')), 'leads_count']]
        },
        include: [{
            model: db.Lead, attributes: []
        }],
        group: ['product.id']
    });


    const product_list = products.map(item => ({
        'Name': item.name,
        'Slug': item.slug,
        'Hash': item.hash,
        'Leads': item.dataValues.leads_count
    }));

    console.table(product_list);
};


