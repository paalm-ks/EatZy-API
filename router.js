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

    app.get('/menuMaterialByName/:name', function (req, res) {
        const name = req.params.name;
        menuMat.showMaterialByName(name)
            .then(rest => {
                res.json(rest);
            })
    });

    app.get('/menuBySearch/:data', function (req, res) {
        const data = req.params.data;
        const isNum = data * 1 ;
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

    app.get('/addOrder/add?:a', function (req, res) {
        var arr = JSON.parse(req.query.a);
        console.log("arr : "+arr);
        console.log("arr [0]: "+arr[0]);
        console.log("arr [1]: "+arr[1]);
        console.log("arr [0][1]: "+arr[0][1]);
        console.log("arr [0][2]: "+arr[0][2]);
        console.log("arr [1][1]: "+arr[1][1]);
        console.log("arr [1][2]: "+arr[1][2]);
         order.addOrder(arr)
             .then(rest => {
                 res.json(rest);
             })
    });

    app.get('/addOrder2/add?:a', function (req, res) {
        var arr = JSON.parse(req.query.a);
        console.log("arr : "+arr);
        console.log("arr [0]: "+arr[0]);
        console.log("arr [1]: "+arr[1]);
        console.log("arr [2]: "+arr[2]);
        console.log("arr [0][1]: "+arr[0][1]);
        console.log("arr [0][2]: "+arr[0][2]);
        console.log("arr [1][1]: "+arr[1][1]);
        console.log("arr [1][2]: "+arr[1][2]);
        console.log("arr [2][1]: "+arr[2][1]);
        console.log("arr [2][2]: "+arr[2][2]);
        //  order.addOrder(arr)
        //      .then(rest => {
        //          res.json(rest);
        //      })
    });

}