const {
    resolve
} = require("path");
const glob = require("glob"); // node的glob模块允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件.
const {
    ProvidePlugin
} = require("webpack"); // 配置全局环境变量
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包html文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包css文件
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制静态资源使用
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const uglifyjs = require('uglifyjs-webpack-plugin');//压缩js


module.exports = {
    entry: getEntry(),
    output: {
        path: resolve(__dirname, "dist"),
        publicPath: "./",
        // 多入口打包后的文件名,filename前面我们可以使用一个变量[name],这个就表示获取entry里面的key作为文件名加在前面
        filename: "js/[name].js",
    },

    performance: {
        // 关闭性能提示 https://blog.csdn.net/hzxOnlineOk/article/details/101282798
        hints: false,
    },
    //路径
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/assest"),
        },
    },

    module: {
        rules: [{
                // 处理 css
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                        },
                    },
                    "css-loader",
                ],
            },
            {
                // 处理 less
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            {
                // 处理 scss
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                // 处理图片
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: "url-loader",
                options: {
                    // 小于 8 kb 转化成baser64
                    limit: 8 * 1024,
                    // 重命名hash10 ext:源文件扩展名 指定输出路径
                    name: "imgs/[hash:10].[ext]",
                },
            },
            {
                // 处理html中的img节点
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                // 处理其他文件
                exclude: /\.(css|scss|less|js|png|jpg|gif|jpeg|html|json|ts|tsx)$/,
                loader: "file-loader",
                options: {
                    // 重命名hash10 ext:源文件扩展名 指定输出路径
                    name: "font/[hash:10].[ext]",
                    publicPath: '../',
                },
            },
            {
               //es6转es5
                test: /\.ts$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "stage-0"], //因为安装的是babel-preset-es2015，所以这里要匹配这个
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),


        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            axios: "axios",
        }),

        // // 复制静态文件
        // new CopyWebpackPlugin({
        //     patterns: [{
        //         from: resolve(__dirname, "./src/text"),
        //         to: "./text",
        //     }, ],
        // }),
        // 压缩单独CSS
        new OptimizeCssAssetsWebpackPlugin(),//压缩css
        new uglifyjs(),//压缩js
    ],
    mode: "development",//开发环境
    //     // mode: "production", // 生产环境默认压缩js
    devServer: {
        // 自动打开浏览器 -- 默认浏览器
        open: true,
        // 启动的绝对路径
        contentBase: resolve(__dirname, "dist"),
        publicPath: "/",
        // 开启gzip的压缩
        compress: true,
        // 端口号
        port: 3000,

        index:'index.html',
        // 热加载
        // hot: true,
        //服务器代理配置项
        disableHostCheck: true,
    },
}
//配置页面
// 转化格式
function getEntry() {
    let entry = {};
    glob.sync("./src/pages/**/*.js").forEach((e) => {
        let eArray = e.split("/");
        entry[eArray[eArray.length - 2]] = e;
    });

    return entry;
}

// 获取html-webpack-plugin参数的方法
const getHtmlConfig = function (name, chunks) {
    //name =>homepage/login
    let _template = `./src/pages/${name}/index.html`;
    let _filename = `${name}.html`;
    // index单独处理
    // if (name === "login") {
    //     _filename = `index.html`;
    // }
    let config = {
        template: _template, //要处理的html模板文件(打包后，生成新的html文件)
        filename: _filename,
        inject: true, // 所有js资源插入到body中
        chunks: chunks,
        minify: {
            // 去空格
            collapseWhitespace: true,
            // 移除注释
            removeComments: true,
        },
    };
    return config;
};
//入口路径
const entryObj = getEntry();

const htmlArray = [];
//
Object.keys(entryObj).forEach((element) => {
    htmlArray.push({
        _html: element, //key
        title: "",
        chunks: ["vendor", "common", element],
    });
});
//自动生成html模板
htmlArray.forEach((element) => {
    module.exports.plugins.push(
        new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks))
    );
});