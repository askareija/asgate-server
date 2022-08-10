module.exports = function (io) {
  console.log('🔌  Initializing socket.IO')
  io.on("connection", (socket) => {
    const query = socket.handshake.query;
    console.log(`📱  Device Connected - id: [${socket.id}] | model: [${query.model}] | machineId: [${query.machineId}]`);
    // console.log("AUTH - ", socket.handshake.auth);
    connectedId = socket.id;
    socket.on("position-change", (data) => {
      console.log(data);
      io.emit("position-change", data);
    });

    socket.on("disconnect", () => {
      console.log(`📱  Device Disconnected - id: [${socket.id}]`);
    });

    socket.on("send-sms", (msg) => {
      console.log("received Message: " + msg);
    });
    socket.on("connect-device", (data) => {
      console.log("Connected Device: ", data);
    });
  });
};
