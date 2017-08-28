var knex = require('./knex');

const services = {
        getPromotion: ()=> {
                return knex.select()
                        .from('Promotion')
        },
        getPromotionByNo: (no) => {
                return knex.select()
                        .from('Promotion')
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