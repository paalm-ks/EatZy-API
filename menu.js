var connect = require('./mysql.config');

const services = {
        getMenu: () => {
                return connect.select('*')
                        .from('menu')
        },
        getMenuByType: (type) => {
                return connect.select('*')
                        .from('menu')
                        .join('menu_menutype', { 'menu_menutype.menuNo': 'menu.menuNo' })
                        .join('menutype', { 'menutype.menuTypeNo': 'menu_menutype.menuTypeNo' })
                        .where('menuTypeName', 'like', `%${type}%`)
        },
        getMenuByNo: (input) => {
                return connect.select('*')
                        .from('menu')
                        .where('menuNo', 'like', `%${input}%`)
        },
        getMenuByName: (input) => {
                return connect.select('*')
                        .from('menu')
                        .where('menuNameTH', 'like',`%${input}%`)
        }
}

//return data when function call
exports.showMenu = async () => {
        try {
                const response = await services.getMenu();
                // const data = await JSON.stringify(response);
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



