import { Card } from "./classes/Card"
import { Game } from "./classes/Game"
import { Deck } from "./classes/Deck"
import { Player } from "./classes/Player"
import { JsonParser } from "./parsers/JsonParser"
import * as fs from 'fs'
import { io } from "./server/app"
import { ServerToClientEvents as Events } from "./server/socketEvents"

let cards: Array<Card> = JSON.parse(fs.readFileSync('cards/sampleCards.json', 'utf8'))
cards = new JsonParser().parse(cards)
const deck = new Deck()

let players: Array<Player> = [];

io.on("connection", socket => {
    socket.on("join", (name: string) => {
        players.push(new Player(name))
        console.log(players)
    })
    // socket.on("text", sendCardsToClient )
    socket.on("start", startGame )
});

// io.on("connection", socket => {
//     console.log("a user connected" + socket);
//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     });
// })

cards.forEach(card => {
    deck.push(card)
})






// game.players[0].cards.forEach(card => {
//     io.emit('server_response', `${card.title} | ${card.category}`)
// })

// function sendCardsToClient(game: Game): void {
    // game.players.forEach(player => {
    //     io.emit('server_response', `${player.name} | ${player.cards.length}`)
    // })
// }

function startGame(): void {
    const game = new Game(deck, players[0])

    players.forEach(player => {
        game.assignPlayer(player)
    })

    game.setup()
}
// game.start()
