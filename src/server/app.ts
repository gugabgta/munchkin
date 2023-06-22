import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        // ["http://localhost:8080", "http://localhost:8081"]
        origin: true
    }
});

io.on("connection", socket => {
    socket.on("hello", (arg) => {
      console.log(arg)
    });
});

httpServer.listen(3000);

export { httpServer, io }
