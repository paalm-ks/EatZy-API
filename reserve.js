var knex = require('./knex');
var order = require('./order');

const services = {
    addReserve: (num, user, branch, code) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        let time = `${date.toTimeString().substring(0, 8)}`;
        const a = { date: current, time: time, numberOfPerson: num, userNo: user, branchNo: branch, queCode: code };
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
        //for call min time queue
        const sub = knex.min('time as t').from('Reservation')
            .where('Reservation.reserveStatus', 'reserved')
            .andWhere('Reservation.date', current)
        return knex('Reservation').select().where('Reservation.time', 'in', sub)
    },
    callReserveMax: () => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        //for call max time queue
        const sub = knex.max('time as t').from('Reservation')
            .where('Reservation.date', current)
        return knex('Reservation').select('*').where('Reservation.time', 'in', sub)
    },
    acceptQueue: (code) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        //for update status arrive or cancel 
        return knex('Reservation')
            .where('queCode', code)
            .andWhere('reserveStatus', 'reserved')
            .andWhere('date', current)
            .update('reserveStatus', 'arrived')
    },
    cancelQueue: (code) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        //for update status cancelled 
        return knex('Reservation')
            .where('queCode', code)
            .andWhere('reserveStatus', 'reserved')
            .andWhere('date', current)
            .update('reserveStatus', 'cancelled')
    },
    getUserNobyQueCode: (code) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex.select('userNo')
            .from('Reservation')
            .where('Reservation.date', current)
            .andWhere('queCode', code)
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

exports.acceptQueue = async (code) => {
    try {
        const response = await services.acceptQueue(code);
        const user = await services.getUserNobyQueCode(code);
        const userNo = user[0].userNo;
        console.log('userNo',userNo)
        const orderNo = await order.showOrder(userNo)
        console.log('orderNo',orderNo)
        if (orderNo.length === 0) {
            return response;
        } else {
            for (i in orderNo) {
                const update = await order.updateOrderStatus(orderNo[i].orderNo, 'reserved' )
                console.log('each update',orderNo[i].orderNo)
            }
            return response;
        }
    } catch (err) {
        console.log(err)
    }
}

exports.cancelQueue = async (queCode) => {
    try {
        const response = await services.cancelQueue(queCode);
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
        const reserve = response[0].reserveNo
        const Next = await this.showReserve(reserve);
        response[0].Next = Next;
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

exports.addReserve = (num, user, branch, code) => {
    try {
        services.addReserve(num, user, branch, code);
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