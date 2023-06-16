import { Card, CardType, Expansion, Category } from '../Card'

class Squire extends Card {
    constructor(
        public title: string,
        public description: string,
        public category: Category,
        public type: CardType,
        public expansion: Expansion,
        public effect: SquireEffect,
    ) {
        super(title, description, category, type, expansion)
        this.effect = effect
    }
}

enum SquireEffect {
    PlusOneBodyPiece,
}

export { Squire, SquireEffect }
