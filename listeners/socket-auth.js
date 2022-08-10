module.exports = function (io) {
  console.log('🔑  Running socket.IO auth middleware.')
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    next();
    // ...
  });
};
