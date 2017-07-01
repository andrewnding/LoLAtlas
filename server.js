"use strict"
var express = require('express');
var path = require('path');
var logger = require('morgan');
var httpProxy = require('http-proxy');

var app = express();
app.use(logger('dev'));

app.use(express.static('public'));

//PROXY TO API
const apiProxy = httpProxy.createProxyServer({
  target:"http://localhost:3001"
});

app.use('/api', function(req, res){
  apiProxy.web(req, res);
})
// END PROXY

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(3000, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Application server is listening on port 3000')
});