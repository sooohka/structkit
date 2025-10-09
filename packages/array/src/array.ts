Array.prototype.toString = function <T>(this: Array<T>): string {
    return this.join(',')
}

Array.prototype.add = function <T>(this: Array<T>, element: T): Array<T> {
    return [...this, element]
}
