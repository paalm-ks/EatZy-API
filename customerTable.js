var knex = require('./knex');

const services = {
    getTable: (branchNo) => {
        return knex.select()
            .from('CustomerTable')
            .andWhere('branchNo', branchNo)
            .andWhere('isAvailable', 1)

    }
}


//return data when function call

exports.getTable = async (branchNo) => {
    try {
        const response = await services.getTable(branchNo);
        return response;
    } catch (err) {
        console.log(err)
    }
}



