var knex = require('./knex');
var bill = require('./bill');
var reserve = require('./reserve');

const services = {

    addOrder: async (all, billNo, tableNo) => {
        console.log("in addOrder")
        console.log(all[0])
        console.log(all[0].Menu)
        console.log("billNo : " + billNo)
        console.log("tableNo : " + tableNo)
        let status = "waiting"
        // if (tableNo === null) {
        //     let statusNew = "reserve"
        //     statusNew.replace(status)
        //     console.log(status)
        //     return status
        // }
        console.log(status)
        for (i in all[0].Menu) {
            let date = new Date();
            let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            let time = `${date.toTimeString().substring(0, 8)}`;
            const a = {
                menuNo: all[0].Menu[i].menuNo,
                quantity: all[0].Menu[i].quantity,
                amount: all[0].Menu[i].menuPrice,
                billNo: billNo, orderStatus: status,
                orderDate: current, orderTime: time
            };
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
            console.log("end addOrder")
        }
    },
    getOrder: (no) => {
        return knex.select('CustomerOrder.orderNo')
            .from('CustomerOrder')
            .join('Bill', { 'CustomerOrder.billNo': 'Bill.billNo' })
            .where('Bill.billNo', no);
    },

    updateOrderStatus: (orderNo, value) => {
        const status = value;
        console.log("orderNo : " + orderNo)
        console.log("status : " + status)
        return knex('CustomerOrder')
            .where('CustomerOrder.orderNo', orderNo)
            .update('orderStatus', status);
    },

    getAllOrder: (branchNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex.select('CustomerTable.branchNo', 'CustomerTable.tableName', 'Bill.billNo',
            'CustomerOrder.orderNo',
            'Menu.menuNo', 'Menu.menuNameTH', 'CustomerOrder.quantity', 'CustomerOrder.orderStatus', 'CustomerOrder.amount')
            .from('CustomerOrder')
            .join('Bill', { 'CustomerOrder.billNo': 'Bill.billNo' })
            .join('CustomerTable', { 'Bill.tableNo': 'CustomerTable.tableNo' })
            .join('Branch', { 'CustomerTable.branchNo': 'Branch.branchNo' })
            .join('Menu', 'Menu.menuNo', 'CustomerOrder.menuNo')
            .where('Bill.billStatus', 'unpaid')
            .andWhere('Bill.billDate', current)
            .andWhere('CustomerOrder.orderStatus', 'ready')
            .orWhere('CustomerOrder.orderStatus', 'served')
            .andWhere('CustomerTable.branchNo', branchNo)
            .orderBy('CustomerOrder.orderStatus')

    },
    getAllOrderAddon: (orderNo) => {
        return knex.select('Material.matName', 'Addon.price').from('Addon')
            .join('Order_Addon', 'Addon.addOnNo', 'Order_Addon.addOnNo')
            .join('Material', 'Addon.matNo', 'Material.matNo')
            .where('Order_Addon.orderNo', orderNo)
    }

}

exports.addOrder = async (userNo, orders, total, table, role) => {
    try {
        console.log("User : " + userNo);
        console.log("CustomerOrder : " + orders);
        console.log("Total : " + total)
        console.log('tableNo : ' + table)

        let tableNo = Number;
        if (table === null) {
            tableNo = 0;
        } else {
            tableNo = JSON.parse(table);
        }
        console.log(tableNo)
        console.log("role : " + role)
        var all = JSON.parse(orders);
        var Urole = JSON.parse(role)
        let getBill = []
        if (tableNo !== 0) {
            console.log("get bill tableNo ")
            getBill = await bill.getBillByTableNo(tableNo);
        } else {
            // Select userNo in bill 
            console.log("show bill ")
            getBill = await bill.showBill(userNo, Urole);
        }
        console.log("getBill")
        console.log(getBill[0])
        let newBill = []
        if (!getBill[0]) {
            // Create Bill
            console.log("Create Bill")
            const date = new Date()
            const current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            const time = `${date.toTimeString().substring(0, 8)}`;


            if (tableNo !== 0) {
                bill.addBill(current, time, userNo, tableNo, Urole);
                newBill = await bill.getBillByTableNo(tableNo);
                bill.updateTotalAmount(newBill[0].billNo, total);
                console.log("after updateTotal")
            } else {
                // Select userNo in bill
                bill.addBill(current, time, userNo, { tableNo: null }, Urole);
                newBill = await bill.showBill(userNo, Urole);
                bill.updateTotalAmount(newBill[0].billNo, total);
                console.log("after updateTotal")
            }
        }

        if (newBill[0]) {
            console.log("New Bill No : " + newBill[0].billNo);
            bill.updateTotalAmount(newBill[0].billNo, total);
            console.log("update : " + total + " To Bill " + newBill[0].billNo);
            services.addOrder(all, newBill[0].billNo, tableNo);
            if (!tableNo) {
                console.log("no table : " + tableNo)
                const ab = await services.getOrder(newBill[0].billNo);
                for (i in ab) {
                    await services.updateOrderStatus(ab[i].orderNo, "reserve");
                }
            }
            console.log("addOrder in newBill pass")
        }

        if (getBill[0]) {
            console.log("Bill No : " + getBill[0].billNo);
            bill.updateTotalAmount(getBill[0].billNo, total);
            console.log("update : " + total + " To Bill " + getBill[0].billNo);
            services.addOrder(all, getBill[0].billNo, tableNo);
            if (!tableNo) {
                console.log("no table : " + tableNo)
                const ab = await services.getOrder(getBill[0].billNo);
                for (i in ab) {
                    await services.updateOrderStatus(ab[i].orderNo, "reserve");
                }
            }
            console.log("addOrder pass")
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

exports.updateOrderStatus = async (orderNo, value, billNo, amount) => {
    try {
        console.log('orderNo', orderNo)
        console.log('value', value)
        console.log('decrease', billNo + ' ' + amount)
        const response = await services.updateOrderStatus(orderNo, value);
        if (value === 'cancelled') {
            const decrease = await bill.decreaseTotalAmount(billNo, amount)
        }

    } catch (err) {
        console.log(err)
    }
}

exports.showAllOrder = async (branchNo) => {
    try {
        const response = await services.getAllOrder(branchNo);
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