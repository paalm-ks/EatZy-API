var connect = require('./mysql.config');

const services = {
        getMenuMaterialByName: (name) => {
                return connect.select('*')
                        .from('material')
                        .join('menu_material', { 'menu_material.matNo': 'material.matNo' })
                        .join('menu', { 'menu_material.menuNo': 'menu.menuNo' })
                        .where('menuNo','like', `%${name}%`)
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