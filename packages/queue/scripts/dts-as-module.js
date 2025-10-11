// @ts-check
// "build": "tsup && echo 'export { }' >> dist/index.d.ts && echo 'export { }' >> dist/index.d.cts",

import fs from 'fs'
import path from 'path'
import { exit } from 'process'

if (!fs.existsSync(path.join('dist', 'index.d.ts'))) {
    console.error('dist/index.d.ts not found')
    exit(1)
}

if (!fs.existsSync(path.join('dist', 'index.d.cts'))) {
    console.error('dist/index.d.cts not found')
    exit(1)
}

fs.appendFileSync('dist/index.d.ts', 'export {}')
fs.appendFileSync('dist/index.d.cts', 'export {}')
