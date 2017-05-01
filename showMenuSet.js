var connect = require('./mysql.config');

var data;

connect.select().from('menuset').then(function(a){
            console.log(a);
            data=a;                           // add a to data
});

exports.showMenuSet = function() {
        return data ;
}