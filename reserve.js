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
    getReserve: () => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return knex.select('*')
            .from('Reservation')
            .join('User', { 'User.userNo': 'Reservation.userNo' })
            .where('Reservation.date', current)
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
    genQueue: () => {
        return knex('Reservation').min('Reservation.queCode as queCode')
            .where('Reservation.reserveStatus', 'reserved');
        //what this for ??
    },
    acceptQueue: (userNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        //for update status arrive or cancel 
        return knex('Reservation')
            .where('userNo', userNo)
            .andWhere('reserveStatus', 'reserved')
            .andWhere('date', current)
            .update('reserveStatus', 'arrived')
    },
    cancelQueue: (userNo) => {
        let date = new Date();
        let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        //for update status cancelled 
        return knex('Reservation')
            .where('userNo', userNo)
            .andWhere('reserveStatus', 'reserved')
            .andWhere('date', current)
            .update('reserveStatus', 'cancelled')
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

exports.acceptQueue = async (no) => {
    try {
        const response = await services.acceptQueue(no);
        const update = await order.updateOrderStatus(no, 'waiting')
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.cancelQueue = async (no) => {
    try {
        const response = await services.cancelQueue(no);
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.showReserve = async () => {
    try {
        const response = await services.getReserve();
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.callReserve = async () => {
    try {
        const response = await services.callReserve();
        return response;
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