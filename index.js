require("dotenv").config();
const sequelize = require('./models')
const server = require("./server");
const PORT = process.env.PORT || 3700;

const io = require("./socket-io")(server);
const initListeners = require("./listeners");
const socketAuth = require("./listeners/socket-auth");

console.log("🍔  Connecting to database")
sequelize.sequelize
  .authenticate()
  .then(() => {
    console.log("🍔  Connection has been established successfully.");
    socketAuth(io);
    initListeners(io);

    server.listen(PORT, () =>
      console.log(`📡  Server listening on port ${PORT} \n`)
    );
  })
  .catch((error) => {
    console.error("❗️  Unable to connect to the database:", error.message);
  });
