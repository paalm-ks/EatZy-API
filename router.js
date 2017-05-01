 /* Routing */
var menu = require('./menu');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('home page /menu to see menulist*');
    });

    app.get('/showMenu', function(req,res){
        res.json(menu.showMenu());
    });

    app.get('/showMenuType', function(req,res){
        res.json(menu.showMenuType());
    });

    app.get('/showPromotion', function(req,res){
        res.json(menu.showPromotionu());
    });

    app.get('/showMenuSet', function(req,res){
        res.json(menu.showMenuSet());
    });
    // app.post('/getSTH/:token', function(req,res){
    //     req.params.sth;
    // })
}