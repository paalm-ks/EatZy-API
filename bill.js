var knex = require('./knex');

const services = {
        getBill: (no) => {
                return knex.select()
                .from('Bill')
                .where('Bill.userNo',no)
        // get from userNo
        },
        getBillByNo: (billNo) => {
                return knex.select()
                .from('Bill')
                .where('Bill.billNo',billNo)
        },
        addBill: (date,time,userNo) => {
            console.log(date + " : " + time + " : " + userNo );
            const a = { billDate: date, billTime: time , userNo : userNo};
            console.log(a);
            knex.insert(a).into('Bill').then(function (id) {
                console.log(id)
            });
        },
        updateBillStatus: (No) => {
            console.log(No);
            const a = { status : 'paid'};
            console.log(a);
            knex('Bill')
            .update(a)
            .where('Bill.billNo',no)
        },
        updateTableToBill: (No,tableNo) => {
                console.log(No);
                knex('Bill')
                .update('tableNo',tableNo)
                .where('Bill.billNo',no)
        },
        addUserNoToBill: (billNo,userNo) => {
                return knex('Bill')
                .where('Bill.billNo',billNo)
                .update('Bill.userNo',userNo);
        },
        updateTotalAmount: (billNo,total) =>{
                return knex('Bill')
                .where('Bill.billNo',billNo)
                .update('Bill.totalAmount',total);
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

exports.getBillByNo = async (no) => {
        try {
                const response = await services.getBillByNo(no);
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

exports.updateBillStatus = async (no) => {
    try {
            const response = await services.updateBillStatus(no);
            return response;
    } catch (err) {
            console.log(err)
    }
}

exports.addUserNoToBill = async (billNo,userNo) => {
        try {
            const response = await services.addUserNoToBill(billNo,userNo);
            return response;
        } catch (err) {
            console.log(err)
        }
}

exports.updateTotalAmount = async (billNo,total) => {
        try {
            const response = await services.updateTotalAmount(billNo,total);
            return response;
        } catch (err) {
            console.log(err)
        }
}




