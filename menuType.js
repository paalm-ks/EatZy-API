var knex = require('./knex');

const services = {
        getMenuType: (restNo) => {
                return knex.select()
                        .from('MenuType')
                        .where('restNo',restNo)
        },
        getMenuGroup: (restNo,typeNo) => {
                return knex.select()
                        .from('MenuGroup')
                        .where('menuTypeNo',typeNo)
                        .andWhere('restNo',restNo)
        }
}

exports.showMenuType = async (restNo) => {
        try {
                const response = await services.getMenuType(restNo);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuGroup = async (restNo,typeNo) => {
        try {
                const response = await services.getMenuGroup(restNo,typeNo);
                return response;
        } catch (err) {
                console.log(err)
        }
}
