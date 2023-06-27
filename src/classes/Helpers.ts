class Helpers {
    static shuffle(array: Array<any>): Array<any> {
        let current_index = array.length, random_index
        while (current_index != 0) {
            random_index = Math.floor(Math.random() * current_index)
            current_index --
            [array[current_index], array[random_index]] = [array[random_index], array[current_index]]
        }
        return array
    }

    static camelCase(str: string): string {
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    }

    static uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0
            const v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }
}

export { Helpers }
