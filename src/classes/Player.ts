import { Card, CardType, Category, Expansion } from './Card'
import { Deck } from './Deck'
import { Helpers } from './Helpers'
import { Curse } from './CardTypes/Curse'

class Player {
    name: string
    id: string
    level: number = 1
    power: number = 0
    body: Body = new Body()
    active: boolean = false
    cards: Array<Card> = []
    curses: Array<Curse> = []
    weapons: Array<Card> = []
    equipment: Array<Card> = []
    gender: Gender = Gender.Male
    class: Array<Class> = []
    race: Array<Race> = [Race.Human]
    constructor(name: string, id: string) {
        this.name = name
        this.id = id
    }

    drawCard(deck: Deck, category: Category) {
        if (category === Category.Door) {
            this.cards.push(deck.door.pop() as Card)
        }
        if (category === Category.Treasure) {
            this.cards.push(deck.treasure.pop() as Card)
        }
    }

    shuffleCards() {
        this.cards = Helpers.shuffle(this.cards)
    }
}

class Body {
    head: Array<Card> = []
    chest: Array<Card> = []
    hand: Array<Card> = []
    feet: Array<Card> = []
}

enum Gender {
    Male,
    Female,
    NoGender,
    Androgynous,
}

enum Class {
    NoClass,
    Warrior,
    Mage,
    Thief,
    Cleric,
    Ranger,
    Bard,
}

enum Race {
    NoRace,
    Human,
    Elf,
    Dwarf,
    Halfling,
    Orc,
    Gnome,
    Goblin,
    Lizardman,
    Centaur,
}

export { Player, Gender, Class, Race }
