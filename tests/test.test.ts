import { Card } from "../src/classes/Card"
import Game from "../src/classes/Game"
import { Deck } from "../src/classes/Deck"
import { Player } from "../src/classes/Player"
import { JsonParser } from "../src/parsers/JsonParser"
import * as fs from 'fs'
import {describe, expect, test} from '@jest/globals';

let cards: Array<Card> = JSON.parse(fs.readFileSync('cards/sampleCards.json', 'utf8'))
cards = new JsonParser().parse(cards)

const deck = new Deck()
cards.forEach(card => {
    deck.push(card)
})

test('cards in sample file', () => { expect(cards.length).toBe(22) })
//
// let players: Array<Player> = [];

// const game = new Game(deck)
