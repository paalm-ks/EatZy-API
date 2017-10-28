var knex = require('./knex');
var addon = require('./addon');

const services = {
        getMenu: () => {
                return knex.select().from('Menu')
                .where('Menu.menuFlag','M')     
                .orderBy('menuNameTH', 'asc');              
        },
        getMenuSortByPrice: () => {
                return knex.select().from('Menu')
                .orderBy('menuPrice', 'asc');      
        },
        getMenuSortByPriceLength: (begin,end) => {
                return knex.select()
                .from('Menu')
                .whereBetween('menuPrice', [begin,end])
                .orderBy('menuPrice', 'asc');      
        },
        getMenuByGroup: (groupNo) => {
                return knex.select()
                        .from('Menu')
                        .join('MenuGroup', { 'MenuGroup.menuGroupNo': 'Menu.menuGroupNo' })
                        .where('MenuGroup.MenuGroupNo', groupNo)
                        .andWhere('Menu.menuFlag','M')
                        .orderBy('menuNameTH', 'asc')     
        },
        getMenuByType: (typeNo) => {
                return knex.select()
                        .from('Menu')
                        .join('MenuGroup', { 'MenuGroup.menuGroupNo': 'Menu.menuGroupNo' })
                        .join('MenuType', { 'MenuType.menuTypeNo': 'MenuGroup.menuTypeNo' })
                        .where('MenuType.MenuTypeNo', typeNo)
                        .orderBy('menuNameTH', 'asc')     
        },
        getMenuByNo: (input) => {
                return knex.select()
                        .from('Menu')
                        .where('Menu.menuNo',input)
                        
        },
        //Not Finish can't search by TH name
        // getMenuByName: (input) => {
        //         return knex.select()
        //                 .from('Menu')
        //                 .where('menuNameEN', 'like',input)
        // }
        //res.header("Content-Type", "application/json; charset=utf-8");
}

//return data when function call
exports.showMenu = async () => {
        try {
                const response = await services.getMenu();
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuByGroup = async (groupNo) => {
        try {
                const response = await services.getMenuByGroup(groupNo);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuByType = async (typeNo) => {
        try {
                const response = await services.getMenuByType(typeNo);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuByNo = async (input) => {
        try {
                const response = await services.getMenuByNo(input);
                const addOn = await addon.getAddonByNo(input);
                response[0].addOn = addOn
                return response
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

exports.showMenuSortByPrice = async () => {
        try {
                const response = await services.getMenuSortByPrice();
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuSortByPriceLength = async (begin , end) => {
        try {
                const response = await services.getMenuSortByPriceLength(begin , end);
                return response;
        } catch (err) {
                console.log(err)
        }
}



