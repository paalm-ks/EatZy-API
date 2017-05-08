var mysql = require('mysql');

var json ;

var con = mysql.createConnection({
		host: "iambighead.com",
		user: "biglate09",
		password: "OEBProject2017",
		database: "eatzy"
	});
	
con.connect(function(err){
	 if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


module.exports = con ;
// get data dai lew

