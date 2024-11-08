import 'dotenv/config'

export default {
  name: 'secret-app',
  slug: 'secret-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    usesAppleSignIn: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    },
    package: 'com.secret.app'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    env: process.env.ENV,
    APOLLO_URI: process.env.APOLLO_URI
  },
  plugins: ['@config-plugins/detox', 'expo-apple-authentication']
}
