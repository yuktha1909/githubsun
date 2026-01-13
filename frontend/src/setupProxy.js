// frontend/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',                   // match all /api/* calls
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
      // ↳ Remove any pathRewrite block so /api stays intact
      // pathRewrite: { '^/api': '' },
    })
  );
};
