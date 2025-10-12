import util from "node:util";

export class QueueImpl<T> implements Queue<T>, ReadonlyQueue<T> {
  #data: T[] = [];

  constructor(values?: readonly T[] | Iterable<T> | null) {
    if (values) {
      this.#data = Array.isArray(values) ? [...values] : [...values];
    }
  }

  enqueue(value: T): void {
    this.#data.push(value);
  }

  // NOTE: Currently uses Array-based implementation. Future versions may switch to a linked list to improve dequeue performance to O(1).
  dequeue(): T | undefined {
    return this.#data.shift();
  }

  peek(): T | undefined {
    return this.#data[0];
  }

  isEmpty(): boolean {
    return this.#data.length === 0;
  }

  clear(): void {
    this.#data = [];
  }

  has(value: T): boolean {
    return this.#data.includes(value);
  }

  forEach(
    callbackfn: (value: T, value2: T, queue: Queue<T>) => void,
    thisArg?: any,
  ): void {
    for (let i = 0; i < this.#data.length; i++) {
      const value = this.#data[i]!;
      callbackfn.call(thisArg, value, value, this);
    }
  }

  get size(): number {
    return this.#data.length;
  }

  [Symbol.iterator](): QueueIterator<T> {
    return this.#data[Symbol.iterator]();
  }

  entries(): QueueIterator<[number, T]> {
    let i = 0;
    const size = this.size;
    const buf = this.#data;
    const name = this[Symbol.toStringTag];

    return {
      next: function () {
        let result;
        if (i < size) {
          result = { done: false, value: [i, buf[i]] } as IteratorResult<
            [number, T]
          >;
        } else {
          result = { done: true as const } as IteratorResult<[number, T]>;
        }
        i++;

        return result satisfies IteratorResult<[number, T]>;
      },
      [Symbol.iterator]: function () {
        return this;
      },
      [util.inspect.custom](depth: number, opts: util.InspectOptionsStylized) {
        const body = buf
          .map(
            (v, idx) =>
              `[ ${util.inspect(idx, opts)}, ${util.inspect(v, opts)} ]`,
          )
          .join(", ");
        return `[${name} Entries] { ${body} }`;
      },
      [Symbol.dispose]() {
        this.return?.();
      },
    };
  }

  keys(): QueueIterator<number> {
    let i = 0;
    const size = this.size;
    const buf = this.#data;
    const name = this[Symbol.toStringTag];

    return {
      next: function () {
        let result;
        if (i < size) {
          result = { done: false as const, value: i } as IteratorResult<number>;
        } else {
          result = { done: true as const } as IteratorResult<number>;
        }
        i++;
        return result satisfies IteratorResult<number>;
      },
      [Symbol.iterator]: function () {
        return this;
      },
      [util.inspect.custom](depth: number, opts: util.InspectOptionsStylized) {
        const body = buf
          .map((v, idx) => `${util.inspect(idx, opts)}`)
          .join(", ");
        return `[${name} Iterator] { ${body} }`;
      },
      [Symbol.dispose]() {
        this.return?.();
      },
    };
  }

  values(): QueueIterator<T> {
    let i = 0;
    const size = this.size;
    const buf = this.#data;
    const name = this[Symbol.toStringTag];

    return {
      next: function () {
        let result;
        if (i < size) {
          result = { done: false, value: buf[i] } as IteratorResult<T>;
        } else {
          result = { done: true as const } as IteratorResult<T>;
        }
        i++;
        return result satisfies IteratorResult<T>;
      },
      [Symbol.iterator]: function () {
        return this;
      },
      [util.inspect.custom](depth: number, opts: util.InspectOptionsStylized) {
        const body = buf.map((v) => `${util.inspect(v, opts)}`).join(", ");
        return `[${name} Iterator] { ${body} }`;
      },
      [Symbol.dispose]() {
        this.return?.();
      },
    };
  }

  get [Symbol.toStringTag](): string {
    return "Queue";
  }

  [util.inspect.custom](
    depth: number,
    opts: util.InspectOptionsStylized,
  ): string {
    const body = this.#data.map((v) => util.inspect(v, opts)).join(", ");
    return `Queue(${this.size}) { ${body} }`;
  }
}
