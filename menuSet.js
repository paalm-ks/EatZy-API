var connect = require('./mysql.config');

const services = {
        getMenuSet: ()=> {
                return connect.select('*')
                        .from('menuset')
        },
        getMenuBySet: (set) => {
                return connect.select('*')
                        .from('menuset')
                        .join('menu_menuset', { 'menu_menuset.menuSetNo': 'menuset.menuSetNo' })
                        .join('menu', { 'menu.menuNo': 'menu_menuset.menuNo' })
                        .where('menuset.menuSetNo', 'like' , `%${set}%`)
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