var con = require('./connection')
var express = require('express');
var router = express.Router();


router.get('/api/reviews', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query("SELECT * FROM reviews", function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.delete('/api/reviews', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`delete from reviews where ID = ${req.body.id}`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});


router.post('/api/reviews',async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`INSERT INTO reviews (author,content,ranking,article) VALUES 
        (${req.body.author},"${req.body.cont}",${req.body.rank},${req.body.article});`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});


module.exports = router;