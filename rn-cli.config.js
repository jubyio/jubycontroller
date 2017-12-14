const extraNodeModules = require('node-libs-browser');

module.exports = {
    extraNodeModules: {
      ...extraNodeModules,
      net: require.resolve('react-native-tcp'),
    },
  };