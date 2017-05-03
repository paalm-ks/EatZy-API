/* Routing */
var menu = require('./menu');
var menuType = require('./menuType');
var promotion = require('./promotion');
var menuSet = require('./menuSet');
var menuMat = require('./menuMaterial');


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('home page /menu to see menulist*');
    });

    app.get('/menu', function (req, res) {
        menu.showMenu().then(rest => {
            res.json(rest);
        })
    });

    app.get('/menuByType/:type', function (req, res) {
        const type = req.params.type;
        menu.showMenuByType(type)
            .then(rest => {
                res.json(rest);
            })
    })

    app.get('/menuType', function (req, res) {
        menuType.showMenuType().then(rest => {
            res.json(rest);
        })
    });

    app.get('/promotion', function (req, res) {
        promotion.showPromotion().then(rest => {
            res.json(rest);
        })
    });

    app.get('/promoByName/:name', function (req, res) {
        const name = req.params.name;
        promotion.showPromotionByName(name)
            .then(rest => {
                res.json(rest);
            })
    })

    app.get('/menuSet', function (req, res) {
        menuSet.showMenuSet().then(rest => {
                res.json(rest);
        })
    });

    app.get('/menuBySet/:set', function (req, res) {
        const set = req.params.set;
        menuSet.showMenuBySet(set)
            .then(rest => {
                res.json(rest);
            })
    });

    app.get('/menuMaterialByName/:name', function (req, res) {
        const name = req.params.name;
        menuMat.showMaterialByName(name)
            .then(rest => {
                res.json(rest);
            })
    });

    // app.post('/getSTH/:token', function(req,res){
    //     req.params.sth;
    // })
}