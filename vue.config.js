const path = require("path");
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "src/scss/*.scss")]
    }
  }
  // devServer: {
  //   port: 8080,
  //   proxy: {
  //     "/apis": {
  //       target: "music.niubishanshan.top/", // target host
  //       ws: true, // proxy websockets
  //       changeOrigin: true, // needed for virtual hosted sites
  //       pathRewrite: {
  //         "^/apis": "" // rewrite path
  //       }
  //     }
  //   }
  // }
};
