var connect = require('./mysql.config');

var menu;
var menuWithType;
var menuWithSet;

// select query by mysql.config
connect.select().from('menu').then(function(a){
            menu=a;                           
});

// connect.select('*')
// .from('menu')
// .join('menu_menutype', {'menu_menutype.menuNo':'menu.menuNo'})
// .join('menutype',{'menutype.menuTypeNo':'menu_menutype.menuTypeNo'})
// .then(function(a){
//             menuWithType=a;                           
// });

connect.select('*')
.from('menu')
.join('menu_menuset', {'menu_menuset.menuNo':'menu.menuNo'})
.join('menuset',{'menuset.menuSetNo':'menu_menuset.menuSetNo'})
.then(function(a){
            menuWithSet=a;                           
});

const services = {
        getTypeByMenu: (type) => { return connect.select('*').from('menu').join('menu_menutype', {'menu_menutype.menuNo':'menu.menuNo'})
                .join('menutype',{'menutype.menuTypeNo':'menu_menutype.menuTypeNo'})
                .where('menuTypeName', type) }
}

//return data when function call
exports.showMenu = function() {
        return menu ;
}


exports.showMenuWithType = async (type) => {
        try {
                const response = await services.getTypeByMenu(type);
                // const data = await JSON.stringify(response);
                return response;
        } catch(err) {
                console.log(err)
        }
}


// exports.showMenuWithType = function(type){
//         connect.select('*')
//         .from('menu')
//         .join('menu_menutype', {'menu_menutype.menuNo':'menu.menuNo'})
//         .join('menutype',{'menutype.menuTypeNo':'menu_menutype.menuTypeNo'})
//         .where('menutypeName', type)
//         .then(function(a){
//             menuWithType=a;                           
//         });
//         return menuWithType ;
// }

exports.showMenuWithSet = function(){
        return menuWithSet;
}
