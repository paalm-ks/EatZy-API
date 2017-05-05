var connect = require('./mysql.config');

const services = {

    addOrder: (add) => {
        return connect.insert({ menuName: add[0], quantity: add[1], amount: add[2]}).into('order')
            
    },
    addOrder2: (add) => {
        add.foreach(function(){
            for(i=0 , , i++)
            return connect.insert({ menuName: add[0], quantity: add[1], amount: add[2]}).into('order')
        })      
    },
    getOrder: (no) => {
        return connect.select('*')
            .from('order')
            // .join('menu_order', { 'menu_order.orderNo': 'order.orderNo' })
            // .join('menu', { 'menu.menuNo': 'menu_order.menuNo' })
            .where('order.orderNo', 'like', `%${no}%`)
    }
}

exports.addOrder = async (add) => {
    try {
       return services.addOrder(add);
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

