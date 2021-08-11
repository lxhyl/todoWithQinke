module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    devServer: {
      port: 8000,
      proxy: {
        "/todoApi": {
          ws: false,
          target: "http://192.168.137.144:8000",
          changeOrigin: true,
          pathRewrite: {
            "^/todoApi": "/"
          }
        }
      }
    }
  };
  