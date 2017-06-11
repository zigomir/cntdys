export default {
  entry: 'dist/main.js',
  targets: [{ dest: 'dist/bundle.cjs.js', format: 'cjs' }, { dest: 'dist/bundle.es.js', format: 'es' }]
}
