var connect = require('./mysql.config');

const services = {
        getPromotion: ()=> {
                return connect.select('*')
                        .from('promotion')
        },
        getPromotionByNo: (num) => {
                return connect.select('*')
                        .from('promotion')
                        .where('proNo', 'like' , `%${num}%`)
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

exports.showPromotionByNo = async (num) => {
        try {
                const response = await services.getPromotionByNo(num);
                return response;
        } catch (err) {
                console.log(err)
        }
}