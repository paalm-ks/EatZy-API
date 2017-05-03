var connect = require('./mysql.config');

const services = {
        getPromotion: ()=> {
                return connect.select('*')
                        .from('promotion')
        },
        getPromotionByName: (name) => {
                return connect.select('*')
                        .from('promotion')
                        .where('proNo',name)
        }
}

exports.showPromotion = async () => {
        try {
                const response = await services.getPromotion();
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showPromotionByName = async (name) => {
        try {
                const response = await services.getPromotionByName(name);
                return response;
        } catch (err) {
                console.log(err)
        }
}