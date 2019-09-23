const Express = require('express');
const Route = require('./route');
const db = require('./public/data/db.json');

var app = Express();
var router = Express.Router();
var route = new Route(app, router);
var port = process.env.PORT || 8080;


// REGISTER ROUTES -------------------------------
route.page('/', 'home');
route.page('/details', 'details');
route.page('/api', 'api');

route.api('account', 'get');
route.api('account', 'add', 'POST');

route.api('transaction', "get");
route.api('transaction', "add", true);

//app.engine('jsx', require('express-react-views').createEngine());

app.listen(port)
console.log(`ITS HAPPENING... localhost:' + ${port} ${__dirname}`);