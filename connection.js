const mysql = require('mysql');

//create the mysql connection object.  
var connPool = mysql.createPool({
    connectionLimit: 100,
    user: "msegal",
    password: "789164",
    database: "Jbox",
    host: "35.188.20.36",
});

function getConnection(res, callback) {
  connPool.getConnection((err, conn) => {
    if (err) {
      logger.error(e.code);
      res.status(500).json({message: 'Something went wrong'});
      callback({message: 'fail'});
    }
    callback({conn, message: 'succeed'});
  });
}

module.exports = {
  getConnection
};