const express = require("express");
const app = express();
const server = require("http").createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/send_sms", (req, res) => {
  // TODO: Add Joi Validation

  const deviceId = req.body.device_id;
  io.to(deviceId).emit("send-sms", {
    recipient: req.body.recipient,
    content: req.body.content,
  });

  return res.json({ ...req.body, status: "SENT" });
});

module.exports = server;
