const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const requestIp = require("request-ip");
app.use(requestIp.mw());

let latestIP = "";

app.set('trust proxy', true);
app.use(express.static("public"));

app.get('/ip', (req, res) => {
    res.json({ ip: latestIP });
});

app.get('/info', (req, res) => {
    latestIP = req.clientIp;
})

server.listen(process.env.PORT || 3000);