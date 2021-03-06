const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


function getHtmlWebpackPlugin(name, title) {
    return new HtmlWebpackPlugin({
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        title: title,
        favicon: './favicon.ico',
        chunks: ['vendor', 'common', name]
    });
}

module.exports = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'result': ['./src/page/result/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'about': ['./src/page/about/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(gif|png|jpg|woff|woff2|svg|eot|ttf)$/,
                use: [
                    {
                        loader: 'url-loader?limit=100&name=resource/[name].[ext]',
                        options: {
                            esModule: false,
                        }
                    }
                ],
            },
            {
                test: /\.string$/,
                use: [
                    {
                        loader: 'html-loader',
                    }
                ],

            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: -10,
                    minChunks: 1,
                    chunks: 'all',
                },
                common: {
                    test: path.resolve(__dirname, '/src/page/common/index.js'),
                    name: 'common',
                    chunks: 'all',
                    filename: 'js/common.js',
                    minSize: 0,
                    priority: -20,
                },
            }
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        getHtmlWebpackPlugin('index', '首页'),
        getHtmlWebpackPlugin('result', '操作结果'),
        getHtmlWebpackPlugin('user-login', '用户登录'),
        getHtmlWebpackPlugin('list', '商品列表'),
        getHtmlWebpackPlugin('detail', '商品详情'),
        getHtmlWebpackPlugin('cart', '购物车'),
        getHtmlWebpackPlugin('order-confirm', '订单确认'),
        getHtmlWebpackPlugin('order-list', '订单列表'),
        getHtmlWebpackPlugin('order-detail', '订单详情'),
        getHtmlWebpackPlugin('payment', '订单支付'),
        getHtmlWebpackPlugin('about', '关于mmall'),
        getHtmlWebpackPlugin('user-register', '用户注册'),
        getHtmlWebpackPlugin('user-pass-reset', '找回密码'),
        getHtmlWebpackPlugin('user-center', '个人中心'),
        getHtmlWebpackPlugin('user-center-update', '修改个人信息'),
        getHtmlWebpackPlugin('user-pass-update', '修改密码'),
    ],
    resolve: {
        alias: {
            Util: path.resolve(__dirname + '/src/util'),
            Page: path.resolve(__dirname + '/src/page'),
            Service: path.resolve(__dirname + '/src/service'),
            Image: path.resolve(__dirname + '/src/image'),
            Node_modules: path.resolve(__dirname + '/node_modules'),
        },
    },
    devServer: {
        hot: true,
        open: true,
        port: 8088,
        contentBase: path.join(__dirname, "dist"),
        proxy: {
            // 这里的意思是，只要本地用 /api 开头的请求，都被代理到 http://happymmall.com/api
            // 但是又配置了 pathRewrite ,将 /api 重写为 '' 所以实际上会被代理到 http://happymmall.com/
            // 比如 localhost:8088/api/lookup?key=123 会变为 http://happymmall.com/lookup?key=123
            '/api': {
                changeOrigin: true,
                target: 'http://happymmall.com/',
                pathRewrite: { '^/api': '' },
                secue: false,
                cookieDomainRewrite: {
                    ".happymmall.com": "",
                }
            },
        },


    }
};