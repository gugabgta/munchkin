import { Card, CardType, Expansion, Category } from '../Card'

class Equipment extends Card {
    constructor(
        public title: string,
        public description: string,
        public category: Category,
        public type: CardType,
        public expansion: Expansion,
        public place: BodyParts,
        public effect: EquipmentEffect,
    ) {
        super(title, description, category, type, expansion)
        this.place = place
        this.effect = effect
    }
}

enum BodyParts {
    Head,
    Chest,
    Feet,
    Hands,
}

enum EquipmentEffect {
    NoEffect,
    WonderfulHat,
    PlusOneHand,
    BuffOnDiscard,
    HalflingOnly,
}

export { Equipment, EquipmentEffect }
