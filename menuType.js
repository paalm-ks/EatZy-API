var knex = require('./knex');

const services = {
        getMenuType: (restNo) => {
                return knex.select()
                        .from('MenuType')
                        .where('restNo', restNo)
        },
        getMenuGroup: (typeNo) => {
                return knex.select()
                        .from('MenuGroup')
                        .where('menuTypeNo', typeNo)
        },
        getGroup: () => {
                return knex.select()
                        .from('MenuGroup')
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

exports.showMenuGroup = async (typeNo) => {
        try {
                const response = await services.getMenuGroup(typeNo);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.menuGroup = async () => {
        try {
                const response = await services.getGroup();
                return response;
        } catch (err) {
                console.log(err)
        } 
}