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
                        .where('menuTypeName', type)
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
                // const data = await JSON.stringify(response);
                return response;
        } catch (err) {
                console.log(err)
        }
}



