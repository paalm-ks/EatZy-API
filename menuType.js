var connect = require('./mysql.config');

const services = {
        getMenuType: ()=> {
                return connect.select('*')
                        .from('menutype')
        }
}

exports.showMenuType = async () => {
        try {
                const response = await services.getMenuType();
                return response;
        } catch (err) {
                console.log(err)
        }
}
