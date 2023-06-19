import { Card } from "./classes/Card"
import { Game } from "./classes/Game"
import { Deck } from "./classes/Deck"
import { Player } from "./classes/Player"
import { JsonParser } from "./parsers/JsonParser"
import * as fs from 'fs'

let cards: Array<Card> = JSON.parse(fs.readFileSync('cards/sampleCards.json', 'utf8'))
cards = new JsonParser().parse(cards)
const deck = new Deck()

cards.forEach(card => {
    deck.push(card)
    deck.push(card)
    deck.push(card)
})

const players = [
    new Player('Gustavo'),
    new Player('Naruto'),
    new Player('Aline'),
];

const game = new Game(deck, players[0])

players.forEach(player => {
    game.assignPlayer(player)
})

game.setup()

// game.players[0].cards.forEach(card => {
//     console.log(`${card.title} | ${card.category}`)
// })

game.start()
