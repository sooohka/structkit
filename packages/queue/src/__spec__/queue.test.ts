import { describe, expect, it } from "vitest";
import { QueueImpl as Queue } from "../queue";

describe("Queue", () => {
  describe("Constructor", () => {
    it("should create Queue with new keyword", () => {
      const queue = new Queue();

      expect(queue).toBeDefined();
      expect(queue).instanceOf(Queue);
    });

    it("should create empty Queue when no arguments provided", () => {
      const queue = new Queue();

      expect(queue.isEmpty).toBeDefined();
      expect(queue.isEmpty()).toBe(true);
    });

    describe("Elements constructor", () => {
      it("should create Queue with initial elements", () => {
        const queue = new Queue([1, 2, 3, 4, 5]);
        expect(queue.size).toBe(5);
        expect([...queue]).toEqual([1, 2, 3, 4, 5]);
      });

      it("should create Queue with mixed types", () => {
        const queue = new Queue(["hello", 42, true, null]);

        expect(queue.size).toBe(4);
        expect([...queue]).toEqual(["hello", 42, true, null]);
      });
    });
  });

  describe("enqueue", () => {
    it("should add element to empty queue", () => {
      const queue = new Queue<number>();
      queue.enqueue(1);

      expect(queue.size).toBe(1);
      expect(queue.isEmpty()).toBe(false);
    });

    it("should add multiple elements in order", () => {
      const queue = new Queue<number>();
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.size).toBe(3);
      expect([...queue]).toEqual([1, 2, 3]);
    });

    it("should add element to queue with initial elements", () => {
      const queue = new Queue([1, 2, 3]);
      queue.enqueue(4);

      expect(queue.size).toBe(4);
      expect([...queue]).toEqual([1, 2, 3, 4]);
    });

    it("should handle different data types", () => {
      const queue = new Queue<string | number | boolean>();
      queue.enqueue("hello");
      queue.enqueue(42);
      queue.enqueue(true);

      expect(queue.size).toBe(3);
      expect([...queue]).toEqual(["hello", 42, true]);
    });

    it("should handle null and undefined values", () => {
      const queue = new Queue<any>();
      queue.enqueue(null);
      queue.enqueue(undefined);
      queue.enqueue(0);

      expect(queue.size).toBe(3);
      expect([...queue]).toEqual([null, undefined, 0]);
    });
  });

  describe("dequeue", () => {
    it("should return undefined from empty queue", () => {
      const queue = new Queue<number>();
      const result = queue.dequeue();

      expect(result).toBeUndefined();
      expect(queue.size).toBe(0);
      expect(queue.isEmpty()).toBe(true);
    });

    it("should remove and return the first element", () => {
      const queue = new Queue([1, 2, 3]);
      const result = queue.dequeue();

      expect(result).toBe(1);
      expect(queue.size).toBe(2);
      expect([...queue]).toEqual([2, 3]);
    });

    it("should decrease size after dequeue", () => {
      const queue = new Queue(["a", "b", "c"]);
      expect(queue.size).toBe(3);

      queue.dequeue();
      expect(queue.size).toBe(2);

      queue.dequeue();
      expect(queue.size).toBe(1);
    });

    it("should follow FIFO order", () => {
      const queue = new Queue([1, 2, 3, 4, 5]);

      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
      expect(queue.dequeue()).toBe(5);
    });

    it("should become empty after dequeuing all elements", () => {
      const queue = new Queue([1, 2, 3]);

      queue.dequeue();
      queue.dequeue();
      queue.dequeue();

      expect(queue.isEmpty()).toBe(true);
      expect(queue.size).toBe(0);
      expect(queue.dequeue()).toBeUndefined();
    });

    it("should handle mixed enqueue and dequeue operations", () => {
      const queue = new Queue<number>();

      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.dequeue()).toBe(1);

      queue.enqueue(3);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBeUndefined();
    });

    it("should handle null and undefined values", () => {
      const queue = new Queue<any>([null, undefined, 0, false]);

      expect(queue.dequeue()).toBeNull();
      expect(queue.dequeue()).toBeUndefined();
      expect(queue.dequeue()).toBe(0);
      expect(queue.dequeue()).toBe(false);
    });

    it("should work with complex data types", () => {
      const obj1 = { id: 1, name: "first" };
      const obj2 = { id: 2, name: "second" };
      const queue = new Queue([obj1, obj2]);

      expect(queue.dequeue()).toBe(obj1);
      expect(queue.dequeue()).toBe(obj2);
    });
  });

  describe("peek", () => {
    it("should return undefined from empty queue", () => {
      const queue = new Queue<number>();
      const result = queue.peek();

      expect(result).toBeUndefined();
      expect(queue.size).toBe(0);
    });

    it("should return first element without removing it", () => {
      const queue = new Queue([1, 2, 3]);
      const result = queue.peek();

      expect(result).toBe(1);
      expect(queue.size).toBe(3);
      expect([...queue]).toEqual([1, 2, 3]);
    });

    it("should return same element on multiple peeks", () => {
      const queue = new Queue(["a", "b", "c"]);

      expect(queue.peek()).toBe("a");
      expect(queue.peek()).toBe("a");
      expect(queue.peek()).toBe("a");
      expect(queue.size).toBe(3);
    });

    it("should return first element after dequeue", () => {
      const queue = new Queue([1, 2, 3]);

      queue.dequeue();
      expect(queue.peek()).toBe(2);

      queue.dequeue();
      expect(queue.peek()).toBe(3);

      queue.dequeue();
      expect(queue.peek()).toBeUndefined();
    });

    it("should handle null and undefined values", () => {
      const queue1 = new Queue<any>([null, 1, 2]);
      expect(queue1.peek()).toBeNull();

      const queue2 = new Queue<any>([undefined, 1, 2]);
      expect(queue2.peek()).toBeUndefined();
    });

    it("should work with complex data types", () => {
      const obj = { id: 1, name: "first" };
      const queue = new Queue([obj, { id: 2 }]);

      expect(queue.peek()).toBe(obj);
      expect(queue.peek()).toHaveProperty("id", 1);
    });
  });

  describe("isEmpty", () => {
    it("should return true for empty queue", () => {
      const queue = new Queue<number>();
      expect(queue.isEmpty()).toBe(true);
    });

    it("should return false for queue with elements", () => {
      const queue = new Queue([1, 2, 3]);
      expect(queue.isEmpty()).toBe(false);
    });

    it("should return false after enqueue", () => {
      const queue = new Queue<number>();
      expect(queue.isEmpty()).toBe(true);

      queue.enqueue(1);
      expect(queue.isEmpty()).toBe(false);
    });

    it("should return true after dequeuing all elements", () => {
      const queue = new Queue([1, 2]);
      expect(queue.isEmpty()).toBe(false);

      queue.dequeue();
      expect(queue.isEmpty()).toBe(false);

      queue.dequeue();
      expect(queue.isEmpty()).toBe(true);
    });

    it("should handle multiple enqueue and dequeue operations", () => {
      const queue = new Queue<number>();
      expect(queue.isEmpty()).toBe(true);

      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.isEmpty()).toBe(false);

      queue.dequeue();
      queue.dequeue();
      expect(queue.isEmpty()).toBe(true);

      queue.enqueue(3);
      expect(queue.isEmpty()).toBe(false);
    });
  });

  describe("clear", () => {
    it("should clear empty queue", () => {
      const queue = new Queue<number>();
      queue.clear();

      expect(queue.isEmpty()).toBe(true);
      expect(queue.size).toBe(0);
    });

    it("should remove all elements from queue", () => {
      const queue = new Queue([1, 2, 3, 4, 5]);
      queue.clear();

      expect(queue.isEmpty()).toBe(true);
      expect(queue.size).toBe(0);
      expect([...queue]).toEqual([]);
    });

    it("should allow enqueue after clear", () => {
      const queue = new Queue([1, 2, 3]);
      queue.clear();
      queue.enqueue(10);

      expect(queue.size).toBe(1);
      expect(queue.peek()).toBe(10);
      expect([...queue]).toEqual([10]);
    });

    it("should allow dequeue after clear", () => {
      const queue = new Queue([1, 2, 3]);
      queue.clear();

      expect(queue.dequeue()).toBeUndefined();
    });

    it("should make peek return undefined after clear", () => {
      const queue = new Queue([1, 2, 3]);
      expect(queue.peek()).toBe(1);

      queue.clear();
      expect(queue.peek()).toBeUndefined();
    });

    it("should handle multiple clear calls", () => {
      const queue = new Queue([1, 2, 3]);

      queue.clear();
      expect(queue.size).toBe(0);

      queue.clear();
      expect(queue.size).toBe(0);

      queue.enqueue(5);
      expect(queue.size).toBe(1);
    });

    it("should clear queue with complex data types", () => {
      const queue = new Queue([{ id: 1 }, { id: 2 }, [1, 2, 3]]);

      queue.clear();
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size).toBe(0);
    });
  });

  describe("has", () => {
    it("should return false for empty queue", () => {
      const queue = new Queue<number>();
      expect(queue.has(1)).toBe(false);
    });

    it("should return true for existing element", () => {
      const queue = new Queue([1, 2, 3]);
      expect(queue.has(1)).toBe(true);
      expect(queue.has(2)).toBe(true);
      expect(queue.has(3)).toBe(true);
    });

    it("should return false for non-existing element", () => {
      const queue = new Queue([1, 2, 3]);
      expect(queue.has(4)).toBe(false);
      expect(queue.has(0)).toBe(false);
    });

    it("should work with string values", () => {
      const queue = new Queue(["hello", "world", "test"]);
      expect(queue.has("hello")).toBe(true);
      expect(queue.has("world")).toBe(true);
      expect(queue.has("missing")).toBe(false);
    });

    it("should handle null and undefined values", () => {
      const queue = new Queue<any>([null, undefined, 0, false]);

      expect(queue.has(null)).toBe(true);
      expect(queue.has(undefined)).toBe(true);
      expect(queue.has(0)).toBe(true);
      expect(queue.has(false)).toBe(true);
    });

    it("should return false after dequeue removes element", () => {
      const queue = new Queue([1, 2, 3]);
      expect(queue.has(1)).toBe(true);

      queue.dequeue();
      expect(queue.has(1)).toBe(false);
      expect(queue.has(2)).toBe(true);
    });

    it("should return true after enqueue adds element", () => {
      const queue = new Queue<number>();
      expect(queue.has(5)).toBe(false);

      queue.enqueue(5);
      expect(queue.has(5)).toBe(true);
    });

    it("should return false after clear", () => {
      const queue = new Queue([1, 2, 3]);
      expect(queue.has(1)).toBe(true);

      queue.clear();
      expect(queue.has(1)).toBe(false);
      expect(queue.has(2)).toBe(false);
      expect(queue.has(3)).toBe(false);
    });

    it("should work with object references", () => {
      const obj1 = { id: 1, name: "first" };
      const obj2 = { id: 2, name: "second" };
      const queue = new Queue([obj1, obj2]);

      expect(queue.has(obj1)).toBe(true);
      expect(queue.has(obj2)).toBe(true);
      expect(queue.has({ id: 1, name: "first" })).toBe(false); // different reference
    });

    it("should handle duplicate values", () => {
      const queue = new Queue([1, 2, 2, 3, 3, 3]);
      expect(queue.has(1)).toBe(true);
      expect(queue.has(2)).toBe(true);
      expect(queue.has(3)).toBe(true);

      queue.dequeue(); // remove 1
      queue.dequeue(); // remove first 2
      expect(queue.has(2)).toBe(true); // still has another 2
    });

    it("should handle mixed data types", () => {
      const queue = new Queue<any>(["1", 1, true, "1"]);

      expect(queue.has("1")).toBe(true);
      expect(queue.has(1)).toBe(true);
      expect(queue.has(true)).toBe(true);
      expect(queue.has("2")).toBe(false);
      expect(queue.has(2)).toBe(false);
    });

    it("should work with array elements", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];
      const queue = new Queue([arr1, arr2]);

      expect(queue.has(arr1)).toBe(true);
      expect(queue.has(arr2)).toBe(true);
      expect(queue.has([1, 2, 3])).toBe(false); // different reference
    });
  });

  describe("forEach", () => {
    it("should execute callback for each element", () => {
      const queue = new Queue([1, 2, 3]);
      const result: number[] = [];

      queue.forEach((value) => {
        result.push(value);
      });

      expect(result).toEqual([1, 2, 3]);
    });

    it("should pass value twice and queue as arguments", () => {
      const queue = new Queue(["a", "b", "c"]);
      const calls: Array<{ value1: string; value2: string; isQueue: boolean }> =
        [];

      queue.forEach((value1, value2, q) => {
        calls.push({
          value1,
          value2,
          isQueue: q === queue,
        });
      });

      expect(calls).toHaveLength(3);
      expect(calls[0]).toEqual({ value1: "a", value2: "a", isQueue: true });
      expect(calls[1]).toEqual({ value1: "b", value2: "b", isQueue: true });
      expect(calls[2]).toEqual({ value1: "c", value2: "c", isQueue: true });
    });

    it("should work with empty queue", () => {
      const queue = new Queue<number>();
      let callCount = 0;

      queue.forEach(() => {
        callCount++;
      });

      expect(callCount).toBe(0);
    });

    it("should support thisArg parameter", () => {
      const queue = new Queue([1, 2, 3]);
      const context = { multiplier: 2 };
      const result: number[] = [];

      queue.forEach(function (this: { multiplier: number }, value: number) {
        result.push(value * this.multiplier);
      }, context);

      expect(result).toEqual([2, 4, 6]);
    });

    it("should iterate in FIFO order", () => {
      const queue = new Queue<number>();
      queue.enqueue(10);
      queue.enqueue(20);
      queue.enqueue(30);

      const result: number[] = [];
      queue.forEach((value) => {
        result.push(value);
      });

      expect(result).toEqual([10, 20, 30]);
    });

    it("should work with null and undefined values", () => {
      const queue = new Queue<any>([null, undefined, 0, false]);
      const result: any[] = [];

      queue.forEach((value) => {
        result.push(value);
      });

      expect(result).toEqual([null, undefined, 0, false]);
    });

    it("should work with complex data types", () => {
      const obj1 = { id: 1, name: "first" };
      const obj2 = { id: 2, name: "second" };
      const queue = new Queue([obj1, obj2]);
      const result: Array<{ id: number; name: string }> = [];

      queue.forEach((value) => {
        result.push(value);
      });

      expect(result).toEqual([obj1, obj2]);
      expect(result[0]).toBe(obj1);
      expect(result[1]).toBe(obj2);
    });

    it("should reflect queue state at time of call", () => {
      const queue = new Queue([1, 2, 3, 4, 5]);
      queue.dequeue(); // remove 1
      queue.dequeue(); // remove 2

      const result: number[] = [];
      queue.forEach((value) => {
        result.push(value);
      });

      expect(result).toEqual([3, 4, 5]);
    });

    it("should allow side effects in callback", () => {
      const queue = new Queue([1, 2, 3]);
      let sum = 0;

      queue.forEach((value) => {
        sum += value;
      });

      expect(sum).toBe(6);
    });

    it("should work with arrow functions", () => {
      const queue = new Queue([1, 2, 3]);
      const result: number[] = [];

      queue.forEach((value) => result.push(value * 2));

      expect(result).toEqual([2, 4, 6]);
    });

    it("should pass correct indices in order", () => {
      const queue = new Queue(["first", "second", "third"]);
      const indices: number[] = [];
      let index = 0;

      queue.forEach(() => {
        indices.push(index++);
      });

      expect(indices).toEqual([0, 1, 2]);
    });
  });
});

describe("Iterable", () => {
  describe("Symbol.iterator", () => {
    it("should be iterable with for...of loop", () => {
      const queue = new Queue([1, 2, 3, 4, 5]);
      const result: number[] = [];

      for (const value of queue) {
        result.push(value);
      }

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should work with spread operator", () => {
      const queue = new Queue(["a", "b", "c"]);
      const result = [...queue];

      expect(result).toEqual(["a", "b", "c"]);
    });

    it("should iterate over empty queue", () => {
      const queue = new Queue<number>();
      const result: number[] = [];

      for (const value of queue) {
        result.push(value);
      }

      expect(result).toEqual([]);
    });

    it("should reflect current state during iteration", () => {
      const queue = new Queue([1, 2, 3]);
      queue.dequeue(); // remove 1
      queue.enqueue(4); // add 4

      expect([...queue]).toEqual([2, 3, 4]);
    });

    it("should work with Array.from", () => {
      const queue = new Queue([10, 20, 30]);
      const array = Array.from(queue);

      expect(array).toEqual([10, 20, 30]);
    });

    it("should iterate in FIFO order", () => {
      const queue = new Queue<number>();
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      const result = [...queue];
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe("entries", () => {
    it("should return iterator of [value, value] pairs", () => {
      const queue = new Queue([{ key: 1 }, { key: 2 }, 3]);
      const entries = [...queue.entries()];

      const set = new Set([{ key: 1 }, { key: 2 }, 3]);

      expect(entries).toEqual([
        [0, { key: 1 }],
        [1, { key: 2 }],
        [2, 3],
      ]);
    });

    it("should work with for...of loop", () => {
      const queue = new Queue(["a", "b", "c"]);
      const result: [number, string][] = [];

      const set = new Set(["a", "b", "c"]);

      console.log(set.keys(), set.values(), set.entries());
      console.log(queue.keys(), queue.values(), queue.entries());

      for (const entry of queue.entries()) {
        result.push(entry);
      }

      expect(result).toEqual([
        [0, "a"],
        [1, "b"],
        [2, "c"],
      ]);
    });

    it("should return empty iterator for empty queue", () => {
      const queue = new Queue<number>();
      const entries = [...queue.entries()];

      expect(entries).toEqual([]);
    });

    it("should work with Array.from", () => {
      const queue = new Queue([10, 20, 30]);
      const entries = Array.from(queue.entries());

      expect(entries).toEqual([
        [0, 10],
        [1, 20],
        [2, 30],
      ]);
    });
  });

  describe("keys", () => {
    it("should return iterator of indices", () => {
      const queue = new Queue(["a", "b", "c"]);
      const keys = [...queue.keys()];

      expect(keys).toEqual([0, 1, 2]);
    });

    it("should work with for...of loop", () => {
      const queue = new Queue([10, 20, 30, 40]);
      const result: number[] = [];

      for (const key of queue.keys()) {
        result.push(key);
      }

      expect(result).toEqual([0, 1, 2, 3]);
    });

    it("should return empty iterator for empty queue", () => {
      const queue = new Queue<number>();
      const keys = [...queue.keys()];

      expect(keys).toEqual([]);
    });

    it("should work with single element", () => {
      const queue = new Queue([42]);
      const keys = [...queue.keys()];

      expect(keys).toEqual([0]);
    });

    it("should reflect current queue size", () => {
      const queue = new Queue([1, 2, 3, 4, 5]);
      queue.dequeue();
      queue.dequeue();

      const keys = [...queue.keys()];
      expect(keys).toEqual([0, 1, 2]);
    });
  });

  describe("values", () => {
    it("should return iterator of values", () => {
      const queue = new Queue([1, 2, 3]);
      const values = [...queue.values()];

      expect(values).toEqual([1, 2, 3]);
    });

    it("should work with for...of loop", () => {
      const queue = new Queue(["hello", "world", "test"]);
      const result: string[] = [];

      for (const value of queue.values()) {
        result.push(value);
      }

      expect(result).toEqual(["hello", "world", "test"]);
    });

    it("should return empty iterator for empty queue", () => {
      const queue = new Queue<number>();
      const values = [...queue.values()];

      expect(values).toEqual([]);
    });

    it("should be same as Symbol.iterator", () => {
      const queue = new Queue([1, 2, 3, 4, 5]);

      const fromIterator = [...queue];
      const fromValues = [...queue.values()];

      expect(fromValues).toEqual(fromIterator);
    });

    it("should work with complex data types", () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const queue = new Queue([obj1, obj2]);

      const values = [...queue.values()];
      expect(values).toEqual([obj1, obj2]);
      expect(values[0]).toBe(obj1);
    });

    it("should handle null and undefined", () => {
      const queue = new Queue<any>([null, undefined, 0, false]);
      const values = [...queue.values()];

      expect(values).toEqual([null, undefined, 0, false]);
    });
  });

  describe("Iterator combinations", () => {
    it("should support multiple concurrent iterations", () => {
      const queue = new Queue([1, 2, 3]);

      const iter1 = queue[Symbol.iterator]();
      const iter2 = queue[Symbol.iterator]();

      expect(iter1.next().value).toBe(1);
      expect(iter2.next().value).toBe(1);
      expect(iter1.next().value).toBe(2);
      expect(iter2.next().value).toBe(2);
    });

    it("should work with destructuring", () => {
      const queue = new Queue([1, 2, 3, 4, 5]);
      const [first, second, ...rest] = queue;

      expect(first).toBe(1);
      expect(second).toBe(2);
      expect(rest).toEqual([3, 4, 5]);
    });

    it("should work with Set constructor", () => {
      const queue = new Queue([1, 2, 2, 3, 3, 3]);
      const uniqueSet = new Set(queue);

      expect([...uniqueSet]).toEqual([1, 2, 3]);
    });

    it("should work with filter and map", () => {
      const queue = new Queue([1, 2, 3, 4, 5]);
      const filtered = [...queue].filter((x) => x % 2 === 0);
      const mapped = [...queue].map((x) => x * 2);

      expect(filtered).toEqual([2, 4]);
      expect(mapped).toEqual([2, 4, 6, 8, 10]);
    });
  });
});
