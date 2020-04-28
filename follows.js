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
        response.conn.query(`SELECT * FROM follows where followed = ${req.query.followed}`,
         function (err, result, fields) {
			res.send(JSON.stringify(result));
		});
	});
});

 
router.get('/api/followerByID', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
        response.conn.query(`SELECT * FROM follows where follower = ${req.query.follower}`,
         function (err, result, fields) {
			res.send(JSON.stringify(result));
		});
	});
});

// get both followers and followeds of this ID
router.get('/api/followByID', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`SELECT * FROM follows where follower = ${req.query.follow}
		or followed = ${req.query.follow}`,
         function (err, result, fields) {
			res.send(JSON.stringify(result));
			console.log(JSON.stringify(req.query));
		});
	});
});



router.delete('/api/follows', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
        response.conn.query(`delete from follows where follower = ${req.query.follower} AND
        followed = ${req.query.followed}`,function (err, result, fields) {
			console.log(req.query);
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


router.post('/api/blocks', (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`INSERT INTO blocks (blocker, blocked) VALUES
        (${req.body.blocker}, ${req.body.blocked});`,function (err, result, fields) {
			res.send(JSON.stringify(result));
		});
	});
});


router.delete('/api/blocks', (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`DELETE FROM blocks WHERE blocker = ${req.query.blocker} AND blocked = ${req.query.blocked}`,function (err, result, fields) {
			res.send(JSON.stringify(result));
		});
	});
});


router.get('/api/blocks', (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		console.log(req.query.blocker);
		console.log(req.query.blocked);
		if (req.query.blocker && req.query.blocked) {
			response.conn.query(`SELECT * FROM blocks WHERE blocker = ${req.query.blocker} AND blocked = ${req.query.blocked}`,function (err, result, fields) {
				res.send(JSON.stringify(result));
			});
		}
		else if (req.query.blocker) {
			response.conn.query(`SELECT * FROM blocks WHERE blocker = ${req.query.blocker} OR blocked = ${req.query.blocker}`,function (err, result, fields) {
				res.send(JSON.stringify(result));
			});
		}
		else {
			response.conn.query(`SELECT * FROM blocks`,function (err, result, fields) {
				res.send(JSON.stringify(result));
			});
		}
	});
});


module.exports = router;
