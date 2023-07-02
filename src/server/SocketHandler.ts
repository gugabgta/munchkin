import Game from "../classes/Game";
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
            socket.on("join", this.joined.bind(this))
            socket.on("disconnect", (reason) => {
                if (reason === 'server shutting down') {
                    return
                }
                console.error('something went wrong: ', reason)
                this.lobby = this.lobby.filter(player => player.id !== socket.id) ?? []
            });
            socket.on("showCards", this.sendCardsToClient.bind(this))
            socket.on("start", this.startGame.bind(this))
            socket.on("playCard", this.playCard.bind(this))
        })
    }

    joined(socket_id: string, name: string): void {
        console.log(`${name} joined the lobby`)
        this.lobby.push(new Player(name, socket_id))
        this.lobbyState()
    }

    lobbyState(): void {
        const message = this.lobby.map(player => {
            return `${player.name} - ${player.id}`
        })
        this.io.emit('lobby_state', message)
    }

    sendCardsToClient(socket_id: string): void {
        console.log('sending cards to client ' + socket_id)
        const player = this.game.players.find(player => player.id === socket_id)
        if (!player) {
            return
        }
        this.io.to(socket_id).emit('cards', player.cards)
    }

    startGame(shuffle: boolean = true): void {
        this.lobby.forEach(player => {
            this.game.assignPlayer(player)
        })
        this.lobby = []
        this.game.setup(4, shuffle)
    }

    playCard(socket_id: string, card_id: string): void {
        if (this.game.isActivePlayer(socket_id)) {
            card_id
        }
    }
}
