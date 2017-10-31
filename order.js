var knex = require('./knex');
var bill = require('./bill');
var reserve = require('./reserve');

const services = {

    addOrder: async (all, billNo) => {
        const billa = await bill.getBillByNo(billNo);
        const status = "waiting"
        if(billa[0].tableNo == null){
            const statusNew = "reserve"
            statusNew.replace(status)
            return status
        }
        console.log(status)
        for (i in all[0].Menu) {
            const a = { menuNo: all[0].Menu[i].menuNo, quantity: all[0].Menu[i].quantity, amount: all[0].Menu[i].menuPrice, billNo: billNo ,orderStatus : status };
            console.log("a")
            console.log(a);
            const id = await knex.insert(a).into('CustomerOrder').then(function (orderNo) {
                return orderNo;
            });
            console.log("i : " + i)
            console.log("id : " + id[0])
            if (all[0].AddOn[i].length != 0) {
                for (x in all[0].AddOn[i]) {
                    console.log(all[0].AddOn[i][x].AddOnNo)
                    const b = { orderNo: id[0], addOnNo: all[0].AddOn[i][x].AddOnNo };
                    console.log("b")
                    console.log(b);
                    const addonadd = await knex.insert(b).into('Order_Addon');
                }
            }
        }
    },
    getOrder: (no) => {
        return knex.select('CustomerOrder.orderNo')
            .from('CustomerOrder')
            .join('Bill', { 'CustomerOrder.billNo': 'Bill.billNo' })
            .where('Bill.userNo', no);
    },

    updateOrderStatus: (orderNo, value) => {
        knex('CustomerOrder')
            .where('CustomerOrder.orderNo', orderNo)
            .update('orderStatus', value);
    },

    getAllOrder: () => {
        return knex.select('CustomerTable.branchNo', 'Bill.tableNo',
            'CustomerOrder.orderNo',
            'Menu.menuNo', 'Menu.menuNameTH', 'CustomerOrder.quantity', 'CustomerOrder.orderStatus')
            .from('CustomerOrder')
            .join('Bill', { 'CustomerOrder.billNo': 'Bill.billNo' })
            .join('CustomerTable', { 'Bill.tableNo': 'CustomerTable.tableNo' })
            .join('Branch', { 'CustomerTable.branchNo': 'Branch.branchNo' })
            .join('Menu', 'Menu.menuNo', 'CustomerOrder.menuNo')
        // .whereNotNull('Bill.tableNo')
        // .andWhere()
    },
    getAllOrderAddon: (orderNo) => {
        return knex.select('Material.matName', 'Addon.price').from('Addon')
            .join('Order_Addon', 'Addon.addOnNo', 'Order_Addon.addOnNo')
            .join('Material', 'Addon.matNo', 'Material.matNo')
            .where('Order_Addon.orderNo', orderNo)
    }

}

exports.addOrder = async (userNo, orders, total) => {
    try {
        console.log("User : " + userNo);
        console.log("CustomerOrder : " + orders);
        console.log("Total : " + total)
        var all = JSON.parse(orders);
        // Select userNo in bill 
        const getBill = await bill.showBill(userNo);
        console.log(getBill[0]);
        // got null create
        if (getBill[0] == null) {
            // Create Bill
            console.log("Create Bill")
            const date = new Date()
            const current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            const time = `${date.toTimeString().substring(0, 8)}`;
            bill.addBill(current, time, userNo);
            const newBill = await bill.showBill(userNo);
            console.log("newBill : " + newBill[0].billNo);
            //add userNo to new BillNo
            bill.addUserNoToBill(userNo, newBill[0].billNo);
            bill.updateTotalAmount(newBill[0].billNo, total)
            services.addOrder(all, newBill[0].billNo);
        } else if (getBill[0] != null) {
            console.log("Bill Exist")
            const oldBill = await bill.showBill(userNo);
            console.log("Bill No : " + oldBill[0].billNo);
            bill.updateTotalAmount(oldBill[0].billNo, total);
            console.log("update : " + total + " To Bill " + oldBill[0].billNo);
            services.addOrder(all, oldBill[0].billNo);
        }
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

exports.updateOrderStatus = async (orderNo, value) => {
    try {
        console.log('value', value)
        const response = await services.updateOrderStatus(orderNo, value);

    } catch (err) {
        console.log(err)
    }
}

exports.showAllOrder = async () => {
    try {
        const response = await services.getAllOrder();
        for (i in response) {
            console.log(response[i].orderNo);
            const addon = await services.getAllOrderAddon(response[i].orderNo);
            console.log(addon)
            response[i].addon = addon
        }
        return response;
    } catch (err) {
        console.log(err)
    }
}