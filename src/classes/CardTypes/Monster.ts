import { Card, CardType, Category, Expansion } from '../Card'

class Monster extends Card {
    constructor(
        public title: string,
        public description: string,
        public category: Category,
        public type: CardType,
        public expansion: Expansion,
        public bad_stuff: BadStuff,
    ) {
        super(title, description, category, type, expansion)
    }
}

enum BadStuff {
    LoseLevel,
    LoseItem,
    LoseClass,
    LoseRace,
    LoseGender,
    LoseHand,
    Death,
}

export { Monster, BadStuff }
