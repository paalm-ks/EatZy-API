var knex = require('./knex');

const date = new Date()
const current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
const time = `${date.toTimeString().substring(0, 8)}`;

const services = {    

    addReserve: (num,user,branch,code) => {
        const a = { date: current, time: time, numberOfPerson: num, userNo: user, branchNo: branch, queCode: code };
        console.log(a);
        knex.insert(a).into('Reservation').then(function (id) {
            console.log(id)
        });
    },
    getReserveByUser: (no) => {
        return knex.select()
            .from('Reservation')
            .join('User', { 'User.userNo': 'Reservation.userNo' })
            .where('Reservation.userNo', no)
            .andWhere('Reservation.date', current)
            .andWhere('Reservation.status', 'reserved')
    },
    getReserve: () => {
        return knex.select('*')
            .from('Reservation')
            .join('User', { 'User.userNo': 'Reservation.userNo' })
            .where('Reservation.date', current)
    },
    getCountReserve: () => {
        return knex('Reservation').count('status as status')
            .where('Reservation.status', 'reserved')
            .andWhere('Reservation.date', current)
    },
    getCountBefore: (no) => {
        const reserveNo = knex.select('Reservation.reserveNo')
            .from('Reservation')
            .where('Reservation.userNo', no)
            .andWhere('Reservation.status', 'reserved')
            .andWhere('Reservation.date', current)

        return knex('Reservation').count('status as status')
            .where('Reservation.status', 'reserved')
            .andWhere('Reservation.reserveNo', '<', reserveNo)
            .andWhere('Reservation.date', current)
    },
    callReserve: () => {
        //for call min time queue
        const sub = knex.min('time as t').from('Reservation')
            .where('Reservation.status', 'reserved')
            .andWhere('Reservation.date', current)
        return knex('Reservation').select().where('Reservation.time', 'in', sub)
    },
    callReserveMax: () => {
        //for call max time queue
        const sub = knex.max('time as t').from('Reservation')
            .where('Reservation.date', current)
        return knex('Reservation').select('*').where('Reservation.time', 'in', sub)
    },
    genQueue: () => {
        return knex('Reservation').min('Reservation.queCode as queCode')
            .where('Reservation.status', 'reserved');
            //what this for ??
    },
    acceptQueue: (no) => {
        //for update status arrive or cancel
        return knex('Reservation')
            .where('userNo', no)
            .andWhere('status', 'reserved')
            .andWhere('date', current)
            .update('status', 'arrived')
    },
    cancelQueue: (no) => {
        //for update status cancelled
        return knex('Reservation')
            .where('userNo', no)
            .andWhere('status', 'reserved')
            .andWhere('date',current)
            .update('status', 'cancelled')
    },addBillNoToReserve: (no,reserveNo) => {
        //for update billNo to reserve
        console.log(billNo)
        return knex('Reservation')
        .where('Reservation.reserveNo',reserveNo)
        .update('billNo',no);
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
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.cancelQueue = async (no, status) => {
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

exports.addReserve = (num,user,branch,code) => {
    try {
        services.addReserve(num,user,branch,code);
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

exports.addBillNoToReserve = async (no,reserveNo) => {
    try {
        const response = await services.addBillNoToReserve(no,reserveNo);
        return response;
    } catch (err) {
        console.log(err)
    }
}