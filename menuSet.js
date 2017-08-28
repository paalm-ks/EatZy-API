var knex = require('./knex');

const services = {
        getMenuSet: ()=> {
                return knex.select()
                        .from('MenuSet')
                        .orderBy('menuSetNameTH','asc');
        },
        getMenuBySet: (set) => {
                return knex.select()
                        .from('MenuSet')
                        .join('Menu_MenuSet', { 'Menu_MenuSet.menuSetNo': 'MenuSet.menuSetNo' })
                        .join('Menu', { 'Menu.menuNo': 'Menu_MenuSet.menuNo' })
                        .where('MenuSet.menuSetNo', set)
        },
        getMenuSetByPrice: () => {
                return knex.select()
                        .from('MenuSet')
                        .orderBy('MenuSetPrice','asc')
        },getMenuSetByPriceLength: (begin,end) => {
                return knex.select()
                        .from('MenuSet')
                        .whereBetween('MenuSetPrice',[begin,end])
                        .orderBy('MenuSetPrice','asc');
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

exports.showMenuSetByPrice = async () => {
        try {
                const response = await services.getMenuSetByPrice();
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuSetByPriceLength = async (begin ,end) => {
        try {
                const response = await services.getMenuSetByPriceLength(begin ,end);
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