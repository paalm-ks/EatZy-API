var knex = require('./knex');

const services = {

    addOrder: (add, i) => {
        console.log(i);
        console.log(add.name + " : " + add.quan + " : " + add.amount + " : " + add.bill);
        const a = { menuName: add.name, quantity: add.quan, amount: add.amount, billNo: add.bill };
        console.log(a);
        knex.insert(a).into('OEB.Order').then(function (id) {
            console.log(id)
        });
    },
    getOrder: (no) => {
        return knex.select('*')
            .from('Order')
            // .join('menu_order', { 'menu_order.orderNo': 'order.orderNo' })
            // .join('menu', { 'menu.menuNo': 'menu_order.menuNo' })
            .where('Order.orderNo', 'like', `%${no}%`)
    }
}

exports.addOrder = (add, i) => {
    try {
        services.addOrder(add, i);
    } catch (err) {
        console.log(err)
    }
}

exports.showOrder = async (no) => {
    try {
        const response = await services.getOrder(no);
        return response;
    } catch (err) {
        console.log(err)
    }
}

