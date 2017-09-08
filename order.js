var knex = require('./knex');

const services = {

    addOrder: (add, i) => {
        // insert Customize

        // const b = { addOn : add.addOn, size : add.size}
        // knex.insert(b).into('Customize').then(function (id) {
        //     console.log(id)
        // });
        //    knex.select('*').from('Customize')
        //    .where('Customize.addOn',add.addOn)
        //    .andWhere('Customize.size',add.size);

        console.log(i);
        console.log(add.name + " : " + add.quan + " : " + add.amount + " : " + add.bill);
        const a = { menuName: add.name, quantity: add.quan, amount: add.amount, billNo: add.bill};
        console.log(a);
        knex.insert(a).into('Order').then(function (id) {
            console.log(id)
        });
        
    },
    getOrder: (no) => {
        return knex.select('*')
            .from('Order')
            .where('Order.orderNo', 'like', `%${no}%`);
    }

    // getOrder: async (no) => {
    //     let amount = await knex.select('*')
    //         .from('Order')
    //         // .join('menu_order', { 'menu_order.orderNo': 'order.orderNo' })
    //         // .join('menu', { 'menu.menuNo': 'menu_order.menuNo' })
    //         .where('Order.orderNo', 'like', `%${no}%`)
    //         .then(function (a) {
    //             console.log(a[0].amount);
    //             g[a[0].amount];
    //             // return 
    //             return a[0].amount
    //         });
    //         let orders = await knex.select('*')
    //             .from('Order')
    //             .where('Order.amount', amount);
    //     return orders
    // }    // how to get data out of promise example
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

