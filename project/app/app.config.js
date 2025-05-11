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
      },
      package: "com.alexe.pokapp", // <-- este es el campo que te falta
    },
    web: {
      bundler: 'metro'
    },
    extra: {

      apiBaseUrl: 'https://pokapp-qqce.onrender.com',
      "eas": {
              "projectId": "f763183b-4ad8-4107-9c4e-00f2692e238c"
            }
    }
  }
}
