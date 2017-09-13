var knex = require('./knex');

const services = {
        addAddon: (menuNo,matNo,qty,price) => { 
            console.log(menuNo + " : " + matNo + " : " + qty + " : " + price );
            const a = { menuNo: menuNo, matNo: matNo, qty: qty , price: price};
            console.log(a);
            knex.insert(a).into('Addon').then(function (id) {
                console.log(id)
            });
        }
}

//return data when function call

exports.addAddon = async (menuNo,matNo,qty,price) => {
    try {
            const response = await services.addAddon(menuNo,matNo,qty,price);
            return response;
    } catch (err) {
            console.log(err)
    }
}




