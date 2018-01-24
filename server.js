const express = require ("express");
const app = express();
const path = require("path");
const proxy = require('express-http-proxy');

app.use(express.static(path.join(__dirname, "public")));
app.use('/api', proxy('http://localhost:8080'));

app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(8081,function(){
  console.log(8081,"server on port 8081");
})
