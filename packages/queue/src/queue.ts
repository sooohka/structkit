import util from 'node:util'

const SymbolQueueBuf = Symbol('data')

declare global {
    interface Queue<T> {
        // symbol값을 외부로 노출시키지 않으면 접근이 불가함으로 private이 보장된다??
        [SymbolQueueBuf]: T[]

        /**
         * Appends a new element with a specified value to the end of the Queue.
         */
        enqueue(value: T): void

        /**
         * Removes the first element from the Queue.
         * @returns The first element from the Queue.
         */
        dequeue(): T | undefined

        /**
         * Returns the first element from the Queue.
         * @returns The first element from the Queue.
         */
        peek(): T | undefined

        /**
         * Returns true if the Queue is empty.
         * @returns Returns true if the element in the Queue is empty, otherwise false.
         */
        isEmpty(): boolean

        /**
         * Clears the Queue.
         */
        clear(): void

        /**
         * @returns a boolean indicating whether an element with the specified value exists in the Queue or not.
         */
        has(value: T): boolean

        /**
         * Executes a provided function once for each value in the Queue.
         */
        forEach(callbackfn: (value: T, value2: T, queue: Queue<T>) => void, thisArg?: any): void

        /**
         * @returns the number of elements in Queue.
         */
        readonly size: number

        [Symbol.toStringTag]: string
    }

    /**
     * iterable
     */
    interface Queue<T> {
        /** Iterates over values in the queue. */
        [Symbol.iterator](): QueueIterator<T>

        /**
         * Returns an iterable of [index, value] pairs for every value in the queue.
         */
        entries(): QueueIterator<[number, T]>

        /**
         * Returns an iterable of indices in the queue.
         */
        keys(): QueueIterator<number>

        /**
         * Returns an iterable of values in the queue.
         */
        values(): QueueIterator<T>
    }

    interface ReadonlyQueue<T> {
        /**
         * Executes a provided function once per each value in the queue, in insertion order.
         * @param callbackfn 
         * @param thisArg 
         */
        forEach(callbackfn: (value: T, value2: T, queue: ReadonlyQueue<T>) => void, thisArg?: any): void
        /**
         * Returns true if the Queue contains the specified value.
         * @param value 
         */
        has(value: T): boolean
        readonly size: number
    }

    /**
     * iterable
     */
    interface ReadonlyQueue<T> {
        /** Iterates over values in the queue. */
        [Symbol.iterator](): QueueIterator<T>

        /**
         * Returns an iterable of [index, value] pairs for every value in the queue.
         */
        entries(): QueueIterator<[number, T]>

        /**
         * Returns an iterable of indices in the queue.
         */
        keys(): QueueIterator<number>

        /**
         * Returns an iterable of values in the queue.
         */
        values(): QueueIterator<T>
    }

    interface QueueConstructor {
        new <T = any>(values?: readonly T[] | null): Queue<T>
        <T>(): Queue<T>
        <T>(...items: T[]): Queue<T>
        readonly prototype: Queue<any>
    }

    /**
     * iterable
     */
    interface QueueConstructor {
        new <T>(iterable?: Iterable<T> | null): Queue<T>
    }

    interface QueueIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
        [Symbol.iterator](): QueueIterator<T>
    }

    // interface QueueConstructor {
    //     readonly [Symbol.species]: QueueConstructor
    // }
    var Queue: QueueConstructor
    var aarr: ArrayConstructor
    var set: SetConstructor
}

export function Queue<T>(this: Queue<T>, arg: readonly T[]): Queue<T> {
    if (!new.target) {
        return new (Queue as any)(arg)
    }

    // NOTE: 일단은 구현이 우선임으로 array로 구현한다. 추후에 연결리스트로 변경 고려
    Object.defineProperty(this, SymbolQueueBuf, {
        value: arg ?? [],
        writable: true,
        enumerable: true,
        configurable: true,
    })

    return this
}

;(function defineQueueConstructorProperties() {})()
//
;(function defineQueueProperties() {
    Object.defineProperty(Queue.prototype, 'enqueue', {
        value: function <T>(this: Queue<T>, value: T) {
            this[SymbolQueueBuf].push(value)
        },
    })
    Object.defineProperty(Queue.prototype, 'dequeue', {
        value: function <T>(this: Queue<T>): T | undefined {
            return this[SymbolQueueBuf].shift()
        },
    })
    Object.defineProperty(Queue.prototype, 'peek', {
        value: function <T>(this: Queue<T>): T | undefined {
            return this[SymbolQueueBuf][0]
        },
    })
    Object.defineProperty(Queue.prototype, 'isEmpty', {
        value: function <T>(this: Queue<T>) {
            return this[SymbolQueueBuf].length === 0
        },
    })
    Object.defineProperty(Queue.prototype, 'clear', {
        value: function <T>(this: Queue<T>) {
            this[SymbolQueueBuf] = []
        },
    })
    Object.defineProperty(Queue.prototype, 'has', {
        value: function <T>(this: Queue<T>, value: T) {
            return this[SymbolQueueBuf].includes(value)
        },
    })
    Object.defineProperty(Queue.prototype, 'forEach', {
        value: function <T>(this: Queue<T>, callbackfn: (value: T, value2: T, queue: Queue<T>) => void, thisArg?: any) {
            const buf = this[SymbolQueueBuf]
            for (let i = 0; i < buf.length; i++) {
                const value = buf[i]!
                callbackfn.call(thisArg, value, value, this)
            }
        },
    })
    Object.defineProperty(Queue.prototype, 'size', {
        get: function <T>(this: Queue<T>) {
            return this[SymbolQueueBuf].length
        },
    })

    /**
     * iterable
     */
    Object.defineProperty(Queue.prototype, Symbol.iterator, {
        configurable: false,
        enumerable: true,
        writable: false,
        value: function <T>(this: Queue<T>) {
            return this[SymbolQueueBuf][Symbol.iterator]()
        },
    })
    Object.defineProperty(Queue.prototype, 'entries', {
        value: function <T>(this: Queue<T>) {
            let i = 0
            const size = this.size
            const buf = this[SymbolQueueBuf]
            const name = this[Symbol.toStringTag]

            return {
                next: function () {
                    let result
                    if (i < size) {
                        result = {done: false, value: [i, buf[i]]}
                    } else {
                        result = {done: true, value: undefined}
                    }
                    i++

                    return result
                },
                [Symbol.iterator]: function () {
                    return this
                },
                [util.inspect.custom](depth: number, opts: util.InspectOptionsStylized) {
                    const body = buf.map((v, idx) => `[ ${util.inspect(idx, opts)}, ${util.inspect(v, opts)} ]`).join(', ')
                    return `[${name} Entries] { ${body} }`
                },
            }
        },
    })
    Object.defineProperty(Queue.prototype, 'keys', {
        value: function <T>(this: Queue<T>) {
            let i = 0
            const size = this.size
            const buf = this[SymbolQueueBuf]
            const name = this[Symbol.toStringTag]

            return {
                next: function () {
                    let result
                    if (i < size) {
                        result = {done: false, value: i}
                    } else {
                        result = {done: true, value: undefined}
                    }
                    i++
                    return result
                },
                [Symbol.iterator]: function () {
                    return this
                },
                [util.inspect.custom](depth: number, opts: util.InspectOptionsStylized) {
                    const body = buf.map((v, idx) => `${util.inspect(idx, opts)}`).join(', ')
                    return `[${name} Iterator] { ${body} }`
                },
            }
        },
    })
    Object.defineProperty(Queue.prototype, 'values', {
        value: function <T>(this: Queue<T>) {
            let i = 0
            const size = this.size
            const buf = this[SymbolQueueBuf]
            const name = this[Symbol.toStringTag]

            return {
                next: function () {
                    let result
                    if (i < size) {
                        result = {done: false, value: buf[i]}
                    } else {
                        result = {done: true, value: undefined}
                    }
                    i++
                    return result
                },
                [Symbol.iterator]: function () {
                    return this
                },
                [util.inspect.custom](depth: number, opts: util.InspectOptionsStylized) {
                    const body = buf.map((v) => `${util.inspect(v, opts)}`).join(', ')
                    return `[${name} Iterator] { ${body} }`
                },
            }
        },
    })

    /**
     * etc
     */
    Object.defineProperty(Queue.prototype, Symbol.toStringTag, {
        value: 'Queue',
    })
    Object.defineProperty(Queue.prototype, util.inspect.custom, {
        value: function <T>(this: Queue<T>, depth: number, opts: util.InspectOptionsStylized) {
            const buf = this[SymbolQueueBuf]
            const name = this[Symbol.toStringTag]
            const size = this.size

            const body = buf.map((v) => `${util.inspect(v, opts)}`).join(', ')
            return `${name}(${size}) { ${body} }`
        },
    })
})()

// global에 할당
global.Queue = Queue as unknown as QueueConstructor
