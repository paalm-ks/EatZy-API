var knex = require('./knex');

const services = {
        getMenuType: ()=> {
                return knex.select()
                        .from('MenuType')
        }
}

exports.showMenuType = async () => {
        try {
                const response = await services.getMenuType();
                return response;
        } catch (err) {
                console.log(err)
        }
}
