var knex = require('./knex');

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
                const billNo = await services.getMenuByNo(input);
                const order = await addon.getAddonByNo(input);
                const addOn = ""
                return 
        } catch (err) {
                console.log(err)
        }
}