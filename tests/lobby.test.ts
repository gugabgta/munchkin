import { connect } from "http2"
import { Card } from "../src/classes/Card"
import { Deck } from "../src/classes/Deck"
import Game from "../src/classes/Game"
import { Helpers } from "../src/classes/Helpers"
import { Player } from "../src/classes/Player"
import { JsonParser } from "../src/parsers/JsonParser"
import * as fs from 'fs'
import { io as clientConnection } from "socket.io-client";
import { faker } from '@faker-js/faker';

describe('lobby', () => {
    let cards: Array<Card> = JSON.parse(fs.readFileSync('cards/sampleCards.json', 'utf8'))
    let game: Game
    let io: any
    let connections: Array<any>

    cards = new JsonParser().parse(cards)
    const deck = new Deck()

    cards.forEach(card => {
        deck.push(card)
    })

    beforeAll((done) => {
        game = new Game(deck)
        io = game.sh.io
        connections = [
            clientConnection('http://localhost:3000'),
            clientConnection('http://localhost:3000'),
            clientConnection('http://localhost:3000'),
            clientConnection('http://localhost:3000'),
        ]
        connections.forEach((socket) => socket.on('connect', done))
    })

    afterAll(() => {
        io.close();
    });

    test('client join lobby', async () => {
        connections.forEach((socket) => {
            socket.emit('join', socket.id, faker.person.firstName())
        })
        await Helpers.sleep(500)
        expect(game.sh.lobby.length).toBe(4)
    })
})