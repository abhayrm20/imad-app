var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require ('pg').Pool;
var crypto = require('crypto');
var config = {
    user: 'abhayrm01',
    database: 'abhayrm01',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles = {
  'article1': {
      title: ' Article 1 - Go Green | Abhay Rudramuni',
      heading: 'Go Green',
      date: 'Aug 4, 2017',
      content: `
            <p>
            &nbsp&nbsp&nbsp More and more people are thinking about the environmental issues and ecological condition of Earth nowadays. Why has this problem become so relevant? What should we do to save our future? In my opinion, people have understood that their irresponsibility causes harm to the natural environment. Our planet suffers from numerous problems, which have been caused by the results of the excessive anthropogenic activity. The entire planet suffers from pollution, global warming, deforestation, extinction of biological species, etc. These problems are extremely relevant and require rapid and intensive solutions. It is possible to defeat these problems if the entire humanity changes its approach towards nature, natural resources and the value of nature for its wellbeing. In simple words, people should go green to save Earth.
            </p>
            <p>
                &nbsp&nbsp&nbsp Why should we take efforts now in order to save Earth in future? Very few people understand that it is important to change their lifestyle now in order to see the results of these changes in a few decades. Doubtless, you will not grow a big forest in a year. You can plant a small tree but it will grow to its proper height only in ten or fifteen years. To my mind, this activity resembles investment into a small firm. In a few years, the firm develops into a big company, which will provide you with the solid profit. Consequently, it is not right to say that the idea of going green is useless. When you do not see the results of your activity now, it does not mean that you will not see them in ten years.
            </p>
            <p>
                &nbsp&nbsp&nbsp Furthermore, we must not be selfish. It is important to think about the wellbeing of our children and grandchildren. We are responsible for the natural environment and problems, which will become the burden for our children. I know that many people do not care about the condition of Earth after their death. They say that it is the headache of our future generations. I suppose, it is the main problem. People do not care about future and they do not appreciate what they have. This approach is caused by greediness and consumerism. People want more money and material values in order to satisfy their needs. They are ready to exhaust the world they live in. They cut down forests, kill animals, birds and fish and pollute rivers, lakes, seas and oceans. They care about their profit and nothing more. No wonder, people open new and new plants, factories and power stations, which cause harm to the natural environment but provide them with money. It looks ridiculous when people are ready to destroy forests and pollute rivers in order to gain profit. People do not appreciate fresh air and water, though they cannot survive a minute without them. They are ready to live in the unhealthy, terribly-looking and polluted environment in order to receive more money. Finally, they will have to pay for their treatment at a hospital, because they breathe in polluted air and consume contaminated food and water.
            </p>  
            <p>
                &nbsp&nbsp&nbsp How can we save our planet from the results of our harmful activity? To begin with, we should reduce pollution, because it the cause of numerous problems. We must not litter in the street, parks and forests. We should recycle wastes in order to save our priceless natural recourses. We should use public transport more frequently, because it does not release numerous harmful gases, which cause greenhouse effect and global warming. Next, entrepreneurs should use special filters at plants, factories and power stations in order to reduce the amount of poisonous emissions into the air and water. Then, people should stop cutting down forests, because they are the lungs of Earth. Moreover, every forest is a home for thousands of animals, birds and insects, which improve the balance of ecosystems.
            </p>
            <p>
                &nbsp&nbsp&nbsp In conclusion, our unwise and extensive activity causes harm to the natural environment. We lose priceless natural resources, fresh air, water, forests, animals, birds, fish, insects, etc. People should change their lifestyle rapidly in order to stop deforestation, global warming, pollution and other problems, which can destroy the life on the planet. We ought to go green in order to save the life of future generations
            </p>
            <div class="right">- Abhay Rudramuni</div> 
            <hr/>`
                
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

function hash(input, salt) {
  var hash = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
  return hashed.toString('hex');
  
    
}



app.get('/hash/:input', function (req,res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
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

app.get('/login/vishal', function (req, res) {
  res.send(`Username: vishal <br>  Password: meanie`);
 
});

app.get('/login/apeksha', function (req, res) {
  res.send(`Username: apeksha <br>  Password: srichaitanya`);
 
});

app.get('/login/arpitha', function (req, res) {
  res.send(`Username: arpitha <br>  Password: letmein`);
 
});

app.get('/login/megha', function (req, res) {
  res.send(`Username: megha <br>  Password: piggy`);
 
});

app.get('/login/vidhya', function (req, res) {
  res.send(`Username: vidhya <br>  Password: naayi`);
 
});

app.get('/login/divya', function (req, res) {
  res.send(`Username: divya <br>  Password: fillefolle`);
 
});

app.get('/login/sharan', function (req, res) {
  res.send(`Username: sharan <br>  Password: sharanshinduja`);
 
});

app.get('/login/user', function (req, res) {
  res.send(`Username: username <br>  Password: password`);
 
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
