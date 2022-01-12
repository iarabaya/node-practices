const http = require('http');

http.createServer( (req, res) => {

  // res.writeHead(200,{'Content-Type': 'text/plain'});
  // res.writeHead(404);
  // res.write('404 | page not found');
  // res.setHeader('Content-Disposition','attachment; filename=lista.csv');
  // res.writeHead(200,{'Content-Type': 'application/csv'});

  // res.write('id, nombre\n');
  // res.write('1, Fernando\n');
  // res.write('2, Maria\n');
  // res.write('3, Juan\n');
  // res.write('4, Pedro\n');
  res.write('Hola mundo');
  res.end();
}).listen( 8080 );

console.log('Escuchando el puerto',8080)