let http = require('http');
let koa = require('koa');
let logger = require('koa-logger');
let route = require('koa-route');
let serve = require('koa-static');
let bodyparser = require('koa-bodyparser');

let routes = require( './routes');

let webpack = require('webpack');
let webpackMiddleware = require('koa-webpack-dev-middleware');
let webpackHotMiddleware = require('koa-webpack-hot-middleware');
let webpackConfig = require('../../webpack.config');

let app = koa();

let compiler = webpack(webpackConfig);

app.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }
});

app.use(logger());
app.use(webpackMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use(serve('./public'));

app.use(bodyparser());

app.use(route.get('/list', routes.getList));
app.use(route.post('/task', routes.postTask));
app.use(route.delete('/task/:id', routes.deleteTask));
app.use(route.put('/task/:id', routes.putTask));

// Create HTTP Server
http.createServer(app.callback()).listen(3000);
console.log('Server listening on port 3000');

module.exports = app;