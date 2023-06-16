import { Card, CardType, Category, Expansion } from '../Card'

class SingleUse extends Card {
    constructor(
        public title: string,
        public description: string,
        public category: Category,
        public type: CardType,
        public expansion: Expansion,
        public effect: SUEffect,
    ) {
        super(title, description, category, type, expansion)
    }
}

enum SUEffect {
    GoldVoucher,
    SurpriseDuck,
}

export { SingleUse, SUEffect }
