/* Routing */
var menu = require('./menu');
var menuType = require('./menuType');
var promotion = require('./promotion');
var menuSet = require('./menuSet');
var menuMat = require('./menuMaterial');
var order = require('./order');
var reserve = require('./reserve.js');
var bill = require('./bill');
var addon = require('./addon');
var myOrder = require('./myOrder');


module.exports = function (app) {
    app.get('/', function (req, res) {
        const doc = "index page for Ref <br>"
            + "/menu <br>"
            + "/menuPrice <br>"
            + "/menuPriceLength/:begin&:end <br>"
            + "/menuByType/:type <br>"
            + "/menuByNo/:no <br>"
            + "/menuType <br>"
            + "/menuByName/:name <br>"
            + "/promotion <br>"
            + "/promoByNo/:no <br>"
            + "/MenuSet <br>"
            + "/MenuSetPrice <br>"
            + "/MenuSetPriceLength/:begin&:end <br>"
            + "/menuBySet/:set <br>"
            + "/menuMaterialByMenuNo/:no <br>"
            + "/menuBySearch/:data <br>"
            + "/order/:no <br>"
            + "/addOrder/:a <br>"
            + "/addReserve/ <br>"
            + "/reserveByUser/:no <br>"
            + "/reserve/ <br>"
            + "/reserveCount <br>"
            + "/reserveBefore <br>"
            + "/reserveCall/ <br>"
        //   res.send(doc)
        res.sendFile(__dirname+'/index.html')
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
        menu.showMenuSortByPriceLength(begin, end)
            .then(rest => {
                res.json(rest);
            })
    })

    app.get('/menuByGroup/:groupNo', function (req, res) {
        const groupNo = req.params.groupNo;
        menu.showMenuByGroup(groupNo)
            .then(rest => {
                res.json(rest);
            })
    })

    app.get('/menuByType/:typeNo', function (req, res) {
        const typeNo = req.params.typeNo;
        menu.showMenuByType(typeNo)
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

    app.get('/menuType/:restNo', function (req, res) {
        const restNo = req.params.restNo
        menuType.showMenuType(restNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/menuGroup/:typeNo', function (req, res) {
        const typeNo = req.params.typeNo
        menuType.showMenuGroup(typeNo).then(rest => {
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

    app.get('/promotionToday/:restNo', function (req, res) {
        const restNo = req.params.restNo;
        promotion.showPromotionToday(restNo)
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
        menuSet.showMenuSetByPriceLength(begin, end)
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

    app.post('/addOrder/', function (req, res) {
        const no = (req.body.no);
        const orders = (req.body.order)
        const total = (req.body.total)
        order.addOrder(no,orders,total)
    });

    app.post('/addReserve/', function (req, res) {
        const num = (req.body.num);
        const user = (req.body.user);
        const branch = (req.body.branch);
        const code = (req.body.code);
        reserve.addReserve(num,user,branch,code)
    });

    app.get('/reserveByUser/:no', function (req, res) {
        const no = req.params.no;
        reserve.showReserveByUser(no)
            .then(rest => {
                res.json(rest);
            })
    });

    app.get('/reserve', function (req, res) {
        reserve.showReserve().then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveCount', function (req, res) {
        reserve.countReserve().then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveBefore/:no', function (req, res) {
        const no = req.params.no;
        reserve.countBefore(no).then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveCall', function (req, res) {
        reserve.callReserve().then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveCallMax', function (req, res) {
        reserve.callReserveMax().then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveQueue', function (req, res) {
        reserve.genQueue().then(rest => {
            res.json(rest);
        })
    });

    app.get('/updateQueue/:userNo&:value', function (req, res) {
        const userNo = req.params.userNo;
        const value = req.params.value;
        reserve.acceptQueue(userNo,value).then(rest => {
            res.json(rest);
        })
    });

    app.get('/showBill/:billNo', function (req, res) {
        const billNo = req.params.billNo;
        bill.showBill(billNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/updateBillStatus/:billNo', function (req, res) {
        const billNo = req.params.billNo;
        bill.updateBillStatus(billNo)
    });

    app.post('/addAddOn/', function (req, res) {
        const menuNo = req.body.menuNo;
        const matNo = req.body.matNo;
        const qty = req.body.qty;
        const price = req.body.price;
        addon.addAddon(menuNo,matNo,qty,price).then(rest => {
            res.json(rest);
        })
    });

    app.get('/updateOrderStatus/:orderNo&:value', function (req, res) {
        const orderNo = req.params.orderNo;
        const value = req.params.value;
        order.updateOrderStatus(orderNo,value).then(rest => {
            res.json(rest);
        })
    });

    app.get('/myOrder/:no', function (req, res) {
        const no = req.params.no;
        myOrder.showMyOrder(no).then(rest => {
            res.json(rest);
        })
    });

    app.get('/userOrder/:no', function (req, res) {
        const no = req.params.no;
        myOrder.showUserOrder(no).then(rest => {
            res.json(rest);
        })
    });

}