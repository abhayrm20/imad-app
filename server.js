var express = require('express');
var morgan = require('morgan');
var path = require('path');


var app = express();
app.use(morgan('combined'));

app.get('/traffic', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'timer.html'));
});

app.get('/server', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'server.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/guest', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'timer2.html'));
});

app.get('/hidden', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'hidden.html'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
