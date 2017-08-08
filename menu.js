var knex = require('./knex');

const services = {
        getMenu: () => {
                return knex.select().from('Menu').timeout(1000);      
        },
        getMenuByType: (input) => {
                return knex.select()
                        .from('Menu')
                        .join('MenuType', { 'MenuType.menuTypeNo': 'Menu.menuTypeNo' })
                        .where('MenuType.MenuTypeNo', 'like', `${input}`)     
        },
        getMenuByNo: (input) => {
                return knex.select()
                        .from('Menu')
                        .where('menuNo', 'like', `${input}`)
        },
        //Not Finish can't search by TH name
        getMenuByName: (input) => {
                return knex.select()
                        .from('Menu')
                        .where('menuNameEN', 'like',`%${input}%`)
        }
        //res.header("Content-Type", "application/json; charset=utf-8");
}

//return data when function call
exports.showMenu = async () => {
        try {
                const response = await services.getMenu();
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuByType = async (type) => {
        try {
                const response = await services.getMenuByType(type);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuByNo = async (input) => {
        try {
                const response = await services.getMenuByNo(input);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuByName = async (input) => {
        try {
                const response = await services.getMenuByName(input);
                return response;
        } catch (err) {
                console.log(err)
        }
}



