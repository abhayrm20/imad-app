var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require ('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-Parser');

var config = {
    user: 'abhayrm01',
    database: 'abhayrm01',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));



function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate =`
        <html>
<head>
    <title> ${title}</title>
    <link href="/ui/style.css" rel = "stylesheet" />
</head>
<div class="container"> 
    <div>
        <h1>${heading}</h1>
    </div>
    <div>
        <h3>${date.toDateString()}</h3>
    </div>
    <div>
        ${content}
    </div>
</div>
</html>`
;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
 
});


var Pool = new Pool(config);

app.get('/db-test', function (req, res) {
   Pool.query('select * from article;', function(err,result) {
      if (err) {
            res.status(500).send(err.toString());
      }
      else {
            res.send(JSON.stringify(result.rows));
      }
   
   }); 
});

app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



app.get('/ui/login.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.js'));
});

app.get('/guest', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'timer2.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/articles/:articleName', function (req, res) {
  Pool.query("select * from articles where term=$1", [req.params.articleName] , function(err,result){
   if (err) {
       res.status(500).send(err.toString());
       }
    else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        }
        else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
});

app.get('/:articleName', function (req,res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});










// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
