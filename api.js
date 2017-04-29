var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: "iambighead.com",
		user: "OrderEatBill",
		password: "OEBProject2017",
		database: "OEB"
  }
});

var menu = require('./menu');

const app = express();
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/* Routing */
app.get('/', function(req,res){
    res.send('Hello World This Is Index Page');
});

app.get('/menu', function(req,res){
    res.json(menu.findAll());
});

/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */
app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});


