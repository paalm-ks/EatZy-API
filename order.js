var connect = require('./mysql.config');

const services = {

    addOrder: (add) => {
        return connect.insert({ menuName: add[0], quantity: add[1], amount: add[2] }).into('order')

    }
    ,
    getOrder: (no) => {
        return connect.select('*')
            .from('order')
            // .join('menu_order', { 'menu_order.orderNo': 'order.orderNo' })
            // .join('menu', { 'menu.menuNo': 'menu_order.menuNo' })
            .where('order.orderNo', 'like', `%${no}%`)
    }
}

exports.addOrder = (add) => {
    try {
        var arr = add.toString().split(",").map(function (val) { return val; });
        return services.addOrder(arr);
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

