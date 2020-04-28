var con = require('./connection')
var express = require('express');
var router = express.Router();


router.get('/api/home', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`SELECT * FROM articles ORDER BY datePosted DESC LIMIT 10`, function(err, results, fields) {
      res.send(results);
    });
  });
});

router.get('/api/home/:userID', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`SELECT * FROM articles ORDER BY datePosted DESC LIMIT 10`, function(err, results, fields) {
      res.send(results);
    });
  });
});

router.get('/api/browse/:category', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`SELECT * FROM articles WHERE LOWER(category) = LOWER('${req.params.category}') ORDER BY datePosted DESC`, function(err, results, fields) {
      res.send(results);
    });
  });
});


router.get('/api/articles/:articleId', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`SELECT * FROM articles WHERE ID = ${req.params.articleId} ORDER BY datePosted DESC`, function(err, results, fields) {
      res.send(results);
    });
  });
});

router.get('/api/search/:input/:category/:filter', async (req, res) => {
	con.getConnection(res, (response) => {
	  if (response.message == 'fail') return;
	  response.conn.query(`SELECT articles.*,
    CASE WHEN "${req.params.filter}" = "date" THEN articles.datePosted
      WHEN "${req.params.filter}" = "rating" THEN r.rank
      ELSE articles.title
      END AS sortCol
      FROM articles 
      LEFT OUTER JOIN profiles ON articles.author = profiles.ID 
      LEFT OUTER JOIN (SELECT AVG(ranking) AS rank, author FROM reviews GROUP BY author) AS r ON articles.author = r.author
      WHERE
        ((profiles.name LIKE '%${req.params.input}%' AND "${req.params.filter}" != "article") OR (articles.title LIKE '%${req.params.input}%' AND "${req.params.filter}" != "author")) 
          AND
        (IF("${req.params.category}" != "", (articles.category = "${req.params.category}"), 1=1))
      ORDER BY (sortCol) DESC
      LIMIT 10;`, function(err, results, fields) {
		res.send(results);
	  });
	});
});

router.get('/api/articles', async (req, res) => {
	con.getConnection(res, (response) => {
	  if (response.message == 'fail') return;
	  response.conn.query(`SELECT * FROM articles WHERE author = ${req.query.userId}`, function(err, results, fields) {
		res.send(results);
	  });
	});
});



router.put('/api/articles/:articleId', async (req, res) => {
	con.getConnection(res, (response) => {
	  if (response.message == 'fail') return;
    response.conn.query(`UPDATE articles SET title = "${req.body.title}", content = "${req.body.content}", category = "${req.body.category}", image = "${req.body.image || ""}"
    WHERE ID = ${req.params.articleId}`, function(err, results, fields) {
		res.send(results);
	  });
  });
});

//WHERE category = ${req.body.category}

// router.get('/api/home', async (req, res) => {
// 	con.getConnection(res, (response) => {
// 		if (response.message == 'fail') return;
// 		response.conn.query("SELECT * FROM articles ORDER BY datePosted DESC LIMIT 10",
// 		  function (err, result, fields) {
// 			res.send(JSON.stringify(result));
// 		});
// 	});
// });


// router.get('/api/home/userID', async (req, res) => {
// 	con.getConnection(res, (response) => {
// 		if (response.message == 'fail') return;
// 		response.conn.query(`SELECT * FROM articles where author = ${req.body.author}
// 		 ORDER BY datePosted DESC LIMIT 10`, function (err, result, fields) {
// 			res.send(JSON.stringify(result));
// 		});
// 	});
// });


// router.get('/api/browse/category', async (req, res) => {
// 	con.getConnection(res, (response) => {
// 		if (response.message == 'fail') return;
// 		response.conn.query(`SELECT * FROM articles where category = "${req.body.category}"`,
// 		 function (err, result, fields) {
// 			res.send(JSON.stringify(result));
// 		});
// 	});
// });


// router.get('/api/articles/:articleID', async (req, res) => {
//   con.getConnection(res, (response) => {
//     if (response.message == 'fail') return;
//     response.conn.query("SELECT * FROM articles", function(err, result, fields) {
//       res.send(JSON.stringify(result));
//     });
//   });
// });


// router.post('/api/articles', async (req, res) => {
//   con.getConnection(res, (response) => {
//     if (response.message == 'fail') return;
//     response.conn.query(`INSERT INTO articles (title,content,author,price,image,category) VALUES
//                 ("${req.body.title}","${req.body.cont}",${req.body.author},${req.body.price},
//                 "${req.body.image}","${req.body.category}")`, function(err, result, fields) {
//       res.send(JSON.stringify(result));
//     });
//   });
// });


router.delete('/api/articles', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`delete from articles where ID = ${req.body.id}`, function(err, result, fields) {
      res.send(JSON.stringify(result));
    });
  });
});


module.exports = router;
