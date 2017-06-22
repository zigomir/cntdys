import babili from 'rollup-plugin-babili'

export default {
  entry: 'dist/src/main.js',
  dest: 'dist/bundle.min.js',
  moduleName: 'cntdys',
  format: 'iife',
  plugins: [babili({
    comments: false,
    banner: false,
    sourceMap: false
  })]
}
