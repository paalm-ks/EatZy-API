// // var knex = require('./knex');
// // // const a = {"name":"test","quan":1,"amount":20}

// // // console.log(a)
// // // console.log(a.name)
// // // // const b = JSON.parse(a);

// // // // console.log(b)

// // // const c = JSON.stringify(a);

// // // console.log(c)

// // // console.log(c.name)
// // const b = "newtest";
// // const c = 10;
// // const a = {menuName:b,quantity:c,amount:c,billNo:"1"};
// // console.log(a);

// // knex.insert(a).into('OEB.Order').then(function(id){
// //     console.log(id)
// // });

// //----------------------------------------------------------------------------------------------------

// // const io = require('socket.io-client')

// // const socket = io('http://localhost:3000')
// // socket.boardcast.emit('test', 'index update')
// // // forsend

// // socket.on('update', (s) => {
// //     //for listen 
// //     console.log(s)
// // })

// //----------------------------------------------------------------------------------------------------

// // คิวล่าสุด , คิวก่อนหน้า , เรียกคิวใกล้สุด

// //----------------------------------------------------------------------------------------------------

// // how to get data out of promise example 

// // getOrder: async (no) => {
// //     let amount = await knex.select('*')
// //         .from('Order')
// //         // .join('menu_order', { 'menu_order.orderNo': 'order.orderNo' })
// //         // .join('menu', { 'menu.menuNo': 'menu_order.menuNo' })
// //         .where('Order.orderNo', 'like', `%${no}%`)
// //         .then(function (a) {
// //             console.log(a[0].amount);
// //             g[a[0].amount];
// //             // return 
// //             return a[0].amount
// //         });
// //     let orders = await knex.select('*')
// //         .from('Order')
// //         .where('Order.amount', amount);
// //     return orders
// // }

// // //----------------------------------------------------------------------------------------------------

// // var order = {
// //     "orders": ["Ford", "BMW", "Fiat"]
// // }


// // JSON.stringify(order);
// // console.log("Coordinates string: ", order);
// // console.log(order.orders[0])

// // Order: [{
// //     "Menu": [
// //         { "menuNo": 4, "menuName": "Fried Red Pork Bun", "menuPrice": 20, "quantity": 2 },
// //         { "menuNo": 56, "menuName": "Chong Fun Noodle (Scallop)", "menuPrice": 150, "quantity": 1 },
// //         { "menuNo": 55, "menuName": "Chong Fun Noodle", "menuPrice": 145, "quantity": 2 }
// //     ],
// //     "AddOn": [
// //         [],
// //         [{ "AddOnNo": 18, "matName": "หอยเชลล์", "price": 10 }, { "AddOnNo": 21, "matName": "ต้นหอม", "price": 0 }, { "AddOnNo": 24, "matName": "เส้นใหญ่", "price": 5 }],
// //         [{ "AddOnNo": 15, "matName": "เส้นบะหมี่", "price": 5 }]
// //     ]
// // }]

// // Order: [{
// //     "Menu": [
// //         { "menuNo": 4, "menuName": "Fried Red Pork Bun", "menuPrice": 20, "quantity": 3 },
// //         { "menuNo": 5, "menuName": "Spring Rolls", "menuPrice": 25, "quantity": 2 },
// //         { "menuNo": 56, "menuName": "Chong Fun Noodle (Scallop)", "menuPrice": 150, "quantity": 3 },
// //         { "menuNo": 9, "menuName": "Chinese Buns Steamed with Pandan Custard", "menuPrice": 25, "quantity": 1 },
// //         { "menuNo": 75, "menuName": "Hot Pan \"Egg & Ham\"", "menuPrice": 115, "quantity": 2 }
// //     ],
// //     "AddOn": [
// //         [],
// //         [],
// //         [{ "AddOnNo": 18, "matName": "หอยเชลล์", "price": 10 }, { "AddOnNo": 21, "matName": "ต้นหอม", "price": 0 }, { "AddOnNo": 23, "matName": "เส้นบะหมี่", "price": 5 }],
// //         [],
// //         [{ "AddOnNo": 80, "matName": "เนื้อหมู", "price": 10 }]
// //     ]
// // }]

// const date = new Date();
// const t1 = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
// const t2 = `${date.toTimeString().substring(0, 8)}`;
// console.log(t1);
// console.log(t2);

var knex = require('./knex');
var bill = require('./bill');
var reserve = require('./reserve');

const services = {
    
        addOrder: async (all, billNo) => {
            const billa = await bill.getBillByNo(billNo);
            const status = "waiting"
            if (billa[0].tableNo === null) {
                const statusNew = "reserve"
                statusNew.replace(status)
                return status
            }
            console.log(status)
            for (i in all[0].Menu) {
                let date = new Date();
                let current = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                let time = `${date.toTimeString().substring(0, 8)}`;
                const a = {
                    menuNo: all[0].Menu[i].menuNo,
                    quantity: all[0].Menu[i].quantity,
                    amount: all[0].Menu[i].menuPrice,
                    billNo: billNo, orderStatus: status,
                    orderDate: current, orderTime: time
                };
                console.log("a")
                console.log(a);
                const id = await knex.insert(a).into('CustomerOrder').then(function (orderNo) {
                    return orderNo;
                });
                console.log("i : " + i)
                console.log("id : " + id[0])
                if (all[0].AddOn[i].length != 0) {
                    for (x in all[0].AddOn[i]) {
                        console.log(all[0].AddOn[i][x].AddOnNo)
                        const b = { orderNo: id[0], addOnNo: all[0].AddOn[i][x].AddOnNo };
                        console.log("b")
                        console.log(b);
                        const addonadd = await knex.insert(b).into('Order_Addon');
                    }
                }
            }
        }
    
    }


    exports.addOrder = async (all, billNo) => {
        try {
            const response = await services.addOrder(all, billNo);
            return response;
        } catch (err) {
            console.log(err)
        }
    }