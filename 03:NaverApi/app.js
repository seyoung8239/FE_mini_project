const express = require('express');
const app = express();
const request = require('request');
const { response } = require('express');

var client_id = 'bifNDhbZFu4otqCBYfbf';
var client_secret = 'jDGB4e4DKM';

// app.use(express.static("public"));
// app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render("prac.ejs");
});

app.get('/result', (req, res) => {
  var query = req.query.search;
  var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
  var options = {
    url: api_url,
    form: {'source':'ko', 'target':'en', 'text':query},
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
  };

  request.post(api_url, options, function(error, response, body){
    if(!error && response.statusCode == 200)
    {
      var data = JSON.parse(body);
      console.log(data);
      // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      // res.end(body);
      res.render("result.ejs", {data: data});
    }
  })
});

// app.get('/', (req, res) => {
//   var query = '안녕하세요';
//   var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
//   var options = {
//     url: api_url,
//     form: {'source':'ko', 'target':'en', 'text':query},
//     headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//   };

//   request.post(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//       res.end(body);
//     } else {
//       res.status(response.statusCode).end();
//       console.log('error = ' + response.statusCode);
//     }
//   })
// });



app.listen(3000, () => {
  console.log('app start!');
});
