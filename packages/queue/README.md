# @sooohka/queue

A native-like Queue implementation for TypeScript that behaves like built-in JavaScript data structures. Array-based implementation provides fast performance with complete type safety.

## Features

- 🚀 **Native-like Behavior**: Registered as `global.Queue`, usable like `Array` or `Set`
- 📦 **FIFO Data Structure**: Follows First-In-First-Out principle
- 🔄 **Full Iterable Support**: Works with `for...of`, spread operator, destructuring, and more
- 💪 **TypeScript First**: Complete type definitions with generic support (`Queue<T>`, `ReadonlyQueue<T>`)
- 🎯 **Array-like API**: Familiar iterator interface (`entries`, `keys`, `values`)
- 🔍 **Node.js Inspect Support**: Beautiful console output with `util.inspect` customization
- 🎨 **Flexible Construction**: Create from arrays, iterables, or variadic arguments
- ♻️ **Explicit Resource Management**: Supports `Symbol.dispose` for automatic iterator cleanup
- ⚡ **Zero Dependencies**: No external dependencies required

## Installation

```bash
pnpm install @sooohka/queue
```

## Usage

### Basic Usage

```typescript
import '@sooohka/queue' // import this on your project's entry file

// Create with new keyword
const queue = new Queue<number>()

// Create with initial values (array)
const queue2 = new Queue([1, 2, 3, 4, 5])

// Create from any iterable
const queue3 = new Queue(new Set([1, 2, 3]))

```

### Queue Operations

```typescript
const queue = new Queue<number>()

// Add elements (enqueue)
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

// Remove and return first element (dequeue)
const first = queue.dequeue() // 1

// Peek at first element without removing
const peek = queue.peek() // 2

// Check queue size
console.log(queue.size) // 2

// Check if queue is empty
console.log(queue.isEmpty()) // false

// Check if value exists
console.log(queue.has(2)) // true

// Clear the queue
queue.clear()
console.log(queue.isEmpty()) // true
```

### Iterable Features

```typescript
const queue = new Queue([1, 2, 3, 4, 5])

// for...of loop
for (const value of queue) {
  console.log(value) // 1, 2, 3, 4, 5
}

// Spread operator
const array = [...queue] // [1, 2, 3, 4, 5]

// Destructuring
const [first, second, ...rest] = queue
console.log(first) // 1
console.log(second) // 2
console.log(rest) // [3, 4, 5]

// Array.from
const newArray = Array.from(queue)

// Convert to Set (remove duplicates)
const uniqueSet = new Set(queue)
```

### Iterator Methods

```typescript
const queue = new Queue(['a', 'b', 'c'])

// entries(): Returns [index, value] pairs
for (const [index, value] of queue.entries()) {
  console.log(index, value)
}
// 0 'a'
// 1 'b'
// 2 'c'

// keys(): Returns indices
for (const index of queue.keys()) {
  console.log(index)
}
// 0, 1, 2

// values(): Returns values
for (const value of queue.values()) {
  console.log(value)
}
// 'a', 'b', 'c'
```

### forEach Method

```typescript
const queue = new Queue([1, 2, 3])

// Basic usage
queue.forEach((value) => {
  console.log(value)
})

// Value is passed twice (similar to Set)
queue.forEach((value1, value2, queue) => {
  console.log(value1 === value2) // true
})

// thisArg support
const context = { multiplier: 2 }
queue.forEach(function(value) {
  console.log(value * this.multiplier)
}, context)
// 2, 4, 6
```

### Practical Examples

#### 1. BFS (Breadth-First Search)

```typescript
function bfs(graph: Map<string, string[]>, start: string) {
  const queue = new Queue([start])
  const visited = new Set<string>()

  while (!queue.isEmpty()) {
    const node = queue.dequeue()!
    
    if (visited.has(node)) continue
    visited.add(node)
    
    console.log(node)
    
    const neighbors = graph.get(node) || []
    neighbors.forEach(neighbor => queue.enqueue(neighbor))
  }
}
```

#### 2. Task Queue

```typescript
interface Task {
  id: string
  execute: () => Promise<void>
}

class TaskQueue {
  private queue = new Queue<Task>()
  private processing = false

  add(task: Task) {
    this.queue.enqueue(task)
    this.process()
  }

  private async process() {
    if (this.processing || this.queue.isEmpty()) return
    
    this.processing = true
    
    while (!this.queue.isEmpty()) {
      const task = this.queue.dequeue()!
      await task.execute()
    }
    
    this.processing = false
  }

  get pending() {
    return this.queue.size
  }
}
```

#### 3. Sliding Window

```typescript
function slidingWindowMax(nums: number[], k: number): number[] {
  const result: number[] = []
  const queue = new Queue<number>()
  
  for (let i = 0; i < nums.length; i++) {
    queue.enqueue(nums[i])
    
    if (queue.size === k) {
      result.push(Math.max(...queue))
      queue.dequeue()
    }
  }
  
  return result
}
```

## API Reference

### Constructor

```typescript
// With new keyword
new Queue<T>(values?: readonly T[] | Iterable<T> | null): Queue<T>

// Without new keyword (function call style)
Queue<T>(): Queue<T>
Queue<T>(...items: T[]): Queue<T>

// From iterable
new Queue<T>(iterable?: Iterable<T> | null): Queue<T>
```

**Parameters:**
- `values` - Optional array or iterable to initialize the queue with
- `...items` - Variable number of items to add to the queue (when called without `new`)

**Examples:**
```typescript
const q1 = new Queue([1, 2, 3])           // from array
const q2 = new Queue(new Set([1, 2, 3]))  // from Set
const q3 = new Queue('abc')                // from string
const q4 = Queue(1, 2, 3)                  // variadic
const q5 = Queue<number>()                 // empty queue
```

### Methods

#### `enqueue(value: T): void`

Adds an element to the end of the queue.

#### `dequeue(): T | undefined`

Removes and returns the first element from the queue. Returns `undefined` if the queue is empty.

#### `peek(): T | undefined`

Returns the first element from the queue without removing it.

#### `isEmpty(): boolean`

Returns `true` if the queue is empty.

#### `clear(): void`

Removes all elements from the queue.

#### `has(value: T): boolean`

Checks whether the queue contains the specified value.

#### `forEach(callbackfn, thisArg?): void`

Executes a callback function for each element in the queue.

### Iterator Methods

#### `[Symbol.iterator](): QueueIterator<T>`

Makes the queue iterable.

#### `entries(): QueueIterator<[number, T]>`

Returns an iterator of `[index, value]` pairs.

#### `keys(): QueueIterator<number>`

Returns an iterator of indices.

#### `values(): QueueIterator<T>`

Returns an iterator of values.

### Properties

#### `size: number` (readonly)

Returns the number of elements in the queue.

#### `[Symbol.toStringTag]: string` (readonly)

Returns `"Queue"` for Object.prototype.toString.call().


**Features:**
- ✅ Standard Iterator protocol (`next()`, `return()`, `throw()`)
- ✅ Self-iterable (`[Symbol.iterator]()` returns itself)
- ✅ Explicit Resource Management with `Symbol.dispose` (TC39 Stage 3)
- ✅ Beautiful console output via `util.inspect`

**Usage with `using` (Explicit Resource Management):**
```typescript
// Automatic cleanup with 'using' declaration
{
  using iterator = queue.values()
  for (const value of iterator) {
    if (value > 10) break  // Iterator automatically cleaned up
  }
} // Symbol.dispose called here
```

## Development

### Build

```bash
pnpm build
```

### Test

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Type Check

```bash
pnpm typecheck
```

## Implementation Details

- **Internal Structure**: Array-based implementation for fast access and modification
- **Time Complexity**:
  - `enqueue`: O(1) amortized
  - `dequeue`: O(n) (uses Array.shift)
  - `peek`: O(1)
  - `has`: O(n)
  - `clear`: O(1)
- **Space Complexity**: O(n)

> 💡 **Note**: Currently uses Array-based implementation. Future versions may switch to a linked list to improve `dequeue` performance to O(1).

## License

MIT

## Contributing

Issues and PRs are welcome!
