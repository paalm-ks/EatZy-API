var connect ;

module.exports =    connect = require('knex')({  
                    client: 'mysql',
                    connection: {
                    host: "iambighead.com",
                    user: "biglate09",
                    password: "OEBProject2017",
                    database: "eatzy"
                    }
});

// connection to db by knex