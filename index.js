const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3700;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// POST SEND SMS
app.post("/send_sms", (req, res) => {
  // TODO: Add Joi Validation

  // * Emit SMS to device Id.
  const deviceId = req.body.device_id;
  io.to(deviceId).emit("send-sms", {
    recipient: req.body.recipient,
    content: req.body.content,
  });

  return res.json({ ...req.body, status: "SENT" });
});

io.use(function (socket, next) {
  console.log(socket.handshake.auth.token);
  next();
});

io.on("connection", (socket) => {
  console.log("CONNECTED - ", socket.id);
  console.log("QUERY - ", socket.handshake.query);
  console.log("AUTH - ", socket.handshake.auth);
  connectedId = socket.id;
  socket.on("position-change", (data) => {
    console.log(data);
    io.emit("position-change", data);
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECTED - ", socket.id);
  });

  socket.on("send-sms", (msg) => {
    console.log("received Message: " + msg);
  });
  socket.on("connect-device", (data) => {
    console.log("Connected Device: ", data);
  });
});

server.listen(PORT, () => console.log(`Listeing on port ${PORT}`));
