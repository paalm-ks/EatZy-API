var knex = require('./knex');

const services = {
        getMenuMaterialByMenuNo: (no) => {
                return knex.select('*')
                        .from('Material')
                        .join('MaterialType', { 'Material.matTypeNo':'MaterialType.matTypeNo'})
                        .join('Menu_Material', { 'Menu_Material.matNo': 'Material.matNo' })
                        .join('Menu', { 'Menu_Material.menuNo': 'Menu.menuNo' })
                        .where('Menu.menuNo', no)
                        .orderBy('matName','asd');
        },
        getMenuMaterialOrderByType: (no) => {
                return knex.select('*')
                        .from('Material')
                        .join('MaterialType', { 'Material.matTypeNo':'MaterialType.matTypeNo'})
                        .join('Menu_Material', { 'Menu_Material.matNo': 'Material.matNo' })
                        .join('Menu', { 'Menu_Material.menuNo': 'Menu.menuNo' })
                        .where('Menu.menuNo', no)
                        .orderBy('matTypeName','asd');
        }

}

exports.showMaterialByMenuNo = async (no) => {
        try {
                const response = await services.getMenuMaterialByMenuNo(no);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMaterialOrderByType= async (no) => {
        try {
                const response = await services.getMenuMaterialOrderByType(no);
                return response;
        } catch (err) {
                console.log(err)
        }
}