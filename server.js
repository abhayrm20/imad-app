var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
  'article1': {
      title: ' Article One | Abhay Rudramuni',
      heading: 'Article One',
      date: 'Aug 4, 2017',
      content: `
            <p>
                Here comes my content for my first article.Here comes my content for my first article. Here comes my content for my first article.
                Here comes my content for my first article. Here comes my content for my first article. Here comes my content for my first articl.
            </p>
            <p>
                Here comes my content for my first article.Here comes my content for my first article. Here comes my content for my first article.
                Here comes my content for my first article. Here comes my content for my first article. Here comes my content for my first articl.
            </p>
            <p>
                Here comes my content for my first article.Here comes my content for my first article. Here comes my content for my first article.
                Here comes my content for my first article. Here comes my content for my first article. Here comes my content for my first article.
            </p>`
  },
  
  
  'article2': {
      title: ' Article Two | Abhay Rudramuni',
      heading: 'Article Two',
      date: 'Aug 5, 2017',
      content: '      <p> This is my second article </p>' 
            
              },
              
  'article3': {
      title: ' Article Three | Abhay Rudramuni',
      heading: 'Article Three',
      date: 'Aug 6, 2017',
      content: '      <p> This is my third article </p>' 
            
              },
              
    
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
 
});
app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate =`
        <html>
<head>
    <title> ${title}}</title>
    <link href="ui/style.css" rel = "stylesheet" />
</head>
<div class="container"> 
    <div>
        <h1>${heading}</h1>
    </div>
    <div>
        <h3>${date}</h3>
    </div>
    <div>
        ${content}
    </div>
</div>
</html>`
;
return htmlTemplate;
}

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
