const  http = require('http');

const routes = require('./routes');

console.log(routes.someText);
// function rqListener(req, res){}
// http.createServer(rqListener);

//http returns a server object
// const server = http.createServer((req,res)=>{
//   console.log(req.url, req.method, req.headers); see metadata
//   process.exit() //ends the process and closes the server
//   const url = req.url;
//   const method = req.method;
// });

const server = http.createServer(routes.handler);

server.listen(3000);