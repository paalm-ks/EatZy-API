 /* Routing */
var menu = require('./menu');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('home page /menu to see menulist*');
    });

    app.get('/menu', function(req,res){
        res.json(menu.findAll());
    });
}