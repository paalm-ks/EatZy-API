var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: "iambighead.com",
		user: "biglate09",
		password: "OEBProject2017",
		database: "OEB"
  }
});

// var users = require('./user');
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
    // console.log("Request data:");
    // console.log(req);
    // console.log("Respond data:");
    // console.log(res);
});

// app.get('/user', function (req, res) {
//     res.json(users.findAll());
// });

/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */
app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});


