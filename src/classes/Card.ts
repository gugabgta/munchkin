import { Helpers } from "./Helpers"

interface Card {
    id: string,
    title: string
    description: string
    type: CardType
    expansion: Expansion
    category: Category
    effect: any
    bad_stuff: any
    place: any
}

enum CardType {
    Monster = 'Monster',
    SingleUse = 'SingleUse',
    InstantUse = 'InstantUse',
    Equipment = 'Equipment',
    Curse = 'Curse',
    Squire = 'Squire',
    Field = 'Field',
}

enum Category {
    Door = 'Door',
    Treasure = 'Treasure',
    Any = 'Any',
}

enum Expansion {
    Vanilla,
}

class Card {
    constructor(
        public title: string,
        public description: string,
        public category: Category,
        public type: CardType,
        public expansion: Expansion,
    ) {
        this.id = Helpers.uuidv4()
    }
}

export { Card, CardType, Category, Expansion }
