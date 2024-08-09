const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'https://api.github.com',
      changeOrigin: true,
      pathRewrite: { '^/graphql': '/graphql' },
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        if (req.headers.authorization) {
          proxyReq.setHeader('Authorization', req.headers.authorization);
        }
      }
    })
  );
};
