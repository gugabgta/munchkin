import { Card, CardType, Category, Expansion } from './Card'
import { helpers } from './Helpers'
import { Player } from './Player'
import { Deck } from './Deck'

export class Game {
    turn: number;
    players: Array<Player>
    deck: Deck
    constructor(deck: Deck) {
        this.turn = 0
        this.players = []
        this.deck = deck
    }
    assignPlayer(player: Player): void {
        this.players.push(player)
    }
    setup(cards_per_player: number = 4): void {
        if (this.players.length < 2) {
            throw new Error('You need at least 2 players to start the game')
        }

        this.deck.shuffle()
        this.players[0].active = true

        this.players.forEach(player => {
            for (let i = 0; i < cards_per_player; i++) {
                player.drawCard(this.deck, Category.Door)
                player.drawCard(this.deck, Category.Treasure)
            }
            player.shuffleCards()
        })
    }
    changeActivePlayer(): void {
        this.players.forEach(player => {
            player.active = !player.active
        })
    }
}
