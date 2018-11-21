var knex = require('./knex');
var addon = require('./addon');
var menuGroup = require('./menuType')

const services = {
        getMenu: (branchNo) => {
                return knex.select().from('Menu')
                        .join('Branch_Menu', { 'Branch_Menu.menuNo': 'Menu.menuNo' })
                        .where('Branch_Menu.branchNo', branchNo)
                        .andWhere('Branch_Menu.isAvailable', 1)
                        .whereNotNull('menuGroupNo')
                        .orderBy('menuNameTH', 'asc');
        },
        getMenuSortByPrice: () => {
                return knex.select().from('Menu')
                        .orderBy('menuPrice', 'asc');
        },
        getMenuSortByPriceLength: (begin, end) => {
                return knex.select()
                        .from('Menu')
                        .whereBetween('menuPrice', [begin, end])
                        .orderBy('menuPrice', 'asc');
        },

        getMenuByGroup: (groupNo, branchNo) => {
                return knex.select()
                        .from('Menu')
                        .join('MenuGroup', { 'MenuGroup.menuGroupNo': 'Menu.menuGroupNo' })
                        .join('Branch_Menu', { 'Branch_Menu.menuNo': 'Menu.menuNo' })
                        .where('MenuGroup.MenuGroupNo', groupNo)
                        .andWhere('Branch_Menu.branchNo', branchNo)
                        .orderBy('menuNameTH', 'asc')
        },
        getMenuByType: (typeNo, branchNo) => {
                return knex.select()
                        .from('Menu')
                        .join('MenuGroup', { 'MenuGroup.menuGroupNo': 'Menu.menuGroupNo' })
                        .join('MenuType', { 'MenuType.menuTypeNo': 'MenuGroup.menuTypeNo' })
                        .join('Branch_Menu', { 'Branch_Menu.menuNo': 'Menu.menuNo' })
                        .where('MenuType.MenuTypeNo', typeNo)
                        .andWhere('Branch_Menu.branchNo', branchNo)
                        .andWhere('Branch_Menu.isAvailable', 1)
                        .orderBy('menuNameTH', 'asc')
        },
        getMenuByNo: (input) => {
                return knex.select()
                        .from('Menu')
                        .where('Menu.menuNo', input)

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
exports.showMenu = async (branchNo) => {
        try {
                const response = await services.getMenu(branchNo);
                for(i in response){
                        const picpath = 'http://13.229.77.223:8080/springoeb/images/';
                        const pic = response[i].menuPicPath;
                        const newPicPath = picpath+pic                  
                        response[i].menuPicPath = newPicPath
                }
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuByGroup = async (groupNo, branchNo) => {
        try {
                const response = await services.getMenuByGroup(groupNo, branchNo);
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuByType = async (typeNo, branchNo) => {
        try {
                const group = await menuGroup.showMenuGroup(typeNo);
                for (i in group) {
                        const menuG = await services.getMenuByGroup(group[i].menuGroupNo, branchNo);
                        group[i].menuG = menuG
                        for(i in menuG){
                                const picpath = 'http://13.229.77.223:8080/springoeb/images/';
                                const pic = menuG[i].menuPicPath;
                                const newPicPath = picpath+pic
                                menuG[i].menuPicPath = newPicPath
                        }
                }
                return group;
        } catch (err) {
                console.log(err)
        }
}

exports.showMenuByNo = async (input) => {
        try {
                const response = await services.getMenuByNo(input);
                const addOn = await addon.getAddonByNo(input);
                for(i in response){
                        const picpath = 'http://13.229.77.223:8080/springoeb/images/';
                        const pic = response[i].menuPicPath;
                        const newPicPath = picpath+pic
                        response[i].menuPicPath = newPicPath
                }
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

exports.showMenuSortByPriceLength = async (begin, end) => {
        try {
                const response = await services.getMenuSortByPriceLength(begin, end);
                return response;
        } catch (err) {
                console.log(err)
        }
}



