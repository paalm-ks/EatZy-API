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

const io = require('socket.io-client')

const socket = io('http://localhost:3000')

socket.emit('test', 'index update')
// forsend

socket.on('update', (s) => {
    //for listen 
    console.log(s)
})

//----------------------------------------------------------------------------------------------------

// คิวล่าสุด , คิวก่อนหน้า , เรียกคิวใกล้สุด


