# StructKit

A collection of native-like JavaScript data structure implementations for TypeScript. Behaves like built-in data structures with complete type safety.

## Features

- 🚀 **Native Behavior**: Works like built-in JavaScript data structures
- 💪 **TypeScript First**: Complete type definitions with generic support
- ⚡ **Zero Dependencies**: No external dependencies required
- 📦 **Monorepo Structure**: Independently usable packages
- 🔄 **Full Iterable Support**: Works with `for...of`, spread operator, and more

## Packages

### [@structkit/queue](./packages/queue)

A FIFO (First-In-First-Out) Queue data structure implementation.

```bash
pnpm install @structkit/queue
```

**Key Features:**
- Array-based implementation for fast performance
- Intuitive API with `enqueue`, `dequeue`, `peek`
- Complete iterator protocol support
- Explicit Resource Management (`Symbol.dispose`)

```typescript
import '@structkit/queue' // import this on your project's entry file

const queue = new Queue([1, 2, 3])
queue.enqueue(4)
const first = queue.dequeue() // 1

for (const value of queue) {
  console.log(value) // 2, 3, 4
}
```

[View full documentation →](./packages/queue/README.md)

## Development

### Installation

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Test

```bash
pnpm test
```

### Lint

```bash
pnpm lint
```

### Type Check

```bash
pnpm typecheck
```

## Requirements

- Node.js: 22.14.0
- pnpm: 10.13.1

## License

MIT

## Contributing

Issues and PRs are welcome!

