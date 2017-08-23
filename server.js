var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');


//config express application
const app = express();
// parse application/json
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var server = require('http').createServer(app);
var io = require('socket.io').listen(server)

io.on('connection', function (socket) {
    socket.on('message', function () { });
    socket.on('disconnect', function () { });
  });

  
//connect to express api router
var Router = require('./router');
var router = Router(app);
/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */
server.listen(port, function() {
  
    console.log('Starting node.js on port ' + port);
});

// if port 3000 fuck up use taskkill /im node.exe


