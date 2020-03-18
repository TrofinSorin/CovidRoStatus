const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = function({ env, paths }) {
  return {
    webpack: {
      alias: {
        environment: path.join(__dirname, 'src', 'environments', process.env.CLIENT_ENV)
      }
    },
    plugins: [
      {
        plugin: CracoAlias,
        options: {
          aliases: {
            '@shared': 'src/_shared'
          }
        }
      }
    ]
  };
};