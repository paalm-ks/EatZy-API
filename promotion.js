var knex = require('./knex');

const date = new Date()
const current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const services = {
        getPromotion: (rest) => {
                return knex.select()
                        .from('Promotion')
                        .andWhere('restNo', rest)
        },
        getPromotionByNo: (no) => {
                return knex.select()
                        .from('Promotion')
                        .where('proNo',no)
        },
        getPromotionToday: (branchNo) => {
                return knex.select()
                        .from('Promotion')
                        .join('Branch_Promotion',{ 'Branch_Promotion.promotionNo': 'Promotion.proNo' }) 
                        .where('proFromDate' , '<=', current)
                        .andWhere('proToDate' , '>=' ,current)
                        .andWhere('branchNo',branchNo)
                        .andWhere('isAvailable',1)
        }
}

exports.showPromotion = async (rest) => {
        try {
                let response = await services.getPromotion(rest);
                for(i in response){
                        const picpath = 'http://13.229.77.223:8080/springoeb/images/';
                        const pic = response[i].proPicPath;
                        const newPicPath = picpath+pic
                        response[i].proPicPath = newPicPath
                }
                
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showPromotionByNo = async (no) => {
        try {
                const response = await services.getPromotionByNo(no);
                for(i in response){
                        const picpath = 'http://13.229.77.223:8080/springoeb/images/';
                        const pic = response[i].proPicPath;
                        const newPicPath = picpath+pic                  
                        response[i].proPicPath = newPicPath
                }
                return response;
        } catch (err) {
                console.log(err)
        }
}

exports.showPromotionToday = async (branchNo) => {
        try {
                const response = await services.getPromotionToday(branchNo);
                for(i in response){
                        const picpath = 'http://13.229.77.223:8080/springoeb/images/';
                        const pic = response[i].proPicPath;
                        const newPicPath = picpath+pic
                        response[i].proPicPath = newPicPath
                }
                return response
        } catch (err) {
                console.log(err)
        }
}