var knex = require('./knex');

const services = {
        getMenuSet: ()=> {
                return knex.select()
                        .from('MenuSet')
        },
        getMenuBySet: (set) => {
                return knex.select()
                        .from('MenuSet')
                        .join('Menu_MenuSet', { 'Menu_MenuSet.menuSetNo': 'MenuSet.menuSetNo' })
                        .join('Menu', { 'Menu.menuNo': 'Menu_MenuSet.menuNo' })
                        .where('MenuSet.menuSetNo', set)
        }
}

exports.showMenuSet = async () => {
        try {
                const response = await services.getMenuSet();
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuBySet = async (set) => {
        try {
                const response = await services.getMenuBySet(set);
                return response;
        } catch (err) {
                console.log(err)
        }
}