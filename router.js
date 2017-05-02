 /* Routing */
var menu = require('./menu');
var menuType = require('./menuType');
var promotion = require('./promotion');
var menuSet = require('./menuSet');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('home page /menu to see menulist*');
    });

    app.get('/menu', function(req,res){
        res.json(menu.showMenu());
    });

    app.get('/menuType', function(req,res){
        res.json(menuType.showMenuType());
    });

    app.get('/promotion', function(req,res){
        res.json(promotion.showPromotion());
    });

    app.get('/menuSet', function(req,res){
        res.json(menuSet.showMenuSet());
    });

    app.get('/menuWithType',function(req,res){
        res.json(menu.showMenuWithType());
    })

    app.get('/menuWithSet',function(req,res){
        res.json(menu.showMenuWithSet());
    })

    // app.post('/getSTH/:token', function(req,res){
    //     req.params.sth;
    // })
}