var con = require('./connection')
var express = require('express');
var router = express.Router();

router.get('/api/messages', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query("SELECT * FROM messages", function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.delete('/api/messages', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`delete from messages where ID = ${req.body.id}`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});


router.post('/api/messages',async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`INSERT INTO messages (sender,receiver,content) VALUES 
        (${req.body.sender},${req.body.receiver},"${req.body.content}");`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});





module.exports = router;