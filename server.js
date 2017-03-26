const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();


(function initWebpack() {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        lazy: true,
        filename: "bundle.js",
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
    }));
})();
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static(__dirname + '/'));


app.get(/.*/, function root(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
    const address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
});
