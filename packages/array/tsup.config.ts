import fs from 'fs'
import {spawn} from 'node:child_process'
import {defineConfig} from 'tsup'

export default defineConfig((options) => {
    return {
        entry: ['src/index.ts'],
        // dts: true,
        experimentalDts: true,
        esbuildPlugins: [],
        sourcemap: true,
        clean: true,
        minify: true,
        bundle: true,
        format: ['cjs', 'esm'],
        external: ['react'],
        async onSuccess() {
            const srcDir = 'src/@types'
            const destDir = 'dist/@types'
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, {recursive: true})
            }
            fs.cpSync(srcDir, destDir, {recursive: true})

            if (options.watch) {
                //     const child = spawn('node', ['dist/index.js'])
                //     child.stdout.on('data', (data) => {
                //         console.log(data.toString())
                //     })
                //     child.stderr.on('data', (data) => {
                //         console.error(data.toString())
                //     })
                //     child.on('close', (code) => {
                //         console.log(`child process exited with code ${code}`)
                //     })
            }
        },
    }
})
