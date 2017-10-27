var knex = require('./knex');

const date = new Date()
const current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const services = {
        getPromotion: ()=> {
                return knex.select()
                        .from('Promotion')
        },
        getPromotionByNo: (no) => {
                return knex.select()
                        .from('Promotion')
                        .where('proNo',no)
        },
        getPromotionToday: (restNo) => {
                return knex.select()
                        .from('Promotion')
                        .where('proFromDate' , '<=', current)
                        .andWhere('proToDate' , '>=' ,current)
                        .andWhere('restNo',restNo)
                        
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

exports.showPromotionToday = async (restNo) => {
        try {
                const response = await services.getPromotionToday(restNo);
                return response
        } catch (err) {
                console.log(err)
        }
}