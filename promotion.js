var connect = require('./mysql.config');

const services = {
        getPromotion: ()=> {
                return connect.select('*')
                        .from('promotion')
        },
        getPromotionByNo: (no) => {
                return connect.select('*')
                        .from('promotion')
                        .where('proNo',no)
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

exports.showPromotionByNo = async (no) => {
        try {
                const response = await services.getPromotionByNo(no);
                return response;
        } catch (err) {
                console.log(err)
        }
}