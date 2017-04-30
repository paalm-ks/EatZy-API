var connect = require('./mysql.config');

var data;

// select query by mysql.config
connect.select().from('Menu').then(function(a){
            data=a;                           // add a to data
});

//return data when menu.findAll() call
exports.findAll = function() {
        return data ;
}