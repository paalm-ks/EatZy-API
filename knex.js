var knex = require('knex')({  
                    client: 'mysql',
                    connection: {
                    host: "52.43.248.108",
                    user: "OrderEatBill",
                    password: "OEBProject",
		            database: "OEB",
                    }
                });

module.exports = knex ;

// connection to db by knex