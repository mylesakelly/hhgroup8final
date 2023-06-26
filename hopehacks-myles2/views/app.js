const fs = require("fs");
const express = require("express");
const app = express();
const axios = require('axios');
const https = require("https");
const bodyParser = require("body-parser");




const port = 8000;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});


// app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
    const number = req.body.number;
  
    const options = {
      method: 'GET',
      url: `https://numbersapi.p.rapidapi.com/${number}/trivia`,
      params: {
        fragment: 'true',
        notfound: 'floor',
        json: 'true'
      },
      headers: {
        'X-RapidAPI-Key': '232b08ccbemsh2d35d2be8f36a45p1b7df0jsn53bbb59fd7e2',
        'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const trivia = response.data.text;

      res.status(200).render('home', { trivia }); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from the API.');
  }
  });


// get requests from html to server

// app.get('/', (req, res) => {
//   res.render(‘home’, );
//  });

app.get('/404', (req, res) => {
    res.status(200).sendFile(__dirname + '/404.html');
});

app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/login.html');
});


app.get('/home', (req, res) => {
  res.render('views/home.ejs',{message:'errorMessage'})

  
});

app.get('/admin', (req, res) => {
    res.status(200).sendFile(__dirname + '/admin.html');
});
