// var knex = require('./knex');
// // const a = {"name":"test","quan":1,"amount":20}

// // console.log(a)
// // console.log(a.name)
// // // const b = JSON.parse(a);

// // // console.log(b)

// // const c = JSON.stringify(a);

// // console.log(c)

// // console.log(c.name)
// const b = "newtest";
// const c = 10;
// const a = {menuName:b,quantity:c,amount:c,billNo:"1"};
// console.log(a);

// knex.insert(a).into('OEB.Order').then(function(id){
//     console.log(id)
// });

//----------------------------------------------------------------------------------------------------

// const io = require('socket.io-client')

// const socket = io('http://localhost:3000')
// socket.boardcast.emit('test', 'index update')
// // forsend

// socket.on('update', (s) => {
//     //for listen 
//     console.log(s)
// })

//----------------------------------------------------------------------------------------------------

// คิวล่าสุด , คิวก่อนหน้า , เรียกคิวใกล้สุด

//----------------------------------------------------------------------------------------------------

// how to get data out of promise example 

getOrder: async (no) => {
    let amount = await knex.select('*')
        .from('Order')
        // .join('menu_order', { 'menu_order.orderNo': 'order.orderNo' })
        // .join('menu', { 'menu.menuNo': 'menu_order.menuNo' })
        .where('Order.orderNo', 'like', `%${no}%`)
        .then(function (a) {
            console.log(a[0].amount);
            g[a[0].amount];
            // return 
            return a[0].amount
        });
    let orders = await knex.select('*')
        .from('Order')
        .where('Order.amount', amount);
    return orders
}

//----------------------------------------------------------------------------------------------------

var order = {
    "orders": ["Ford", "BMW", "Fiat"]
}


JSON.stringify(order);
console.log("Coordinates string: ", order);
console.log(order.orders[0])

Order: [{
    "Menu": [
        { "menuNo": 4, "menuName": "Fried Red Pork Bun", "menuPrice": 20, "quantity": 2 },
        { "menuNo": 56, "menuName": "Chong Fun Noodle (Scallop)", "menuPrice": 150, "quantity": 1 },
        { "menuNo": 55, "menuName": "Chong Fun Noodle", "menuPrice": 145, "quantity": 2 }
    ],
    "AddOn": [
        [],
        [{ "AddOnNo": 18, "matName": "หอยเชลล์", "price": 10 }, { "AddOnNo": 21, "matName": "ต้นหอม", "price": 0 }, { "AddOnNo": 24, "matName": "เส้นใหญ่", "price": 5 }],
        [{ "AddOnNo": 15, "matName": "เส้นบะหมี่", "price": 5 }]
    ]
}]

Order: [{
    "Menu": [
        { "menuNo": 4, "menuName": "Fried Red Pork Bun", "menuPrice": 20, "quantity": 3 },
        { "menuNo": 5, "menuName": "Spring Rolls", "menuPrice": 25, "quantity": 2 },
        { "menuNo": 56, "menuName": "Chong Fun Noodle (Scallop)", "menuPrice": 150, "quantity": 3 },
        { "menuNo": 9, "menuName": "Chinese Buns Steamed with Pandan Custard", "menuPrice": 25, "quantity": 1 },
        { "menuNo": 75, "menuName": "Hot Pan \"Egg & Ham\"", "menuPrice": 115, "quantity": 2 }
    ],
    "AddOn": [
        [],
        [],
        [{ "AddOnNo": 18, "matName": "หอยเชลล์", "price": 10 }, { "AddOnNo": 21, "matName": "ต้นหอม", "price": 0 }, { "AddOnNo": 23, "matName": "เส้นบะหมี่", "price": 5 }],
        [],
        [{ "AddOnNo": 80, "matName": "เนื้อหมู", "price": 10 }]
    ]
}]
