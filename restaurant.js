var knex = require('./knex');

const services = {
        getRestaurant: () => {
                return knex.select()
                        .from('Restaurant')
        }
}

exports.showRestaurant = async () => {
        try {
                const response = await services.getRestaurant();
                return response;
        } catch (err) {
                console.log(err)
        }
}
