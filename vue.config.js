module.exports = {
  configureWebpack: {
    mode: 'production',
    optimization: {},
  },

  css: { extract: false },

  lintOnSave: process.env.NODE_ENV !== 'production',

  productionSourceMap: false,
};
