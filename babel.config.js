module.exports = function (api) {
  api.cache(true)

  const plugins = [
    // Add any other plugins you need here
  ]

  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev) {
    plugins.unshift('transform-remove-console')
  }
  return {
    presets: ['babel-preset-expo'],
    plugins,
  }
}
