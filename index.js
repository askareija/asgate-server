const express = require("express");
const app = express();
const http = require("http");
const port = 3000;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:5500", "http://10.0.2.2", "http://10.0.2.2:3000"],
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// POST SEND SMS
app.post("/send_sms", (req, res) => {
  // TODO: Add Joi Validation

  // * Emit SMS to device Id.
  const deviceId = req.body.device_id;
  io.to(deviceId).emit("sendSMS", req.body);

  return res.json({ ...req.body, status: "SENT" });
});

io.on("connection", (socket) => {
  console.log("perangkat terhubung:", {
    id: socket.id,
    // ...socket.handshake.query,
  });

  socket.on("disconnecting", () => {
    console.log("Perangkat akan offline.", socket.id); // the Set contains at least the socket ID
  });

  socket.on("disconnect", () => {
    console.log("Perangkat terputus.", socket.id);
  });

  // Send SMS
  // socket.broadcast.to(socketid).emit('message', 'for your eyes only');
  socket.on("sendSMS", (msg) => {
    console.log("received Message: " + msg);
  });
  socket.on("connectDevice", (data) => {
    console.log("Connected Device: ", data);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
