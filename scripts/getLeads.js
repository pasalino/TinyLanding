if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

const db = require('../app/db/models/index');
const debug_info = require('../app/middlewares/logs').debug_info;

module.exports = async (args) => {
    debug_info(`Leads`);
    debug_info(`Args list: ${args}`);

    let slug = args[0];
    if (!slug) slug = 'tiny-landing';
    debug_info(`Product name: ${slug}`);

    const product = (await db.Product.findOne({
        where: {slug}
    }));

    const product_id = product.id;

    const leads = await db.Lead.findAll({
        where: {
            ProductId: product_id
        },
        order: [
            ['createdAt', 'DESC']
        ],
    });

    return leads.map(item => ({
        'Created At': item.createdAt.toLocaleString('it-IT', {hour12: false}),
        'Name': item.name,
        'Surname': item.surname,
        'Company': item.company,
        'Email': item.email,
        'Phone': item.phone,
        'Message': (item.message || '').substr(0, 20)
    }));
};


