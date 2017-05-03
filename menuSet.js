var connect = require('./mysql.config');

const services = {
        getMenuSet: ()=> {
                return connect.select('*')
                        .from('menuset')
        },
        getMenuBySet: (set) => {
                return connect.select('*')
                        .from('menu')
                        .join('menu_menuset', { 'menu_menuset.menuNo': 'menu.menuNo' })
                        .join('menuset', { 'menuset.menuSetNo': 'menu_menuset.menuSetNo' })
                        .where('menuSetName',set)
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