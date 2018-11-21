var knex = require('./knex');
var bill = require('./bill');

const services = {
        getMyOrder: (billNo) => {
                return knex.select('CustomerOrder.orderNo',
                        'Menu.menuNo', 'Menu.menuPrice', 'Menu.menuPicPath', 'Menu.menuNameTH',
                        'CustomerOrder.quantity', 'CustomerOrder.amount', 'CustomerOrder.orderStatus')
                        .from('Bill')
                        .join('CustomerOrder', 'Bill.billNo', 'CustomerOrder.billNo')
                        .join('Menu', 'Menu.menuNo', 'CustomerOrder.menuNo')
                        .where('Bill.billNo', billNo)
        },
        getMyOrderTable: (tableNo) => {
                return knex.select('CustomerOrder.orderNo', 'CustomerTable.tableName',
                        'Menu.menuNo', 'Menu.menuPrice', 'Menu.menuPicPath',
                        'Menu.menuNameTH', 'CustomerOrder.quantity', 'CustomerOrder.amount',
                        'CustomerOrder.orderStatus')
                        .from('Bill')
                        .join('CustomerOrder', 'Bill.billNo', 'CustomerOrder.billNo')
                        .join('Menu', 'Menu.menuNo', 'CustomerOrder.menuNo')
                        .join('CustomerTable', 'CustomerTable.tableNo', 'Bill.tableNo')
                        .where('Bill.tableNo', tableNo)
        },
        getMyAddon: (orderNo) => {
                return knex.select('Material.matName', 'Addon.price').from('Addon')
                        .join('Order_Addon', 'Addon.addOnNo', 'Order_Addon.addOnNo')
                        .join('Material', 'Addon.matNo', 'Material.matNo')
                        .where('Order_Addon.orderNo', orderNo)
        }
}

exports.showMyOrder = async (billNo) => {
        try {
                const billDetail = await bill.getBillByNo(billNo);
                const CustomerOrder = await services.getMyOrder(billNo);
                const addonss = [];
                for (i in CustomerOrder) {
                        console.log(CustomerOrder[i].orderNo);
                        const addon = await services.getMyAddon(CustomerOrder[i].orderNo);
                        console.log(addon)
                        addonss.push(addon);
                }
                console.log(addonss)
                return [{
                        bill: billDetail,
                        orders: CustomerOrder,
                        addons: addonss
                }]
        } catch (err) {
                console.log(err)
        }
}

exports.showUserOrder = async (userNo, role) => {
        try {
                const billNoArr = await bill.showBill(userNo, role);
                if (billNoArr.length === 0) {
                        return []
                } else {
                        const billNo = billNoArr[0].billNo;
                        const billDetail = await bill.getBillByNo(billNo);
                        const CustomerOrder = await services.getMyOrder(billNo);
                        for (i in CustomerOrder) {
                                console.log(CustomerOrder[i].orderNo);
                                const addon = await services.getMyAddon(CustomerOrder[i].orderNo);
                                console.log(addon)
                                CustomerOrder[i].addon = addon
                        }
                        return CustomerOrder
                }
        } catch (err) {
                console.log(err)
        }
}

exports.showTableOrder = async (tableNo) => {
        try {
                const billNoArr = await bill.getBillByTableNo(tableNo);
                console.log(billNoArr)
                if (billNoArr.length === 0) {
                        return []
                } else {
                        const billNo = billNoArr[0].billNo;
                        const billDetail = await bill.getBillByNo(billNo);
                        const CustomerOrder = await services.getMyOrderTable(tableNo);
                        for (i in CustomerOrder) {
                                console.log(CustomerOrder[i].orderNo);
                                const addon = await services.getMyAddon(CustomerOrder[i].orderNo);
                                console.log(addon)
                                CustomerOrder[i].addon = addon
                        }
                        return CustomerOrder
                }
        } catch (err) {
                console.log(err)
        }
}