var connect = require('./mysql.config');

var menu;
var menuWithType;
var menuWithSet;

// select query by mysql.config
connect.select().from('menu').then(function(a){
            menu=a;                           
});

connect.select('*')
.from('menu')
.join('menu_menutype', {'menu_menutype.menuNo':'menu.menuNo'})
.join('menutype',{'menutype.menuTypeNo':'menu_menutype.menuTypeNo'})
.then(function(a){
            menuWithType=a;                           
});

connect.select('*')
.from('menu')
.join('menu_menuset', {'menu_menuset.menuNo':'menu.menuNo'})
.join('menuset',{'menuset.menuSetNo':'menu_menuset.menuSetNo'})
.then(function(a){
            menuWithSet=a;                           
});

//return data when function call
exports.showMenu = function() {
        return menu ;
}

exports.showMenuWithType = function(){
        return menuWithType ;
}

exports.showMenuWithSet = function(){
        return menuWithSet;
}