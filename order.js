var knex = require('./knex');
var bill = require('./bill');
var reserve = require('./reserve');

const services = {

    addOrder:  async (all, billNo) => {
        for (i in all[0].Menu) {
            const a = { menuNo: all[0].Menu[i].menuNo, quantity: all[0].Menu[i].quantity, amount: all[0].Menu[i].menuPrice, billNo: billNo }; 
            console.log(a);
            const id = await knex.insert(a).into('Order').then(function (orderNo) {
                return orderNo;
            });
            for (x in all[0].Addon[i].addOnNo) { 
                console.log("add on : "+all[0].Addon[i].addOnNo[x])
                const b = { orderNo : id[0] , addOnNo :all[0].Addon[i].addOnNo[x]};
                console.log(b);
                const addonadd = await knex.insert(b).into('Order_Addon');
            }
        }
    },
    getOrder: (no) => {
        return knex.select('*')
            .from('Order')
            .where('Order.orderNo', no);
    }

}

exports.addOrder = async (userNo, order,total) => {
    try {
        console.log("User : " + userNo);
        console.log("Order : "+order);
        console.log("Total : "+total)
        var all = JSON.parse(order);

        // Select userNo in bill 
        const getBill = await bill.showBill(userNo);
        console.log(getBill[0]);
        // got null create
        if (getBill[0]  == null) {
            // Create Bill
            console.log("Create Bill")
            const date = new Date()
            const current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            const time = `${date.toTimeString().substring(0, 8)}`;
            bill.addBill(current, time, userNo);
            const newBill = await bill.showBill(userNo);
            console.log("newBill : " + newBill[0].billNo);
            //add userNo to new BillNo
            bill.addUserNoToBill(userNo,newBill[0].billNo);
            bill.updateTotalAmount(newBill[0].billNo,total)
            // services.addOrder(all, newBill[0].billNo);
        }else if (getBill[0] != null) {
            console.log("Already has Bill")
            // Check Bill Exist
            const oldBill = await bill.showBill(userNo);
            console.log("Bill No : "+oldBill[0].billNo);
            bill.updateTotalAmount(userNo,oldBill[0].billNo);
            console.log("update");
            // services.addOrder(all, oldBill[0].billNo);
        } 
        

        // [{ "Menu": [{ "menuNo": 70, "menuPrice": 165, "quantity": 2 },{ "menuNo": 71, "menuPrice": 49, "quantity": 3 }],"Addon":[{"addOnNo":53,"addOnNO":54},{"addOnNo":55}] }]

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

