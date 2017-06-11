import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'dist/main.js',
  dest: 'dist/bundle.min.js',
  moduleName: 'cntdys',
  format: 'iife',
  plugins: [uglify()]
}
