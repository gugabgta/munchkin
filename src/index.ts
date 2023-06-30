import { Card } from "./classes/Card"
import Game from "./classes/Game"
import { Deck } from "./classes/Deck"
import { Player } from "./classes/Player"
import { JsonParser } from "./parsers/JsonParser"
import * as fs from 'fs'

let cards: Array<Card> = JSON.parse(fs.readFileSync('cards/sampleCards.json', 'utf8'))
cards = new JsonParser().parse(cards)

const deck = new Deck()
cards.forEach(card => {
    deck.push(card)
})

let players: Array<Player> = [];

const game = new Game(deck)
