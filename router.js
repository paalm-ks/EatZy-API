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
var restaurant = require('./restaurant');
var table = require('./customerTable');


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
        res.sendFile(__dirname + '/index.html')
    });

    app.get('/menu/:branchNo', function (req, res) {
        const branchNo = req.params.branchNo;
        menu.showMenu(branchNo).then(rest => {
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

    app.get('/menuByGroup/:groupNo&:branchNo', function (req, res) {
        const groupNo = req.params.groupNo;
        const branchNo = req.params.branchNo;
        menu.showMenuByGroup(groupNo, branchNo)
            .then(rest => {
                res.json(rest);
            })
    })

    app.get('/menuByType/:typeNo&:branchNo', function (req, res) {
        const typeNo = req.params.typeNo;
        const branchNo = req.params.branchNo;
        console.log('menuByType', typeNo + ' ' + branchNo )
        menu.showMenuByType(typeNo, branchNo)
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

    app.get('/promotion/:rest', function (req, res) {
        const rest = req.params.rest
        promotion.showPromotion(rest).then(rest => {
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

    app.get('/promotionToday/:branchNo', function (req, res) {
        const branchNo = req.params.branchNo;
        promotion.showPromotionToday(branchNo)
            .then(rest => {
                res.json(rest);
            })
    })

    app.get('/MenuSet/:branchNo', function (req, res) {
        const branchNo = req.params.branchNo;
        menuSet.showMenuSet(branchNo).then(rest => {
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
        const tableNo = (req.body.tableNo)
        const role = (req.body.role);
        order.addOrder(no, orders, total, tableNo, role)
    });

    app.post('/addReserve/', function (req, res) {
        const num = (req.body.num);
        const user = (req.body.user);
        const branch = (req.body.branch);
        const code = (req.body.code);
        const role = (req.body.role);
        reserve.addReserve(num, user, branch, code, role);
    });

    app.get('/reserveByUser/:no&:branch', function (req, res) {
        const no = req.params.no;
        const branch = req.params.branch;
        reserve.showReserveByUser(no, branch)
            .then(rest => {
                res.json(rest);
            })
    });

    app.get('/reserve/:reserveNo&:branchNo', function (req, res) {
        const reserveNo = req.params.reserveNo;
        const branchNo = req.params.branchNo;
        reserve.showReserve(reserveNo, branchNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveCount/:branchNo', function (req, res) {
        const branchNo = req.params.branchNo;
        reserve.countReserve(branchNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveBefore/:userNo&:branchNo', function (req, res) {
        const userNo = req.params.userNo;
        const branchNo = req.params.branchNo;
        reserve.countBefore(userNo, branchNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveCall/:branchNo', function (req, res) {
        const branchNo = req.params.branchNo;
        reserve.callReserve(branchNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveCallMax/:branchNo', function (req, res) {
        const branchNo = req.params.branchNo;
        reserve.callReserveMax(branchNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/reserveQueue', function (req, res) {
        reserve.genQueue().then(rest => {
            res.json(rest);
        })
    });

    app.get('/acceptQueue/:code&:role&:branchNo&:tableNo', function (req, res) {
        const code = req.params.code;
        const role = req.params.role;
        const branchNo = req.params.branchNo;
        const tableNo = req.params.tableNo
        reserve.acceptQueue(code, role, branchNo, tableNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/cancelQueue/:code&:role&:branchNo', function (req, res) {
        const code = req.params.code;
        const role = req.params.role;
        const branchNo = req.params.branchNo;
        reserve.cancelQueue(code, role, branchNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/showBill/:userNo&:role', function (req, res) {
        const userNo = req.params.userNo;
        const role = req.params.role;
        bill.showBill(userNo, role).then(rest => {
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
        addon.addAddon(menuNo, matNo, qty, price).then(rest => {
            res.json(rest);
        })
    });

    app.get('/updateOrderStatus/:orderNo&:value&:billNo&:amount', function (req, res) {
        const orderNo = req.params.orderNo;
        const value = req.params.value;
        const billNo = req.params.billNo;
        const amount = req.params.amount;
        order.updateOrderStatus(orderNo, value, billNo, amount).then(rest => {
            res.json(rest);
        })
    });

    app.get('/myOrder/:no', function (req, res) {
        const no = req.params.no;
        myOrder.showMyOrder(no).then(rest => {
            res.json(rest);
        })
    });

    app.get('/tableOrder/:no', function (req, res) {
        const no = req.params.no;
        myOrder.showTableOrder(no).then(rest => {
            res.json(rest);
        })
    });

    app.get('/userOrder/:userNo&:role', function (req, res) {
        const userNo = req.params.userNo;
        const role = req.params.role;
        myOrder.showUserOrder(userNo, role).then(rest => {
            res.json(rest);
        })
    });

    app.get('/restaurant', function (req, res) {
        restaurant.showRestaurant().then(rest => {
            res.json(rest);
        })
    });

    app.get('/allOrder/:branchNo', function (req, res) {
        const branchNo = req.params.branchNo;
        order.showAllOrder(branchNo).then(rest => {
            res.json(rest);
        })
    });

    app.get('/getUserNobyQueCode/:code', function (req, res) {
        const code = req.params.code;
        reserve.getUserNobyQueCode(code).then(rest => {
            res.json(rest);
        })
    });

    app.get('/group', function (req, res) {
        menuType.menuGroup().then(rest => {
            res.json(rest);
        })
    });

    app.get('/branchTable/:branchNo', function (req, res) {
        const branchNo = req.params.branchNo;
        table.getTable(branchNo).then(rest => {
            res.json(rest);
        })
    });


}