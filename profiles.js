var con = require('./connection')
var express = require('express');
var router = express.Router();

// get all table
router.get('/api/profiles', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query("SELECT * FROM profiles", function (err, result, fields) {
			res.send(JSON.stringify(result));
		});
	});
});

// get one row by user name (user)
router.get('/api/profilesUser/:userId', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`SELECT * FROM profiles where ID = "${req.params.userId}"`,
		function (err, result, fields) {
			res.send(result);
		});
	});
});


// login
router.post('/api/login', (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`SELECT * FROM profiles where userName = "${req.body.username}"`,
		function (err, result, fields) {
			if (result[0].password == req.body.password) {
				res.send({status: true, account: result[0]});
			} else {
				res.send({ status: false });
			}
		});
	});
});


router.post('/api/register', (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`INSERT INTO profiles (name, userName, email, password) 
			VALUES ("${req.body.name}", "${req.body.userName}", "${req.body.email}", "${req.body.password}")`,
		function (err, result, fields) {
			res.send(result);
		});
	});
});


router.post('/api/profiles',async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`INSERT INTO profiles (name,userName,password,email,
				linkToFacebook,linkToInstagram,linkToLinkedIn,otherLink) VALUES
				("${req.body.name}","${req.body.user}","${req.body.pass}","${req.body.email}","${req.body.fb}","${req.body.insta}",
				"${req.body.linkd}","${req.body.other}")`,function (err, result, fields) {
					res.send(JSON.stringify(result));
		});
	});
});


router.put('/api/profiles/:userId',async (req, res) => {
	con.getConnection(res, (response) => {
		console.log(req.body);
		if (response.message == 'fail') return;
		response.conn.query(`UPDATE profiles SET
				name = "${req.body.name}", userName = "${req.body.userName}", bio = "${req.body.bio}", email = "${req.body.email}", linkToFacebook = "${req.body.linkToFacebook}",
				linkToInstagram = "${req.body.linkToInstagram}", linkToLinkedIn = "${req.body.linkToLinkedIn}", otherLink = "${req.body.otherLink}" 
				${ req.body.password === "" ? "" : `, password = "${req.body.password}"` } WHERE ID = ${req.params.userId}`,function (err, result, fields) {
					if (err)
						console.error(err);
					res.send(JSON.stringify(result));
		});
	});
});


router.delete('/api/profiles', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`delete from profiles where ID = ${req.body.id}`,function (err, result, fields) {
					res.send(JSON.stringify(result));
		});
	});
});





module.exports = router;
