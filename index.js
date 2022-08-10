const server = require('./server')
const PORT = process.env.PORT || 3700;

const io = require('./socket-io')(server)
const initListeners = require("./listeners")
const socketAuth = require('./listeners/socket-auth')

socketAuth(io);
initListeners(io);

server.listen(PORT, () => console.log(`📡  Server listening on port ${PORT} \n`));
