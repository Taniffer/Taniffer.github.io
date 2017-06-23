module.exports = {
  devtool: 'eval-source-map',
  entry: "./app/main.js", //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build", //打包后的文件存放的地方
    filename: "bundle.js" //打包后输出文件的文件名
  },

  module: {

    rules: [

      {
        test: /\.json$/,
        loader: "json-loader"
      },

       {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader', //在webpack的module部分的loaders里进行配置即可
        query: {
          presets: [
            'es2015', 'react'
          ],
          plugins: [
            [
              "import", {
                libraryName: "antd",
                style: "css"
              }
            ] // `style: true` 会加载 less 文件
          ]
        }
      },



       {
        test: /\.css$/,
        loader: 'style-loader!css-loader' //添加对样式表的处理
      },


      {
        test:/\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]'
        }
      },


    ]
  },

  devServer: {
    publicPath: "/build/"               //配置之后发布在localhost:8080/build目录中，不配置则发布在local:8080目录
}
}
