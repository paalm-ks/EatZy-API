var connect = require('./mysql.config');

const services = {
        getMenuMaterialByNo: (no) => {
                return connect.select('*')
                        .from('material')
                        .join('menu_material', { 'menu_material.matNo': 'material.matNo' })
                        .join('menu', { 'menu_material.menuNo': 'menu.menuNo' })
                        .where('menuNo','like', `%${no}%`)
        }
}

exports.showMaterialByNo = async (no) => {
        try {
                const response = await services.getMenuMaterialByNo(no);
                return response;
        } catch (err) {
                console.log(err)
        }
}