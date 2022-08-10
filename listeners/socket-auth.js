const logger = require('../logger')

module.exports = function (io) {
  logger.info('🔑 Running socket.IO auth middleware.')
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    next();
    // ...
  });
};
