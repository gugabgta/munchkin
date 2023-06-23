import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "./socketEvents"

const app = express();
const httpServer = createServer(app);
const server_options = {
    cors: {
        origin: true // ["http://localhost:8080", "http://localhost:8081"]
    }
}
const io = new Server/*<
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData
>*/(httpServer, server_options);

httpServer.listen(3000);

export { httpServer, io }
