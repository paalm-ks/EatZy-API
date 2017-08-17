var knex = require('./knex');

const services = {

    addReserve: (add, i) => {
        console.log(i);
        console.log(add.name + " : " + add.quan + " : " + add.amount + " : " + add.bill);
        const a = { menuName: add.name, quantity: add.quan, amount: add.amount, billNo: add.bill };
        console.log(a);
        knex.insert(a).into('OEB.Order').then(function (id) {
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

exports.showReserve = async (no) => {
    try {
        const response = await services.getReserve(no);
        return response;
    } catch (err) {
        console.log(err)
    }
}