

module.exports = {
    extraNodeModules: {
      stream: require.resolve('stream-browserify'),
      process: require.resolve('process/browser.js'),
      util: require.resolve('util/util.js'),
      net: require.resolve('react-native-tcp'),
      buffer						: require.resolve('buffer/'),
      _stream_duplex				: require.resolve('readable-stream/duplex.js'),
      _stream_passthrough		: require.resolve('readable-stream/passthrough.js'),
      _stream_readable			: require.resolve('readable-stream/readable.js'),
      _stream_transform			: require.resolve('readable-stream/transform.js'),
      _stream_writable			: require.resolve('readable-stream/writable.js')
    }
  };