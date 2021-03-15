var createError = require('http-errors');
var express = require('express'); // Lo utilizamos para el sistema de ruteo.
var path = require('path'); // Facilita el uso de rutas de archivos y directorios.
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override"); // Requiero METHOD_OVERRIDE para utilizar PUT y DELETE en el CRUD.
var session = require("express-session");
const localUsers= require("./middlewares/localUsers")


var app = express(); // Ejecutamos Express

// Configuracion del motor de vistas
app.set('views', path.join(__dirname, 'views')); // Indica en que ubicacion se encuentran las vistas
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Indica en que ubicacion se encuentran los archivos
app.use(methodOverride("_method"));
app.use(session({secret:"codear"}));
app.use(localUsers);

// Rutas ARCHIVOS
var homeRouter = require(path.join(__dirname,"routes","homeRouter"));
var productRouter = require(path.join(__dirname,"routes","productRouter"));
var admin = require(path.join(__dirname,"routes","admin"));
var user = require(path.join(__dirname,"routes","users"));

//===================/ RUTAS WEB /===================//
app.use('/', homeRouter);
app.use("/cursos", productRouter);
app.use("/users", user);
app.use("/admin", admin);
//===================/ RUTAS WEB /===================//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Controlador de errores
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;