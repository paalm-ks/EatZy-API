var knex = require('knex')({  
                    client: 'mysql',
                    connection: {
                    host: "korrow.sit.kmutt.ac.th",
                    user: "sitfreshy",
                    password: "123456789",
		            database: "EATZY",
                    }
                });

module.exports = knex ;

// connection to db by knex