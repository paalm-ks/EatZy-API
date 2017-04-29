var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: "iambighead.com",
		user: "biglate09",
		password: "OEBProject2017",
		database: "OEB"
  }
});

var stringify = require('json-stringify-safe');



var data;

knex.select().from('Menu').then(function(a){
            data=a;
});

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

exports.findAll = function() {
        return data ;
}