import { Card, CardType, Category, Expansion } from '../Card'

class InstantUse extends Card {
    constructor(
        public title: string,
        public description: string,
        public category: Category,
        public type: CardType,
        public expansion: Expansion,
        public effect: IUEffect,
    ) {
        super(title, description, category, type, expansion)
    }
}

enum IUEffect {
    LevelUp,
    CurseBreaker,
    MonsterBuff,
    MonsterDebuff,
    BattleBuff,
    InocencePotion
}

export { InstantUse, IUEffect }
