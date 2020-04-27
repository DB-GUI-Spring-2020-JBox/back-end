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




module.exports = router;
