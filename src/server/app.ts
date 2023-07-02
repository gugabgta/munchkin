import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Card } from "../classes/Card"

const app = express();

interface ServerToClientEvents {
    noArg: () => void
    text: (a: string) => void
    join: (socket_id: string, name: string) => void
    start: () => void
    cards: (cards: Array<Card>) => void
    showCards: (socket_id: string) => void
    playCard: (socket_id: string, card_id: string) => void
}

function io(port = 3000) {
    const httpServer = createServer(app);
    const server_options = {
        cors: {
            origin: true // ["http://localhost:8080", "http://localhost:8081"]
        }
    }

    httpServer.listen(port);
    return new Server<ServerToClientEvents>(httpServer, server_options);
}

export default io
