import { Helpers } from "../src/classes/Helpers"
import { faker } from '@faker-js/faker';
import { setup_game, client_connections } from "./models/game"
import setup_deck from "./models/deck"

let io: any
let players: number = 0
const initial_deck_length: number = setup_deck.door.length + setup_deck.treasure.length

test ('initial deck length', () => {
    expect(initial_deck_length).toBe(35)
})

beforeAll((done) => {
    io = setup_game.sh.io
    players = client_connections.length
    client_connections.forEach((socket) => socket.on('connect', done))
})

afterAll(() => {
    io.close()
})

test('client join lobby', async () => {
    client_connections.forEach((socket) => {
        socket.emit('join', socket.id, faker.person.firstName())
    })
    await Helpers.sleep(100)
    expect(setup_game.sh.lobby.length).toBe(players)
})

test('client disconnect', async () => {
    client_connections[0].disconnect()

    await Helpers.sleep(100)
    expect(setup_game.sh.lobby.length).toBe(players - 1)
})

test('start game', () => {
    setup_game.sh.startGame(false)
    expect(setup_game.players.length).toBe(players - 1)
    expect(setup_game.sh.lobby.length).toBe(0)
})

test('send cards to client', async () => {
    client_connections.forEach((socket) => {
        socket.emit('showCards', socket.id)
    })
    await Helpers.sleep(100)
    expect(setup_game.sh.lobby.length).toBe(0)
    expect(setup_game.players[0].cards[0].title).toBe('Warrior7')
    expect(setup_game.players[0].cards.length).toBe(8)
    expect(setup_game.players[1].cards.length).toBe(8)
    expect(setup_game.players[2].cards.length).toBe(8)
    expect(setup_game.deck.length()).toBe(initial_deck_length - (setup_game.players.length * 8))
})
