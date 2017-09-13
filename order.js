var knex = require('./knex');

const services = {

    addOrder: (add, i) => {
        console.log(i);
        console.log(add.name + " : " + add.quan + " : " + add.amount + " : " + add.bill);
        const a = { menuName: add.name, quantity: add.quan, amount: add.amount, billNo: add.bill};
        console.log(a);
        knex.insert(a).into('Order').then(function (id) {
            console.log(id)
        });
        // order_addon
    },
    getOrder: (no) => {
        return knex.select('*')
            .from('Order')
            .where('Order.orderNo', no);
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

