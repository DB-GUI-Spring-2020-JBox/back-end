var con = require("./connection");
var express = require("express");
var router = express.Router();

router.get("/api/reviews/:id", async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == "fail") return;
    response.conn.query(
      `SELECT profiles.name, reviews.content, reviews.ranking, reviews.author, reviews.datePosted, reviews.ID, articles.title, reviews.article 
	  FROM reviews JOIN profiles
	  ON reviews.author = profiles.ID
	  INNER JOIN articles 
	  ON reviews.article = articles.ID
	  WHERE articles.author = ${req.params.id}`,
      function (err, result, fields) {
        res.send(JSON.stringify(result));
      }
    );
  });
});
//    response.conn.query(`SELECT * FROM articles INNER JOIN follows ON follows.followed = articles.author WHERE follower = ${req.params.uderId}`, function(err, results, fields) {

router.get("/api/reviews", async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == "fail") return;
    response.conn.query("SELECT * FROM reviews", function (
      err,
      result,
      fields
    ) {
      res.send(JSON.stringify(result));
    });
  });
});

router.delete("/api/reviews", async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == "fail") return;
    response.conn.query(
      `delete from reviews where ID = ${req.body.id}`,
      function (err, result, fields) {
        res.send(JSON.stringify(result));
      }
    );
  });
});

router.post("/api/reviews", async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == "fail") return;
    response.conn.query(
      `INSERT INTO reviews (author,content,ranking,article) VALUES
        (${req.body.author},"${req.body.content}",${req.body.ranking},${req.body.article});`,
      function (err, result, fields) {
        res.send(JSON.stringify(result));
      }
    );
  });
});

module.exports = router;
