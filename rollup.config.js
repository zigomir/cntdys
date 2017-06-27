import babili from 'rollup-plugin-babili'
import multiEntry from 'rollup-plugin-multi-entry'

let plugins = [multiEntry()]
let dest = 'dist/bundle.js'

if (process.env.BUILD === 'production') {
  dest = 'dist/bundle.min.js'
  plugins.push(babili({
    comments: false,
    banner: false,
    sourceMap: false
  }))
}

export default {
  entry: ['dist/src/main.js', 'dist/src/ui.js'],
  dest,
  moduleName: 'cntdys',
  format: 'iife',
  plugins
}
