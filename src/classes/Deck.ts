import { Card, CardType, Category, Expansion } from './Card'
import { helpers } from './Helpers'

class Deck {
    door: Array<Card>
    treasure: Array<Card>
    constructor() {
        this.door = []
        this.treasure = []
    }
    push(card: Card): void {
        if (card.category === Category.Door) {
            this.door.push(card)
        }

        if (card.category === Category.Treasure) {
            this.treasure.push(card)
        }
    }
    shuffle(category: Category = Category.Any): void {
        if (category === Category.Any) {
            this.door = helpers.shuffle(this.door)
            this.treasure = helpers.shuffle(this.treasure)
        }

        if (category === Category.Door) {
            this.door = helpers.shuffle(this.door)
        }

        if (category === Category.Treasure) {
            this.treasure = helpers.shuffle(this.treasure)
        }
    }
}

export { Deck }
