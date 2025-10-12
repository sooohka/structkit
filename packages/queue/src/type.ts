import util from "node:util";

declare global {
    interface Queue<T> {
        /**
         * Appends a new element with a specified value to the end of the Queue.
         */
        enqueue(value: T): void;

        /**
         * Removes the first element from the Queue.
         * @returns The first element from the Queue.
         */
        dequeue(): T | undefined;

        /**
         * Returns the first element from the Queue.
         * @returns The first element from the Queue.
         */
        peek(): T | undefined;

        /**
         * Returns true if the Queue is empty.
         * @returns Returns true if the element in the Queue is empty, otherwise false.
         */
        isEmpty(): boolean;

        /**
         * Clears the Queue.
         */
        clear(): void;

        /**
         * @returns a boolean indicating whether an element with the specified value exists in the Queue or not.
         */
        has(value: T): boolean;

        /**
         * Executes a provided function once for each value in the Queue.
         */
        forEach(callbackfn: (value: T, value2: T, queue: Queue<T>) => void, thisArg?: any): void;

        /**
         * @returns the number of elements in Queue.
         */
        readonly size: number;

        [Symbol.toStringTag]: string;
    }

    /**
     * iterable
     */
    interface Queue<T> {
        /** Iterates over values in the queue. */
        [Symbol.iterator](): QueueIterator<T>;

        /**
         * Returns an iterable of [index, value] pairs for every value in the queue.
         */
        entries(): QueueIterator<[number, T]>;

        /**
         * Returns an iterable of indices in the queue.
         */
        keys(): QueueIterator<number>;

        /**
         * Returns an iterable of values in the queue.
         */
        values(): QueueIterator<T>;
    }

    interface ReadonlyQueue<T> {
        /**
         * Executes a provided function once per each value in the queue, in insertion order.
         * @param callbackfn
         * @param thisArg
         */
        forEach(callbackfn: (value: T, value2: T, queue: ReadonlyQueue<T>) => void, thisArg?: any): void;
        /**
         * Returns true if the Queue contains the specified value.
         * @param value
         */
        has(value: T): boolean;
        readonly size: number;
    }

    /**
     * iterable
     */
    interface ReadonlyQueue<T> {
        /** Iterates over values in the queue. */
        [Symbol.iterator](): QueueIterator<T>;

        /**
         * Returns an iterable of [index, value] pairs for every value in the queue.
         */
        entries(): QueueIterator<[number, T]>;

        /**
         * Returns an iterable of indices in the queue.
         */
        keys(): QueueIterator<number>;

        /**
         * Returns an iterable of values in the queue.
         */
        values(): QueueIterator<T>;
    }

    interface QueueConstructor {
        new <T = any>(values?: readonly T[] | null): Queue<T>;
        <T>(): Queue<T>;
        <T>(...items: T[]): Queue<T>;
        readonly prototype: Queue<any>;
    }

    /**
     * iterable
     */
    interface QueueConstructor {
        new <T>(iterable?: Iterable<T> | null): Queue<T>;
    }

    interface QueueIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
        [Symbol.iterator](): QueueIterator<T>;
        [util.inspect.custom]?: (depth: number, opts: util.InspectOptionsStylized) => string;
    }

    // interface QueueConstructor {
    //     readonly [Symbol.species]: QueueConstructor
    // }
    var Queue: QueueConstructor;
}

export { };

