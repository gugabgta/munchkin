import { Card, CardType, Category, Expansion } from '../Card'

class Curse extends Card {
    constructor(
        public title: string,
        public description: string,
        public category: Category,
        public type: CardType,
        public expansion: Expansion,
        public effect: CurseEffect,
    ) {
        super(title, description, category, type, expansion)
        this.effect = effect
    }
}

enum CurseEffect {
    LoseLevel,
    LoseItem,
    LoseClass,
    LoseRace,
    LoseGender,
    LoseHand,
}

export { Curse, CurseEffect }
