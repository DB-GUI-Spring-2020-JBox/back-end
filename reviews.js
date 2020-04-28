var con = require("./connection");
var express = require("express");
var router = express.Router();

router.get("/api/reviews/:id", async (req, res) => {
  con.getConnection(res, (response) => {
    if (response.message == "fail") return;
    response.conn.query(
      `SELECT name, content, ranking, author, datePosted
	  FROM reviews JOIN profiles 
	  ON reviews.author = profiles.ID
	  WHERE reviews.ID = ${req.params.id}`,
      function (err, result, fields) {
        res.send(JSON.stringify(result));
      }
    );
  });
});

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
      `INSERT INTO reviews (ID,author,content,ranking,article) VALUES
        (${req.body.ID},${req.body.author},"${req.body.content}",${req.body.ranking},${req.body.article});`,
      function (err, result, fields) {
        res.send(JSON.stringify(result));
      }
    );
  });
});

module.exports = router;
