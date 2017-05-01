var connect = require('./mysql.config');

var data;

connect.select().from('promotion').then(function(a){
            data=a;                           // add a to data
});

exports.showPromotion = function() {
        return data ;
}