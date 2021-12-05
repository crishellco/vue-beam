const { resolve } = require('path');

export default function() {
  this.addPlugin({ src: resolve(__dirname, 'plugin.js') });
}

module.exports.meta = require('../package.json');
