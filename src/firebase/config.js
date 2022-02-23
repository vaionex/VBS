import { envMODE } from '../config/envMode'
import apiConfig from '../config/relysiaApi'

let config

if (envMODE === 'DEV') {
  config = {
    apiKey: 'AIzaSyCwU65QLue_37MZIWDza4rWOUX-iogaKu8',
    authDomain: 'vaionexbasestack.firebaseapp.com',
    projectId: 'vaionexbasestack',
    storageBucket: 'vaionexbasestack.appspot.com',
    messagingSenderId: '797660239996',
    appId: '1:797660239996:web:79ceaf1183e55b1ad091f9',
    measurementId: 'G-N1VZBJKYF4',
  }

  apiConfig.defaults.headers.common['serviceId'] =
    '9cf81e50-eeb9-40dd-a790-10a0813b48b5'
}

export default config
