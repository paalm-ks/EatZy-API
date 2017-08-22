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

var http = require('http').Server(app);
var io = require('socket.io')(http);

// io.on('connection', function(socket){
//   console.log('a user connected : id : '+socket.id);
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
// });

//connect to express api router
var Router = require('./router');
var router = Router(app);
/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */
app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});


