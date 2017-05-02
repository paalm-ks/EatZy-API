var connect = require('./mysql.config');

var menuType;

connect.select().from('menutype').then(function(a){
            menuType=a;                          
});

exports.showMenuType = function() {
        return menuType ;
}