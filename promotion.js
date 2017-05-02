var connect = require('./mysql.config');

var promo;

connect.select().from('promotion').then(function(a){
            promo=a;                           
});

exports.showPromotion = function() {
        return promo ;
}