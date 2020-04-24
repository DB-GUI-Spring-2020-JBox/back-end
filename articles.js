var con = require('./connection')
var express = require('express');
var router = express.Router();


router.get('/api/home', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query("SELECT * FROM articles ORDER BY datePosted DESC LIMIT 10", 
		  function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.get('/api/home/userID', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`SELECT * FROM articles where author = ${req.body.author}
		 ORDER BY datePosted DESC LIMIT 10`, function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});



router.get('/api/browse/category', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`SELECT * FROM articles where category = "${req.body.category}"`,
		 function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.get('/api/articles', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query("SELECT * FROM articles", function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.post('/api/articles',async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`INSERT INTO articles (title,content,author,price,image,category) VALUES 
                ("${req.body.title}","${req.body.cont}",${req.body.author},${req.body.price},
                "${req.body.image}","${req.body.category}")`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});


router.delete('/api/articles', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`delete from articles where ID = ${req.body.id}`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});



module.exports = router;