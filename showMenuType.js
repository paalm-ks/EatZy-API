var connect = require('./mysql.config');

var data;

connect.select().from('menutype').then(function(a){
            data=a;                           // add a to data
});

exports.showMenuType = function() {
        return data ;
}