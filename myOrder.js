var knex = require('./knex');
var bill = require('./bill');

const services = {
        getMyOrder: (billNo) => {
                return knex.select('Order.orderNo', 'Menu.menuNo', 'Menu.menuPrice', 'Menu.menuPicPath', 'Menu.menuNameTH', 'Order.quantity', 'Order.amount').from('Bill')
                        .join('Order', 'Bill.billNo', 'Order.billNo')
                        .join('Menu', 'Menu.menuNo', 'Order.menuNo')
                        .where('Bill.billNo', billNo)
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
                const order = await services.getMyOrder(billNo);
                const addonss = [];
                for (i in order) {
                        console.log(order[i].orderNo);
                        const addon = await services.getMyAddon(order[i].orderNo);
                        console.log(addon)
                        addonss.push(addon);
                }
                console.log(addonss)
                return [{
                        bill: billDetail,
                        orders: order,
                        addons: addonss
                }]
        } catch (err) {
                console.log(err)
        }
}

exports.showUserOrder = async (userNo) => {
        try {
                const billNoArr = await bill.showBill(userNo);
                const billNo = billNoArr[0].billNo;
                const billDetail = await bill.getBillByNo(billNo);
                const order = await services.getMyOrder(billNo);
                const addonss = [];
                for (i in order) {
                        console.log(order[i].orderNo);
                        const addon = await services.getMyAddon(order[i].orderNo);
                        console.log(addon)
                        addonss.push(addon);
                }
                console.log(addonss)
                return [{
                        bill: billDetail,
                        orders: order,
                        addons: addonss
                }]
        } catch (err) {
                console.log(err)
        }
}