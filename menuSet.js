var knex = require('./knex');

const services = {
        getMenuSet: () => {
                return knex.distinct('set.menuSetNo', 'Menu.menuNameTH as menuSetName', 'Menu.menuPrice')                       
                        .from('Menu')
                        .join('Menu_MenuSet as set', { 'set.menuSetNo': 'Menu.menuNo' })
                        .orderBy('set.menuSetNo', 'asc')
                        .andWhere('Menu.menuFlag','S');
        },
        getMenuBySet: (set) => {
                return knex.select('*')
                        .from('Menu')
                        .join('Menu_MenuSet as set', { 'set.menuSetNo': 'Menu.menuNo' })
                        .join('Menu as m', { 'm.menuNo': 'set.menuNo' })
                        .where('Menu.menuNo', set)
                        .andWhere('Menu.menuFlag','S');
        },
        getMenuSetDetail: (set) => {
                return knex.select('*')
                        .from('Menu')
                        .where('Menu.menuNo', set)
        },
        getMenuSetByPrice: () => {
                return knex.select()
                        .from('MenuSet')
                        .orderBy('MenuSetPrice', 'asc')
        }, getMenuSetByPriceLength: (begin, end) => {
                return knex.select()
                        .from('MenuSet')
                        .whereBetween('MenuSetPrice', [begin, end])
                        .orderBy('MenuSetPrice', 'asc');
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

exports.showMenuSetByPriceLength = async (begin, end) => {
        try {
                const response = await services.getMenuSetByPriceLength(begin, end);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuBySet = async (set) => {
        try {
                const menuBySet = await services.getMenuBySet(set);
                const menuSet = await services.getMenuSetDetail(set);
                const arr = [] ;
                for (i in menuBySet) {
                        arr.push(menuBySet[i]);
                        if(i == (menuBySet.length-1)){
                        menuSet[0].menu = arr;
                        }
                }
                return menuSet
        } catch (err) {
                console.log(err)
        }
}