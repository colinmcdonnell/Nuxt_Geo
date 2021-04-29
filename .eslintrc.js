module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'vue/attributes-order': 0,
    'spaced-comment': 0,
    'vue/no-v-html': 0,
    'vue/valid-v-for': 0,
    'vue/name-property-casing': 0,
    'vue/comment-directive': 0
  }
}
