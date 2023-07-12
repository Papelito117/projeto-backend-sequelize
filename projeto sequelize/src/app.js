
const routes = require('./routers/route');
const exphbs = require('express-handlebars');
let cookieParser = require('cookie-parser');
let session = require('express-session');
const middlewares = require('./middlewares/middlewares');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());
app.use(session({ secret: 'textosecreto', saveUninitialized: true, cookie: { maxAge: 30 * 60 * 1000 } }));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', extname: '.handlebars' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares.logRegister, middlewares.sessionControl)
app.use(routes);

app.use(
	express.urlencoded({
		extended: true
	})
)

app.listen(8082, function () {
	console.log("Servidor no http://localhost:8082");
});