import { Card, CardType } from '../classes/Card'
import * as CardTypes from '../classes/CardTypes/Exports'
import { Parser } from './Parser'

class JsonParser extends Parser {
    buildCurse(jo: Card): CardTypes.Curse {
        return new CardTypes.Curse(
            jo.title,
            jo.description,
            jo.category,
            CardType.Curse,
            jo.expansion,
            jo.effect,
        )
    }
    buildEquipment(jo: Card): CardTypes.Equipment {
        return new CardTypes.Equipment(
            jo.title,
            jo.description,
            jo.category,
            CardType.Equipment,
            jo.expansion,
            jo.place,
            jo.effect,
        )
    }
    buildField(jo: Card): CardTypes.Field {
        return new CardTypes.Field(
            jo.title,
            jo.description,
            jo.category,
            CardType.Field,
            jo.expansion,
            jo.effect,
        )
    }
    buildInstantUse(jo: Card): CardTypes.InstantUse {
        return new CardTypes.InstantUse(
            jo.title,
            jo.description,
            jo.category,
            CardType.InstantUse,
            jo.expansion,
            jo.effect,
        )
    }
    buildMonster(jo: Card): CardTypes.Monster {
        return new CardTypes.Monster(
            jo.title,
            jo.description,
            jo.category,
            CardType.Monster,
            jo.expansion,
            jo.effect,
        )
    }
    buildSingleUse(jo: Card): CardTypes.SingleUse {
        return new CardTypes.SingleUse(
            jo.title,
            jo.description,
            jo.category,
            CardType.SingleUse,
            jo.expansion,
            jo.effect,
        )
    }
    buildSquire(jo: Card): CardTypes.Squire {
        return new CardTypes.Squire(
            jo.title,
            jo.description,
            jo.category,
            CardType.Squire,
            jo.expansion,
            jo.effect,
        )
    }
    parse(json_object: Array<Card>): Array<Card> {
        let cards: Array<Card> = []
        const build_map = {
            'Curse': this.buildCurse,
            'Equipment': this.buildEquipment,
            'Field': this.buildField,
            'InstantUse': this.buildInstantUse,
            'Monster': this.buildMonster,
            'SingleUse': this.buildSingleUse,
            'Squire': this.buildSquire,
        }

        json_object.forEach(jo => {
            cards.push(build_map[jo.type](jo))
        })

        return cards
    }
}

export { JsonParser }
