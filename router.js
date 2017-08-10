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

     app.get('/menuPrice', function (req, res) {
        menu.showMenuSortByPrice().then(rest => {
            res.json(rest);
        })
    });

    app.get('/menuPriceLength/:begin&:end', function (req, res) {
        const begin = req.params.begin;
        const end = req.params.end;
        menu.showMenuSortByPriceLength(begin,end)
            .then(rest => {
                res.json(rest);
            })
    })

    app.get('/menuByType/:type', function (req, res) {
        const type = req.params.type;
        menu.showMenuByType(type)
            .then(rest => {
                res.json(rest);
            })
    })

    app.get('/menuByNo/:no', function (req, res) {
        const no = req.params.no;
        console.log(no);
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

    app.get('/menuByName/:name', function (req, res) {
        const name = req.params.name;
        menu.showMenuByName(name).then(rest => {
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

    app.get('/MenuSet', function (req, res) {
        menuSet.showMenuSet().then(rest => {
            res.json(rest);
        })
    });

    app.get('/MenuSetPrice', function (req, res) {
        menuSet.showMenuSetByPrice().then(rest => {
            res.json(rest);
        })
    });

    app.get('/MenuSetPriceLength/:begin&:end', function (req, res) {
        const begin = req.params.begin;
        const end = req.params.end;
        menuSet.showMenuSetByPriceLength(begin,end)
        .then(rest => {
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

    app.get('/menuMaterialByMenuNo/:no', function (req, res) {
        const no = req.params.no;
        menuMat.showMaterialByMenuNo(no)
            .then(rest => {
                res.json(rest);
            })
    });

    app.get('/menuMaterialOrderByType/:no', function (req, res) {
        const no = req.params.no;
        menuMat.showMaterialOrderByType(no)
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

    app.get('/addOrder/:a', function (req, res) {
        // const dataArr = JSON.parse(req.params.name);
        const a = (req.params.a);
        console.log(a);
        const b = JSON.parse(a)
        console.log(b)
        console.log(b.name)
        console.log(b.quan)
        console.log(b.amount)
        console.log(b.bill)
        order.addOrder(b,1)
        res.json(b)
        // for (var i in dataArr) { 
        // console.log("i :: " +i);
        // console.log(dataArr[i])
        // order.addOrder(dataArr[i],i);
        // }
        // res.json(dataArr)
        });

}