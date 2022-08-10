const logger = require('../logger')

module.exports = function (io) {
  logger.info('🔌 Initializing socket.IO')
  io.on("connection", (socket) => {
    const query = socket.handshake.query;
    logger.info(`📱  Device Connected - id: [${socket.id}] | model: [${query.model}] | machineId: [${query.machineId}]`);
    // logger.info("AUTH - ", socket.handshake.auth);
    connectedId = socket.id;
    socket.on("position-change", (data) => {
      logger.info(data);
      io.emit("position-change", data);
    });

    socket.on("disconnect", () => {
      logger.info(`📱  Device Disconnected - id: [${socket.id}]`);
    });

    socket.on("send-sms", (msg) => {
      logger.info("received Message: " + msg);
    });
    socket.on("connect-device", (data) => {
      logger.info("Connected Device: ", data);
    });
  });
};
