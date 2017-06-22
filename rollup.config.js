import babili from 'rollup-plugin-babili'

let plugins = []
let dest = 'dist/bundle.js'

if (process.env.BUILD === 'production') {
  dest = 'dist/bundle.min.js'
  plugins = [babili({
    comments: false,
    banner: false,
    sourceMap: false
  })]
}

export default {
  entry: 'dist/src/main.js',
  dest,
  moduleName: 'cntdys',
  format: 'iife',
  plugins
}
