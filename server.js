var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

//config express application
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// parse application/json
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//connect to express api router
var Router = require('./router');
var router = Router(app);

io.on('connection', socket => {
    console.log('socket connection is on port 3000')
    socket.on('queue', data => {
        console.log(`data: ${data}`)
        // const array = []
        if(data === 'reserving') {
            // array.push()
           io.emit('fetch', 'fetchQueue')
        }
        if(data === 'ordering') {
            io.emit('fetch', 'fetchStatus')
        }
    })

    socket.on('check', data => {
        console.log(`data: ${data}`)
        // const array = []
        if(data === 'numbering') {
            io.emit('fetch', 'fetchNumber')
        }
    })
})
/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */
server.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});
// if port 3000 fuck up use " taskkill /im node.exe /F "


