var connect = require('./mysql.config');
var con = require('./mysql');

const services = {

    addOrder: (add) => {
        console.log(add[0])
        console.log(add[0].menuNameEN)
        con.query('insert into eatzy.order (menuName,quantity,amount) values ("' + `${add[0].menuNameEN}` + '",' + `${1}` + ',' + `${add[0].menuPrice}` + ')');
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
        
        services.addOrder(add);
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

