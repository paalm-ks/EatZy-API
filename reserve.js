var knex = require('./knex');

const services = {

    addReserve: (add) => {
        console.log(add.date + " : " + add.time + " : " + add.num + " : " + add.stat + " : " + add.user + " : " + add.branch + " : " + add.code);
        const a = { date: add.date, time: add.time, numberOfPerson: add.num, userNo: add.user, branchNo: add.branch, queCode: add.code };
        console.log(a);
        knex.insert(a).into('EatZy.Reservation').then(function (id) {
            console.log(id)
        });
    },
    getReserveByUser: (no) => {
        console.log('get : '+no)
        return knex.select('*')
            .from('Reservation')
            .join('User', { 'User.userNo': 'Reservation.userNo' })
            .where('Reservation.userNo', no)
    },
    getReserve:() =>{
        // return knex('Reservation').count('reserved')
        return knex.select('*')
        .from('Reservation')
        .join('User', { 'User.userNo': 'Reservation.userNo' })
    },
    getCountReserve:() =>{
        return knex('Reservation').count('status')
        .where('Reservation.status','reserved')
    },
    getCountBefore:(now) =>{
        return knex('Reservation').count('status')
        .where('Reservation.status','reserved')
        .andWhere('Reservation.time','<',now);
    },
    callReserve:() =>{
        const sub = knex.min('time as t').from('Reservation')
        .where('Reservation.status','reserved')
        return knex('Reservation').select().where('Reservation.time','in',sub)
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

exports.countBefore = async (now) => {
    try {
        const response = await services.getCountBefore(now);
        return response;
    } catch (err) {
        console.log(err)
    }
}

exports.addReserve = (add) => {
    try {
        services.addReserve(add);
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