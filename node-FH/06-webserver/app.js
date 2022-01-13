const express = require('express')
const hbs = require('hbs');

const app = express();
const port = 8080;

//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials', function (err) {});

//middleware, servir contenido estatico
app.use( express.static('public') );

app.get('/', function (req, res) {
  res.render('home', {
    nombre: 'Iara',
    titulo: 'Node Course'
  });
});

app.get('/generic', function (req, res) {
  res.render('generic', {
    nombre: 'Iara',
    titulo: 'Node Course'
  });
});

app.get('/elements', function (req, res) {
  res.render('elements', {
    nombre: 'Iara',
    titulo: 'Node Course'
  });
});

//URLs con archivos html
// app.get('/generic', function (req, res) {
//   res.sendFile(__dirname + '/public/generic.html');
// });

// app.get('/elements', function (req, res) {
//   res.sendFile(__dirname + '/public/elements.html');
// });


//URLs puras con informacion cruda o html
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