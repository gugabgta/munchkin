class Helpers {
    shuffle(array: Array<any>): Array<any> {
        let current_index = array.length, random_index
        while (current_index != 0) {
            random_index = Math.floor(Math.random() * current_index)
            current_index --
            [array[current_index], array[random_index]] = [array[random_index], array[current_index]]
        }
        return array
    }
}

const helpers = new Helpers()

export { helpers }
