/* Routing */
var menu = require('./menu');
var menuType = require('./menuType');
var promotion = require('./promotion');
var menuSet = require('./menuSet');
var menuMat = require('./menuMaterial');
var order = require('./order');

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

    app.get('/menuByNo/:no', function (req, res) {
        const no = req.params.no;
        menu.showMenuByNo(no)
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

    app.get('/promoByNo/:no', function (req, res) {
        const no = req.params.no;
        promotion.showPromotionByNo(no)
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

    app.get('/menuMaterialByNo/:no', function (req, res) {
        const no = req.params.no;
        menuMat.showMaterialByNo(no)
            .then(rest => {
                res.json(rest);
            })
    });

    app.get('/menuBySearch/:data', function (req, res) {
        const data = req.params.data;
        const isNum = data * 1;
        if (Number.isInteger(isNum)) {
            menu.showMenuByNo(data)
                .then(rest => { res.json(rest); })
        } else {
            menu.showMenuByName(data)
                .then(rest => { res.json(rest); })
        }

    });

    app.get('/order/:no', function (req, res) {
        const no = req.params.no;
        order.showOrder(no)
            .then(rest => {
                res.json(rest);
            })
    });

    app.get('/addOrder/order?:a', function (req, res) {
        // const dataArrays = JSON.parse(req.headers.data).orders;
        const dataArr = JSON.parse(req.query.a);
        
        order.addOrder(dataArr)
        res.json('helo')
    });

}