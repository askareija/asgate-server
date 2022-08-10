const { Server } = require("socket.io");

module.exports = function (server) {
  const io = new Server(server)
  return io;
};
