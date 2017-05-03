var connect = require('./mysql.config');

const services = {
        getMenuMaterialByName: (name) => {
                return connect.select('*')
                        .from('material')
                        .join('menu_menumat', { 'menu_menumat.matNo': 'material.matNo' })
                        .join('menu', { 'menu_menumat.menuNo': 'menu.menuNo' })
                        .where('menuName',name)
        }
}

exports.showMaterialByName = async (name) => {
        try {
                const response = await services.getMenuMaterialByName(name);
                return response;
        } catch (err) {
                console.log(err)
        }
}