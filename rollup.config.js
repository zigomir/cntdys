import typescript from 'rollup-plugin-typescript'

export default {
  entry: 'src/main.ts',
  plugins: [typescript({ typescript: require('typescript') })],
  targets: [{ dest: 'dist/bundle.cjs.js', format: 'cjs' }, { dest: 'dist/bundle.es.js', format: 'es' }]
}
