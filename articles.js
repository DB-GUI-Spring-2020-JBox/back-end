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


router.get('/api/articles/:articleId', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query("SELECT * FROM articles WHERE ID = ?", [req.params.articleId], function (err, result, fields) {	
			if (err) {
				res.send(err);
			}
			res.send(JSON.stringify(result));
		});
	});
});


router.get('/api/articles', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		if (req.query.userId) {
			response.conn.query("SELECT * FROM articles WHERE author = ?", [req.query.userId], function (err, result, fields) {	
				res.send(JSON.stringify(result)); 
			});
		}
		else {
			response.conn.query("SELECT * FROM articles", function (err, result, fields) {	
				res.send(JSON.stringify(result)); 
			});
		}
	});
});


router.post('/api/articles',async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`INSERT INTO articles (title,content,author,price,image) VALUES 
                ("${req.body.title}","${req.body.cont}",${req.body.author},${req.body.price},
                "${req.body.image}")`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});


router.delete('/api/articles/:articleId', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`delete from articles where ID = ${req.params.articleId}`,function (err, result, fields) {
			res.send(JSON.stringify(result)); 
		});
	});
});



module.exports = router;