import { Card } from "../src/classes/Card"
import { Deck } from "../src/classes/Deck"
import { JsonParser } from "../src/parsers/JsonParser"
import * as fs from 'fs'

let cards: Array<Card> = JSON.parse(fs.readFileSync('cards/sampleCards.json', 'utf8'))
cards = new JsonParser().parse(cards)

const deck: Deck = new Deck()
const total_cards = cards.length

cards.forEach(card => {
    deck.push(card)
})

test('total cards in sample file', () => {
    expect(cards.length).toBeGreaterThan(0)
    expect(total_cards).toBe(35)
})

test('total cards in deck', () => {
    expect(deck.length()).toBe(total_cards)
})

test('no cards discarded', () => {
    expect(deck.discardLength()).toBe(0)
})

test('card drawing', () => {
    deck.treasure.pop()!
    deck.door.pop()!
    expect(deck.length()).toBe(total_cards - 2)
})

test('adding to discard', () => {
    const treasure_card: Card = deck.treasure.pop()!
    const door_card: Card = deck.door.pop()!

    deck.pushToDiscard(treasure_card)
    deck.pushToDiscard(door_card)

    expect(deck.treasure_discard.length).toBe(1)
    expect(deck.door_discard.length).toBe(1)

    deck.pushToDiscard(treasure_card)

    expect(deck.treasure_discard.length).toBe(2)
    expect(deck.door_discard.length).toBe(1)
})
