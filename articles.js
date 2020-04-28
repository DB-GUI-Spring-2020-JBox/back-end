var con = require('./connection')
var express = require('express');
var router = express.Router();


router.get('/api/home', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`SELECT ID, title, content, author AS authorId, (SELECT name FROM profiles WHERE profiles.ID = articles.author) AS author, price, datePosted, dateUpdated, image, category FROM articles ORDER BY datePosted DESC LIMIT 10`, function(err, results, fields) {
      res.send(results);
    });
  });
});


router.get('/api/home/:userId', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`SELECT ID, title, content, author AS authorId, (SELECT name FROM profiles WHERE profiles.ID = articles.author) AS author, price, datePosted, dateUpdated, image, category FROM articles`, function(err, results, fields) {
      // response.conn.query(`SELECT * FROM articles INNER JOIN follows ON follows.followed = articles.author WHERE follower = ${req.params.userId}`, function(err, results, fields) {
      res.send(results);
    });
  });
});



router.get('/api/browse/:category', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`SELECT ID, title, content, author AS authorId, (SELECT name FROM profiles WHERE profiles.ID = articles.author) AS author, price, datePosted, dateUpdated, image, category FROM articles WHERE LOWER(category) = LOWER('${req.params.category}') ORDER BY datePosted DESC`, function(err, results, fields) {
      res.send(results);
    });
  });
});


router.get('/api/articles/:articleId', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`SELECT ID, title, content, author AS authorId, (SELECT name FROM profiles WHERE profiles.ID = articles.author) AS authorName, price, datePosted, dateUpdated, image, category FROM articles WHERE ID = ${req.params.articleId} ORDER BY datePosted DESC`, function(err, results, fields) {
      res.send(results);
    });
  });
});

router.get('/api/search/:input/:category/:filter', async (req, res) => {

  let holder = ''
  if(req.params.filter == "DESC" || req.params.filter == "ASC")
    holder = `ORDER BY datePosted ${req.params.filter}`
  else if(req.params.filter == "rating")
    holder = `ORDER BY ${req.params.filter} DESC`

  let input = req.params.input
  if(req.params.input == 0)
    input = '';

  con.getConnection(res, (response) => {

    if (response.message == 'fail') return;
    response.conn.query(`SELECT articles.*, (SELECT name FROM profiles WHERE profiles.ID = articles.author) AS authorName, r.rank AS rating
      FROM articles
      LEFT OUTER JOIN profiles ON articles.author = profiles.ID
      LEFT OUTER JOIN (SELECT AVG(ranking) AS rank, author FROM reviews GROUP BY author) AS r ON articles.author = r.author
      WHERE
        ((profiles.name LIKE '%${req.params.input}%' AND "${req.params.filter}" != "article")
          OR (articles.title LIKE '%${req.params.input}%' AND "${req.params.filter}" != "name"))
          AND (IF("${req.params.category}" != "0", (articles.category = "${req.params.category}"), 1=1))
      ${holder};`, function(err, results, fields) {
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

router.post('/api/articles', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`INSERT INTO articles (title,content,author,image,category) VALUES
                ("${req.body.title}","${req.body.content}",${req.body.author},
                "${req.body.image}","${req.body.category}")`, function(err, result, fields) {
      res.send(JSON.stringify(result));
    });
  });
});

router.delete('/api/articles/:articleId', async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == 'fail') return;
    response.conn.query(`delete from articles where ID = ${req.params.articleId}`, function(err, result, fields) {
      res.send(JSON.stringify(result));
    });
  });
});


module.exports = router;
