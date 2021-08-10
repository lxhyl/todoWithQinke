module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    devServer: {
      port: 8000,
      proxy: {
        "/todoApi": {
          ws: false,
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
          pathRewrite: {
            "^/todoApi": "/"
          }
        }
      }
    }
  };
  