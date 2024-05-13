const mysql = require('mysql2')

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'tugasAkhir_express_restApi'
    
})

module.exports = dbPool.promise()