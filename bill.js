var knex = require('./knex');

const services = {
        getBill: (no) => {
                return knex.select().from('Bill')
                .where('Bill.reserveNo',no); 
        // get from reserveNo
        },
        addBill: (date,time,table,reserveNo) => {
            console.log(date + " : " + time + " : " + table + " : " + reserveNo );
            const a = { billDate: date, billTime: time , tableNo: table , reserveNo : reserveNo};
            console.log(a);
            knex.insert(a).into('Bill').then(function (id) {
                console.log(id)
            });
        },
        updateBill: (No) => {
            console.log(No);
            const a = { status : 'paid'};
            console.log(a);
            knex('Bill')
            .update(a)
            .where('Bill.billNo',no)
            .then(function (id) {
                console.log(id)
            });
        }
}

//return data when function call
exports.showBill = async (no) => {
        try {
                const response = await services.getBill(no);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.addBill = async (total,date,time,table) => {
    try {
            const response = await services.addBill(total,date,time,table);
            return response;
    } catch (err) {
            console.log(err)
    }
}

exports.updateBill = async (no) => {
    try {
            const response = await services.updateBill(no);
            return response;
    } catch (err) {
            console.log(err)
    }
}




