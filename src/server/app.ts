import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Card } from "../classes/Card"

const app = express();
const httpServer = createServer(app);
const server_options = {
    cors: {
        origin: true // ["http://localhost:8080", "http://localhost:8081"]
    }
}

interface ServerToClientEvents {
    noArg: () => void
    text: (a: string) => void
    join: (socket_id: string, name: string) => void
    start: () => void
    cards: (cards: Array<Card>) => void
    showCards: (socket_id: string) => void
    playCard: (socket_id: string, card_id: string) => void
}

const io = new Server<ServerToClientEvents>(httpServer, server_options);

httpServer.listen(3000);

export default io
export { httpServer }
