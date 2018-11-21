var knex = require('./knex');
var order = require('./order');
var bill = require('./bill');

const services = {
    addReserve: (num, user, branch, code, role) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        let time = `${date.toTimeString().substring(0, 8)}`;
        const a = { date: current, time: time, numberOfPerson: num, userNo: user, branchNo: branch, queCode: code, reserveRole: role };
        knex.insert(a).into('Reservation').then(function (id) {
            console.log(id)
        });
    },
    getReserveByUser: (no, branch) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex.select()
            .from('Reservation')
            .join('User', { 'User.userNo': 'Reservation.userNo' })
            .where('Reservation.userNo', no)
            .andWhere('Reservation.date', current)
            .andWhere('Reservation.reserveStatus', 'reserved')
            .andWhere('Reservation.reserveRole', 'U')
            .andWhere('Reservation.branchNo', branch)
    },
    getReserve: (reserveNo, branchNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex.select('*')
            .from('Reservation')
            .where('Reservation.date', current)
            .andWhere('Reservation.reserveStatus', 'reserved')
            .andWhere('Reservation.branchNo', branchNo)
            .andWhere('Reservation.reserveNo', '>', reserveNo)
    },
    getCountReserve: (branchNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex('Reservation').count('reserveStatus as status')
            .where('Reservation.reserveStatus', 'reserved')
            .whereNotNull('Reservation.queCode')
            .andWhere('Reservation.date', current)
            .andWhere('Reservation.branchNo', branchNo)
    },

    getCountBefore: (userNo, branchNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const reserveNo = knex.select('Reservation.reserveNo')
            .from('Reservation')
            .where('Reservation.userNo', userNo)
            .andWhere('Reservation.reserveRole', 'U')
            .andWhere('Reservation.reserveStatus', 'reserved')
            .andWhere('Reservation.date', current)
            .andWhere('Reservation.branchNo', branchNo)

        return knex('Reservation').count('Reservation.reserveStatus as status')
            .where('Reservation.reserveStatus', 'reserved')
            .whereNotNull('Reservation.queCode')
            .andWhere('Reservation.reserveNo', '<', reserveNo)
            .andWhere('Reservation.date', current)
            .andWhere('Reservation.branchNo', branchNo)

    },
    callReserve: (branchNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const sub = knex.min('time as t').from('Reservation')
            .where('Reservation.reserveStatus', 'reserved')
            .andWhere('Reservation.date', current)
            .andWhere('Reservation.branchNo', branchNo)
        return knex('Reservation').select().where('Reservation.time', 'in', sub)
    },
    callReserveMax: (branchNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        console.log(date)
        const sub = knex.max('time as t').from('Reservation')
            .whereNotNull('Reservation.queCode')
            .where('Reservation.date', current)
            .andWhere('Reservation.branchNo', branchNo);
        return knex('Reservation')
            .select('*')
            .where('Reservation.time', 'in', sub)
            .andWhere('Reservation.branchNo', branchNo);

    },
    acceptQueue: (code, role, branchNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex('Reservation')
            .where('queCode', code)
            .andWhere('reserveStatus', 'reserved')
            .andWhere('date', current)
            .andWhere('reserveRole', role)
            .andWhere('branchNo', branchNo)
            .update('reserveStatus', 'arrived')
    },
    cancelQueue: (code, role, branchNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex('Reservation')
            .where('queCode', code)
            .andWhere('reserveStatus', 'reserved')
            .andWhere('date', current)
            .andWhere('reserveRole', role)
            .andWhere('branchNo', branchNo)
            .update('reserveStatus', 'cancelled')
    },
    getUserNobyQueCode: (code, role, branchNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex.select('userNo')
            .from('Reservation')
            .where('Reservation.date', current)
            .andWhere('queCode', code)
            .andWhere('reserveRole', role)
            .andWhere('branchNo', branchNo)
    }
}

exports.genQueue = async () => {
    try {
        const response = await services.genQueue();
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.getUserNobyQueCode = async (code) => {
    try {
        const response = await services.getUserNobyQueCode(code);
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.acceptQueue = async (code, role, branchNo, tableNo) => {
    try {
        const response = await services.acceptQueue(code, role, branchNo);
        const user = await services.getUserNobyQueCode(code, role, branchNo);
        const userNo = user[0].userNo;
        const billed = await bill.showBill(userNo, role);
        if (billed.length !== 0) {
            const billNo = billed[0].billNo
            const billTable = await bill.updateTableToBill(billNo, tableNo)
            const orderNo = await order.showOrder(billNo)
            if (orderNo.length !== 0) {
                for (i in orderNo) {
                    const update = await order.updateOrderStatus(orderNo[i].orderNo, 'waiting')
                }
                return response;
            }
            return response
        }
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.cancelQueue = async (code, role, branchNo) => {
    try {
        const response = await services.cancelQueue(code, role, branchNo);
        const user = await services.getUserNobyQueCode(code, role, branchNo);
        const userNo = user[0].userNo;
        const billed = await bill.showBill(userNo, role);
        if (billed.length !== 0) {
            const billNo = billed[0].billNo
            const billCancel = await bill.updateBillStatus(billNo)
            const orderNo = await order.showOrder(billNo)
            if (orderNo.length !== 0) {
                for (i in orderNo) {
                    const update = await order.updateOrderStatus(orderNo[i].orderNo, 'cancelled')
                }
                return response;
            }
            return response
        }
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.showReserve = async (reserveNo, branchNo) => {
    try {
        const response = await services.getReserve(reserveNo, branchNo);
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.callReserve = async (branchNo) => {
    try {
        const response = await services.callReserve(branchNo);
        if (response.length !== 0) {
            const reserve = response[0].reserveNo
            if (reserve !== null) {
                const Next = await services.getReserve(reserve, branchNo);
                console.log(Next)
                response[0].Next = Next;
                return response
            } else {
                return response
            }
        }
        return response
    } catch (err) {
        console.log(err)
    }
}

exports.callReserveMax = async (branchNo) => {
    try {
        const response = await services.callReserveMax(branchNo);
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.countReserve = async (branchNo) => {
    try {
        const response = await services.getCountReserve(branchNo);
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.countBefore = async (userNo, branchNo) => {
    try {
        const response = await services.getCountBefore(userNo, branchNo);
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.addReserve = (num, user, branch, code, role) => {
    try {
        services.addReserve(num, user, branch, code, role);
    } catch (err) {
        console.log(err)
    }
}

exports.showReserveByUser = async (no, branch) => {
    try {
        const response = await services.getReserveByUser(no, branch);
        return response;
    } catch (err) {
        console.log(err)
    }
}