import 'dotenv/config'
import { networkInterfaces } from 'os'

function getLocalIp() {
  const nets = networkInterfaces()
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }
  return 'localhost'
}

export default {
  expo: {
    name: 'pokApp',
    slug: 'pokApp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      bundler: 'metro'
    },
    extra: {
      apiBaseUrl: process.env.API_BASE_URL?.includes('localhost')
        ? process.env.API_BASE_URL.replace('localhost', getLocalIp()) 
        : process.env.API_BASE_URL
    }
  }
}
