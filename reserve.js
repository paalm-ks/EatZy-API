var knex = require('./knex');

const services = {

    addReserve: (date, time, num, stat, user, branch, code) => {
        console.log(date + " : " + time + " : " + num + " : " + stat + " : " + user + " : " + branch + " : " + code);
        const a = { date: date, time: time, numberOfPerson: num, userNo: user, branchNo: branch, queCode: code };
        console.log(a);
        knex.insert(a).into('EatZy.Reservation').then(function (id) {
            console.log(id)
        });
    },
    getReserveByUser: (no) => {
        console.log('get : ' + no)
        return knex.select('*')
            .from('Reservation')
            .join('User', { 'User.userNo': 'Reservation.userNo' })
            .where('Reservation.userNo', no)
            .andWhere('Reservation.status', 'reserved')
    },
    getReserve: () => {
        return knex.select('*')
            .from('Reservation')
            .join('User', { 'User.userNo': 'Reservation.userNo' })
    },
    getCountReserve: () => {
        return knex('Reservation').count('status as status')
            .where('Reservation.status', 'reserved')
    },
    getCountBefore: (no) => {
        const date = knex.select('Reservation.date')
            .from('Reservation')
            .where('Reservation.userNo', no)
            .andWhere('Reservation.status', 'reserved')
        const time = knex.select('Reservation.time')
            .from('Reservation')
            .where('Reservation.userNo', no)
            .andWhere('Reservation.status', 'reserved')

        return knex('Reservation').count('status as status')
            .where('Reservation.status', 'reserved')
            .andWhere('Reservation.time', '<', time)
            .andWhere('Reservation.date', '=', date)
    },
    callReserve: () => {
        const sub = knex.min('time as t').from('Reservation')
            .where('Reservation.status', 'reserved')
        return knex('Reservation').select().where('Reservation.time', 'in', sub)
    },
    genQueue: () => {
        return knex('Reservation').max('Reservation.queCode as queCode')
            .where('Reservation.status', 'reserved');
    },
    updateQueue: (no) => {
        const date = knex.max('Reservation.date')
            .from('Reservation')
            .where('Reservation.userNo', no)
            .andWhere('Reservation.status', 'reserved')
        const time = knex.max('Reservation.time')
            .from('Reservation')
            .where('Reservation.userNo', no)
            .andWhere('Reservation.status', 'reserved')

        return knex('Reservation')
            .where('Reservation.userNo', no)
            .andWhere('Reservation.status', 'reserved')
            .andWhere('Reservation.time', '=', time)
            .andWhere('Reservation.date', '=', date)
            .update('Reservation.status', 'arrived')
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

exports.updateQueue = async (no) => {
    try {
        const response = await services.updateQueue(no);
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

exports.addReserve = (date, time, num, stat, user, branch, code) => {
    try {
        services.addReserve(date, time, num, stat, user, branch, code);
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