var knex ;

module.exports =    knex = require('knex')({  
                    client: 'mysql',
                    connection: {
                    host: "iambighead.com",
                    user: "biglate09",
                    password: "OEBProject2017",
                    database: "OEB"
                    }
});

// connection to db by knex