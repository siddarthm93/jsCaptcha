const http = require('http');
var fs = require('fs');
var url = require('url');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  
  var pathname = url.parse(req.url).pathname;

  console.log("Request for " + pathname + " received.");
  fs.readFile('index.html',function(err, data){
  if(err)
    {
      console.log(err);
      res.writeHead(404,{'Content-Type':'text/html'});
  }
  else
  {
  
  res.statusCode = 200 ;
  res.writeHeader(200,'Content-Type', 'text/html');
  res.write(data.toString());
  res.end();
}
});


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});