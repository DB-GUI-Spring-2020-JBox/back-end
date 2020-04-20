var con = require('./connection')
var express = require('express');
var router = express.Router();


router.get('/api/follows', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query("SELECT * FROM follows", function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.get('/api/followedByID', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
        response.conn.query(`SELECT * FROM follows where followed = ${req.body.followed}`,
         function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.get('/api/followerByID', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
        response.conn.query(`SELECT * FROM follows where follower = ${req.body.follower}`,
         function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.delete('/api/follows', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
        response.conn.query(`delete from follows where follower = ${req.body.follower} AND 
        followed = ${req.body.followed}`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});



router.post('/api/follows',async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`INSERT INTO follows (follower,followed) VALUES 
        (${req.body.follower},${req.body.followed});`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});




module.exports = router;