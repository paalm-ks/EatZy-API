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
    getReserveByUser: (no) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex.select()
            .from('Reservation')
            .join('User', { 'User.userNo': 'Reservation.userNo' })
            .where('Reservation.userNo', no)
            .andWhere('Reservation.date', current)
            .andWhere('Reservation.reserveStatus', 'reserved')
            .andWhere('reserveRole', 'U')
    },
    getReserve: (no) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex.select('*')
            .from('Reservation')
            .where('Reservation.date', current)
            .andWhere('Reservation.reserveNo', '>', no)
    },
    getCountReserve: () => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex('Reservation').count('reserveStatus as status')
            .where('Reservation.reserveStatus', 'reserved')
            .andWhere('Reservation.date', current)
    },
    getCountBefore: (no) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const reserveNo = knex.select('Reservation.reserveNo')
            .from('Reservation')
            .where('Reservation.userNo', no)
            .andWhere('reserveRole', 'U')
            .andWhere('Reservation.reserveStatus', 'reserved')
            .andWhere('Reservation.date', current)

        return knex('Reservation').count('reserveStatus as status')
            .where('Reservation.reserveStatus', 'reserved')
            .andWhere('Reservation.reserveNo', '<', reserveNo)
            .andWhere('Reservation.date', current)
    },
    callReserve: () => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const sub = knex.min('time as t').from('Reservation')
            .where('Reservation.reserveStatus', 'reserved')
            .andWhere('Reservation.date', current)
        return knex('Reservation').select().where('Reservation.time', 'in', sub)
    },
    callReserveMax: () => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const sub = knex.max('time as t').from('Reservation')
            .where('Reservation.date', current)
        return knex('Reservation').select('*').where('Reservation.time', 'in', sub)
    },
    acceptQueue: (code, role) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex('Reservation')
            .where('queCode', code)
            .andWhere('reserveStatus', 'reserved')
            .andWhere('date', current)
            .andWhere('reserveRole', role)
            .update('reserveStatus', 'arrived')
    },
    cancelQueue: (code, role) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex('Reservation')
            .where('queCode', code)
            .andWhere('reserveStatus', 'reserved')
            .andWhere('date', current)
            .andWhere('reserveRole', role)
            .update('reserveStatus', 'cancelled')
    },
    getUserNobyQueCode: (code, role) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex.select('userNo')
            .from('Reservation')
            .where('Reservation.date', current)
            .andWhere('queCode', code)
            .andWhere('reserveRole', role)
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

exports.acceptQueue = async (code, role) => {
    try {
        const response = await services.acceptQueue(code, role);
        const user = await services.getUserNobyQueCode(code, role);
        const userNo = user[0].userNo;
        const billed = await bill.showBill(userNo);
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

exports.cancelQueue = async (code, role) => {
    try {
        const response = await services.cancelQueue(code, role);
        const user = await services.getUserNobyQueCode(code, role);
        const userNo = user[0].userNo;
        const billed = await bill.showBill(userNo);
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

exports.showReserve = async (no) => {
    try {
        const response = await services.getReserve(no);
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.callReserve = async () => {
    try {
        const response = await services.callReserve();
        if (response.length !== 0) {
            const reserve = response[0].reserveNo
            if (reserve !== null) {
                const Next = await this.showReserve(reserve);
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

exports.callReserveMax = async () => {
    try {
        const response = await services.callReserveMax();
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.countReserve = async () => {
    try {
        const response = await services.getCountReserve();
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.countBefore = async (no) => {
    try {
        const response = await services.getCountBefore(no);
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

exports.showReserveByUser = async (no) => {
    try {
        const response = await services.getReserveByUser(no);
        return response;
    } catch (err) {
        console.log(err)
    }
}