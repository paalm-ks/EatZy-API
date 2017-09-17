var knex = require('./knex');
var bill = require('./bill');
var reserve = require('./reserve');

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

exports.addOrder = async (no,orders) => {
    try {
        console.log("User : "+no);
        var all = JSON.parse(orders);
        console.log(all);
        console.log(all.orders[0])

        // for(var i = 0 ;  i <= Object.keys(req.body).length-2 ; i++){
        //     console.log("lap : "+i)
        //     console.log("loop : "+req.body.order`${i}}`);
        // }

        // // Get reserveNo
        // const code = await reserve.showReserveByUser(no)
        // console.log(code);
        // JSON.stringify(code)
        // console.log("reserveNo : "+code[0].reserveNo);  
        // // Create Bill
        // const reserveNo =  code[0].reserveNo ;
        // const date = new Date()
        // const current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        // const time = `${date.toTimeString().substring(0,8)}`;
        // console.log("date : "+current);
        // console.log("time : "+time);
        // const response = bill.addBill(current,time,reserveNo);
        // // services.addOrder(add, i);
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

