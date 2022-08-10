require("dotenv").config();
const sequelize = require("./models");
const server = require("./server");
const PORT = process.env.PORT || 3700;
const logger = require("./logger");

const io = require("./socket-io")(server);
const initListeners = require("./listeners");
const socketAuth = require("./listeners/socket-auth");
logger.info("🌐 --- ASGATE API SERVER ---");

logger.info("🍔 Connecting to database");
sequelize.sequelize
  .authenticate()
  .then(() => {
    logger.info("🍔 Connection has been established successfully.");
    socketAuth(io);
    initListeners(io);

    server.listen(PORT, () =>
      logger.info(`📡 Server listening on port ${PORT} \n`)
    );
  })
  .catch((error) => {
    logger.error("❗️ Unable to connect to the database:", error);
  });
