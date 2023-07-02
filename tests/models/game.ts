import setup_deck from "./deck"
import Game from "../../src/classes/Game"
import { io as clientConnection } from "socket.io-client";

const setup_game = new Game(setup_deck)

const client_connections: Array<any> = [
    clientConnection('http://localhost:3000'),
    clientConnection('http://localhost:3000'),
    clientConnection('http://localhost:3000'),
    clientConnection('http://localhost:3000'),
]

export { setup_game, client_connections }
