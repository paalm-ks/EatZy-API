var connect = require('./mysql.config');
var con = require('./mysql');

const services = {

    addOrder: (add,i) => {
        console.log(i);
        console.log(add.menuNameEN);
        console.log(add.menuPrice)
        con.query('insert into eatzy.order (menuName,quantity,amount) values ("' + `${add.menuNameEN}` + '",' + `${1}` + ',' + `${add.menuPrice}` + ')');
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

exports.addOrder = (add,i) => {
    try {
        services.addOrder(add,i);
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

