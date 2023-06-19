import { Card, CardType, Category, Expansion } from './Card'
import { Helpers } from './Helpers'
import { Player } from './Player'
import { Deck } from './Deck'
import readline from 'readline-sync'

export class Game {
    turn: number;
    players: Array<Player>
    active_player: Player
    deck: Deck
    phase: GamePhase
    constructor(deck: Deck, first_player: Player) {
        this.turn = 0
        this.players = []
        this.active_player = first_player
        this.deck = deck
        this.phase = GamePhase.Initial
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
        const active_player_index: number = this.players.indexOf(this.active_player) ?? 0
        this.players[active_player_index].active = false

        const next_player_index: number = active_player_index + 1 >= this.players.length ? 0 : active_player_index + 1
        this.players[next_player_index].active = true
        this.active_player = this.players[next_player_index]
    }
    changeGamePhase(): void {
        // if (this.phase === GamePhase.Final) {
        //     this.phase = GamePhase.Initial
        //     return
        // }
        // this.phase += 1
    }
    kickOpenTheDoor(): void {
        const drawn_card = this.deck.door.pop()
        if (drawn_card?.type === CardType.Monster) {
            this.phase = GamePhase.Combat
        }
        console.log()
    }
    LookForTrouble(): void {
        console.log('LookForTrouble')
        let card = this.promptCardsToPlay()
        if (card?.type !== CardType.Monster) {}
    }
    EquipItem(): void {
        console.log('EquipItem')
    }
    FightTheMonster(): void {
        console.log('FightTheMonster')
    }
    JoinCombat(): void {
        console.log('JoinCombat')
    }
    DeclineToHelp(): void {
        console.log('DeclineToHelp')
    }
    AskForHelp(): void {
        console.log('AskForHelp')
    }
    UseItem(): void {
        console.log('UseItem')
    }
    RunAway(): void {
        console.log('RunAway')
    }
    ShareTheLoot(): void {
        console.log('ShareTheLoot')
    }
    SayGGEZ(): void {
        console.log('SayGGEZ')
    }
    Bargain(): void {
        console.log('Bargain')
    }
    SellItems(): void {
        console.log('SellItems')
    }
    EndTurn(): void {
        console.log('EndTurn')
    }
    start(): void {
        while (true) {
            let p = this.active_player.name
            // let res: string = readline.question(`What will ${p} do during the ${this.phase} phase?\n`);
            // let action: GameActions = GameActions[res]
            let res = GameActions['LookForTrouble']

            // console.log(Object.keys(allowed_actions[this.phase]).includes(res))
            if (!allowed_actions[this.phase].includes(res)) {
                console.log('Invalid action')
                break
                // continue
            }
            let method_map = {
                [GameActions.KickOpenTheDoor]: this.kickOpenTheDoor,
                [GameActions.LookForTrouble]: this.LookForTrouble,
                [GameActions.EquipItem]: this.EquipItem,
                [GameActions.FightTheMonster]: this.FightTheMonster,
                [GameActions.JoinCombat]: this.JoinCombat,
                [GameActions.DeclineToHelp]: this.DeclineToHelp,
                [GameActions.AskForHelp]: this.AskForHelp,
                [GameActions.UseItem]: this.UseItem,
                [GameActions.RunAway]: this.RunAway,
                [GameActions.ShareTheLoot]: this.ShareTheLoot,
                [GameActions.SayGGEZ]: this.SayGGEZ,
                [GameActions.Bargain]: this.Bargain,
                [GameActions.SellItems]: this.SellItems,
                [GameActions.EndTurn]: this.EndTurn,
            }
            method_map[res].call(this)
            break;
        }
    }
    promptCardsToPlay(): Card {
        const player_cards = this.active_player.cards
        const cards_to_play_string = player_cards.reduce((acc, card, index) => {
            return `${acc} ${index}: ${card.title}\n`
        }, '')
        let res: string = readline.question(`choose a card to play: \n${cards_to_play_string}`);
        return player_cards[parseInt(res)]
    }
}

enum GamePhase {
    Initial = 'Initial',
    Combat = 'Combat',
    SpoilTheDungeon = 'SpoilTheDungeon',
    Idle = 'Idle',
    Charity = 'Charity',
    Final = 'Final',
}

enum GameActions {
    KickOpenTheDoor,
    LookForTrouble,
    EquipItem,
    FightTheMonster,
    JoinCombat,
    DeclineToHelp,
    AskForHelp,
    UseItem,
    RunAway,
    ShareTheLoot,
    SayGGEZ,
    Bargain,
    SellItems,
    EndTurn,
}

const allowed_actions: Record<GamePhase, Array<GameActions>> = {
    [GamePhase.Initial]: [
        GameActions.KickOpenTheDoor,
        GameActions.LookForTrouble,
        GameActions.EquipItem,
    ],
    [GamePhase.Combat]: [
        GameActions.FightTheMonster,
        GameActions.JoinCombat,
        GameActions.DeclineToHelp,
        GameActions.AskForHelp,
        GameActions.UseItem,
        GameActions.RunAway,
    ],
    [GamePhase.SpoilTheDungeon]: [
        GameActions.ShareTheLoot,
        GameActions.SayGGEZ,
    ],
    [GamePhase.Idle]: [
        GameActions.Bargain,
        GameActions.SellItems,
        GameActions.ShareTheLoot,
        GameActions.EquipItem,
    ],
    [GamePhase.Charity]: [
        GameActions.ShareTheLoot,
    ],
    [GamePhase.Final]: [
        GameActions.EndTurn
    ],
}
