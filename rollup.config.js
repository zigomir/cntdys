import typescript from 'rollup-plugin-typescript'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/index.ts',
  dest: 'dist/bundle.min.js',
  moduleName: 'cntdys',
  format: 'iife',
  plugins: [typescript({ typescript: require('typescript') }), uglify()]
}
