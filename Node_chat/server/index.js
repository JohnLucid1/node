const express = require("express");
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
    socket.on("message", ({name, message}) => {
        io.emit('message', {name, message})
    })
})

http.listen(4000, () => {
    console.log("connected on 4000");
})