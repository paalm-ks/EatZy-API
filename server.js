var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

//config express application
const app = express();
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//connect to express api router
var Router = require('./router');
var router = Router(app);
/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */
app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});


