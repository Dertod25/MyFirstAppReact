const path = require('path')


module.exports = {

    entry: [
        path.join(__dirname, 'src', 'index.js')
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        ],
    },

    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    }
};
