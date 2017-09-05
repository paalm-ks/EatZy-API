var knex = require('knex')({  
                    client: 'mysql',
                    connection: {
                    host: "52.34.28.87",
                    user: "root",
                    password: "root",
		            database: "EATZY",
                    }
                });

module.exports = knex ;

// connection to db by knex