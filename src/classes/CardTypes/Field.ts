import { Card, CardType, Expansion, Category } from '../Card'

class Field extends Card {
    constructor(
        public title: string,
        public description: string,
        public category: Category,
        public type: CardType,
        public expansion: Expansion,
        public effect: FieldEffect,
    ) {
        super(title, description, category, type, expansion)
        this.effect = effect
    }
}

enum FieldEffect {
    NoEffect,
    Halfling,
    Warrior,
    CrossBreed,
    MountDragon,
}

export { Field, FieldEffect }
