import * as firebase from 'firebase'


const config = {
  apiKey: "AIzaSyDHvpMFTF1RnLgAFyJGnf41P7gxLuib0Dk",
  authDomain: "code-nah-mean-clone.firebaseapp.com",
  databaseURL: "https://code-nah-mean-clone.firebaseio.com",
  projectId: "code-nah-mean-clone",
  storageBucket: "code-nah-mean-clone.appspot.com",
  messagingSenderId: "989721910891",
  appId: "1:989721910891:web:9ead7c544eae8031cd9b2e"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const config = {
//   apiKey: 'AIzaSyApn1dpI9L12MEB2Ib0IX9obJRmnNUrMt0',
//   authDomain: 'truethought-1b13a.firebaseapp.com',
//   databaseURL: 'https://truethought-1b13a.firebaseio.com',
//   projectId: 'truethought-1b13a',
//   storageBucket: 'truethought-1b13a.appspot.com',
//   messagingSenderId: '809873211146',
//   appId: '1:809873211146:web:9165b315cb88f563a444f3'
// }

export default firebase.initializeApp(config)

  