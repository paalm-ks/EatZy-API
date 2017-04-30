var connect = require('./mysql.config');

var data;

// select query by mysql.config
connect.select().from('Menu').then(function(a){
            console.log(a);
            data=a;                           // add a to data
});

//return data when menu.findAll() call
exports.findAll = function() {
        return data ;
}


/* raw data shouldd be 
 var b = [ 
             {  menuNo: 5,
                 menuNameTH: 'กะเพราไก่',
                 menuNameEN: 'Kaprao Kai',
                 menuDesc: 'B2',
                 menuPrice: 45,
                 isOfficialMenu: 0 },
             {  menuNo: 6,
                 menuNameTH: 'ผัดไทยกุ้งสด',
                 menuNameEN: 'Pud Thai',
                menuDesc: 'เส้นใหญ่อร่อยมากกกกก',
                 menuPrice: 35,
                 isOfficialMenu: 0 } ];
*/