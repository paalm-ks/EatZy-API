var knex = require('./knex');

const services = {

    addReserve: (add) => {
        console.log(add.date + " : " + add.time + " : " + add.num + " : " + add.stat+ " : " + add.user+ " : " + add.branch+ " : " + add.code);
        const a = { date: add.date, time: add.time, numberOfPerson: add.num, status: add.stat, userNo:add.user, branchNo:add.branch,queCode:add.code };
        console.log(a);
        knex.insert(a).into('EatZy.Reservation').then(function (id) {
            console.log(id)
        });
    },
    getReserve: (no) => {
        return knex.select('*')
            .from('Reservation')
            .join('User', { 'User.userNo' : 'Reservation.userNo'})
            .where('Reservation.userNo', 'like', `${no}`)
    }
}

exports.addReserve = (add) => {
    try {
        services.addReserve(add);
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