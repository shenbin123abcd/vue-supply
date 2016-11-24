var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: path.join(__dirname, '/src/app/entry.js'),
    output: {
        path: path.join(__dirname, './dist/js'),
        filename: "bundle.js",
        publicPath: '/js/',
    },
    watch: true,
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css",'postcss',"sass"]
            },
            //{ test: /\.jade$/, loader: "jade-html" },
            {
                test: /\.vue$/,
                loader: 'vue',
                options: {
                    // vue-loader options
                    loaders: {
                        scss: 'style!css!postcss!sass'
                    }
                },
                //options: {
                //    // vue-loader options go here
                //}
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                //query: {
                //    presets: ["latest", "stage-2"]
                //}
            },
            //{
            //  test: /\.(png|jpg|jpeg|gif|woff)$/,
            //  loader: 'url-loader'
            //},
            {
                test: /\.(png|jpg|jpeg|gif|woff)$/,
                loader: 'file',
                query: {
                    name: 'app/images/[name]_[hash].[ext]',
                    // name: '[path][name].[ext]?[hash]',
                }
            },
        ]
    },
    //vue: {
    //    loaders: {
    //        scss: 'style!css!sass'
    //    }
    //},

    //postcss: function () {
    //    return {
    //        defaults: [ autoprefixer],
    //        cleaner:  [autoprefixer({ browsers: ["> 0%"] })]
    //    };
    //},
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery",
        "vue": "Vue",
        "lodash": "_",
        //"hb": "hb",
    },




    //plugins: [
    //    new webpack.optimize.UglifyJsPlugin({
    //        compress: {
    //            warnings: false,
    //        },
    //        output: {
    //            comments: false,
    //        },
    //    }),
    //]
    // "plugins": [
    //     ["import", {
    //         style: 'css',  // 'less',
    //         libraryName: 'antd-mobile',
    //     }]
    // ]
};
