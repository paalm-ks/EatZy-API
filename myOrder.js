var knex = require('./knex');
var bill = require('./bill');

const services = {
    getMyOrder: (userNo) => {
            return knex.select().from('Bill')
            .join('Order', 'Bill.billNo', 'Order.billNo')   
            .where('Bill.billNo', userNo)
            .andWhere('Bill.status','unpaid');      
    },
}

exports.showMyOrder = async (billNo) => {
        try {
                const billDetail = await bill.getBillByNo(billNo);
                const order = ""
                const addOn = ""
                return billDetail 
        } catch (err) {
                console.log(err)
        }
}