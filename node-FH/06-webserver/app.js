const express = require('express')
const app = express();
const port = 8080;

//middleware, servir contenido estatico
app.use( express.static('public') );

app.get('/generic', function (req, res) {
  res.sendFile(__dirname + '/public/generic.html');
});

app.get('/elements', function (req, res) {
  res.sendFile(__dirname + '/public/elements.html');
});

// app.get('/', function (req, res) {
//   res.send('Home Page')
// });

// app.get('/hola-mundo', function (req, res) {
//   res.send('Hello World desde su ruta');
// });

// app.get('*', function (req, res) {
//   res.sendFile(__dirname + '/public/404.html');
//   // res.send('404 | Page not found')
// });

app.listen(port, ()=>{
  console.log(`App listening at http://localhost:${port}`);
})