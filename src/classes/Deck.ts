import { Card, CardType, Category, Expansion } from './Card'
import { Helpers } from './Helpers'

class Deck {
    door: Array<Card>
    treasure: Array<Card>
    door_discard: Array<Card>
    treasure_discard: Array<Card>
    constructor() {
        this.door = []
        this.door_discard = []
        this.treasure = []
        this.treasure_discard = []
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
            this.door = Helpers.shuffle(this.door)
            this.treasure = Helpers.shuffle(this.treasure)
        }

        if (category === Category.Door) {
            this.door = Helpers.shuffle(this.door)
        }

        if (category === Category.Treasure) {
            this.treasure = Helpers.shuffle(this.treasure)
        }
    }

    pushToDiscard(card: Card): void {
        if (card.category === Category.Door) {
            this.door_discard.push(card)
        }

        if (card.category === Category.Treasure) {
            this.treasure_discard.push(card)
        }
    }

    length(): number {
        return this.door.length + this.treasure.length
    }

    discardLength(): number {
        return this.door_discard.length + this.treasure_discard.length
    }
}

export { Deck }
