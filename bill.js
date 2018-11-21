var knex = require('./knex');

const services = {
        getBill: (no, role) => {
                let date = new Date();
                let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                return knex.select()
                        .from('Bill')
                        .where('Bill.userNo', no)
                        .andWhere('Bill.billStatus', 'unpaid')
                        .andWhere('Bill.billRole', role)
                        .andWhere('Bill.billDate', current)
                // get from userNo
        },
        getBillByNo: (billNo) => {
                let date = new Date();
                let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                return knex.select()
                        .from('Bill')
                        .where('Bill.billNo', billNo)
                        .andWhere('Bill.billDate', current)
        },
        getBillByTableNo: (tableNo) => {
                let date = new Date();
                let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                return knex.select()
                        .from('Bill')
                        .where('Bill.tableNo', tableNo)
                        .andWhere('Bill.billStatus', 'unpaid')
                        .andWhere('Bill.billDate', current)
        },
        addBill: (date, time, userNo, tableNo, role) => {
                console.log(date + " : " + time + " : " + userNo);
                const a = { billDate: date, billTime: time, userNo: userNo, tableNo: tableNo, billRole: role };
                console.log(a);
                knex.insert(a).into('Bill').then(function (id) {
                        console.log(id)
                });
        },
        updateBillStatus: (billNo) => {
                const status = 'cancelled';
                console.log('billNo', billNo)
                return knex('Bill')
                        .where('Bill.billNo', billNo)
                        .update('billStatus', status);
        },
        updateTableToBill: (billNo, tableNo) => {
                return knex('Bill')
                        .update('tableNo', tableNo)
                        .where('Bill.billNo', billNo)
        },
        addUserNoToBill: (billNo, userNo) => {
                return knex('Bill')
                        .where('Bill.billNo', billNo)
                        .update('Bill.userNo', userNo);
        },
        getLastTotal: (billNo) => {
                return knex('Bill.totalAmount').from('Bill').where('Bill.billNo', billNo)
        },
        updateTotalAmount: (billNo, total) => {
                return knex('Bill')
                        .where('Bill.billNo', billNo)
                        .update('Bill.totalAmount', total);
        },
        decreaseTotalAmount: (billNo, current) => {
                return knex('Bill')
                        .where('Bill.billNo', billNo)
                        .update('Bill.totalAmount', current);
        }
}

//return data when function call
exports.getLastTotal = async (no) => {
        try {
                const lastTotal = await services.getLastTotal(no);
                console.log(response)
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showBill = async (no, role) => {
        try {
                const response = await services.getBill(no, role);
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

exports.getBillByTableNo = async (no) => {
        try {
                const response = await services.getBillByTableNo(no);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.addBill = async (total, date, time, table, role) => {
        try {
                const response = await services.addBill(total, date, time, table, role);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.updateBillStatus = async (billNo) => {
        try {
                const response = await services.updateBillStatus(billNo);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.addUserNoToBill = async (billNo, userNo) => {
        try {
                const response = await services.addUserNoToBill(billNo, userNo);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.updateTableToBill = async (billNo, tableNo) => {
        try {
                const response = await services.updateTableToBill(billNo, tableNo);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.updateTotalAmount = async (billNo, total) => {
        try {
                const lastTotal = await services.getLastTotal(billNo);
                const last = lastTotal[0].totalAmount;
                let response = [];
                if (last === null) {
                        response = await services.updateTotalAmount(billNo, total);
                } else {
                        const intLast = parseInt(last)
                        const intTotal = parseInt(total)
                        const current = intTotal + intLast;
                        response = await services.updateTotalAmount(billNo, current);
                }
                return response;

        } catch (err) {
                console.log(err)
        }
}

exports.decreaseTotalAmount = async (billNo, amount) => {
        try {
                const lastTotal = await services.getLastTotal(billNo);
                const last = lastTotal[0].totalAmount;
                let response = [];
                if (last === null) {
                        response = await services.decreaseTotalAmount(billNo, amount);
                } else {
                        const intLast = parseInt(last)
                        const current = intLast - amount;
                        response = await services.decreaseTotalAmount(billNo, current);
                }
                return response;

        } catch (err) {
                console.log(err)
        }
}





