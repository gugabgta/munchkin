import { Card } from '../classes/Card'

abstract class Parser {
    public abstract parse(data: any): Array<Card>
}

export { Parser }
