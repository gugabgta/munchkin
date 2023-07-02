import { JsonParser } from "../../src/parsers/JsonParser"
import * as fs from 'fs'
import { Card } from "../../src/classes/Card"
import { Deck } from "../../src/classes/Deck"

let cards: Array<Card> = JSON.parse(fs.readFileSync('cards/sampleCards.json', 'utf8'))

cards = new JsonParser().parse(cards)
const setup_deck = new Deck()
cards.forEach(card => { setup_deck.push(card) })

export default setup_deck
