let http = require('http');
let koa = require('koa');
let logger = require('koa-logger');
let route = require('koa-route');
let serve = require('koa-static');

let routes = require( './routes');

let app = koa();

app.use(logger());
app.use(serve('./public'));

app.use(route.get('/api/list/page/:page', routes.getList));
app.use(route.get('/api/journal/:alias', routes.getJournal));
app.use(route.delete('/api/journal/:alias', routes.deleteJournal));
app.use(route.post('/api/journal', routes.postJournal));
app.use(route.put('/api/journal', routes.putJournal));

// Create HTTP Server
http.createServer(app.callback()).listen(3000);
console.log('Server listening on port 3000');

module.exports = app;