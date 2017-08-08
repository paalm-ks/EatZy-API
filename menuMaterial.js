var knex = require('./knex');

const services = {
        getMenuMaterialByMenuNo: (no) => {
                return knex.select('*')
                        .from('Material')
                        .join('Menu_Material', { 'Menu_Material.matNo': 'Material.matNo' })
                        .join('Menu', { 'Menu_Material.menuNo': 'Menu.menuNo' })
                        .where('Menu.menuNo', no)
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