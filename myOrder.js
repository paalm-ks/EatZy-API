var knex = require('./knex');

const services = {
    getMyOrder: (input) => {
            return knex.select().from('Bill')
            .join('Order', 'Bill.billNo', 'Order.billNo')   
            .where('Bill.billNo', input)
            .andWhere('Bill.status','unpaid');      
    },
}

exports.showMyOrder = async (billNo) => {
    try {
        const response = await services.getMyOrder(billNo);
        return response;
    } catch (err) {
        console.log(err)
    }
}