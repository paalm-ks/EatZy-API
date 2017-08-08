var mysql = require('mysql');

console.log('Makeing Connection');

var con = mysql.createConnection({
		host: "52.43.248.108",
		user: "OrderEatBill",
		password: "OEBProject",
		database: "OEB"
	});
	
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con ;
// get data dai lew

