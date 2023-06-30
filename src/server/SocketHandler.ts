import Game, { GamePhase, GameActions, allowed_actions } from "../classes/Game";
import { Player } from "../classes/Player";
import { Server } from "socket.io";

export default class SocketHandler {
    game: Game
    io: Server
    lobby: Array<Player>
    constructor(game: Game, io: Server) {
        this.game = game
        this.io = io
        this.lobby = []
        this.setupEvents()
    }

    setupEvents(): void {
        this.io.on("connection", socket => {
            console.log("a user connected");
            socket.on("join", this.joined.bind(this))
            socket.on("disconnect", this.disconnected);
            socket.on("showCards", this.sendCardsToClient.bind(this))
            socket.on("start", this.startGame.bind(this))
            socket.on("playCard", this.playCard.bind(this))
        })
    }

    joined(socket_id: string, name: string): void {
        this.lobby.push(new Player(name, socket_id))
        console.log(`${name} joined!`)
    }

    disconnected(): void {
        console.log("user disconnected");
    }

    sendCardsToClient(socket_id: string): void {
        console.log('sending cards to client ' + socket_id)
        const player = this.game.players.find(player => player.id === socket_id)
        if (!player) {
            return
        }
        this.io.to(socket_id).emit('cards', player.cards)
    }

    startGame(): void {
        this.lobby.forEach(player => {
            this.game.assignPlayer(player)
        })
        this.game.setup()
    }

    playCard(socket_id: string, card_id: string): void {
        if (this.game.isActivePlayer(socket_id)) {

        }
    }
}
