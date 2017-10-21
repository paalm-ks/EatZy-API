var knex = require('knex')({  
                    client: 'mysql',
                    connection: {
                    host: "13.229.126.122",
                    user: "eatzy_admin",
                    password: "eatzyapi@2017",
		            database: "Eatzy",
                    }
                });

module.exports = knex ;

// connection to db by knex