var knex = require('knex')({  
                    client: 'mysql',
                    connection: {
                    host: "54.148.45.155",
                    user: "eatzy",
                    password: "eatzyapi@2017",
		            database: "EATZY",
                    }
                });

module.exports = knex ;

// connection to db by knex