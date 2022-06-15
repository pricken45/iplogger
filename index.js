const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let latestIP = "";

app.use(express.static("public"));

app.get('/ip', (req, res) => {
    res.json({ ip: latestIP });
});

io.on("connection", (socket) => {
    console.log("connection")
    latestIP = socket.handshake.address;
});

server.listen(process.env.PORT);