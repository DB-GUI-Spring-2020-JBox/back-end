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


router.get('/api/messagesSender/:senderId', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`SELECT * FROM messages where sender = ${req.params.senderId} or receiver = ${req.params.senderId}`,
		 function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.get('/api/messagesReceiver', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`SELECT * FROM messages where receiver = ${req.body.receiver}`,
		 function (err, result, fields) {	
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


router.put('/api/messages/:messageId',async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`UPDATE messages SET content = "${req.body.content}" WHERE ID = ${req.params.messageId}`,
		function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});



module.exports = router;