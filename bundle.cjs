require('esbuild').build({
    entryPoints: ['./dist/anzen/index.js'],
    outfile: './dist/bundle.cjs',
    bundle: true,
    platform: 'node',
    minify: true
}).catch(() => process.exit(1));