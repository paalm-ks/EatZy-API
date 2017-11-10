var knex = require('./knex');

const services = {
        getMenuSet: (branchNo) => {
                return knex.distinct('set.menuSetNo', 'Menu.menuNameTH as menuSetName', 'Menu.menuPrice', 'Menu.menuPicPath')                       
                        .from('Menu')
                        .join('Menu_MenuSet as set', { 'set.menuSetNo': 'Menu.menuNo' })
                        .join('Branch_Menu' , { 'Branch_Menu.menuNo':'Menu.menuNo'})
                        .orderBy('set.menuSetNo', 'asc')
                        .where('Branch_Menu.branchNo',branchNo)
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

exports.showMenuSet = async (branchNo) => {
        try {
                const response = await services.getMenuSet(branchNo);
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
                
                        const picpath = 'http://13.229.77.223:8080/springoeb/images/';
                        const pic = menuSet[0].menuPicPath;
                        const newPicPath = picpath+pic
                        menuSet[0].menuPicPath = newPicPath
                
                for(i in menuBySet){
                        const picpath = 'http://13.229.77.223:8080/springoeb/images/';
                        const pic = menuBySet[i].menuPicPath;
                        const newPicPath = picpath+pic
                        menuBySet[i].menuPicPath = newPicPath
                }
                for (i in menuBySet) {
                        arr.push(menuBySet[i]);
                }
                
                menuSet[0].menu = arr;
                return menuSet
        } catch (err) {
                console.log(err)
        }
}