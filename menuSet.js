var connect = require('./mysql.config');

var menuset;

connect.select().from('menuset').then(function(a){
            menuset=a;                           
});

exports.showMenuSet = function() {
        return menuset ;
}